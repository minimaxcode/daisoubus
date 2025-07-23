import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-daisou-bg to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-daisou-text leading-tight">
                  {t('hero.title')}
                  <br />
                  <span className="text-daisou-accent">{t('hero.subtitle')}</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-2xl font-semibold text-daisou-text">
                  {t('company.slogan1')}
                </p>
                <p className="text-xl text-daisou-accent font-medium">
                  {t('company.slogan2')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/fleet"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
                >
                  {t('nav.fleet')}
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/japan-scenery.jpg"
                alt="Japan Travel Scenery"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/images/daisobus_logo.svg" 
                    alt="DAISOU Logo" 
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-daisou-text">{t('company.name')}</p>
                    <p className="text-sm text-gray-600">{t('home.company.since')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-daisou-text mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('company.slogan3')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: t('services.charter'),
                description: t('services.charter.description'),
                image: '/images/mid-size-bus.webp'
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: t('services.guide'),
                description: t('services.guide.description'),
                image: '/images/cherry-blossom.jpg'
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: t('services.rental'),
                description: t('services.rental.description'),
                image: '/images/narita-airport.jpg'
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: t('services.gym'),
                description: t('services.gym.description'),
                image: '/images/team-photo.jpg'
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-daisou-accent text-white rounded-lg">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-daisou-text">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="py-20 bg-daisou-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-daisou-text mb-4">
              {t('fleet.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.fleet.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: t('fleet.midsize'),
                seats: t('home.fleet.seats.27'),
                description: t('fleet.midsize.description'),
                image: '/images/mid-size-bus.webp'
              },
              {
                name: t('home.fleet.name.coaster'),
                seats: t('home.fleet.seats.coaster'),
                description: t('fleet.coaster.description'),
                image: '/images/microbus-coaster.jpg'
              },
              {
                name: t('home.fleet.name.rosa'),
                seats: t('home.fleet.seats.rosa'),
                description: t('fleet.rosa.description'),
                image: '/images/microbus-rosa.jpg'
              }
            ].map((vehicle, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-daisou-text mb-2">{vehicle.name}</h3>
                  <p className="text-daisou-accent font-semibold mb-3">{vehicle.seats}</p>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/fleet"
              className="inline-flex items-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
            >
              {t('home.fleet.view.details')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-daisou-bg rounded-3xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-daisou-text mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('contact.response')}
              <br />
              {t('contact.urgent')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('contact.title')}
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {t('nav.quote')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
