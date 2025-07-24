import { useState, useEffect } from 'react';
import { NewsItem, NewsCategory, NewsResponse } from '../types/news';
import { newsService } from '../services/newsService';
import { useLanguage } from '../contexts/LanguageContext'; // 🆕 导入语言上下文

export const useNews = (): NewsResponse & { 
  lastUpdated: Date | null;
  retry: () => void;
} => {
  const { language } = useLanguage(); // 🆕 获取当前语言
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 🆕 并行获取新闻和分类数据，传递当前语言
      const [newsData, categoryData] = await Promise.all([
        newsService.getNews(language),
        newsService.getCategories(language)
      ]);
      
      setNews(newsData);
      setCategories([
        { id: 0, key: 'all', label: language === 'ja' ? 'すべて' : 'All' },
        ...categoryData
      ]);
      setLastUpdated(new Date());
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching news data:', err);
      
      // API失败时不加载备用数据，保持空状态
      setNews([]);
      setCategories([
        { id: 0, key: 'all', label: language === 'ja' ? 'すべて' : 'All' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, [language]); // 🆕 当语言改变时重新获取数据

  const retry = () => {
    fetchNewsData();
  };

  return {
    news,
    categories,
    loading,
    error,
    lastUpdated,
    retry
  };
};

// 获取单篇新闻的Hook（支持语言参数）
export const useNewsById = (id: number) => {
  const { language } = useLanguage(); // 🆕 获取当前语言
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        // 🆕 传递当前语言参数
        const newsData = await newsService.getNewsDetail(id, language);
        setNews(newsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id, language]); // 🆕 当语言改变时重新获取数据

  return { news, loading, error };
}; 