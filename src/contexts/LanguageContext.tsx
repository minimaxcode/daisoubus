import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations object
const translations = {
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.news': 'ニュース',
    'nav.fleet': 'バス紹介',
    'nav.pricing': '料金',
    'nav.process': 'ご利用の流れ',
    'nav.company': '会社概要',
    'nav.faq': 'FAQ',
    'nav.careers': '採用情報',
    'nav.corporate': '法人向け',
    'nav.contact': 'お問い合わせ',
    'nav.quote': '見積もり',
    'nav.safety': '安全への取組み',
    'nav.terms': '運送約款',
    'nav.privacy': 'プライバシー',
    
    // Company info
    'company.name': '大爽観光バス',
    'company.slogan1': '快適な旅と笑顔いっぱいの対応を常に心がけてまいります。',
    'company.slogan2': 'すべては、笑顔のために。',
    'company.slogan3': '「安心・丁寧・誠実」を心を込めてお届けします。',
    
    // Hero section
    'hero.title': '快適な旅を',
    'hero.subtitle': '笑顔と共に',
    'hero.description': '2019年より一般貸切旅客自動車運送事業を開始。成田空港を基点に関東一円へご案内し、ご要望に応じ東北・関西方面も対応可能です。',
    'hero.cta': 'お問い合わせ',
    
    // Services
    'services.title': 'サービス紹介',
    'services.charter': '貸切バス',
    'services.guide': '観光案内',
    'services.rental': 'レンタカー',
    'services.gym': 'ジム運営',
    
    // Fleet
    'fleet.title': '車両紹介',
    'fleet.midsize': '中型バス',
    'fleet.microbus': 'マイクロバス',
    'fleet.seats': '座席',
    'fleet.midsize.description': 'ゆったり前後スペース・トランク2基',
    'fleet.coaster.description': '小グループ向け・機動性◎',
    'fleet.rosa.description': '大型トランクで荷物が多くても安心',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.response': '2営業日以内にご返信いたします。',
    'contact.urgent': 'お急ぎの方は TEL 080-6588-4932（澤村）へ。',
    'contact.name': 'お名前',
    'contact.company': '会社名',
    'contact.email': 'メールアドレス',
    'contact.phone': '電話番号',
    'contact.message': 'お問い合わせ内容',
    'contact.submit': '送信',
    
    // Footer
    'footer.company': '大爽合同会社',
    'footer.address': '〒270-1102 千葉県我孫子市都12-31',
    'footer.phone': '+81-471-61-2355',
    'footer.email': 'c.sawamura55@gmail.com',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.news': 'News',
    'nav.fleet': 'Fleet',
    'nav.pricing': 'Pricing',
    'nav.process': 'Process',
    'nav.company': 'Company',
    'nav.faq': 'FAQ',
    'nav.careers': 'Careers',
    'nav.corporate': 'Corporate',
    'nav.contact': 'Contact',
    'nav.quote': 'Quote',
    'nav.safety': 'Safety',
    'nav.terms': 'Terms',
    'nav.privacy': 'Privacy',
    
    // Company info
    'company.name': 'DAISOU Travel Bus',
    'company.slogan1': 'Comfortable journeys delivered with genuine smiles.',
    'company.slogan2': 'All for Smiles.',
    'company.slogan3': 'Safety, Care and Integrity—every mile, every time.',
    
    // Hero section
    'hero.title': 'Comfortable Journeys',
    'hero.subtitle': 'With Genuine Smiles',
    'hero.description': 'Since 2019 we have provided charter transport for inbound travellers, greeting guests at Narita Airport and covering Kanto—and, on request, Tohoku or Kansai.',
    'hero.cta': 'Contact Us',
    
    // Services
    'services.title': 'Our Services',
    'services.charter': 'Charter Bus',
    'services.guide': 'Travel Guide',
    'services.rental': 'Car Rental',
    'services.gym': 'Gym Management',
    
    // Fleet
    'fleet.title': 'Our Fleet',
    'fleet.midsize': 'Mid-size Coach',
    'fleet.microbus': 'Microbus',
    'fleet.seats': 'Seats',
    'fleet.midsize.description': 'Spacious legroom and dual trunk compartments',
    'fleet.coaster.description': 'Perfect for small groups with excellent maneuverability',
    'fleet.rosa.description': 'Large trunk space for abundant luggage',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.response': 'We aim to reply within two business days.',
    'contact.urgent': 'For urgent matters, call or message +81 80-6588-4932 (Sawamura).',
    'contact.name': 'Name',
    'contact.company': 'Company',
    'contact.email': 'E-mail',
    'contact.phone': 'Phone',
    'contact.message': 'Inquiry',
    'contact.submit': 'Submit',
    
    // Footer
    'footer.company': 'DAISOU LLC',
    'footer.address': '〒270-1102 12-31 Miyako, Abiko-shi, Chiba',
    'footer.phone': '+81-471-61-2355',
    'footer.email': 'c.sawamura55@gmail.com',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ja');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ja' ? 'en' : 'ja');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
