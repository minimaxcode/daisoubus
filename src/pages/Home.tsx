import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Globe, Users, Building, CalendarDays, FileText, Bus, MapPin, Languages, Monitor } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const saveData = (navigator as any)?.connection?.saveData;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (saveData || reduceMotion) {
      return; // 使用 poster，不加载视频资源
    }

    const loadSources = () => {
      el.querySelectorAll('source').forEach((s) => {
        const ds = (s as HTMLSourceElement).dataset.src;
        if (ds) (s as HTMLSourceElement).src = ds;
      });
      el.load();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadSources();
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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
              <video
                ref={videoRef}
                className="rounded-2xl shadow-2xl w-full h-96 object-cover motion-reduce:hidden"
                poster="/images/japan-video-scenery-1280.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source data-src="/video/hero-1080.webm" type="video/webm" />
                <source data-src="/video/hero-1080.mp4" type="video/mp4" />
                <source data-src="/video/hero-720.webm" type="video/webm" media="(max-width: 1024px)" />
                <source data-src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 1024px)" />
              </video>
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
                imageSmall: '/images/large-sized-bus-2-640.webp',
                imageLarge: '/images/large-sized-bus-2-1280.webp'
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: t('company.services.guide'),
                description: t('company.services.guide.desc'),
                imageSmall: '/images/cherry-blossom-420.webp',
                imageLarge: '/images/cherry-blossom-840.webp'
              },
              {
                icon: <Languages className="h-6 w-6" />,
                title: t('company.services.rental'),
                description: t('company.services.rental.desc'),
                imageSmall: '/images/tour-guide-420.webp',
                imageLarge: '/images/tour-guide-840.webp'
              },
              {
                icon: <Monitor className="h-6 w-6" />,
                title: t('company.services.gym'),
                description: t('company.services.gym.desc'),
                imageSmall: '/images/ad-420.webp',
                imageLarge: '/images/ad-840.webp'
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-44 md:h-48 bg-white overflow-hidden">
                  <img
                    src={service.imageLarge}
                    srcSet={`${service.imageSmall} 420w, ${service.imageLarge} 840w`}
                    sizes="(max-width:768px) 100vw, 420px"
                    alt={service.title}
                    className="w-full h-full object-cover"
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
                imageSmall: '/images/narita-airport-420.webp',
                imageLarge: '/images/narita-airport-840.webp'
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: t('services.inbound'),
                description: t('services.inbound.description'),
                imageSmall: '/images/cherry-blossom-420.webp',
                imageLarge: '/images/cherry-blossom-840.webp'
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: t('services.daytrip'),
                description: t('services.daytrip.description'),
                imageSmall: '/images/spa-420.webp',
                imageLarge: '/images/spa-840.webp'
              },
              {
                icon: <Building className="h-8 w-8" />,
                title: t('services.ceremony'),
                description: t('services.ceremony.description'),
                imageSmall: '/images/jp-wedding-420.webp',
                imageLarge: '/images/jp-wedding-840.webp'
              },
              {
                icon: <CalendarDays className="h-8 w-8" />,
                title: t('services.event'),
                description: t('services.event.description'),
                imageSmall: '/images/exhibition-420.webp',
                imageLarge: '/images/exhibition-840.webp'
              },
              {
                icon: <FileText className="h-8 w-8" />,
                title: t('services.contract'),
                description: t('services.contract.description'),
                imageSmall: '/images/large-sized-bus-2-640.webp',
                imageLarge: '/images/large-sized-bus-2-1280.webp'
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={service.title === t('services.contract') ? 'h-48 bg-white flex items-center justify-center' : 'h-48 overflow-hidden'}>
                  <img
                    src={service.imageLarge}
                    srcSet={`${service.imageSmall} 420w, ${service.imageLarge} 840w`}
                    sizes="(max-width:768px) 100vw, 420px"
                    alt={service.title}
                    className={service.title === t('services.contract') ? 'max-h-full w-auto object-contain' : 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'}
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
                imageSmall: '/images/large-sized-bus-1-640.webp',
                imageLarge: '/images/large-sized-bus-1-1280.webp'
              },
              {
                name: t('fleet.midsize'),
                seats: t('fleet.midsize.seats'),
                description: t('fleet.midsize.description'),
                imageSmall: '/images/mid-size-coach-640.webp',
                imageLarge: '/images/mid-size-coach-1280.webp'
              },
              {
                name: t('fleet.rosa'),
                seats: t('fleet.rosa.seats'),
                description: t('fleet.rosa.description'),
                imageSmall: '/images/micro-bus-superlong-type-640.webp',
                imageLarge: '/images/micro-bus-superlong-type-1280.webp'
              },
              {
                name: t('fleet.coaster'),
                seats: t('fleet.coaster.seats'),
                description: t('fleet.coaster.description'),
                imageSmall: '/images/microbus-coaster-2-640.webp',
                imageLarge: '/images/microbus-coaster-2-1280.webp'
              },
              {
                name: t('fleet.vip'),
                seats: t('fleet.vip.seats'),
                description: t('fleet.vip.description'),
                imageSmall: '/images/microbus-vip-specification-640.webp',
                imageLarge: '/images/microbus-vip-specification-1280.webp'
              },
              {
                name: t('fleet.commuter'),
                seats: t('fleet.commuter.seats'),
                description: t('fleet.commuter.description'),
                imageSmall: '/images/hiace-640.webp',
                imageLarge: '/images/hiace-1280.webp'
              }
            ].map((vehicle, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-white flex items-center justify-center">
                  <img
                    src={vehicle.imageLarge}
                    srcSet={`${vehicle.imageSmall} 640w, ${vehicle.imageLarge} 1280w`}
                    sizes="(max-width:1024px) 100vw, 640px"
                    alt={vehicle.name}
                    className="max-h-full w-auto object-contain"
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
