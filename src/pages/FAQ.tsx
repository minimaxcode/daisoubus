import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Search, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const faqRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const faqCategories = [
    { key: 'all', label: t('faq.category.all') },
    { key: 'booking', label: t('faq.category.booking') },
    { key: 'pricing', label: t('faq.category.pricing') },
    { key: 'safety', label: t('faq.category.safety') },
    { key: 'service', label: t('faq.category.service') },
    { key: 'vehicle', label: t('faq.category.vehicle') },
    { key: 'other', label: t('faq.category.other') }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'booking',
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      id: 2,
      category: 'booking',
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      id: 3,
      category: 'pricing',
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      id: 4,
      category: 'pricing',
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      id: 5,
      category: 'safety',
      question: t('faq.q5'),
      answer: t('faq.a5')
    },
    {
      id: 6,
      category: 'safety',
      question: t('faq.q6'),
      answer: t('faq.a6')
    },
    {
      id: 7,
      category: 'service',
      question: t('faq.q7'),
      answer: t('faq.a7')
    },
    {
      id: 8,
      category: 'service',
      question: t('faq.q8'),
      answer: t('faq.a8')
    },
    {
      id: 9,
      category: 'vehicle',
      question: t('faq.q9'),
      answer: t('faq.a9')
    },
    {
      id: 10,
      category: 'vehicle',
      question: t('faq.q10'),
      answer: t('faq.a10')
    },
    {
      id: 11,
      category: 'other',
      question: t('faq.q11'),
      answer: t('faq.a11')
    },
    {
      id: 12,
      category: 'other',
      question: t('faq.q12'),
      answer: t('faq.a12')
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const jumpToFAQ = (id: number) => {
    // 确保问题被展开
    setOpenItems(prev => 
      prev.includes(id) ? prev : [...prev, id]
    );
    
    // 可能需要重置搜索和分类过滤以确保目标FAQ可见
    setSearchTerm('');
    setSelectedCategory('all');
    
    // 等待状态更新和DOM重新渲染后再滚动
    setTimeout(() => {
      const targetElement = faqRefs.current[id];
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // 添加视觉高亮效果
        targetElement.style.border = '2px solid #ec4899';
        targetElement.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.3)';
        
        // 3秒后移除高亮效果
        setTimeout(() => {
          targetElement.style.border = '';
          targetElement.style.boxShadow = '';
        }, 3000);
      }
    }, 100);
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.faq')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faq.description')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('faq.search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-daisou-accent text-white'
                    : 'bg-white text-daisou-text hover:bg-daisou-accent hover:text-white border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.map((item) => (
            <div 
              key={item.id} 
              ref={(el) => (faqRefs.current[item.id] = el)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-daisou-accent focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-daisou-text pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {t('faq.no.results')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-daisou-accent hover:text-pink-400 font-medium"
            >
              {t('faq.reset.search')}
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-daisou-bg rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {t('faq.contact.title')}
            </h3>
            <p className="text-gray-600">
              {t('faq.contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-daisou-accent text-white rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-daisou-text mb-2">
                {t('faq.contact.phone.title')}
              </h4>
              <p className="text-gray-600 mb-4">
                {t('faq.contact.phone.hours').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('faq.contact.phone.hours').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a
                href="tel:+81-80-6588-4932"
                className="inline-block bg-daisou-accent hover:bg-pink-400 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                080-6588-4932
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-daisou-accent text-white rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-daisou-text mb-2">
                {t('faq.contact.email.title')}
              </h4>
              <p className="text-gray-600 mb-4">
                {t('faq.contact.email.hours').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('faq.contact.email.hours').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a
                href="/contact"
                className="inline-block border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                {t('faq.contact.form')}
              </a>
            </div>
          </div>
        </div>

        {/* Popular FAQs */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-daisou-text mb-8 text-center">
            {t('faq.popular.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h4 className="font-semibold text-daisou-text mb-3 text-sm">
                  {item.question}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.answer}
                </p>
                <button
                  onClick={() => jumpToFAQ(item.id)}
                  className="text-daisou-accent hover:text-pink-400 text-sm font-medium mt-3 transition-colors duration-200"
                >
                  {t('faq.view.details')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
