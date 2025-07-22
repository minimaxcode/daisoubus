import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2">
          <div className="bg-white rounded-lg shadow-lg p-2 space-y-2 min-w-48">
            <a
              href="tel:+81-80-6588-4932"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-daisou-bg transition-colors duration-200"
            >
              <Phone className="h-5 w-5 text-daisou-accent" />
              <span className="text-sm font-medium text-daisou-text">電話する</span>
            </a>
            <Link
              to="/contact"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-daisou-bg transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-5 w-5 text-daisou-accent" />
              <span className="text-sm font-medium text-daisou-text">{t('contact.title')}</span>
            </Link>
            <a
              href="#"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-daisou-bg transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5 text-daisou-accent" />
              <span className="text-sm font-medium text-daisou-text">LINE</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-daisou-accent hover:bg-pink-400'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Phone className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default FloatingContactButton;
