import React from 'react';
import { Calendar, MapPin, Users, Award, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Company: React.FC = () => {
  const { t } = useLanguage();

  const companyHistory = [
    {
      year: '2019年4月',
      event: '大爽合同会社設立',
      description: '一般貸切旅客自動車運送事業を開始'
    },
    {
      year: '2020年',
      event: 'サービス拡充',
      description: '観光案内・プラン作成サービスを追加'
    },
    {
      year: '2021年',
      event: '車両増車',
      description: 'マイクロバス2台目導入'
    },
    {
      year: '2022年',
      event: '中型バス導入',
      description: '27座席中型バスでサービス範囲拡大'
    },
    {
      year: '2023年',
      event: 'インバウンド強化',
      description: '多言語対応とVIP送迎サービス開始'
    }
  ];

  const licenses = [
    {
      type: '一般貸切旅客自動車運送事業',
      number: '関東自一第 952 号',
      authority: '関東運輸局'
    },
    {
      type: 'レンタカー事業',
      number: '千葉運輸第 58 号',
      authority: '千葉運輸支局'
    },
    {
      type: '旅行業',
      number: '千葉第 69 号',
      authority: '千葉県'
    }
  ];

  // API Key provided by the user
  const apiKey = 'AIzaSyBjMv12htuJd3rK6rjQL1mMVgUpT-DVfMg';
  const companyAddress = '千葉県我孫子市都12-31';
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(companyAddress)}`;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.company')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('company.slogan3')}
          </p>
        </div>

        {/* CEO Message */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-daisou-text mb-6">
                  代表からのメッセージ
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    大爽合同会社は2019年の設立以来、「{t('company.slogan2')}」をモットーに、
                    お客様に寄り添ったサービスを提供してまいりました。
                  </p>
                  <p>
                    私たちは単なる移動手段の提供ではなく、お客様の大切な時間と思い出作りを
                    全力でサポートいたします。安全・安心を第一に、心のこもったおもてなしで
                    皆様をお迎えいたします。
                  </p>
                  <p>
                    今後も地域の皆様、そして日本を訪れる海外からのお客様に愛される会社として、
                    成長を続けてまいります。
                  </p>
                </div>
                <div className="mt-8">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-daisou-text">代表 澤村千凡</p>
                    <p className="text-gray-600">Chiho Sawamura</p>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto">
                <img
                  src="/images/team-photo.jpg"
                  alt="代表 澤村千凡"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-6 flex items-center">
              <Building className="h-6 w-6 text-daisou-accent mr-2" />
              会社概要
            </h3>
            <div className="space-y-4">
              {[
                { label: '会社名', value: '大爽合同会社（DAISOU LLC）' },
                { label: '代表者', value: '澤村千凡（Chiho Sawamura）' },
                { label: '設立', value: '2019年4月' },
                { label: '所在地', value: '〒270-1102 千葉県我孫子市都12-31' },
                { label: '電話番号', value: '+81-471-61-2355' },
                { label: 'メール', value: 'c.sawamura55@gmail.com' },
                { label: 'ウェブサイト', value: 'https://daisoubus.com' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row">
                  <div className="w-24 font-semibold text-daisou-text mb-1 sm:mb-0">
                    {item.label}
                  </div>
                  <div className="flex-1 text-gray-700">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-6 flex items-center">
              <Users className="h-6 w-6 text-daisou-accent mr-2" />
              事業内容
            </h3>
            <div className="space-y-4">
              {[
                {
                  service: '貸切バス事業',
                  description: '観光・送迎・冠婚葬祭等の貸切バスサービス'
                },
                {
                  service: '観光案内事業',
                  description: '旅行プラン作成・観光地案内・通訳サービス'
                },
                {
                  service: 'レンタカー事業',
                  description: '各種車両のレンタルサービス'
                },
                {
                  service: 'ジム運営事業',
                  description: 'フィットネスジム運営・健康促進サービス'
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-daisou-accent pl-4">
                  <h4 className="font-semibold text-daisou-text">{item.service}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Licenses */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-6 flex items-center">
              <Award className="h-6 w-6 text-daisou-accent mr-2" />
              許可・認可
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {licenses.map((license, index) => (
                <div key={index} className="bg-daisou-bg p-6 rounded-xl">
                  <h4 className="font-semibold text-daisou-text mb-2">
                    {license.type}
                  </h4>
                  <p className="text-lg font-bold text-daisou-accent mb-1">
                    {license.number}
                  </p>
                  <p className="text-sm text-gray-600">
                    {license.authority}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company History */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-8 flex items-center">
              <Calendar className="h-6 w-6 text-daisou-accent mr-2" />
              沿革
            </h3>
            <div className="space-y-6">
              {companyHistory.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="inline-block bg-daisou-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-daisou-text mb-1">
                      {item.event}
                    </h4>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banking */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-6">
              取引銀行
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-daisou-bg rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">み</span>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text">みずほ銀行</h4>
                  <p className="text-gray-600 text-sm">MIZUHO Bank</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-daisou-bg rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">千</span>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text">千葉銀行</h4>
                  <p className="text-gray-600 text-sm">CHIBA Bank</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-daisou-text mb-6 flex items-center">
            <MapPin className="h-6 w-6 text-daisou-accent mr-2" />
            アクセス
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">住所</h4>
                  <p className="text-gray-700">
                    〒270-1102<br />
                    千葉県我孫子市都12-31
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">最寄り駅</h4>
                  <p className="text-gray-700">
                    JR常磐線・成田線「我孫子駅」より車で約10分
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">アクセス</h4>
                  <p className="text-gray-700">
                    成田空港より車で約30分<br />
                    東京都心より車で約1時間
                  </p>
                </div>
              </div>
            </div>
            {/* START: Google Map Section */}
            <div className="bg-gray-200 rounded-xl overflow-hidden h-80 lg:h-auto">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* END: Google Map Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;