import { WordPressNews, NewsItem, NewsCategory } from '../types/news';

export class NewsService {
  // 配置WordPress API基础URL
  private baseUrl = import.meta.env.VITE_WP_API_URL || 'http://localhost:10005/wp-json/wp/v2';
  
  // 缓存分类映射关系
  private categoryMapping: Map<number, string> | null = null;

  // 获取新闻列表
  async getNews(): Promise<NewsItem[]> {
    try {
      const params = new URLSearchParams({
        per_page: '100',
        orderby: 'date',
        order: 'desc',
        _embed: 'wp:featuredmedia,wp:term',  // 嵌入特色图片和分类数据
        _fields: 'id,title,excerpt,date,featured_media,categories,_embedded,_links',  // 必须包含_embedded和_links以支持_embed
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

  // 获取完整新闻详情（包含content）
  async getNewsDetail(id: number): Promise<NewsItem> {
    try {
      const params = new URLSearchParams({
        _embed: 'wp:featuredmedia,wp:term',
        _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,_embedded,_links'
      });

      const response = await fetch(`${this.baseUrl}/posts/${id}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const wpNews: WordPressNews = await response.json();
      return this.transformWordPressNewsForDetail(wpNews);
    } catch (error) {
      console.error('Error fetching news detail:', error);
      throw new Error(`Failed to fetch news detail: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // 获取单篇新闻
  async getNewsById(id: number): Promise<NewsItem | null> {
    try {
      const params = new URLSearchParams({
        _embed: 'wp:featuredmedia,wp:term',
        _fields: 'id,title,excerpt,content,date,categories,featured_media,acf,_embedded,_links'
      });

      const response = await fetch(`${this.baseUrl}/posts/${id}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const wpNews: WordPressNews = await response.json();
      return this.transformWordPressNewsForDetail(wpNews);
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw new Error(`Failed to fetch news by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  // 获取分类列表
  async getCategories(): Promise<NewsCategory[]> {
    try {
      const params = new URLSearchParams({
        per_page: '100',
        hide_empty: 'false',
        lang: '', // Polylang: 获取所有语言的分类
        include_translations: 'true',
        _fields: 'id,name,slug,translations,lang'
      });

      const response = await fetch(`${this.baseUrl}/categories?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
      }
      
      const categories = await response.json();
      
      // 构建分类映射
      this.categoryMapping = this.buildCategoryMapping(categories);
      
      return this.transformCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
      featured: wp.acf?.featured || false
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
      featured: wp.acf?.featured || false
    };
  }


  
  // 从嵌入数据中获取分类名
  private getCategoryFromEmbedded(embedded: any, lang: 'ja' | 'en' = 'ja'): string {
    if (!embedded?.['wp:term']?.[0]?.[0]) {
      return lang === 'ja' ? 'お知らせ' : 'Announcement';
    }
    return embedded['wp:term'][0][0].name;
  }
  
  // 从文章数据中获取分类slug（优化版）
  private getCategorySlugFromPost(wp: WordPressNews): string {
    // 方法1: 优先从_embedded中获取分类信息
    if (wp._embedded?.['wp:term']?.[0]?.[0]) {
      const categoryId = wp._embedded['wp:term'][0][0].id;
      let categorySlug = wp._embedded['wp:term'][0][0].slug;
      
      // 解码URL编码的slug
      try {
        categorySlug = decodeURIComponent(categorySlug);
      } catch {
        // 如果解码失败，保持原始值
      }
      
      // 从缓存的分类映射中查找统一的key
      if (this.categoryMapping) {
        return this.categoryMapping.get(categoryId) || categorySlug;
      }
      
      return categorySlug;
    }
    
    // 方法2: 如果没有_embedded信息，从categories数组获取
    if (wp.categories && wp.categories.length > 0) {
      const categoryId = wp.categories[0]; // 使用第一个分类
      
      // 从缓存的分类映射中查找统一的key
      if (this.categoryMapping) {
        const mappedSlug = this.categoryMapping.get(categoryId);
        if (mappedSlug) {
          return mappedSlug;
        }
      }
    }
    
    // 方法3: 默认返回
    return 'announcement';
  }

  // 兼容性方法（保持向后兼容）
  private getCategorySlugFromEmbedded(embedded: any): string {
    if (!embedded?.['wp:term']?.[0]?.[0]) {
      return 'announcement';
    }
    
    const categoryId = embedded['wp:term'][0][0].id;
    const categorySlug = embedded['wp:term'][0][0].slug;
    
    // 从缓存的分类映射中查找统一的key
    if (this.categoryMapping) {
      return this.categoryMapping.get(categoryId) || categorySlug;
    }
    
    return categorySlug;
  }

  // 构建分类ID到统一key的映射
  private buildCategoryMapping(categories: any[]): Map<number, string> {
    const mapping = new Map<number, string>();
    const processedIds = new Set<number>();
    
    categories.forEach(category => {
      // 如果已经处理过这个分类，跳过
      if (processedIds.has(category.id)) {
        return;
      }
      
      // 直接从translations对象获取翻译信息
      if (category.translations && typeof category.translations === 'object') {
        const translations = category.translations;
        const friendlyKey = this.generateKeyFromTranslations(translations, categories);
        
        // 为所有翻译版本设置相同的key
        Object.values(translations).forEach(id => {
          if (typeof id === 'number') {
            mapping.set(id, friendlyKey);
            processedIds.add(id);
          }
        });
      } else {
        // 没有翻译信息的分类，使用自己的slug作为key
        mapping.set(category.id, category.slug);
        processedIds.add(category.id);
      }
    });
    
    return mapping;
  }
  
  // 从translations对象生成友好的key
  private generateKeyFromTranslations(translations: any, allCategories: any[]): string {
    // 优先查找英文版本的slug
    if (translations.en) {
      const enCategory = allCategories.find(cat => cat.id === translations.en);
      if (enCategory) {
        return enCategory.slug;
      }
    }
    
    // 其次查找日文版本的slug
    if (translations.ja) {
      const jaCategory = allCategories.find(cat => cat.id === translations.ja);
      if (jaCategory) {
        return jaCategory.slug;
      }
    }
    
    // 如果都找不到，使用第一个可用的翻译版本
    const firstTranslationId = Object.values(translations)[0];
    if (typeof firstTranslationId === 'number') {
      const firstCategory = allCategories.find(cat => cat.id === firstTranslationId);
      if (firstCategory) {
        return firstCategory.slug;
      }
    }
    
    return 'unknown';
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
  
  // 转换分类数据
  private transformCategories(categories: any[]): NewsCategory[] {
    const processedCategories: NewsCategory[] = [];
    const processedIds = new Set<number>();
    
    categories.forEach(category => {
      // 避免重复处理相同的分类
      if (processedIds.has(category.id)) {
        return;
      }
      
      if (category.translations && typeof category.translations === 'object') {
        // 有翻译关联的分类 - 处理完整的翻译组
        const translations = category.translations;
        const friendlyKey = this.generateKeyFromTranslations(translations, categories);
        
        // 直接从translations对象获取日文和英文版本
        let jaName = '';
        let enName = '';
        
        if (translations.ja) {
          const jaCategory = categories.find(cat => cat.id === translations.ja);
          jaName = jaCategory?.name || '';
        }
        
        if (translations.en) {
          const enCategory = categories.find(cat => cat.id === translations.en);
          enName = enCategory?.name || '';
        }
        
        const unifiedCategory: NewsCategory = {
          key: friendlyKey,
          label: jaName || enName || category.name || 'Unknown',
          labelEn: enName || jaName || category.name || 'Unknown'
        };
        
        processedCategories.push(unifiedCategory);
        
        // 标记所有翻译版本为已处理
        Object.values(translations).forEach(id => {
          if (typeof id === 'number') {
            processedIds.add(id);
          }
        });
      } else {
        // 没有翻译关联的独立分类
        const unifiedCategory: NewsCategory = {
          key: category.slug,
          label: category.name || 'Unknown',
          labelEn: category.name || 'Unknown'
        };
        
        processedCategories.push(unifiedCategory);
        processedIds.add(category.id);
      }
    });
    
    // 排序：未分類放最后
    return processedCategories.sort((a, b) => {
      // 检查是否为"未分類"分类（多种可能的识别方式）
      const isUncategorizedA = this.isUncategorizedCategory(a);
      const isUncategorizedB = this.isUncategorizedCategory(b);
      
      if (isUncategorizedA && !isUncategorizedB) return 1;
      if (!isUncategorizedA && isUncategorizedB) return -1;
      
      // 如果都不是未分類，按名称排序
      return a.label.localeCompare(b.label);
    });
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