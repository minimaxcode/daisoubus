import React from 'react';
import { Users, Luggage, Shield, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Fleet: React.FC = () => {
  const { t } = useLanguage();

  const vehicles = [
    {
      name: t('fleet.large'),
      nameEn: t('fleet.large.name.en'),
      seats: t('fleet.large.seats'),
      description: t('fleet.large.description.detail'),
      image: '/images/mid-size-bus.webp',
      features: [
        t('fleet.large.feature1'),
        t('fleet.large.feature2'),
        t('fleet.large.feature3'),
        t('fleet.large.feature4')
      ],
      specs: {
        length: t('fleet.large.length'),
        width: t('fleet.large.width'),
        height: t('fleet.large.height'),
        capacity: t('fleet.large.capacity')
      }
    },
    {
      name: t('fleet.midsize'),
      nameEn: t('fleet.midsize.name.en'),
      seats: t('fleet.midsize.seats'),
      description: t('fleet.midsize.description.detail'),
      image: '/images/mid-size-bus.webp',
      features: [
        t('fleet.midsize.feature1'),
        t('fleet.midsize.feature2'),
        t('fleet.midsize.feature3'),
        t('fleet.midsize.feature4')
      ],
      specs: {
        length: t('fleet.midsize.length'),
        width: t('fleet.midsize.width'),
        height: t('fleet.midsize.height'),
        capacity: t('fleet.midsize.capacity')
      }
    },
    {
      name: t('fleet.rosa'),
      nameEn: t('fleet.rosa.name.en'),
      seats: t('fleet.rosa.seats'),
      description: t('fleet.rosa.description.detail'),
      image: '/images/microbus-rosa.jpg',
      features: [
        t('fleet.rosa.feature1'),
        t('fleet.rosa.feature2'),
        t('fleet.rosa.feature3'),
        t('fleet.rosa.feature4')
      ],
      specs: {
        length: t('fleet.rosa.length'),
        width: t('fleet.rosa.width'),
        height: t('fleet.rosa.height'),
        capacity: t('fleet.rosa.capacity')
      }
    },
    {
      name: t('fleet.coaster'),
      nameEn: t('fleet.coaster.name.en'),
      seats: t('fleet.coaster.seats'),
      description: t('fleet.coaster.description.detail'),
      image: '/images/microbus-coaster.jpg',
      features: [
        t('fleet.coaster.feature1'),
        t('fleet.coaster.feature2'),
        t('fleet.coaster.feature3'),
        t('fleet.coaster.feature4')
      ],
      specs: {
        length: t('fleet.coaster.length'),
        width: t('fleet.coaster.width'),
        height: t('fleet.coaster.height'),
        capacity: t('fleet.coaster.capacity')
      }
    },
    {
      name: t('fleet.vip'),
      nameEn: t('fleet.vip.name.en'),
      seats: t('fleet.vip.seats'),
      description: t('fleet.vip.description.detail'),
      image: '/images/microbus-rosa.jpg',
      features: [
        t('fleet.vip.feature1'),
        t('fleet.vip.feature2'),
        t('fleet.vip.feature3'),
        t('fleet.vip.feature4')
      ],
      specs: {
        length: t('fleet.vip.length'),
        width: t('fleet.vip.width'),
        height: t('fleet.vip.height'),
        capacity: t('fleet.vip.capacity')
      }
    },
    {
      name: t('fleet.commuter'),
      nameEn: t('fleet.commuter.name.en'),
      seats: t('fleet.commuter.seats'),
      description: t('fleet.commuter.description.detail'),
      image: '/images/microbus-coaster.jpg',
      features: [
        t('fleet.commuter.feature1'),
        t('fleet.commuter.feature2'),
        t('fleet.commuter.feature3'),
        t('fleet.commuter.feature4')
      ],
      specs: {
        length: t('fleet.commuter.length'),
        width: t('fleet.commuter.width'),
        height: t('fleet.commuter.height'),
        capacity: t('fleet.commuter.capacity')
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
            {t('fleet.page.description')}
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
                        {t('fleet.features.title')}
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
                        {t('fleet.specs.title')}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(vehicle.specs).map(([key, value]) => (
                          <div key={key} className="bg-daisou-bg p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">
                              {t(`fleet.specs.${key}`)}
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
              {t('fleet.safety.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('fleet.safety.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: t('fleet.safety.equipment.title'),
                description: t('fleet.safety.equipment.description')
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: t('fleet.safety.training.title'),
                description: t('fleet.safety.training.description')
              },
              {
                icon: <Luggage className="h-8 w-8" />,
                title: t('fleet.safety.inspection.title'),
                description: t('fleet.safety.inspection.description')
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
              {t('fleet.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('fleet.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('fleet.cta.contact')}
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('fleet.cta.quote')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
