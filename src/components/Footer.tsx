import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  // 根据 App.tsx 中的路由定义页面链接和对应的日文/翻译键
  const serviceLinks = [
    { path: '/fleet', ja: '車両紹介', key: 'nav.fleet' },
    { path: 'pricing', ja: '料金案内', key: 'nav.pricing' },
    { path: '/usage', ja: 'ご利用の流れ', key: 'nav.usage' },
    { path: '/safety', ja: '安全への取り組み', key: 'nav.safety' },
    { path: '/corporate', ja: '法人向けサービス', key: 'nav.corporate' },
  ];

  const aboutLinks = [
    { path: '/company', ja: '会社概要', key: 'nav.company' },
    { path: '/news', ja: 'お知らせ', key: 'nav.news' },
    { path: '/careers', ja: '採用情報', key: 'nav.careers' },
    { path: '/faq', ja: 'よくある質問', key: 'nav.faq' },
  ];

  const legalLinks = [
    { path: '/terms', ja: '運送約款', key: 'nav.terms' },
    { path: '/privacy', ja: 'プライバシーポリシー', key: 'nav.privacy' },
  ]

  const getLinkText = (link: { ja: string, key: string }) => {
    return language === 'ja' ? link.ja : t(link.key);
  }

  return (
    <footer className="bg-daisou-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4 pr-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/daisobus_logo.svg" 
                alt="DAISOU Logo" 
                className="h-10 w-10"
              />
              <h3 className="text-lg font-bold font-noto-jp">{t('footer.company')}</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('company.slogan2')}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-daisou-accent mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-daisou-accent" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-daisou-accent" />
                <span>{t('footer.email')}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-base font-semibold mb-4 tracking-wider uppercase">{t('footer.services.title')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-daisou-accent transition-colors">
                    {getLinkText(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h4 className="text-base font-semibold mb-4 tracking-wider uppercase">{t('footer.about.title')}</h4>
            <ul className="space-y-3">
              {aboutLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-daisou-accent transition-colors">
                     {getLinkText(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Buttons & Social */}
          <div>
            <h4 className="text-base font-semibold mb-4 tracking-wider uppercase">{t('footer.contact.title')}</h4>
            <div className="space-y-3">
              <Link 
                to="/contact" 
                className="group inline-flex items-center justify-center w-full bg-daisou-accent hover:bg-pink-400 text-white text-center py-2.5 px-4 rounded-full transition-colors duration-200 font-semibold"
              >
                <span>{t('footer.contact.form')}</span>
                <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/quote" 
                className="group inline-flex items-center justify-center w-full border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white text-center py-2.5 px-4 rounded-full transition-colors duration-200 font-semibold"
              >
                <span>{t('footer.quote.free')}</span>
                 <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="mt-8">
               <h4 className="text-base font-semibold mb-4 tracking-wider uppercase">SNS</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100070317061493" 
                  aria-label="Facebook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-daisou-accent transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-xs text-gray-400 mt-4 md:mt-0">
              © {new Date().getFullYear()} {t('footer.company')}. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              {legalLinks.map(link => (
                 <Link key={link.path} to={link.path} className="text-xs text-gray-400 hover:text-white transition-colors">
                   {getLinkText(link)}
                 </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;