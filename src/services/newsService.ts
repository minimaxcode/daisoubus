import { WordPressNews, NewsItem, NewsCategory } from '../types/news';

export class NewsService {
  // 配置WordPress API基础URL
  private baseUrl = import.meta.env.VITE_WP_API_URL || 'https://daisoubus.jp/blog/wp-json/wp/v2';

  // 获取新闻列表（支持语言筛选）
  async getNews(language: string = 'ja'): Promise<NewsItem[]> {
    try {
      const params = new URLSearchParams({
        per_page: '100',
        orderby: 'date',
        order: 'desc',
        lang: language, // 使用Polylang语言筛选
        _embed: 'wp:featuredmedia,wp:term',
        _fields: 'id,title,excerpt,date,featured_media,categories,polylang_lang,polylang_translations,_embedded,_links', // 包含Polylang字段
        // ✅ 添加缓存破坏参数
        _t: Date.now().toString(),
        _r: Math.random().toString(36).substring(2, 15) // 额外的随机数参数
      });

      const response = await fetch(`${this.baseUrl}/posts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const wpNews: WordPressNews[] = await response.json();
      return wpNews.map(this.transformWordPressNewsForList);
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error(`Failed to fetch news: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // 获取完整新闻详情（包含content，支持语言筛选）
  async getNewsDetail(id: number, language: string = 'ja'): Promise<NewsItem> {
    try {
      const params = new URLSearchParams({
        _embed: 'wp:featuredmedia,wp:term',
        _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,polylang_lang,polylang_translations,_embedded,_links', // 包含Polylang字段
        // ✅ 添加缓存破坏参数
        _t: Date.now().toString(),
        _r: Math.random().toString(36).substring(2, 15) // 额外的随机数参数
      });

      const response = await fetch(`${this.baseUrl}/posts/${id}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const wpNews: WordPressNews = await response.json();
      
      // 🆕 检查是否需要获取翻译版本
      const translatedNews = await this.getTranslationIfNeeded(wpNews, language);
      return this.transformWordPressNewsForDetail(translatedNews);
    } catch (error) {
      console.error('Error fetching news detail:', error);
      throw new Error(`Failed to fetch news detail: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } 
  
  // 获取分类列表（支持语言筛选）
  async getCategories(language: string = 'ja'): Promise<NewsCategory[]> {
    try {
      const params = new URLSearchParams({
        per_page: '100',
        hide_empty: 'false',
        lang: language, // 使用Polylang语言筛选
        _fields: 'id,name,slug,polylang_lang,polylang_translations', // 使用Polylang字段
        // ✅ 添加缓存破坏参数，解决服务器端缓存问题
        _t: Date.now().toString(), // 时间戳参数强制刷新缓存
        _r: Math.random().toString(36).substring(2, 15) // 额外的随机数参数
      });

      const response = await fetch(`${this.baseUrl}/categories?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const categories = await response.json();
      
      // 简化分类处理逻辑
      return this.transformPolylangCategories(categories, language);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // 🆕 获取文章翻译版本（如果需要）
  private async getTranslationIfNeeded(wpNews: WordPressNews, targetLanguage: string): Promise<WordPressNews> {
    // 如果文章已经是目标语言，直接返回
    if (wpNews.polylang_lang === targetLanguage) {
      return wpNews;
    }

    // 如果有翻译关系，尝试获取翻译版本
    if (wpNews.polylang_translations && wpNews.polylang_translations[targetLanguage]) {
      try {
        const translationId = wpNews.polylang_translations[targetLanguage];
        const params = new URLSearchParams({
          _embed: 'wp:featuredmedia,wp:term',
          _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,polylang_lang,polylang_translations,_embedded,_links',
          // ✅ 添加缓存破坏参数
          _t: Date.now().toString(),
          _r: Math.random().toString(36).substring(2, 15) // 额外的随机数参数
        });

        const response = await fetch(`${this.baseUrl}/posts/${translationId}?${params.toString()}`);
        
        if (response.ok) {
          const translatedNews = await response.json();
          return translatedNews;
        }
      } catch (error) {
        console.warn(`Failed to fetch translation for post ${wpNews.id}:`, error);
      }
    }

    // 如果没有翻译或获取失败，返回原文章
    return wpNews;
  }

  // ✅ 重构：转换Polylang分类数据，使用正确的数据结构
  private transformPolylangCategories(categories: any[], language: string): NewsCategory[] {
    const filtered = categories.filter(category => category.polylang_lang === language);
    
    const mapped = filtered.map(category => ({
      id: category.id,          // 使用分类ID作为主键
      key: category.slug,       // slug用于URL和过滤
      label: category.name,     // 当前语言的显示名称
      // ✅ 保存翻译关系，用于跨语言状态同步
      translations: category.polylang_translations || {}
    }));
    
    return mapped.sort((a, b) => {
      // ✅ 新排序逻辑：未分類放最后，其他按ID升序排序
      const isUncategorizedA = this.isUncategorizedCategory(a);
      const isUncategorizedB = this.isUncategorizedCategory(b);
      
      // 未分類分类排在最后
      if (isUncategorizedA && !isUncategorizedB) return 1;
      if (!isUncategorizedA && isUncategorizedB) return -1;
      
      // 其他分类按ID升序排序
      return a.id - b.id;
    });
  }
  
  // ✅ 重构：转换WordPress数据格式（列表页专用 - 不包含content）
  private transformWordPressNewsForList = (wp: WordPressNews): NewsItem => {
    const categoryId = this.getCategoryIdFromPost(wp);
    return {
      id: wp.id,
      title: this.stripHtml(wp.title.rendered),
      titleEn: wp.acf?.title_en || this.stripHtml(wp.title.rendered),
      date: wp.date.split('T')[0],
      categoryId: categoryId,  // ✅ 使用分类ID
      excerpt: this.stripHtml(wp.excerpt.rendered),
      excerptEn: wp.acf?.excerpt_en || this.stripHtml(wp.excerpt.rendered),
      image: this.getImageFromPost(wp),
      featured: wp.acf?.featured || false,
      // 添加语言和翻译信息
      language: wp.polylang_lang || 'ja',
      translations: wp.polylang_translations || {}
    };
  }

  // ✅ 重构：转换WordPress数据格式（详情页专用 - 包含完整content）
  private transformWordPressNewsForDetail = (wp: WordPressNews): NewsItem => {
    const categoryId = this.getCategoryIdFromPost(wp);
    return {
      id: wp.id,
      title: this.stripHtml(wp.title.rendered),
      titleEn: wp.acf?.title_en || this.stripHtml(wp.title.rendered),
      date: wp.date.split('T')[0],
      categoryId: categoryId,  // ✅ 使用分类ID
      excerpt: this.stripHtml(wp.excerpt.rendered),
      excerptEn: wp.acf?.excerpt_en || this.stripHtml(wp.excerpt.rendered),
      content: this.processContentHtml(wp.content?.rendered || ''),
      contentEn: this.processContentHtml(wp.acf?.content_en || wp.content?.rendered || ''),
      image: this.getImageFromPost(wp),
      featured: wp.acf?.featured || false,
      // 添加语言和翻译信息
      language: wp.polylang_lang || 'ja',
      translations: wp.polylang_translations || {}
    };
  }

  
  // ✅ 重构：从文章数据中获取分类ID
  private getCategoryIdFromPost(wp: WordPressNews): number {
    // 优先从_embedded中获取分类信息
    if (wp._embedded?.['wp:term']?.[0]?.[0]) {
      return wp._embedded['wp:term'][0][0].id;
    }
    
    // 从categories数组中获取第一个分类ID
    if (wp.categories && wp.categories.length > 0) {
      return wp.categories[0];
    }
    
    // 默认返回1（通常是uncategorized的ID）
    return 1;
  }
  
  // ✅ 重构：从WordPress数据中获取图片URL（简化版）
  private getImageFromPost(wp: WordPressNews): string {
    // 从_embedded中获取特色图片
    if (wp._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return wp._embedded['wp:featuredmedia'][0].source_url;
    }
    
    // 如果没有特色图片，使用默认图片
    return '/images/tokyo-skyline.jpg';
  }
  
  // 清理HTML标签
  private stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  // ✅ 处理内容HTML，确保换行符正确显示
  private processContentHtml(html: string): string {
    if (!html) return '';
    
    // 1. 规范化换行符：将各种换行形式统一处理
    let processed = html
      // 将连续的\n转换为<br>
      .replace(/\n+/g, '<br>')
      // 将连续的空格保持（但限制最多3个）
      .replace(/\s{2,}/g, (match) => match.length > 3 ? '&nbsp;&nbsp;&nbsp;' : match.replace(/ /g, '&nbsp;'))
      // 确保段落标签后有换行
      .replace(/<\/p>\s*<p>/g, '</p><br><p>')
      // 确保div标签后有换行
      .replace(/<\/div>\s*<div>/g, '</div><br><div>')
      // 移除可能有害的标签但保留格式标签
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // 2. 如果内容没有任何HTML标签，将纯文本的换行转换为<br>
    if (!/<[^>]+>/.test(processed)) {
      processed = processed.replace(/\n/g, '<br>');
    }
    
    return processed.trim();
  }
  


  // ✅ 重构：判断是否为"未分類"分类（移除硬编码依赖）
  private isUncategorizedCategory(category: NewsCategory): boolean {
    const key = category.key.toLowerCase();
    const label = category.label.toLowerCase();
    
    // 检查key中是否包含uncategorized相关标识
    if (key.includes('uncategorized') || 
        key.includes('%e6%9c%aa%e5%88%86%e7%b1%bb') || // URL编码的"未分類"
        key.includes('uncategori')) {
      return true;
    }
    
    // 检查标签是否为"未分類"相关
    if (label.includes('未分類') || 
        label.includes('未分类') || 
        label.includes('uncategorized')) {
      return true;
    }
    
    return false;
  }

}

export const newsService = new NewsService(); 