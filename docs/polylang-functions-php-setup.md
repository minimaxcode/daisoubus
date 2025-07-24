# Polylang REST API 配置指南

## 📋 概述

本指南详细说明如何在WordPress中配置 `functions.php` 文件以启用Polylang插件的REST API支持，实现多语言分类的动态关联和前端正确显示。

## 🎯 目标

- 在WordPress REST API中暴露分类的语言信息（`lang`字段）
- 在WordPress REST API中暴露分类的翻译关联信息（`translations`字段）
- 实现前端自动识别和合并相关联的多语言分类
- 消除分类重复显示的问题

## 📁 functions.php 文件位置

### WordPress后台编辑（推荐）

1. **登录WordPress管理后台**
2. **导航到：外观 → 主题编辑器**
3. **在右侧选择当前活跃的主题**
4. **在文件列表中找到并点击 `functions.php`**

### 文件系统路径

```
WordPress安装目录/
├── wp-content/
│   ├── themes/
│   │   ├── 您的主题名称/
│   │   │   ├── functions.php  ← 目标文件
│   │   │   ├── index.php
│   │   │   ├── style.css
│   │   │   └── ...
```

#### 本地开发环境示例

**Local by Flywheel:**
```
Local Sites/您的站点名称/app/public/wp-content/themes/您的主题/functions.php
```

**XAMPP:**
```
C:\xampp\htdocs\您的站点名称\wp-content\themes\您的主题\functions.php
```

## 🔧 配置步骤

### 第一步：备份现有文件

在编辑前，建议备份原始的 `functions.php` 文件：

```bash
# 创建备份副本
cp functions.php functions-backup.php
```

### 第二步：添加Polylang REST API支持代码

在 `functions.php` 文件的**末尾**添加以下PHP代码：

```php
// 完整的REST API多语言支持 - Posts + Categories
function add_complete_language_support_to_rest_api() {
    
    // ===============================
    // POSTS 语言支持
    // ===============================
    
    // 为posts添加language字段
    register_rest_field('post', 'language', array(
        'get_callback' => function($post) {
            // 优先使用Polylang
            if (function_exists('pll_get_post_language')) {
                $lang = pll_get_post_language($post['id']);
                if (!empty($lang)) {
                    return $lang;
                }
            }
            
            // 从自定义字段获取
            $language = get_post_meta($post['id'], 'language', true);
            return !empty($language) ? $language : 'ja';
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, 'language', sanitize_text_field($value));
        },
        'schema' => array(
            'description' => 'Post language code (ja/en)',
            'type' => 'string'
        )
    ));
    
    // 为posts添加translations字段
    register_rest_field('post', 'translations', array(
        'get_callback' => function($post) {
            if (function_exists('pll_get_post_translations')) {
                return pll_get_post_translations($post['id']);
            }
            // 简化版本：返回空数组
            return array();
        },
        'schema' => array(
            'description' => 'Post translations',
            'type' => 'object'
        )
    ));
    
    // ===============================
    // CATEGORIES 语言支持
    // ===============================
    
    // 为categories添加language字段
    register_rest_field('category', 'language', array(
        'get_callback' => function($category) {
            // 优先使用Polylang
            if (function_exists('pll_get_term_language')) {
                $lang = pll_get_term_language($category['id']);
                if (!empty($lang)) {
                    return $lang;
                }
            }
            
            // 从term meta获取
            $language = get_term_meta($category['id'], 'language', true);
            return !empty($language) ? $language : 'ja';
        },
        'update_callback' => function($value, $term) {
            return update_term_meta($term->term_id, 'language', sanitize_text_field($value));
        },
        'schema' => array(
            'description' => 'Category language code (ja/en)',
            'type' => 'string'
        )
    ));
    
    // 为categories添加translations字段
    register_rest_field('category', 'translations', array(
        'get_callback' => function($category) {
            if (function_exists('pll_get_term_translations')) {
                return pll_get_term_translations($category['id']);
            }
            // 简化版本：返回空数组
            return array();
        },
        'schema' => array(
            'description' => 'Category translations',
            'type' => 'object'
        )
    ));
    
    // 添加调试信息
    register_rest_field(['post', 'category'], 'debug_lang_support', array(
        'get_callback' => function($object) {
            return array(
                'polylang_available' => function_exists('pll_get_post_language'),
                'timestamp' => current_time('mysql')
            );
        }
    ));
}
add_action('rest_api_init', 'add_complete_language_support_to_rest_api');

// ===============================
// 语言查询支持
// ===============================

// 为posts添加language查询参数
function add_language_query_support_posts($args, $request) {
    if (isset($request['language'])) {
        $args['meta_query'] = array(
            array(
                'key' => 'language',
                'value' => $request['language'],
                'compare' => '='
            )
        );
    }
    return $args;
}
add_filter('rest_post_query', 'add_language_query_support_posts', 10, 2);

// 为categories添加language查询参数
function add_language_query_support_categories($args, $request) {
    if (isset($request['language'])) {
        $args['meta_query'] = array(
            array(
                'key' => 'language',
                'value' => $request['language'],
                'compare' => '='
            )
        );
    }
    return $args;
}
add_filter('rest_category_query', 'add_language_query_support_categories', 10, 2);

// 启用Polylang的language taxonomy（如果存在）
function enable_language_taxonomy_in_rest() {
    if (function_exists('pll_languages_list')) {
        $language_args = get_taxonomy('language');
        if ($language_args) {
            $language_args->show_in_rest = true;
            register_taxonomy('language', array('post', 'category'), (array) $language_args);
        }
    }
}
add_action('init', 'enable_language_taxonomy_in_rest', 11);

// 调试日志
function debug_complete_lang_support() {
    error_log('Complete Language Support for Posts & Categories loaded successfully!');
}
add_action('rest_api_init', 'debug_complete_lang_support');
```

方案2：使用Code Snippets插件 (最推荐)
这是最安全的方法，避免直接修改主题文件：
安装Code Snippets插件：
后台：「プラグイン」→「新規追加」
搜索 "Code Snippets"
安装并启用
添加代码片段：
侧边栏出现 「Snippets」 菜单
点击 「Add New」
输入代码和描述
启用片段

### 第三步：保存文件

- **WordPress后台编辑**：点击"更新文件"按钮
- **文件系统编辑**：保存文件（Ctrl+S 或 Cmd+S）

## ✅ 验证配置

### 方法1：API测试

在浏览器中访问以下URL来验证配置：

```
http://您的WordPress域名/wp-json/wp/v2/categories?per_page=5&lang=&include_translations=true&_fields=id,name,slug,translations,lang
```

**期望的API响应示例：**

```json
[
  {
    "id": 10,
    "name": "お知らせ",
    "slug": "%e3%81%8a%e7%9f%a5%e3%82%89%e3%81%9b",
    "translations": {
      "en": 20,
      "ja": 10
    },
    "lang": "ja"
  },
  {
    "id": 20,
    "name": "Announcement", 
    "slug": "announcement",
    "translations": {
      "en": 20,
      "ja": 10
    },
    "lang": "en"
  }
]
```

### 方法2：前端测试

1. **启动React开发服务器**
2. **访问新闻页面**
3. **检查分类筛选栏是否正确合并了多语言分类**

## 🛠️ 故障排除

### 问题1：API返回 `translations: null`

**原因：** Polylang插件未激活或版本不支持
**解决方案：**
- 确认Polylang插件已安装并激活
- 检查Polylang版本是否支持REST API功能
- 考虑升级到Polylang Pro

### 问题2：PHP语法错误

**症状：** 网站出现空白页面或错误信息
**解决方案：**
- 检查PHP代码语法，确保没有遗漏分号或括号
- 恢复之前的备份文件
- 通过FTP重新上传正确的文件

### 问题3：分类仍然重复显示

**原因：** 前端代码未正确处理新的API数据
**解决方案：**
- 清理浏览器缓存
- 重启React开发服务器
- 检查前端API基础URL配置

## 📝 代码说明

### 核心功能

1. **`enable_polylang_rest_api()`**: 主要函数，注册REST API字段
2. **`get_polylang_lang()`**: 获取分类的语言代码（如 'ja', 'en'）
3. **`get_polylang_translations()`**: 获取分类的翻译关联信息
4. **`enable_language_taxonomy_rest()`**: 启用语言分类在REST API中的显示

### API字段说明

- **`lang`**: 分类的语言代码
- **`translations`**: 包含所有语言版本的分类ID映射对象

## 🔄 更新前端配置

配置完成后，确保前端React应用中的API基础URL正确：

```typescript
// src/services/newsService.ts
private baseUrl = 'http://localhost:10005/wp-json/wp/v2'; // 替换为您的WordPress URL
```

## 📚 相关文档

- [Polylang官方文档](https://polylang.pro/doc/)
- [WordPress REST API文档](https://developer.wordpress.org/rest-api/)
- [WordPress functions.php指南](https://developer.wordpress.org/themes/basics/theme-functions/)

## 🎉 成功指标

配置成功后，您应该看到：

1. ✅ API返回正确的 `lang` 和 `translations` 字段
2. ✅ 前端分类筛选栏不再有重复分类
3. ✅ 语言切换时分类名称正确显示
4. ✅ 分类筛选功能正常工作

---

**注意事项：**
- 请务必在生产环境部署前进行充分测试
- 建议定期备份WordPress文件和数据库
- 如遇问题，可回滚到备份版本 