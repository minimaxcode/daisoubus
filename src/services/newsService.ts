import { WordPressNews, NewsItem, NewsCategory } from '../types/news';

export class NewsService {
  // 配置WordPress API基础URL
  private baseUrl = import.meta.env.VITE_WP_API_URL || 'http://localhost:10005/wp-json/wp/v2';

  // 获取新闻列表（支持语言筛选）
  async getNews(language: string = 'ja'): Promise<NewsItem[]> {
    try {
      const params = new URLSearchParams({
        per_page: '100',
        orderby: 'date',
        order: 'desc',
        lang: language, // 🆕 使用Polylang语言筛选
        _embed: 'wp:featuredmedia,wp:term',
        _fields: 'id,title,excerpt,date,featured_media,categories,polylang_lang,polylang_translations,_embedded,_links', // 🆕 包含Polylang字段
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
        _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,polylang_lang,polylang_translations,_embedded,_links' // 🆕 包含Polylang字段
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
        lang: language, // 🆕 使用Polylang语言筛选
        _fields: 'id,name,slug,polylang_lang,polylang_translations' // 🆕 使用Polylang字段
      });

      const response = await fetch(`${this.baseUrl}/categories?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const categories = await response.json();
      
      // 🆕 简化分类处理逻辑
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
          _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,polylang_lang,polylang_translations,_embedded,_links'
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

  // 🆕 转换Polylang分类数据
  private transformPolylangCategories(categories: any[], language: string): NewsCategory[] {
    return categories
      .filter(category => category.polylang_lang === language) // 确保只返回当前语言的分类
      .map(category => ({
        key: category.slug,
        label: category.name,
        labelEn: category.name // 由于已经是语言特定的，标签相同
      }))
      .sort((a, b) => {
        // 未分類放最后
        const isUncategorizedA = this.isUncategorizedCategory(a);
        const isUncategorizedB = this.isUncategorizedCategory(b);
        
        if (isUncategorizedA && !isUncategorizedB) return 1;
        if (!isUncategorizedA && isUncategorizedB) return -1;
        
        return a.label.localeCompare(b.label);
      });
  }
  
  // 转换WordPress数据格式（列表页专用 - 不包含content）
  private transformWordPressNewsForList = (wp: WordPressNews): NewsItem => {
    const category = this.getCategorySlugFromPost(wp);
    return {
      id: wp.id,
      title: this.stripHtml(wp.title.rendered),
      titleEn: wp.acf?.title_en || this.stripHtml(wp.title.rendered),
      date: wp.date.split('T')[0],
      category: category,
      categoryEn: wp.acf?.category_en || this.getCategoryFromEmbedded(wp._embedded, 'en'),
      excerpt: this.stripHtml(wp.excerpt.rendered),
      excerptEn: wp.acf?.excerpt_en || this.stripHtml(wp.excerpt.rendered),
      image: this.getImageFromPost(wp, category),
      featured: wp.acf?.featured || false,
      // 🆕 添加语言和翻译信息
      language: wp.polylang_lang || 'ja',
      translations: wp.polylang_translations || {}
    };
  }

  // 转换WordPress数据格式（详情页专用 - 包含完整content）
  private transformWordPressNewsForDetail = (wp: WordPressNews): NewsItem => {
    const category = this.getCategorySlugFromPost(wp);
    return {
      id: wp.id,
      title: this.stripHtml(wp.title.rendered),
      titleEn: wp.acf?.title_en || this.stripHtml(wp.title.rendered),
      date: wp.date.split('T')[0],
      category: category,
      categoryEn: wp.acf?.category_en || this.getCategoryFromEmbedded(wp._embedded, 'en'),
      excerpt: this.stripHtml(wp.excerpt.rendered),
      excerptEn: wp.acf?.excerpt_en || this.stripHtml(wp.excerpt.rendered),
      content: wp.content?.rendered || '',
      contentEn: wp.acf?.content_en || wp.content?.rendered || '',
      image: this.getImageFromPost(wp, category),
      featured: wp.acf?.featured || false,
      // 🆕 添加语言和翻译信息
      language: wp.polylang_lang || 'ja',
      translations: wp.polylang_translations || {}
    };
  }


  
  // 🆕 简化：从嵌入数据中获取分类名
  private getCategoryFromEmbedded(embedded: any, lang: 'ja' | 'en' = 'ja'): string {
    if (!embedded?.['wp:term']?.[0]?.[0]) {
      return lang === 'ja' ? 'お知らせ' : 'Announcement';
    }
    return embedded['wp:term'][0][0].name;
  }
  
  // 🆕 简化：从文章数据中获取分类slug
  private getCategorySlugFromPost(wp: WordPressNews): string {
    // 优先从_embedded中获取分类信息
    if (wp._embedded?.['wp:term']?.[0]?.[0]) {
      let categorySlug = wp._embedded['wp:term'][0][0].slug;
      
      // 解码URL编码的slug
      try {
        categorySlug = decodeURIComponent(categorySlug);
      } catch {
        // 如果解码失败，保持原始值
      }
      
      return categorySlug;
    }
    
    // 默认返回
    return 'announcement';
  }
  
    // 从WordPress数据中获取图片URL（优化版）
  private getImageFromPost(wp: WordPressNews, category?: string): string {
    // 从_embedded中获取特色图片
    if (wp._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return wp._embedded['wp:featuredmedia'][0].source_url;
    }
    
    // 如果没有特色图片，使用分类默认图片
    return this.getDefaultImageByCategory(category);
  }

  // 根据分类获取默认图片
  private getDefaultImageByCategory(category?: string): string {
    const defaultImages = {
      'default': '/images/tokyo-skyline.jpg'
    };

    return defaultImages.default;
  }
  
  // 清理HTML标签
  private stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  


  // 判断是否为"未分類"分类
  private isUncategorizedCategory(category: NewsCategory): boolean {
    const key = category.key.toLowerCase();
    const label = category.label.toLowerCase();
    const labelEn = category.labelEn.toLowerCase();
    
    // 检查key中是否包含uncategorized相关标识
    if (key.includes('uncategorized') || 
        key.includes('%e6%9c%aa%e5%88%86%e7%b1%bb') || // URL编码的"未分類"
        key.includes('uncategori')) {
      return true;
    }
    
    // 检查日文标签是否为"未分類"
    if (label.includes('未分類') || label.includes('未分类')) {
      return true;
    }
    
    // 检查英文标签是否为"uncategorized"
    if (labelEn.includes('uncategorized')) {
      return true;
    }
    
    return false;
  }

}

export const newsService = new NewsService(); 