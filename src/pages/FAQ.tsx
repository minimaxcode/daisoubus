import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqCategories = [
    { key: 'all', label: 'すべて' },
    { key: 'booking', label: '予約について' },
    { key: 'pricing', label: '料金について' },
    { key: 'safety', label: '安全について' },
    { key: 'service', label: 'サービスについて' },
    { key: 'vehicle', label: '車両について' },
    { key: 'other', label: 'その他' }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: '予約はいつまでに行えばよいですか？',
      answer: 'ご利用希望日の3日前までにご予約をお願いいたします。ただし、繁忙期（ゴールデンウィーク、お盆、年末年始等）は1週間前までの予約をお勧めします。お急ぎの場合は直接お電話でご相談ください。'
    },
    {
      id: 2,
      category: 'booking',
      question: 'キャンセルはできますか？',
      answer: 'はい、キャンセル可能です。ただし、キャンセル料が発生する場合があります。ご利用日の7日前まで：無料、3-6日前：料金の30%、前日・当日：料金の100%となります。詳細は運送約款をご確認ください。'
    },
    {
      id: 3,
      category: 'pricing',
      question: '料金はどのように決まりますか？',
      answer: '基本料金は車両サイズ、ご利用時間、走行距離によって決まります。平日・土日祝日、季節による料金変動があります。お見積もりは無料ですので、お気軽にお問い合わせください。'
    },
    {
      id: 4,
      category: 'pricing',
      question: '追加料金はかかりますか？',
      answer: '基本料金に含まれない場合の追加料金として、高速道路料金、駐車場料金、宿泊を伴う場合の運転者宿泊費等があります。事前にお見積もりでご確認いただけます。'
    },
    {
      id: 5,
      category: 'safety',
      question: '運転者の安全対策はどうなっていますか？',
      answer: '全運転者に対して定期的な安全講習、適性診断、健康管理を実施しています。また、運行前の体調確認、アルコールチェックを徹底し、安全運転を心がけています。'
    },
    {
      id: 6,
      category: 'safety',
      question: '車両の安全装備はどうなっていますか？',
      answer: '全車両にABS、エアバッグ、ドライブレコーダー、バックカメラを装備しています。また、定期点検・整備を法定基準以上に実施し、安全性を確保しています。'
    },
    {
      id: 7,
      category: 'service',
      question: '英語での対応は可能ですか？',
      answer: 'はい、可能です。日本語・英語のバイリンガル対応で、海外からのお客様にも安心してご利用いただけます。観光案内や通訳サービスも承っております。'
    },
    {
      id: 8,
      category: 'service',
      question: '観光プランの提案はしてもらえますか？',
      answer: 'はい、承っております。お客様のご希望や予算に応じて、最適な観光ルートをご提案いたします。宿泊施設や観光施設のチケット手配も可能です。'
    },
    {
      id: 9,
      category: 'vehicle',
      question: '何人まで乗車できますか？',
      answer: '中型バス：27名、マイクロバス（Coaster）：23名（正座18+補助5）、マイクロバス（Rosa）：24名（正座19+補助5）となっております。詳細は車両紹介ページをご覧ください。'
    },
    {
      id: 10,
      category: 'vehicle',
      question: '荷物はどの程度積めますか？',
      answer: '各車両にトランクスペースがございます。中型バスは大容量トランク2基、マイクロバス（Rosa）は大型トランクを装備しており、スーツケースや大きな荷物も安心です。'
    },
    {
      id: 11,
      category: 'other',
      question: '成田空港以外での送迎も可能ですか？',
      answer: 'はい、可能です。羽田空港、各駅、ホテル等、ご希望の場所での送迎を承っております。関東一円が基本エリアですが、東北・関西方面もご相談に応じます。'
    },
    {
      id: 12,
      category: 'other',
      question: '感染症対策はどうなっていますか？',
      answer: '車両の消毒・清掃、換気の徹底、運転者の健康管理、マスク着用等、新型コロナウイルス感染症対策を実施しています。詳細は安全への取り組みページをご覧ください。'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.faq')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            よくある質問を簡潔にまとめました。お探しの情報が見つからない場合は、お気軽にお問い合わせください。
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="キーワードで検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-daisou-accent text-white'
                    : 'bg-white text-daisou-text hover:bg-daisou-accent hover:text-white border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-daisou-accent focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-daisou-text pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              該当する質問が見つかりません。
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-daisou-accent hover:text-pink-400 font-medium"
            >
              検索条件をリセット
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-daisou-bg rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              お探しの情報が見つかりませんか？
            </h3>
            <p className="text-gray-600">
              お気軽にお問い合わせください。専門スタッフが丁寧にお答えいたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-daisou-accent text-white rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-daisou-text mb-2">
                お電話でのお問い合わせ
              </h4>
              <p className="text-gray-600 mb-4">
                平日 9:00-17:00<br />
                土日祝 応相談
              </p>
              <a
                href="tel:+81-80-6588-4932"
                className="inline-block bg-daisou-accent hover:bg-pink-400 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                080-6588-4932
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-daisou-accent text-white rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-daisou-text mb-2">
                メールでのお問い合わせ
              </h4>
              <p className="text-gray-600 mb-4">
                2営業日以内にご返信<br />
                24時間受付中
              </p>
              <a
                href="/contact"
                className="inline-block border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                お問い合わせフォーム
              </a>
            </div>
          </div>
        </div>

        {/* Popular FAQs */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-daisou-text mb-8 text-center">
            人気の質問
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-semibold text-daisou-text mb-3 text-sm">
                  {item.question}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.answer}
                </p>
                <button
                  onClick={() => toggleItem(item.id)}
                  className="text-daisou-accent hover:text-pink-400 text-sm font-medium mt-3"
                >
                  詳しく見る
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
