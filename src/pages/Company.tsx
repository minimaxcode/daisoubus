import React from 'react';
import { Calendar, MapPin, Users, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Company: React.FC = () => {
  const { t } = useLanguage();

  const companyHistory = [
    {
      year: t('company.history.2019.year'),
      event: t('company.history.2019.event'),
      description: t('company.history.2019.desc')
    },
    {
      year: t('company.history.2020.year'),
      event: t('company.history.2020.event'),
      description: t('company.history.2020.desc')
    },
    {
      year: t('company.history.2021.year'),
      event: t('company.history.2021.event'),
      description: t('company.history.2021.desc')
    },
    {
      year: t('company.history.2022.year'),
      event: t('company.history.2022.event'),
      description: t('company.history.2022.desc')
    },
    {
      year: t('company.history.2023.year'),
      event: t('company.history.2023.event'),
      description: t('company.history.2023.desc')
    }
  ];



  // 公司完整地址
  const companyAddress = '〒270-1102 千葉県我孫子市都12-31';
  
  // Google Maps 无API Key版本 - 地址定位
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(companyAddress)}&hl=ja&z=15&output=embed`;

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
                  {t('company.ceo.title')}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {t('company.ceo.message1').replace('{slogan}', t('company.slogan2'))}
                  </p>
                  <p>
                    {t('company.ceo.message2')}
                  </p>
                  <p>
                    {t('company.ceo.message3')}
                  </p>
                </div>
                <div className="mt-8">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-daisou-text">{t('company.ceo.name')}</p>
                    <p className="text-gray-600">Chiho Sawamura</p>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto">
                <img
                  src="/images/team-photo.jpg"
                  alt={t('company.ceo.name')}
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
              {t('company.basic.title')}
            </h3>
            <div className="space-y-4">
              {[
                { label: t('company.basic.name'), value: t('company.basic.name.value') },
                { label: t('company.basic.representative'), value: t('company.basic.representative.value') },
                { label: t('company.basic.established'), value: t('company.basic.established.value') },
                { label: t('company.basic.address'), value: t('company.basic.address.value') },
                { label: t('company.basic.phone'), value: '+81-471-61-2355' },
                { label: t('company.basic.email'), value: 'c.sawamura55@gmail.com' },
                { label: t('company.basic.website'), value: 'https://daisoubus.com' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start">
                  <div className="w-auto sm:w-32 lg:w-28 xl:w-32 font-semibold text-daisou-text mb-1 sm:mb-0 sm:flex-shrink-0">
                    {item.label}
                  </div>
                  <div className="flex-1 text-gray-700 sm:ml-4">
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
              {t('company.services.title')}
            </h3>
            <div className="space-y-4">
              {[
                {
                  service: t('company.services.charter'),
                  description: t('company.services.charter.desc')
                },
                {
                  service: t('company.services.guide'),
                  description: t('company.services.guide.desc')
                },
                {
                  service: t('company.services.rental'),
                  description: t('company.services.rental.desc')
                },
                {
                  service: t('company.services.gym'),
                  description: t('company.services.gym.desc')
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

        {/* Company History */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-8 flex items-center">
              <Calendar className="h-6 w-6 text-daisou-accent mr-2" />
              {t('company.history.title')}
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
              {t('company.banking.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-daisou-bg rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">み</span>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text">{t('company.banking.mizuho')}</h4>
                  <p className="text-gray-600 text-sm">MIZUHO Bank</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-daisou-bg rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">千</span>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text">{t('company.banking.chiba')}</h4>
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
            {t('company.location.title')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">{t('company.location.address.label')}</h4>
                  <p className="text-gray-700">
                    {t('company.basic.address.value')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">{t('company.location.station.label')}</h4>
                  <p className="text-gray-700">
                    {t('company.location.station.value')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-daisou-text mb-2">{t('company.location.access.label')}</h4>
                  <p className="text-gray-700">
                    {t('company.location.access.value').split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t('company.location.access.value').split('\n').length - 1 && <br />}
                      </span>
                    ))}
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