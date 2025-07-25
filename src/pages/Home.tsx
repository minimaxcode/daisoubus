import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Globe, Users, Heart, CalendarDays, FileText, Bus, MapPin, Languages, Monitor } from 'lucide-react';
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
                <h1 className="text-4xl lg:text-5xl font-bold text-daisou-accent leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {t('hero.description')}
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {t('company.slogan1')}
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

      {/* Business Services Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Bus className="h-6 w-6" />,
                title: t('company.services.charter'),
                description: t('company.services.charter.desc'),
                image: '/images/mid-size-bus.webp'
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: t('company.services.guide'),
                description: t('company.services.guide.desc'),
                image: '/images/japan-scenery.jpg'
              },
              {
                icon: <Languages className="h-6 w-6" />,
                title: t('company.services.rental'),
                description: t('company.services.rental.desc'),
                image: '/images/contact-support.jpg'
              },
              {
                icon: <Monitor className="h-6 w-6" />,
                title: t('company.services.gym'),
                description: t('company.services.gym.desc'),
                image: '/images/team-photo.jpg'
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-36 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="p-1.5 bg-daisou-accent text-white rounded-lg">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-daisou-text">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Scenarios Section */}
      <section className="py-20 bg-daisou-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-daisou-text mb-4">
              {t('usage.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('company.slogan3')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="h-8 w-8" />,
                title: t('services.airport'),
                description: t('services.airport.description'),
                image: '/images/narita-airport.jpg'
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: t('services.inbound'),
                description: t('services.inbound.description'),
                image: '/images/cherry-blossom.jpg'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: t('services.daytrip'),
                description: t('services.daytrip.description'),
                image: '/images/japan-scenery.jpg'
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: t('services.ceremony'),
                description: t('services.ceremony.description'),
                image: '/images/family-travel.jpg'
              },
              {
                icon: <CalendarDays className="h-8 w-8" />,
                title: t('services.event'),
                description: t('services.event.description'),
                image: '/images/team-photo.jpg'
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: t('services.contract'),
                description: t('services.contract.description'),
                image: '/images/mid-size-bus.webp'
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-daisou-text mb-4">
              {t('fleet.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.fleet.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: t('fleet.large'),
                seats: t('fleet.large.seats'),
                description: t('fleet.large.description'),
                image: '/images/mid-size-bus.webp'
              },
              {
                name: t('fleet.midsize'),
                seats: t('fleet.midsize.seats'),
                description: t('fleet.midsize.description'),
                image: '/images/mid-size-bus.webp'
              },
              {
                name: t('fleet.rosa'),
                seats: t('fleet.rosa.seats'),
                description: t('fleet.rosa.description'),
                image: '/images/microbus-rosa.jpg'
              },
              {
                name: t('fleet.coaster'),
                seats: t('fleet.coaster.seats'),
                description: t('fleet.coaster.description'),
                image: '/images/microbus-coaster.jpg'
              },
              {
                name: t('fleet.vip'),
                seats: t('fleet.vip.seats'),
                description: t('fleet.vip.description'),
                image: '/images/microbus-rosa.jpg'
              },
              {
                name: t('fleet.commuter'),
                seats: t('fleet.commuter.seats'),
                description: t('fleet.commuter.description'),
                image: '/images/microbus-coaster.jpg'
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
