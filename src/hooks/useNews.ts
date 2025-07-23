import { useState, useEffect } from 'react';
import { NewsItem, NewsCategory, NewsResponse } from '../types/news';
import { newsService } from '../services/newsService';

export const useNews = (): NewsResponse & { 
  lastUpdated: Date | null;
  retry: () => void;
} => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 并行获取新闻和分类数据
      const [newsData, categoryData] = await Promise.all([
        newsService.getNews(),
        newsService.getCategories()
      ]);
      
      setNews(newsData);
      setCategories([
        { key: 'all', label: 'すべて', labelEn: 'All' },
        ...categoryData
      ]);
      setLastUpdated(new Date());
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching news data:', err);
      
      // API失败时不加载备用数据，保持空状态
      setNews([]);
      setCategories([
        { key: 'all', label: 'すべて', labelEn: 'All' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

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

// 获取单篇新闻的Hook
export const useNewsById = (id: number) => {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsData = await newsService.getNewsById(id);
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
  }, [id]);

  return { news, loading, error };
}; 