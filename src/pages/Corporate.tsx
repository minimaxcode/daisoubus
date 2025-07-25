import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, Building, Users, Gem, BarChart2, Globe, RefreshCw, Shield, CircleDollarSign, Target, User, Headphones, FileText, CheckCircle, Send, Search, PenSquare, FileSignature, Truck, Star } from 'lucide-react';

const Corporate: React.FC = () => {
  const { language } = useLanguage();

  const corporateData = {
    ja: {
      title: "法人・旅行会社様向けサービス",
      subtitle: "お客様のビジネスを加速させる、信頼と実績のパートナーシップ。",
      intro: "大爽観光バスでは、旅行会社様や多様なビジネスニーズを持つ法人様に対し、高品質で信頼性の高い貸切バスサービスを提供しております。豊富な実績と柔軟な対応力で、企画から運行まで、お客様のビジネスを全力でサポートいたします。",
      contactButton: "法人様専用お問い合わせ",
      quoteButton: "無料お見積もり",
      services: {
        title: "法人向けサービス一覧",
        items: [
          {
            title: "旅行会社様向けサービス",
            icon: <Building className="h-8 w-8 text-white" />,
            description: "インバウンドツアーや国内パッケージ旅行に最適な、高品質なバス運行をサポートします。",
            features: [
              "ツアーの行程に合わせた柔軟な運行計画",
              "多言語対応可能なガイドの手配サポート",
              "空港送迎、ホテル・施設間のシームレスな移動",
              "ドライバーとガイドの連携による質の高いサービス",
              "緊急時の24時間対応体制"
            ],
          },
          {
            title: "一般企業・団体様向けサービス",
            icon: <Users className="h-8 w-8 text-white" />,
            description: "社員旅行、研修、視察、イベントなど、あらゆるビジネスシーンでの移動をサポートします。",
            features: [
              "社員旅行・インセンティブ旅行の企画、提案",
              "研修施設、工場、視察先への送迎",
              "株主総会、展示会、国際会議などのシャトル運行",
              "福利厚生としての従業員向け定期送迎",
              "ゴルフコンペやスポーツイベントの送迎"
            ],
          },
          {
            title: "VIP送迎サービス",
            icon: <Gem className="h-8 w-8 text-white" />,
            description: "国内外の重要な賓客（VIP）に対し、最高水準の快適性と安全性を提供します。",
            features: [
              "役員、国賓、海外からのゲストなどの個別送迎",
              "空港貴賓室（VIPルーム）への送迎",
              "プライバシーを厳守したルート設定と運行",
              "英語対応可能なプロフェッショナルドライバー",
              "高級車両のご指定も可能"
            ],
          }
        ]
      },
      advantages: {
        title: "大爽観光が選ばれる理由",
        items: [
          { title: "豊富な実績と信頼", description: "2019年の設立以来、インバウンドを中心に多数の法人契約を締結。", icon: <BarChart2 className="h-6 w-6" /> },
          { title: "柔軟なカスタマイズ力", description: "急な行程変更や多様なご要望にも迅速かつ柔軟に対応します。", icon: <RefreshCw className="h-6 w-6" /> },
          { title: "徹底した安全管理", description: "デジタコ、ドラレコを全車に搭載し、安全運行を徹底しています。", icon: <Shield className="h-6 w-6" /> },
          { title: "高いコストパフォーマンス", description: "高品質なサービスを、競争力のある価格でご提供します。", icon: <CircleDollarSign className="h-6 w-6" /> },
          { title: "ワンストップ対応", description: "バス手配だけでなく、旅程全体のプランニングもサポート可能です。", icon: <Target className="h-6 w-6" /> },
          { title: "多言語対応", description: "英語対応可能なスタッフ・ドライバーが在籍し、国際的な案件もスムーズです。", icon: <Globe className="h-6 w-6" /> },
        ]
      },
      pricing: {
        title: "法人様向け料金プラン",
        note: "お客様の利用頻度やご要望に合わせ、最適な料金プランをご提案します。下記は一例ですので、まずはお気軽にご相談ください。",
        types: [
          {
            title: "定期契約プラン",
            description: "従業員送迎など、月単位での継続的なご利用に。",
            benefits: ["通常料金から最大15%割引", "優先的な車両・ドライバー確保", "月次での請求書払い対応", "契約内容の柔軟な見直し"]
          },
          {
            title: "年間契約プラン",
            description: "年間を通じて複数回の利用が見込まれる場合に。",
            benefits: ["最大の割引率を適用（最大25%）", "繁忙期の優先予約権", "専任の担当者によるフルサポート", "緊急時の迅速な代替車両手配"]
          },
          {
            title: "スポット利用プラン",
            description: "イベントや旅行など、単発でのご利用に。",
            benefits: ["初回利用割引あり", "複数台の同時手配が可能", "お見積もりは何度でも無料", "迅速な配車対応"]
          }
        ]
      },
      flow: {
        title: "ご契約・ご利用の流れ",
        steps: [
          { step: "1", title: "お問い合わせ・ヒアリング", description: "専用フォームまたはお電話でご連絡ください。担当者がご要望を詳しく伺います。", icon: <Send /> },
          { step: "2", title: "企画・お見積もり", description: "ヒアリング内容に基づき、最適な運行計画と料金をご提案します。", icon: <PenSquare /> },
          { step: "3", title: "ご契約", description: "提案内容にご満足いただけましたら、運送引受書（契約書）を締結します。", icon: <FileSignature /> },
          { step: "4", title: "運行当日", description: "経験豊富なドライバーが、安全第一で質の高いサービスを提供します。", icon: <Truck /> }
        ]
      }
    },
    en: {
      title: "Corporate & Travel Agency Services",
      subtitle: "A Partnership of Trust and Proven Results to Accelerate Your Business.",
      intro: "DAISOU Travel Bus offers high-quality, reliable charter bus services for travel agencies and corporate clients with diverse business needs. With our extensive experience and flexible capabilities, we fully support your business from planning to operation.",
      contactButton: "Corporate Inquiry",
      quoteButton: "Free Quote",
      services: {
        title: "Our Corporate Services",
        items: [
          {
            title: "For Travel Agencies",
            icon: <Building className="h-8 w-8 text-white" />,
            description: "We support high-quality bus operations ideal for inbound tours and domestic travel packages.",
            features: [
              "Flexible scheduling tailored to your tour itinerary",
              "Support for arranging multilingual guides",
              "Seamless transfers for airports, hotels, and venues",
              "High-quality service through driver-guide collaboration",
              "24/7 emergency response system"
            ],
          },
          {
            title: "For Corporations & Organizations",
            icon: <Users className="h-8 w-8 text-white" />,
            description: "We support transportation for all business scenarios, including company trips, training, site visits, and events.",
            features: [
              "Planning and proposals for company and incentive trips",
              "Transfers to training facilities, factories, and inspection sites",
              "Shuttle services for shareholder meetings, exhibitions, and conferences",
              "Regular employee shuttle services as a welfare benefit",
              "Transport for golf tournaments and sports events"
            ],
          },
          {
            title: "VIP Transfer Service",
            icon: <Gem className="h-8 w-8 text-white" />,
            description: "We provide the highest level of comfort and security for important domestic and international guests (VIPs).",
            features: [
              "Individual transfers for executives, state guests, and overseas visitors",
              "Pick-up and drop-off at airport VIP lounges",
              "Route planning and operation with strict privacy protection",
              "Professional, English-speaking drivers",
              "Option to specify luxury vehicles"
            ],
          }
        ]
      },
      advantages: {
        title: "Why Choose DAISOU Travel",
        items: [
          { title: "Proven Track Record", description: "Since 2019, we have secured numerous corporate contracts, mainly for inbound tourism.", icon: <BarChart2 className="h-6 w-6" /> },
          { title: "Flexible Customization", description: "We respond quickly and flexibly to sudden itinerary changes and diverse requests.", icon: <RefreshCw className="h-6 w-6" /> },
          { title: "Thorough Safety Management", description: "All vehicles are equipped with digital tachographs and drive recorders to ensure safe operation.", icon: <Shield className="h-6 w-6" /> },
          { title: "High Cost-Performance", description: "We offer high-quality services at competitive prices.", icon: <CircleDollarSign className="h-6 w-6" /> },
          { title: "One-Stop Solution", description: "We can support not only bus arrangements but also overall itinerary planning.", icon: <Target className="h-6 w-6" /> },
          { title: "Multilingual Support", description: "With English-speaking staff and drivers, we handle international projects smoothly.", icon: <Globe className="h-6 w-6" /> },
        ]
      },
      pricing: {
        title: "Corporate Pricing Plans",
        note: "We propose the optimal pricing plan to match your usage frequency and requirements. The following are examples, so please feel free to consult with us.",
        types: [
          {
            title: "Regular Contract Plan",
            description: "For continuous monthly use, such as employee shuttles.",
            benefits: ["Up to 15% discount from standard rates", "Priority vehicle and driver allocation", "Monthly invoicing available", "Flexible contract reviews"]
          },
          {
            title: "Annual Contract Plan",
            description: "For clients expecting multiple uses throughout the year.",
            benefits: ["Maximum discount rate applied (up to 25%)", "Priority booking during peak seasons", "Full support from a dedicated manager", "Prompt arrangement of replacement vehicles in emergencies"]
          },
          {
            title: "Spot Usage Plan",
            description: "For one-time use, such as events or trips.",
            benefits: ["First-time user discount available", "Coordination of multiple vehicles possible", "Unlimited free quotes", "Prompt dispatch service"]
          }
        ]
      },
      flow: {
        title: "Contract & Service Flow",
        steps: [
          { step: "1", title: "Inquiry & Consultation", description: "Contact us via the dedicated form or phone. Our representative will discuss your needs in detail.", icon: <Send /> },
          { step: "2", title: "Planning & Quotation", description: "Based on the consultation, we will propose the optimal operation plan and pricing.", icon: <PenSquare /> },
          { step: "3", "title": "Contract Agreement", "description": "If you are satisfied with the proposal, we will conclude a transport agreement (contract).", "icon": <FileSignature /> },
          { step: "4", title: "Day of Service", description: "Our experienced drivers provide high-quality service with safety as the top priority.", icon: <Truck /> }
        ]
      }
    }
  };

  const content = corporateData[language as keyof typeof corporateData];

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
           <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4 bg-daisou-bg p-6 rounded-2xl">
            {content.intro}
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-daisou-bg rounded-3xl p-8 lg:p-12 mb-16">
           <h2 className="text-3xl font-bold text-daisou-text text-center mb-12">
            {content.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.items.map((service, index) => (
               <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-daisou-text mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="mt-6 border-t pt-4">
                    <ul className="space-y-2 text-left">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                             <li key={featureIndex} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages & Flow Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-start">
            {/* Advantages */}
            <div>
                <h2 className="text-3xl font-bold text-daisou-text text-center mb-12">
                    {content.advantages.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {content.advantages.items.map((advantage, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-6 flex items-start space-x-4">
                            <div className="flex-shrink-0 text-daisou-accent">
                                {advantage.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-daisou-text mb-1">{advantage.title}</h3>
                                <p className="text-gray-600 text-sm">{advantage.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Flow */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                 <h2 className="text-3xl font-bold text-daisou-text text-center mb-12">
                    {content.flow.title}
                </h2>
                <div className="space-y-8">
                    {content.flow.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-daisou-accent text-white rounded-full font-bold text-lg flex-shrink-0">
                                {step.step}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-daisou-text">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


        {/* Pricing Section */}
        <div className="bg-daisou-bg rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-daisou-text text-center mb-4">
            {content.pricing.title}
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">{content.pricing.note}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {content.pricing.types.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
                <h3 className="text-xl font-bold text-daisou-text mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{type.description}</p>
                <div>
                  <h4 className="font-semibold text-daisou-text mb-3">
                    {language === 'ja' ? '主な特典' : 'Key Benefits'}
                  </h4>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {language === 'ja' ? 'ビジネスに最適なプランをご提案します' : 'We Propose the Best Plan for Your Business'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ja' 
                ? 'まずはお気軽にご相談ください。専門の担当者が丁寧に対応いたします。' 
                : 'Please feel free to consult with us first. Our dedicated staff will assist you.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact?type=corporate"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {content.contactButton}
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {content.quoteButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;