/**
 * Polylang免费版 REST API 扩展
 * 实现完整的多语言API支持
 */
class PolylangFreeRESTAPI {
    
  public function __construct() {
      add_action('rest_api_init', array($this, 'init_rest_api'));
      add_filter('rest_post_collection_params', array($this, 'add_language_collection_params'));
      add_filter('rest_category_collection_params', array($this, 'add_language_collection_params'));
      add_filter('rest_post_query', array($this, 'filter_posts_by_language'), 10, 2);
      add_filter('rest_category_query', array($this, 'filter_categories_by_language'), 10, 2);
  }
  
  /**
   * 初始化REST API扩展
   */
  public function init_rest_api() {
      // 为posts添加语言字段
      register_rest_field(['post', 'page'], 'polylang_lang', array(
          'get_callback' => array($this, 'get_post_language'),
          'update_callback' => array($this, 'update_post_language'),
          'schema' => array(
              'description' => 'Post language code',
              'type' => 'string',
              'context' => array('view', 'edit')
          )
      ));
      
      // 为posts添加翻译关系
      register_rest_field(['post', 'page'], 'polylang_translations', array(
          'get_callback' => array($this, 'get_post_translations'),
          'schema' => array(
              'description' => 'Post translations',
              'type' => 'object',
              'context' => array('view', 'edit')
          )
      ));
      
      // 为categories添加语言字段
      register_rest_field('category', 'polylang_lang', array(
          'get_callback' => array($this, 'get_term_language'),
          'schema' => array(
              'description' => 'Category language code',
              'type' => 'string',
              'context' => array('view', 'edit')
          )
      ));
      
      // 为categories添加翻译关系
      register_rest_field('category', 'polylang_translations', array(
          'get_callback' => array($this, 'get_term_translations'),
          'schema' => array(
              'description' => 'Category translations',
              'type' => 'object',
              'context' => array('view', 'edit')
          )
      ));
      
      // 添加语言列表端点
      register_rest_route('polylang/v1', '/languages', array(
          'methods' => 'GET',
          'callback' => array($this, 'get_languages'),
          'permission_callback' => '__return_true'
      ));
      
      // 添加当前语言端点
      register_rest_route('polylang/v1', '/current-language', array(
          'methods' => 'GET',
          'callback' => array($this, 'get_current_language'),
          'permission_callback' => '__return_true'
      ));
      
      // 添加翻译端点
      register_rest_route('polylang/v1', '/translate', array(
          'methods' => 'GET',
          'callback' => array($this, 'get_translation'),
          'permission_callback' => '__return_true',
          'args' => array(
              'post_id' => array(
                  'required' => true,
                  'validate_callback' => function($param) {
                      return is_numeric($param);
                  }
              ),
              'lang' => array(
                  'required' => true,
                  'validate_callback' => function($param) {
                      return is_string($param) && strlen($param) === 2;
                  }
              )
          )
      ));
  }
  
  /**
   * 获取文章语言
   */
  public function get_post_language($post) {
      if (function_exists('pll_get_post_language')) {
          $lang = pll_get_post_language($post['id']);
          return $lang ?: pll_default_language();
      }
      return null;
  }
  
  /**
   * 更新文章语言
   */
  public function update_post_language($value, $post) {
      if (function_exists('pll_set_post_language')) {
          pll_set_post_language($post->ID, $value);
          return true;
      }
      return false;
  }
  
  /**
   * 获取文章翻译关系
   */
  public function get_post_translations($post) {
      if (function_exists('pll_get_post_translations')) {
          $translations = pll_get_post_translations($post['id']);
          return $translations ?: array();
      }
      return array();
  }
  
  /**
   * 获取分类语言
   */
  public function get_term_language($term) {
      if (function_exists('pll_get_term_language')) {
          $lang = pll_get_term_language($term['id']);
          return $lang ?: pll_default_language();
      }
      return null;
  }
  
  /**
   * 获取分类翻译关系
   */
  public function get_term_translations($term) {
      if (function_exists('pll_get_term_translations')) {
          $translations = pll_get_term_translations($term['id']);
          return $translations ?: array();
      }
      return array();
  }
  
  /**
   * 添加语言查询参数
   */
  public function add_language_collection_params($params) {
      $params['lang'] = array(
          'description' => 'Limit result set to posts/terms in a specific language.',
          'type' => 'string',
          'sanitize_callback' => 'sanitize_text_field',
          'validate_callback' => function($param) {
              if (function_exists('pll_languages_list')) {
                  return in_array($param, pll_languages_list());
              }
              return true;
          }
      );
      
      $params['lang_include'] = array(
          'description' => 'Include posts/terms from multiple languages.',
          'type' => 'array',
          'items' => array('type' => 'string'),
          'sanitize_callback' => function($languages) {
              return array_map('sanitize_text_field', $languages);
          }
      );
      
      return $params;
  }
  
  // 最简单直接的筛选方法
  public function filter_posts_by_language($args, $request) {
    $lang = $request->get_param('lang');

    if (!$lang) {
      return $args;
    }

    // 直接查询有该语言标记的文章ID
    global $wpdb;
    $post_ids = $wpdb->get_col($wpdb->prepare(
      "SELECT p.ID FROM {$wpdb->posts} p 
       INNER JOIN {$wpdb->term_relationships} tr ON p.ID = tr.object_id
       INNER JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id  
       INNER JOIN {$wpdb->terms} t ON tt.term_id = t.term_id
       WHERE p.post_status = 'publish' 
       AND p.post_type = 'post'
       AND tt.taxonomy = 'language' 
       AND t.slug = %s",
      $lang
    ));

    if (!empty($post_ids)) {
      $args['post__in'] = $post_ids;
    } else {
      $args['post__in'] = array(0); // 返回空结果
    }

    return $args;
  }
  
  /**
   * 按语言筛选分类（使用直接查询）
   */
  public function filter_categories_by_language($args, $request) {
    $lang = $request->get_param('lang');

    if (!$lang) {
      return $args;
    }

    // 直接查询有该语言标记的分类ID
    global $wpdb;
    $term_ids = $wpdb->get_col($wpdb->prepare(
      "SELECT t.term_id FROM {$wpdb->terms} t
       INNER JOIN {$wpdb->term_taxonomy} tt ON t.term_id = tt.term_id
       INNER JOIN {$wpdb->term_relationships} tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
       INNER JOIN {$wpdb->terms} lang_term ON tr.object_id = lang_term.term_id
       WHERE tt.taxonomy = 'category' 
       AND lang_term.slug = %s
       AND EXISTS (
         SELECT 1 FROM {$wpdb->term_taxonomy} tt2 
         WHERE tt2.term_id = lang_term.term_id 
         AND tt2.taxonomy = 'language'
       )",
      $lang
    ));

    if (!empty($term_ids)) {
      $args['include'] = $term_ids;
    } else {
      $args['include'] = array(0);
    }

    return $args;
  }
  
  /**
   * 获取语言列表
   */
  public function get_languages($request) {
      if (!function_exists('pll_languages_list')) {
          return new WP_Error('polylang_not_available', 'Polylang is not available', array('status' => 500));
      }
      
      $languages = array();
      $lang_list = pll_languages_list(array('fields' => 'slug'));
      
      foreach ($lang_list as $lang_slug) {
          $lang_obj = PLL()->model->get_language($lang_slug);
          if ($lang_obj) {
              $languages[] = array(
                  'slug' => $lang_obj->slug,
                  'name' => $lang_obj->name,
                  'locale' => $lang_obj->locale,
                  'is_rtl' => $lang_obj->is_rtl,
                  'flag_url' => $lang_obj->flag_url,
                  'home_url' => pll_home_url($lang_obj->slug)
              );
          }
      }
      
      return rest_ensure_response($languages);
  }
  
  /**
   * 获取当前语言
   */
  public function get_current_language($request) {
      if (!function_exists('pll_current_language')) {
          return new WP_Error('polylang_not_available', 'Polylang is not available', array('status' => 500));
      }
      
      $current_lang = pll_current_language();
      $default_lang = pll_default_language();
      
      return rest_ensure_response(array(
          'current' => $current_lang ?: $default_lang,
          'default' => $default_lang
      ));
  }
  
  /**
   * 获取翻译
   */
  public function get_translation($request) {
      $post_id = $request->get_param('post_id');
      $target_lang = $request->get_param('lang');
      
      if (!function_exists('pll_get_post_translations')) {
          return new WP_Error('polylang_not_available', 'Polylang is not available', array('status' => 500));
      }
      
      $translations = pll_get_post_translations($post_id);
      
      if (isset($translations[$target_lang])) {
          $translated_post = get_post($translations[$target_lang]);
          if ($translated_post) {
              return rest_ensure_response(array(
                  'id' => $translated_post->ID,
                  'title' => $translated_post->post_title,
                  'slug' => $translated_post->post_name,
                  'url' => get_permalink($translated_post->ID),
                  'language' => $target_lang
              ));
          }
      }
      
      return new WP_Error('translation_not_found', 'Translation not found', array('status' => 404));
  }
}

// 启动扩展（仅在Polylang激活时）
if (function_exists('pll_languages_list')) {
  new PolylangFreeRESTAPI();
}

/**
* 便利函数
*/

// 获取当前语言
function get_current_polylang_language() {
  return function_exists('pll_current_language') ? pll_current_language() : 'ja';
}

// 检查是否为指定语言
function is_polylang_language($lang) {
  return get_current_polylang_language() === $lang;
}

// 获取文章的语言
function get_polylang_post_language($post_id = null) {
  if (!$post_id) {
      global $post;
      $post_id = $post ? $post->ID : null;
  }
  
  if (function_exists('pll_get_post_language')) {
      return pll_get_post_language($post_id);
  }
  
  return null;
}

// 获取翻译URL
function get_polylang_translation_url($post_id, $lang) {
  if (function_exists('pll_get_post_translations')) {
      $translations = pll_get_post_translations($post_id);
      if (isset($translations[$lang])) {
          return get_permalink($translations[$lang]);
      }
  }
  return null;
}