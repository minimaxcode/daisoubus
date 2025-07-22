import React, { useState } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const News: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const newsItems = [
    {
      id: 1,
      title: 'ホームページリニューアルのお知らせ',
      titleEn: 'Website Renewal Announcement',
      date: '2024-06-19',
      category: 'お知らせ',
      categoryEn: 'Announcement',
      excerpt: 'より快適にご利用いただけるよう、サイトを全面リニューアルいたしました。今後も最新情報を発信してまいります。',
      excerptEn: 'Our website has been fully renewed for a better user experience. We will continue to provide the latest information.',
      image: '/images/tokyo-skyline.jpg',
      featured: true
    },
    {
      id: 2,
      title: '新車両導入のお知らせ',
      titleEn: 'New Vehicle Introduction',
      date: '2024-05-15',
      category: '車両情報',
      categoryEn: 'Fleet News',
      excerpt: '業務拡大に伴い、中型バスを1台増車いたしました。皆さまの思い出づくりを全力でサポートいたします。',
      excerptEn: 'A brand-new mid-size coach has joined our fleet to meet growing demand.',
      image: '/images/mid-size-bus.webp',
      featured: true
    },
    {
      id: 3,
      title: 'ゴールデンウィーク期間の営業について',
      titleEn: 'Golden Week Operating Hours',
      date: '2024-04-20',
      category: 'お知らせ',
      categoryEn: 'Announcement',
      excerpt: 'ゴールデンウィーク期間中（4/29-5/5）も通常通り営業いたします。ご予約はお早めにお願いいたします。',
      excerptEn: 'We will operate as usual during Golden Week (April 29 - May 5). Please make reservations early.',
      image: '/images/cherry-blossom.jpg',
      featured: false
    },
    {
      id: 4,
      title: '春の桜ツアー好評開催中',
      titleEn: 'Spring Cherry Blossom Tours',
      date: '2024-03-25',
      category: 'キャンペーン',
      categoryEn: 'Campaign',
      excerpt: '関東各地の桜の名所を巡るツアーを開催中です。満開の桜とともに、特別な思い出をお作りください。',
      excerptEn: 'Spring cherry blossom tours to famous spots around Kanto are now available.',
      image: '/images/cherry-blossom.jpg',
      featured: false
    },
    {
      id: 5,
      title: '安全運転講習会を実施しました',
      titleEn: 'Safety Driving Training Conducted',
      date: '2024-03-10',
      category: '安全対策',
      categoryEn: 'Safety',
      excerpt: '全運転者を対象とした安全運転講習会を実施し、より一層の安全意識向上を図りました。',
      excerptEn: 'We conducted safety driving training for all drivers to further enhance safety awareness.',
      image: '/images/safety-training.jpg',
      featured: false
    },
    {
      id: 6,
      title: 'インバウンド向けサービスを強化',
      titleEn: 'Enhanced Services for International Visitors',
      date: '2024-02-20',
      category: 'サービス',
      categoryEn: 'Service',
      excerpt: '海外からのお客様向けに、多言語対応とVIP送迎サービスを本格開始いたします。',
      excerptEn: 'We are officially launching multilingual support and VIP transfer services for international visitors.',
      image: '/images/narita-airport.jpg',
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'すべて', labelEn: 'All' },
    { key: 'お知らせ', label: 'お知らせ', labelEn: 'Announcements' },
    { key: '車両情報', label: '車両情報', labelEn: 'Fleet News' },
    { key: 'キャンペーン', label: 'キャンペーン', labelEn: 'Campaigns' },
    { key: '安全対策', label: '安全対策', labelEn: 'Safety' },
    { key: 'サービス', label: 'サービス', labelEn: 'Services' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'お知らせ': 'bg-blue-100 text-blue-800',
      '車両情報': 'bg-green-100 text-green-800',
      'キャンペーン': 'bg-red-100 text-red-800',
      '安全対策': 'bg-yellow-100 text-yellow-800',
      'サービス': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.news')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            大爽観光バスの最新情報をお届けします
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-daisou-text mb-8">注目のニュース</h2>
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
                        {language === 'ja' ? item.category : item.categoryEn}
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
                    <button className="inline-flex items-center text-daisou-accent hover:text-pink-400 font-medium transition-colors duration-200">
                      詳しく見る
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
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
                    {language === 'ja' ? item.category : item.categoryEn}
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
                <button className="inline-flex items-center text-daisou-accent hover:text-pink-400 font-medium text-sm transition-colors duration-200">
                  詳しく見る
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するニュースがありません。</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-daisou-bg rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold text-daisou-text mb-4">
            最新情報をお届け
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            大爽観光バスの最新ニュースやお得な情報を、メールマガジンでお届けします。
            ご登録いただいた方には、特別割引クーポンをプレゼント！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-daisou-accent focus:border-transparent"
            />
            <button className="px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200">
              登録する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
