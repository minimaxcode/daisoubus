import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Share2, Clock, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { newsService } from '../services/newsService';
import { NewsItem, NewsCategory } from '../types/news';
import { CategoryColorManager } from '../lib/categoryColors';
import SmartContentRenderer from '../components/SmartContentRenderer';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // 🆕 传递当前语言参数
        const [newsDetail, categoriesData] = await Promise.all([
          newsService.getNewsDetail(parseInt(id), language),
          newsService.getCategories(language)
        ]);
        setNews(newsDetail);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, language]); // 🆕 当语言改变时重新获取数据

  // ✅ 重构：使用工具类动态生成分类颜色
  const getCategoryColorById = (categoryId: number) => {
    return CategoryColorManager.getColorById(categoryId);
  };

  // ✅ 重构：通过ID查找分类标签
  const getCategoryLabel = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.label : (language === 'ja' ? '未分類' : 'Uncategorized');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title,
        text: news?.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t('news.share.copied'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
            
            {/* Header skeleton */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-red-500 text-6xl mb-4">📰</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {t('news.notfound.title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('news.notfound.description')}
            </p>
            <Link 
              to="/news" 
              className="inline-flex items-center px-6 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('news.notfound.back')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-daisou-accent transition-colors">
                {t('news.breadcrumb.home')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/news" className="hover:text-daisou-accent transition-colors">
                {t('nav.news')}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">
              {news.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Hero Image */}
          <div className="relative">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-auto max-h-96 object-contain bg-gray-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColorById(news.categoryId)}`}>
                <Tag className="h-4 w-4 inline mr-1" />
                {getCategoryLabel(news.categoryId)}
              </span>
            </div>
          </div>

          {/* Article Info */}
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-daisou-text mb-4 leading-tight">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{t('news.readtime')}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{t('news.author')}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center text-daisou-accent hover:text-pink-400 transition-colors ml-auto"
              >
                <Share2 className="h-5 w-5 mr-1" />
                <span>{t('news.share')}</span>
              </button>
            </div>

            {/* Article Excerpt */}
            <div className="text-lg text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-xl">
              {news.excerpt}
            </div>
          </div>
        </article>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <div className="news-content-wrapper">
              <SmartContentRenderer
                content={news.content || news.excerpt}
                className="prose-headings:text-daisou-text prose-links:text-daisou-accent prose-links:no-underline hover:prose-links:underline prose-strong:text-daisou-text prose-img:rounded-xl prose-img:shadow-lg"
                onAnalysisComplete={(analysis) => {
                  // 内容分析完成，静默处理
                }}
              />
              
              <style dangerouslySetInnerHTML={{
                __html: `
                  .news-content-wrapper .mixed-content-container {
                    box-shadow: none !important;
                    background: transparent !important;
                    border: none !important;
                  }
                  
                  .news-content-wrapper .content-wrapper {
                    border: none !important;
                    box-shadow: none !important;
                  }
                  
                  .news-content-wrapper .content-wrapper::after,
                  .news-content-wrapper .content-wrapper::before {
                    display: none !important;
                  }
                  
                  .news-content-wrapper .prose hr {
                    display: none !important;
                  }
                `
              }} />
            </div>
            
            {/* Integrated Quote CTA */}
            <div className="flex justify-end pt-6 pb-6 pr-6">
              <Link 
                to="/quote" 
                className="inline-flex items-center px-4 py-2 bg-daisou-accent hover:bg-pink-400 text-white font-medium rounded-full transition-colors duration-200 text-sm shadow-lg"
              >
                {t('news.footer.pricing.title')}
                <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Article Footer - Back to News */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-daisou-text mb-4">
              {t('news.footer.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('news.footer.description')}
            </p>
            <Link 
              to="/news" 
              className="inline-flex items-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('news.footer.back')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 