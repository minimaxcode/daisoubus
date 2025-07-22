import React from 'react';
import { Users, Luggage, Shield, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Fleet: React.FC = () => {
  const { t } = useLanguage();

  const vehicles = [
    {
      name: t('fleet.midsize'),
      nameEn: 'Mid-size Coach',
      seats: '27座席',
      description: t('fleet.midsize.description'),
      descriptionEn: 'Spacious legroom and dual trunk compartments',
      image: '/images/mid-size-bus.webp',
      features: [
        'ゆったりとした座席間隔',
        '大容量トランク2基',
        'エアコン完備',
        'リクライニングシート'
      ],
      specs: {
        length: '約9m',
        width: '約2.3m',
        height: '約3.2m',
        capacity: '27名（正座席）'
      }
    },
    {
      name: 'マイクロバス (Coaster)',
      nameEn: 'Microbus Coaster',
      seats: '18正座 + 5補助',
      description: t('fleet.coaster.description'),
      descriptionEn: 'Perfect for small groups with excellent maneuverability',
      image: '/images/microbus-coaster.jpg',
      features: [
        '小回りの利く機動性',
        'コンパクトながら快適',
        '運転しやすいサイズ',
        '少人数グループに最適'
      ],
      specs: {
        length: '約7m',
        width: '約2.0m',
        height: '約2.6m',
        capacity: '23名（正座18+補助5）'
      }
    },
    {
      name: 'マイクロバス (Rosa)',
      nameEn: 'Microbus Rosa',
      seats: '19正座 + 5補助',
      description: t('fleet.rosa.description'),
      descriptionEn: 'Large trunk space for abundant luggage',
      image: '/images/microbus-rosa.jpg',
      features: [
        '大型トランクスペース',
        '荷物の多い旅行に最適',
        '快適な乗り心地',
        '安全装備充実'
      ],
      specs: {
        length: '約7m',
        width: '約2.0m',
        height: '約2.7m',
        capacity: '24名（正座19+補助5）'
      }
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('fleet.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            お客様のニーズに合わせて選べる、安全で快適な車両をご用意しております。
            すべての車両で定期的な安全点検と清掃を実施し、快適な旅をサポートいたします。
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="space-y-16">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className={`relative h-80 lg:h-auto ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-daisou-accent text-white px-4 py-2 rounded-full font-semibold">
                    {vehicle.seats}
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-daisou-text mb-2">
                        {vehicle.name}
                      </h2>
                      <p className="text-lg text-gray-600 font-medium">
                        {vehicle.nameEn}
                      </p>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {vehicle.description}
                    </p>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                        <Star className="h-5 w-5 text-daisou-accent mr-2" />
                        主な特徴
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicle.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                        <Shield className="h-5 w-5 text-daisou-accent mr-2" />
                        車両仕様
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(vehicle.specs).map(([key, value]) => (
                          <div key={key} className="bg-daisou-bg p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">
                              {key === 'length' ? '全長' : 
                               key === 'width' ? '全幅' : 
                               key === 'height' ? '全高' : '定員'}
                            </div>
                            <div className="font-semibold text-daisou-text">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Features Section */}
        <div className="mt-20 bg-daisou-bg rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              安全への取り組み
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              すべての車両に最新の安全装備を搭載し、定期的な点検・整備を実施しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: '安全装備',
                description: 'ABS、エアバッグ、シートベルトなど最新の安全装備を完備'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: '運転者教育',
                description: '定期的な安全講習と技能向上研修を実施'
              },
              {
                icon: <Luggage className="h-8 w-8" />,
                title: '車両点検',
                description: '法定点検に加え、独自の安全チェックを実施'
              }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-daisou-text mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              車両のご予約・お問い合わせ
            </h3>
            <p className="text-gray-600 mb-6">
              ご利用人数や目的に応じて最適な車両をご提案いたします。
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                お問い合わせ
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                見積もり依頼
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
