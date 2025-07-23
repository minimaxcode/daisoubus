import React from 'react';
import { Shield, Users, CheckCircle, AlertTriangle, FileText, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Safety: React.FC = () => {
  const { t } = useLanguage();

  const safetyPolicies = [
    {
      title: t('safety.policy.management.title'),
      description: t('safety.policy.management.desc'),
      icon: <FileText className="h-8 w-8" />
    },
    {
      title: t('safety.policy.priority.title'),
      description: t('safety.policy.priority.desc'),
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: t('safety.policy.compliance.title'),
      description: t('safety.policy.compliance.desc'),
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      title: t('safety.policy.disclosure.title'),
      description: t('safety.policy.disclosure.desc'),
      icon: <Users className="h-8 w-8" />
    }
  ];

  const safetyMeasures = [
    {
      category: t('safety.measures.vehicle.title'),
      items: [
        t('safety.measures.vehicle.abs'),
        t('safety.measures.vehicle.airbag'),
        t('safety.measures.vehicle.seatbelt'),
        t('safety.measures.vehicle.camera'),
        t('safety.measures.vehicle.emergency'),
        t('safety.measures.vehicle.safety')
      ]
    },
    {
      category: t('safety.measures.training.title'),
      items: [
        t('safety.measures.training.orientation'),
        t('safety.measures.training.regular'),
        t('safety.measures.training.prediction'),
        t('safety.measures.training.health'),
        t('safety.measures.training.aptitude'),
        t('safety.measures.training.eco')
      ]
    },
    {
      category: t('safety.measures.maintenance.title'),
      items: [
        t('safety.measures.maintenance.daily'),
        t('safety.measures.maintenance.regular'),
        t('safety.measures.maintenance.cleaning'),
        t('safety.measures.maintenance.parts'),
        t('safety.measures.maintenance.record'),
        t('safety.measures.maintenance.response')
      ]
    }
  ];

  const covidMeasures = [
    {
      title: t('safety.covid.vehicle.title'),
      measures: [
        t('safety.covid.vehicle.disinfection'),
        t('safety.covid.vehicle.cleaning'),
        t('safety.covid.vehicle.ventilation'),
        t('safety.covid.vehicle.capacity'),
        t('safety.covid.vehicle.spacing')
      ]
    },
    {
      title: t('safety.covid.staff.title'),
      measures: [
        t('safety.covid.staff.temperature'),
        t('safety.covid.staff.mask'),
        t('safety.covid.staff.sanitizer'),
        t('safety.covid.staff.absence'),
        t('safety.covid.staff.testing')
      ]
    },
    {
      title: t('safety.covid.customer.title'),
      measures: [
        t('safety.covid.customer.mask'),
        t('safety.covid.customer.sanitizer'),
        t('safety.covid.customer.health'),
        t('safety.covid.customer.seating'),
        t('safety.covid.customer.conversation')
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.safety')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('safety.description')}
          </p>
        </div>

        {/* Safety Policy */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              {t('safety.policy.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('safety.policy.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyPolicies.map((policy, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-full">
                    {policy.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-daisou-text mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-600">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Measures */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              {t('safety.measures.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('safety.measures.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safetyMeasures.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-daisou-text mb-6 text-center">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Training */}
        <div className="mb-20">
          <div className="bg-daisou-bg rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-daisou-text mb-6">
                  {t('safety.training.title')}
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {t('safety.training.description1')}
                  </p>
                  <p>
                    {t('safety.training.description2')}
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">{t('safety.training.orientation.title')}</h4>
                    <p className="text-sm text-gray-600">{t('safety.training.orientation.desc')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">{t('safety.training.regular.title')}</h4>
                    <p className="text-sm text-gray-600">{t('safety.training.regular.desc')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">{t('safety.training.aptitude.title')}</h4>
                    <p className="text-sm text-gray-600">{t('safety.training.aptitude.desc')}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">{t('safety.training.health.title')}</h4>
                    <p className="text-sm text-gray-600">{t('safety.training.health.desc')}</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/safety-training.jpg"
                  alt={t('safety.training.image.alt')}
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COVID-19 Measures */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-daisou-accent mr-3" />
              {t('safety.covid.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('safety.covid.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {covidMeasures.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-daisou-text mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.measures.map((measure, measureIndex) => (
                    <li key={measureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0 mt-2" />
                      <span className="text-gray-700">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              {t('safety.emergency.title')}
            </h3>
            <p className="text-red-600 mb-6">
              {t('safety.emergency.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+81-80-6588-4932"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('safety.emergency.contact')}
              </a>
              <a
                href="tel:110"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('safety.emergency.police')}
              </a>
            </div>
          </div>
        </div>

        {/* Safety Record */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-daisou-text mb-6 text-center">
            {t('safety.record.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">{t('safety.record.accidents.number')}</div>
              <div className="text-gray-600">{t('safety.record.accidents.label')}</div>
              <div className="text-sm text-gray-500">{t('safety.record.accidents.period')}</div>
            </div>
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">{t('safety.record.inspection.number')}</div>
              <div className="text-gray-600">{t('safety.record.inspection.label')}</div>
              <div className="text-sm text-gray-500">{t('safety.record.inspection.period')}</div>
            </div>
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">{t('safety.record.training.number')}</div>
              <div className="text-gray-600">{t('safety.record.training.label')}</div>
              <div className="text-sm text-gray-500">{t('safety.record.training.period')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
