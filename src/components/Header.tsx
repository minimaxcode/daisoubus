import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('nav.home'), href: '/', key: 'home' },
    { name: t('nav.news'), href: '/news', key: 'news' },
    { name: t('nav.fleet'), href: '/fleet', key: 'fleet' },
    { name: t('nav.pricing'), href: '/pricing', key: 'pricing' },
    { name: t('nav.process'), href: '/usage', key: 'process' },
    { name: t('nav.company'), href: '/company', key: 'company' },
    { name: t('nav.faq'), href: '/faq', key: 'faq' },
    { name: t('nav.careers'), href: '/careers', key: 'careers' },
    { name: t('nav.corporate'), href: '/corporate', key: 'corporate' },
    { name: t('nav.contact'), href: '/contact', key: 'contact' },
    { name: t('nav.safety'), href: '/safety', key: 'safety' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/daisobus_logo.svg" 
              alt="DAISOU Logo" 
              className="h-10 w-10"
            />
            <div className="text-xl font-bold text-daisou-text font-noto-jp">
              {t('company.name')}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-daisou-accent'
                    : 'text-daisou-text hover:text-daisou-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* More dropdown would go here for remaining items */}
            <div className="relative group">
              <button className="text-sm font-medium text-daisou-text hover:text-daisou-accent transition-colors duration-200">
                {t('nav.more')}
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {navigation.slice(6).map((item) => (
                    <Link
                      key={item.key}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-daisou-text hover:bg-daisou-bg hover:text-daisou-accent"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-full bg-daisou-bg text-daisou-text hover:bg-daisou-accent hover:text-white transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language === 'ja' ? 'EN' : 'JP'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-daisou-text hover:text-daisou-accent hover:bg-daisou-bg"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`block px-4 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-daisou-accent text-white'
                      : 'text-daisou-text hover:bg-daisou-bg hover:text-daisou-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
