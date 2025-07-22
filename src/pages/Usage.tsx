import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HelpCircle, FileText, Calendar, Send, Bus, CreditCard, Star, AlertCircle, PhoneCall, PenSquare, MessageSquare } from 'lucide-react';

const Usage: React.FC = () => {
  const { language } = useLanguage();

  const usageData = {
    ja: {
      title: "ご利用の流れ",
      subtitle: "お問い合わせから運行完了まで、簡単6ステップ。初めての方でも安心してご利用いただけます。",
      contactButton: "お問い合わせ",
      quoteButton: "見積もり依頼",
      steps: [
        {
          step: "STEP 1",
          title: "お問い合わせ・ご相談",
          description: "お電話、メール、またはお問い合わせフォームから、ご希望の利用日時、人数、目的地などをお知らせください。どんな些細なことでもお気軽にご相談いただけます。",
          icon: <PhoneCall className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 2",
          title: "無料お見積もり",
          description: "いただいたご要望を基に、最適なルート、車両、料金プランを詳細にお見積もりいたします。複数プランのご提案も可能で、お見積もりは無料です。",
          icon: <PenSquare className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 3",
          title: "ご予約・ご契約",
          description: "お見積もり内容にご納得いただけましたら、正式なご予約手続きに進みます。契約書を取り交わし、詳細な運行計画書を作成いたします。",
          icon: <Calendar className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 4",
          title: "最終確認",
          description: "運行日の前日、または当日の朝に、集合場所、時間、当日の連絡先などを最終確認いたします。天候や交通状況も考慮し、万全の準備を整えます。",
          icon: <Send className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 5",
          title: "安全運行当日",
          description: "経験豊富なプロドライバーが、安全第一で目的地まで快適な旅をお届けします。集合場所でお待ちしておりますので、安心してご乗車ください。",
          icon: <Bus className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 6",
          title: "お支払い",
          description: "運行が無事完了した後、契約に基づいた方法で料金をお支払いいただきます。現金、銀行振込、法人様向けの請求書払いに対応しております。",
          icon: <CreditCard className="h-8 w-8 text-white" />
        }
      ],
      faq: {
        title: "よくあるご質問",
        icon: <HelpCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          {
            question: "何日前までに予約が必要ですか？",
            answer: "空きがあれば直前でも可能ですが、特に繁忙期は1ヶ月以上前をお勧めします。まずはお気軽にお問い合わせください。"
          },
          {
            question: "キャンセル料はいつから発生しますか？",
            answer: "運送約款に基づき、配車日の14日前から発生いたします。詳細はご契約時に書面にてご案内いたします。"
          },
          {
            question: "料金の支払い方法は？",
            answer: "現金、指定口座へのお振込み、または法人様に限り請求書払いが可能です。ご予約時にご希望をお聞かせください。"
          }
        ]
      }
    },
    en: {
      title: "How to Use Our Service",
      subtitle: "From inquiry to completion in 6 easy steps. A smooth process even for first-time users.",
      contactButton: "Contact Us",
      quoteButton: "Request a Quote",
      steps: [
        {
          step: "STEP 1",
          title: "Inquiry & Consultation",
          description: "Contact us by phone, email, or our inquiry form with your desired date, group size, and destination. Feel free to ask us anything.",
          icon: <PhoneCall className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 2",
          title: "Free Quote",
          description: "Based on your request, we will provide a detailed quote with the optimal route, vehicle, and pricing plan. Multiple options are available, and quotes are free.",
          icon: <PenSquare className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 3",
          title: "Booking & Contract",
          description: "Once you approve the quote, we will proceed with the official booking. We will sign a contract and create a detailed operation plan.",
          icon: <Calendar className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 4",
          title: "Final Confirmation",
          description: "We will make a final confirmation of the meeting place, time, and contact details the day before or on the morning of your trip, ensuring all is set.",
          icon: <Send className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 5",
          title: "Day of Operation",
          description: "Our experienced, professional driver will provide a safe and comfortable journey to your destination. They will be waiting for you at the meeting point.",
          icon: <Bus className="h-8 w-8 text-white" />
        },
        {
          step: "STEP 6",
          title: "Payment",
          description: "After the service is completed, you will make the payment according to the contract. We accept cash, bank transfer, and invoice payments for corporate clients.",
          icon: <CreditCard className="h-8 w-8 text-white" />
        }
      ],
      faq: {
        title: "Frequently Asked Questions",
        icon: <HelpCircle className="h-5 w-5 text-daisou-accent mr-2" />,
        items: [
          {
            question: "How far in advance do I need to book?",
            answer: "While we can accommodate last-minute requests if available, we recommend booking at least one month in advance, especially for peak seasons."
          },
          {
            question: "When do cancellation fees apply?",
            answer: "Cancellation fees apply from 14 days prior to the dispatch date, based on our conditions of carriage. Details are provided in writing upon contract."
          },
          {
            question: "What are the payment methods?",
            answer: "We accept cash, bank transfer, or invoice payment for corporate clients. Please let us know your preference when booking."
          }
        ]
      }
    }
  };

  const content = usageData[language as keyof typeof usageData];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative mb-16">
          {/* Dotted line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-daisou-accent/30" style={{ transform: 'translateY(-50%)' }}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {content.steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-xl">
                 <div className="absolute -top-6 flex items-center justify-center w-12 h-12 bg-daisou-accent rounded-full text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-daisou-text mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-daisou-bg rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-daisou-text text-center mb-10">
            {content.faq.title}
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {content.faq.items.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="flex items-center text-lg font-semibold text-daisou-text mb-3">
                  <MessageSquare className="h-5 w-5 text-daisou-accent mr-3 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {language === 'ja' ? 'ご予約・ご相談はこちらから' : 'For Bookings and Inquiries'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ja' 
                ? 'お客様のご要望に合わせた最適なプランをご提案いたします。' 
                : 'We will propose the best plan tailored to your needs.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {content.contactButton}
              </a>
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {content.quoteButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;