import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag, AlertCircle, Loader2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNews } from '../hooks/useNews';

const News: React.FC = () => {
  const { t, language } = useLanguage();
  const { 
    news: newsItems, 
    categories, 
    loading, 
    error, 
    lastUpdated, 
    retry 
  } = useNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const featuredNews = newsItems.filter(item => item.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'announcement': 'bg-blue-100 text-blue-800',
      'fleet': 'bg-green-100 text-green-800',
      'campaign': 'bg-red-100 text-red-800',
      'safety': 'bg-yellow-100 text-yellow-800',
      'service': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (categorySlug: string) => {
    const category = categories.find(cat => cat.key === categorySlug);
    return category ? (language === 'ja' ? category.label : category.labelEn) : categorySlug;
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
              {t('nav.news')}
            </h1>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-daisou-accent" />
            <span className="ml-3 text-lg text-gray-600">{t('news.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态 - 无法获取数据时的友好提示
  if (error && newsItems.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
              {t('nav.news')}
            </h1>
          </div>
          
          {/* 错误提示卡片 */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="mb-8">
                <WifiOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {t('news.error.title')}
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  {t('news.error.description')}
                </p>
              </div>
              
              {/* 重试按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={retry}
                  className="inline-flex items-center px-6 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  {t('news.error.retry')}
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors duration-200"
                >
                  {t('news.error.back.home')}
                </button>
              </div>
              
              {/* 联系信息 */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  {t('news.error.persist')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <a 
                    href="/contact" 
                    className="text-daisou-accent hover:text-pink-400 font-medium transition-colors"
                  >
                    {t('news.error.contact')}
                  </a>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <a 
                    href="tel:03-1234-5678" 
                    className="text-daisou-accent hover:text-pink-400 font-medium transition-colors"
                  >
                    {t('news.error.phone')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.news')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('news.page.description')}
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-daisou-text mb-8">{t('news.featured')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <img
                      src={item.image}
                      alt={language === 'ja' ? item.title : item.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(item.date).toLocaleDateString('ja-JP')}
                    </div>
                    <h3 className="text-xl font-bold text-daisou-text mb-3 line-clamp-2">
                      {language === 'ja' ? item.title : item.titleEn}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {language === 'ja' ? item.excerpt : item.excerptEn}
                    </p>
                    <Link 
                      to={`/news/${item.id}`}
                      className="inline-flex items-center text-daisou-accent hover:text-pink-400 font-medium transition-colors duration-200"
                    >
                      {t('news.read.more')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-daisou-accent text-white'
                    : 'bg-white text-daisou-text hover:bg-daisou-accent hover:text-white border border-gray-200'
                }`}
              >
                {language === 'ja' ? category.label : category.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={language === 'ja' ? item.title : item.titleEn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    <Tag className="h-3 w-3 inline mr-1" />
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(item.date).toLocaleDateString('ja-JP')}
                </div>
                <h3 className="text-lg font-bold text-daisou-text mb-3 line-clamp-2">
                  {language === 'ja' ? item.title : item.titleEn}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {language === 'ja' ? item.excerpt : item.excerptEn}
                </p>
                <Link 
                  to={`/news/${item.id}`}
                  className="inline-flex items-center text-daisou-accent hover:text-pink-400 font-medium text-sm transition-colors duration-200"
                >
                  {t('news.read.more')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('news.no.results')}</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-daisou-bg rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold text-daisou-text mb-4">
            {t('news.newsletter.title')}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('news.newsletter.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.newsletter.placeholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-daisou-accent focus:border-transparent"
            />
                          <button className="px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200">
              {t('news.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
