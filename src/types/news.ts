// WordPress新闻数据类型
export interface WordPressNews {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  categories: number[];
  featured_media: number; // 特色图片媒体ID
  // 🆕 Polylang 字段
  polylang_lang?: string; // 文章语言
  polylang_translations?: Record<string, number>; // 翻译关系 {语言代码: 文章ID}
  acf: {
    title_en: string;
    excerpt_en: string;
    content_en: string;
    category_en: string;
    featured: boolean;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

// 应用内使用的新闻类型
export interface NewsItem {
  id: number;
  title: string;
  titleEn: string;
  date: string;
  // ✅ 重构：使用分类ID而不是slug，实现数据归一化
  categoryId: number;
  excerpt: string;
  excerptEn: string;
  content?: string; // 可选 - 列表页不包含，详情页包含
  contentEn?: string; // 可选 - 列表页不包含，详情页包含
  image: string;
  featured: boolean;
  // 🆕 Polylang 字段
  language?: string; // 文章语言
  translations?: Record<string, number>; // 翻译关系 {语言代码: 文章ID}
}

// 分类类型
export interface NewsCategory {
  id: number;           // 分类ID，作为主键
  key: string;          // slug，用于URL和过滤
  label: string;        // 当前语言的显示名称
  // ✅ 新增：翻译关系映射，用于跨语言状态同步
  translations?: Record<string, number>; // {ja: 1, en: 8}
}

// API响应类型
export interface NewsResponse {
  news: NewsItem[];
  categories: NewsCategory[];
  loading: boolean;
  error: string | null;
} 