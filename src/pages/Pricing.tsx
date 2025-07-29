import React from 'react';
import { Users, Luggage, Shield, Star, Tag, Clock, PlusCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const { language } = useLanguage();

  const pricingData = {
    ja: {
      title: "料金案内",
      subtitle: "お客様のご予算やニーズに合わせた、透明で競争力のある価格設定をご提供します。",
      note: "※以下は参考料金です。最終的な料金は、時期、ご利用時間、走行距離などにより変動します。詳細はお見積もりにてご確認ください。",
      estimateButton: "無料見積もり",
      routes: {
        title: "主要モデルコース料金",
        icon: <Star className="h-5 w-5 text-daisou-accent mr-2" />,
        data: [
          { route: "成田空港 ⇔ 東京都心", price: "¥25,000〜", duration: "約1時間", capacity: "27名まで" },
          { route: "成田空港 ⇔ 横浜", price: "¥30,000〜", duration: "約1.5時間", capacity: "27名まで" },
          { route: "東京都内観光（8時間）", price: "¥35,000〜", duration: "8時間", capacity: "27名まで" },
          { route: "箱根・富士山周遊", price: "¥55,000〜", duration: "日帰り", capacity: "27名まで" },
          { route: "日光・鬼怒川観光", price: "¥50,000〜", duration: "日帰り", capacity: "27名まで" },
        ]
      },
      hourly: {
        title: "時間制料金",
        icon: <Clock className="h-5 w-5 text-daisou-accent mr-2" />,
        data: [
          { type: "中型バス（27席）", price: "¥4,500/時間", minimum: "最低3時間〜" },
          { type: "マイクロバス（23席）", price: "¥3,800/時間", minimum: "最低3時間〜" }
        ]
      },
      additional: {
        title: "追加料金",
        icon: <PlusCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          { item: "深夜・早朝（22:00-6:00）", price: "25%割増" },
          { item: "高速道路・駐車場料金", price: "実費" },
          { item: "乗務員宿泊費", price: "実費" },
          { item: "回送料金（片道利用時）", price: "別途お見積り" }
        ]
      },
      discounts: {
        title: "割引サービス",
        icon: <Tag className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "平日利用割引：5% OFF",
          "学校団体割引：10% OFF",
          "リピーター割引：3% OFF",
          "長期契約割引：応相談"
        ]
      },
      included: {
        title: "料金に含まれるもの",
        icon: <CheckCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "運転手",
          "車両",
          "保険",
          "燃料",
          "消費税"
        ]
      },
      notes: {
        title: "注意事項",
        icon: <AlertTriangle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "料金はすべて税込み表示です。",
          "繁忙期（GW、お盆、年末年始など）は料金が変動する場合があります。",
          "キャンセルポリシーについては、運送約款をご確認ください。",
          "詳細な料金は、お見積もり依頼にてご確認ください。"
        ]
      }
    },
    en: {
      title: "Pricing Guide",
      subtitle: "We offer transparent and competitive pricing tailored to your budget and needs.",
      note: "※The following are reference prices. Final prices vary depending on the season, hours of use, and mileage. Please request a quote for details.",
      estimateButton: "Free Quote",
      routes: {
        title: "Main Model Course Prices",
        icon: <Star className="h-5 w-5 text-daisou-accent mr-2" />,
        data: [
          { route: "Narita Airport ⇔ Tokyo City Center", price: "From ¥25,000", duration: "Approx. 1 hour", capacity: "Up to 27 passengers" },
          { route: "Narita Airport ⇔ Yokohama", price: "From ¥30,000", duration: "Approx. 1.5 hours", capacity: "Up to 27 passengers" },
          { route: "Tokyo City Tour (8 hours)", price: "From ¥35,000", duration: "8 hours", capacity: "Up to 27 passengers" },
          { route: "Hakone & Mt. Fuji Tour", price: "From ¥55,000", duration: "Day trip", capacity: "Up to 27 passengers" },
          { route: "Nikko & Kinugawa Tour", price: "From ¥50,000", duration: "Day trip", capacity: "Up to 27 passengers" },
        ]
      },
      hourly: {
        title: "Hourly Rates",
        icon: <Clock className="h-5 w-5 text-daisou-accent mr-2" />,
        data: [
          { type: "Mid-size Bus (27 seats)", price: "¥4,500/hour", minimum: "Minimum 3 hours" },
          { type: "Microbus (23 seats)", price: "¥3,800/hour", minimum: "Minimum 3 hours" }
        ]
      },
      additional: {
        title: "Additional Charges",
        icon: <PlusCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          { item: "Late night/early morning (22:00-6:00)", price: "25% surcharge" },
          { item: "Highway tolls & parking fees", price: "Actual cost" },
          { item: "Driver's accommodation", price: "Actual cost" },
          { item: "Deadhead charge (for one-way trips)", price: "Separate quote" }
        ]
      },
      discounts: {
        title: "Discounts",
        icon: <Tag className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "Weekday Discount: 5% OFF",
          "School Group Discount: 10% OFF",
          "Repeater Discount: 3% OFF",
          "Long-term Contract Discount: Negotiable"
        ]
      },
      included: {
        title: "What's Included",
        icon: <CheckCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "Driver",
          "Vehicle",
          "Insurance",
          "Fuel",
          "Consumption Tax"
        ]
      },
      notes: {
        title: "Important Notes",
        icon: <AlertTriangle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          "All prices include tax.",
          "Prices may vary during peak seasons (Golden Week, Obon, New Year holidays).",
          "For our cancellation policy, please refer to the conditions of carriage.",
          "Please request a quote for detailed pricing."
        ]
      }
    }
  };

  const content = pricingData[language as keyof typeof pricingData];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="space-y-16">

          {/* Model Course Section */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-8 text-center">
              {content.routes.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.routes.data.map((route, index) => (
                <div key={index} className="bg-daisou-bg p-4 rounded-lg">
                   <h3 className="font-bold text-lg text-daisou-text mb-3">{route.route}</h3>
                   <div className="space-y-2">
                     <p className="text-2xl font-bold text-daisou-accent">{route.price}</p>
                     <p className="text-gray-600 text-sm">{route.duration} / {route.capacity}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly & Other Fees Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Hourly Rates */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                {content.hourly.icon}
                {content.hourly.title}
              </h3>
              <div className="space-y-4">
                {content.hourly.data.map((item, index) => (
                   <div key={index} className="bg-daisou-bg p-3 rounded-lg">
                     <div className="text-sm text-gray-600 mb-1">{item.type}</div>
                     <div className="font-semibold text-daisou-text">{item.price} <span className="text-sm font-normal">({item.minimum})</span></div>
                   </div>
                ))}
              </div>
            </div>

            {/* Additional Charges */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                {content.additional.icon}
                {content.additional.title}
              </h3>
              <ul className="space-y-3">
                {content.additional.items.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                     <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0" />
                     <span className="text-gray-700 flex-1">{item.item}: <span className="font-semibold">{item.price}</span></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discounts */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                    {content.discounts.icon}
                    {content.discounts.title}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.discounts.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Included in Price */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                    {content.included.icon}
                    {content.included.title}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.included.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
          
          {/* Important Notes */}
          <div className="mt-8 bg-daisou-bg rounded-3xl p-8 lg:p-12">
            <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                {content.notes.icon}
                {content.notes.title}
            </h3>
            <ul className="space-y-2">
              {content.notes.items.map((note, index) => (
                <li key={index} className="text-gray-700">
                  • {note}
                </li>
              ))}
            </ul>
             <p className="text-gray-600 mt-6 text-sm">
                {content.note}
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {language === 'ja' ? '車両のご予約・お問い合わせ' : 'Reserve or Inquire About a Vehicle'}
            </h3>
            <p className="text-gray-600 mb-6">
             {language === 'ja' 
                ? 'ご利用人数や目的に応じて最適な車両をご提案いたします。お気軽にお問い合わせください。' 
                : 'We will propose the optimal vehicle for your group size and purpose. Please feel free to contact us.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {content.estimateButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;