import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { newsService } from '../services/newsService';

export const useNewsDetail = (id: number) => {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const item = await newsService.getNewsDetail(id);
        setNewsItem(item);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const retry = () => {
    if (id) {
      const fetchNewsDetail = async () => {
        try {
          setLoading(true);
          setError(null);
          const item = await newsService.getNewsDetail(id);
          setNewsItem(item);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          console.error('Error fetching news detail:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchNewsDetail();
    }
  };

  return {
    newsItem,
    loading,
    error,
    retry
  };
}; 