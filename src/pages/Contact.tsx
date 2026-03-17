import React, { useState, useEffect } from 'react';
// 增加了 Loader2, CheckCircle, XCircle 用于状态显示
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formType, setFormType] = useState<'general' | 'group' | 'corporate'>('general');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    date: '',
    participants: '',
    destination: ''
  });

  // 新增状态管理，用于处理提交过程的用户反馈
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // 检查URL参数并自动设置表单类型
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    
    if (typeParam && ['general', 'group', 'corporate'].includes(typeParam)) {
      setFormType(typeParam as 'general' | 'group' | 'corporate');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 【核心修改】替换原有的 alert 功能，实现与后端的异步通信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, formType }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '', company: '', email: '', phone: '', message: '',
          date: '', participants: '', destination: ''
        }); // 成功后清空表单
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ▼▼▼ 以下所有 JSX 代码均为您原来的完整版本，仅在表单提交部分有修改 ▼▼▼
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.response')}
            <br />
            {t('contact.urgent')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-daisou-text mb-6">
                {t('contact.info.title')}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-daisou-text mb-1">{t('contact.info.phone')}</h3>
                    <p className="text-gray-600">TEL: +81-471-61-2355</p>
                    <p className="text-gray-600">{t('contact.info.mobile')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-daisou-text mb-1">{t('contact.info.email')}</h3>
                    <p className="text-gray-600">info@daisoubus.jp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-daisou-text mb-1">{t('contact.info.address')}</h3>
                    <p className="text-gray-600">
                      {t('contact.info.address.detail').split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < t('contact.info.address.detail').split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-daisou-text mb-1">{t('contact.hours')}</h3>
                    <p className="text-gray-600">
                      {t('contact.hours.detail').split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < t('contact.hours.detail').split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              {/* SNS Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-daisou-text mb-4">{t('contact.sns')}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">LINE: fanta0505</p>
                  <p className="text-gray-600">WeChat: pandababy20</p>
                  <p className="text-gray-600">Facebook: 大爽観光バス</p>
                  <p className="text-gray-600">WhatsApp: +81 80-6588-4932</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Form Type Selector */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-daisou-text mb-6">
                  {t('contact.form.title')}
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { key: 'general', label: t('contact.form.type.general') },
                    { key: 'group', label: t('contact.form.type.group') },
                    { key: 'corporate', label: t('contact.form.type.corporate') }
                  ].map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setFormType(type.key as any)}
                      className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                        formType === type.key
                          ? 'bg-daisou-accent text-white'
                          : 'bg-daisou-bg text-daisou-text hover:bg-daisou-accent hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-daisou-text mb-2">
                      {t('contact.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-daisou-text mb-2">
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-daisou-text mb-2">
                      {t('contact.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-daisou-text mb-2">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Additional fields for group bookings */}
                {formType === 'group' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-daisou-text mb-2">
                        {t('contact.form.date')}
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-daisou-text mb-2">
                        {t('contact.form.participants')}
                      </label>
                      <input
                        type="number"
                        name="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                )}

                {formType === 'group' && (
                  <div>
                    <label className="block text-sm font-medium text-daisou-text mb-2">
                      {t('contact.form.destination')}
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.destination.placeholder')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-daisou-text mb-2">
                    {t('contact.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder={
                      formType === 'general' ? t('contact.form.placeholder.general') :
                      formType === 'group' ? t('contact.form.placeholder.group') :
                      t('contact.form.placeholder.corporate')
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-daisou-accent focus:border-transparent transition-colors"
                  />
                </div>

                {/* 【核心修改】提交按钮和状态反馈信息 */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5 mr-2" />
                    )}
                    {isSubmitting ? t('contact.form.submitting') : t('contact.submit')}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="flex items-center justify-center mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <p>{t('contact.form.success')}</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center justify-center mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    <XCircle className="h-5 w-5 mr-3" />
                    <p>{t('contact.form.error')}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        {/* <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              {t('contact.emergency.title')}
            </h3>
            <p className="text-red-600 mb-4">
              {t('contact.emergency.description')}
            </p>
            <a
              href="tel:+81-80-6588-4932"
              className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('contact.emergency.call')}
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;