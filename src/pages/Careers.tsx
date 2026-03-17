import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, Users, Star, TrendingUp, Phone, Mail, Send, FileText, UserCheck, Award } from 'lucide-react';

const Careers: React.FC = () => {
  const { language } = useLanguage();

  const careersData = {
    ja: {
      title: "採用情報",
      subtitle: "私たちと共に、お客様の「最高の旅」を創造する仲間を募集しています。",
      message: "大爽観光バスでは、事業拡大に伴い、安全で快適な旅を提供するプロフェッショナルなチームの一員を求めています。あなたの経験と情熱を、ここで活かしてみませんか？",
      applyButton: "今すぐ応募する",
      quoteButton: "お問い合わせ",
      positions: [
        {
          title: "観光バス運転手（正社員）",
          type: "正社員",
          featured: true,
          description: "当社の看板である貸切観光バス、または各種送迎バスの運転および接客業務を担当し、お客様に安全で思い出に残る旅を提供していただきます。",
          requirements: [
            "大型第二種運転免許証をお持ちの方",
            "実務経験者優遇（未経験者向けの研修制度あり）",
            "高い安全意識と優れた接客スキルをお持ちの方",
            "心身ともに健康で、責任感を持って業務に取り組める方"
          ],
          conditions: {
            salary: "月給 ¥250,000 ～ ¥500,000",
            salaryNote: "※経験、能力、運行実績に応じて変動します。",
            workTime: "シフト制（実働8時間、休憩60分）※運行スケジュールによる",
            holidays: "月7日（シフト制）、年間休日85日、有給休暇、慶弔休暇",
            benefits: [
              "昇給年1回",
              "賞与年2回（業績による）",
              "社会保険完備",
              "交通費規定内支給",
              "マイカー通勤可（駐車場あり）",
              "制服貸与",
              "定期健康診断",
              "無事故手当・長距離手当あり"
            ]
          },
          workLocation: "千葉県我孫子市都12-31（本社営業所）"
        },
        {
          title: "運行管理者 兼 事務スタッフ",
          type: "正社員",
          featured: false,
          description: "予約受付・管理、運行スケジュールの作成、ドライバーの労務管理、電話応対、経理補助など、営業所の運営を支える幅広い事務業務をお任せします。",
          requirements: [
            "基本的なPCスキル（Word, Excel）をお持ちの方",
            "コミュニケーション能力が高く、丁寧な電話応対ができる方",
            "運行管理者資格をお持ちの方優遇",
            "旅行業界またはバス業界での実務経験者歓迎"
          ],
          conditions: {
            salary: "月給 ¥220,000 ～ ¥350,000",
            salaryNote: "※経験・能力・保有資格を考慮し決定します。",
            workTime: "09:00 ～ 18:00（休憩60分）",
            holidays: "週休2日制（土日祝）、年間休日120日以上、夏季・年末年始休暇",
            benefits: [
              "昇給年1回",
              "賞与年2回",
              "社会保険完備",
              "交通費全額支給",
              "資格取得支援制度あり",
              "退職金制度あり"
            ]
          },
          workLocation: "千葉県我孫子市都12-31（本社営業所）"
        }
      ],
      company: {
        title: "大爽観光で働く魅力",
        points: [
          {
            title: "アットホームな職場環境",
            description: "少数精鋭のため、経営陣と社員の距離が近く、風通しの良い職場です。チームワークを大切にしています。",
            icon: <Users className="h-8 w-8" />
          },
          {
            title: "充実した研修とサポート体制",
            description: "未経験やブランクのある方でも、プロの運転技術や接客スキルを習得できるよう、同乗研修などで丁寧に指導します。",
            icon: <Star className="h-8 w-8" />
          },
          {
            title: "お客様からの感謝がやりがい",
            description: "旅の終わりにお客様からいただく「ありがとう」の言葉と笑顔が、私たちの仕事の何よりの原動力です。",
            icon: <Award className="h-8 w-8" />
          },
          {
            title: "安定と成長を両立",
            description: "設立以来、着実に顧客基盤を拡大しています。安定した環境で、会社の成長と共にキャリアを築くことができます。",
            icon: <TrendingUp className="h-8 w-8" />
          }
        ]
      },
      application: {
        title: "応募から採用までの流れ",
        process: [
            { step: "1. 応募", detail: "お電話または応募フォームからご連絡ください。", icon: <Send className="h-6 w-6 text-daisou-accent" /> },
            { step: "2. 書類選考", detail: "履歴書・職務経歴書をご送付いただきます。", icon: <FileText className="h-6 w-6 text-daisou-accent" /> },
            { step: "3. 面接", detail: "本社にて面接（1〜2回）を実施します。人物重視の採用です。", icon: <UserCheck className="h-6 w-6 text-daisou-accent" /> },
            { step: "4. 内定", detail: "面接後、1週間以内に結果をご連絡いたします。", icon: <Award className="h-6 w-6 text-daisou-accent" /> }
        ],
        contact: {
            title: "応募連絡先",
            methods: [
              { method: "電話で応募", detail: "080-6588-4932（担当：澤村）", time: "平日 9:00-18:00" },
              { method: "メールで応募", detail: "info@daisoubus.jp", time: "24時間受付" }
            ],
            documents_title: "必要書類",
            documents: [
              "履歴書（写真貼付）",
              "職務経歴書",
              "運転免許証のコピー（運転手職の場合）",
              "運転記録証明書（運転手職の場合、過去5年分）"
            ]
        }
      }
    },
    en: {
      title: "Career Opportunities",
      subtitle: "Join us in creating the best journeys for our customers.",
      message: "As DAISOU Travel Bus expands, we are looking for professional team members to provide safe and comfortable travel. Why not apply your experience and passion here?",
      applyButton: "Apply Now",
      quoteButton: "Inquire",
      positions: [
        {
          title: "Tour Bus Driver (Full-time)",
          type: "Full-time",
          featured: true,
          description: "As the face of our company, you will be responsible for driving and customer service for our charter tour buses and various shuttle services, providing safe and memorable journeys.",
          requirements: [
            "Valid Class II Commercial Driver's License",
            "Practical experience preferred (training available for newcomers)",
            "High safety awareness and excellent customer service skills",
            "Physically and mentally healthy with a strong sense of responsibility"
          ],
          conditions: {
            salary: "Monthly: ¥250,000 - ¥500,000",
            salaryNote: "※Varies based on experience, skills, and trip records.",
            workTime: "Shift-based (8 working hours, 60 min break) ※Depends on schedule",
            holidays: "7 days/month (shift-based), 85 annual holidays, paid leave, congratulatory/condolence leave",
            benefits: [
              "Annual salary increase",
              "Biannual bonus (performance-based)",
              "Full social insurance",
              "Transportation allowance (as per regulations)",
              "Car commuting permitted (parking available)",
              "Uniform provided",
              "Regular health checkups",
              "Accident-free & long-distance allowances"
            ]
          },
          workLocation: "12-31 Miyako, Abiko City, Chiba (Head Office)"
        },
        {
          title: "Operation Manager & Office Staff",
          type: "Full-time",
          featured: false,
          description: "You will handle a wide range of administrative tasks supporting our office, including reservation management, dispatch scheduling, driver labor management, phone support, and accounting assistance.",
          requirements: [
            "Basic PC skills (Word, Excel)",
            "Strong communication skills and polite phone manner",
            "Operation Manager certification preferred",
            "Experience in the travel or bus industry is a plus"
          ],
          conditions: {
            salary: "Monthly: ¥220,000 - ¥350,000",
            salaryNote: "※Determined based on experience, skills, and qualifications.",
            workTime: "09:00 - 18:00 (60 min break)",
            holidays: "5-day work week (Sat/Sun/Holidays off), 120+ annual holidays, summer & new year holidays",
            benefits: [
              "Annual salary increase",
              "Biannual bonus",
              "Full social insurance",
              "Full transportation allowance",
              "Qualification acquisition support",
              "Retirement plan available"
            ]
          },
          workLocation: "12-31 Miyako, Abiko City, Chiba (Head Office)"
        }
      ],
      company: {
        title: "Why Work With Us",
        points: [
          {
            title: "A-Team Environment",
            description: "As a lean team, the distance between management and staff is close, fostering an open workplace that values teamwork.",
            icon: <Users className="h-8 w-8" />
          },
          {
            title: "Comprehensive Training & Support",
            description: "We provide thorough on-the-job training to help those with no experience or a career gap to master professional driving and service skills.",
            icon: <Star className="h-8 w-8" />
          },
          {
            title: "Rewarding Customer Appreciation",
            description: "The 'thank yous' and smiles from our customers at the end of a trip are the greatest motivation for our work.",
            icon: <Award className="h-8 w-8" />
          },
          {
            title: "Stability and Growth",
            description: "We have steadily expanded our customer base since our founding. You can build a career in a stable environment alongside a growing company.",
            icon: <TrendingUp className="h-8 w-8" />
          }
        ]
      },
      application: {
        title: "Application to Hiring Process",
        process: [
            { step: "1. Apply", detail: "Contact us via phone or our application form.", icon: <Send className="h-6 w-6 text-daisou-accent" /> },
            { step: "2. Document Screening", detail: "Submit your resume and work history.", icon: <FileText className="h-6 w-6 text-daisou-accent" /> },
            { step: "3. Interview", detail: "We conduct 1-2 interviews at our head office. We focus on you as a person.", icon: <UserCheck className="h-6 w-6 text-daisou-accent" /> },
            { step: "4. Job Offer", detail: "We will notify you of the result within one week of the interview.", icon: <Award className="h-6 w-6 text-daisou-accent" /> }
        ],
        contact: {
            title: "Application Contact",
            methods: [
              { method: "Apply by Phone", detail: "080-6588-4932 (Attn: Sawamura)", time: "Weekdays 9:00-18:00" },
              { method: "Apply by Email", detail: "info@daisoubus.jp", time: "24/7" }
            ],
            documents_title: "Required Documents",
            documents: [
              "Resume (with photo)",
              "Curriculum Vitae (CV)",
              "Copy of Driver's License (for driver positions)",
              "Driving Record Certificate (for driver positions, past 5 years)"
            ]
        }
      }
    }
  };

  const content = careersData[language as keyof typeof careersData];

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
           <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mt-4 bg-daisou-bg p-4 rounded-xl">
            {content.message}
          </p>
        </div>

        {/* Job Positions Section */}
        <div className="space-y-12">
          {content.positions.map((position, index) => (
            <div key={index} className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-shadow hover:shadow-2xl ${position.featured ? 'ring-2 ring-daisou-accent' : ''}`}>
               {position.featured && (
                  <div className="bg-daisou-accent text-white text-center py-2 px-6">
                    <span className="font-semibold">{language === 'ja' ? '注目求人' : 'Featured Position'}</span>
                  </div>
                )}
              <div className="p-8 lg:p-12">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <h2 className="text-3xl font-bold text-daisou-text mb-2 md:mb-0">
                        {position.title}
                    </h2>
                    <span className="bg-daisou-accent/10 text-daisou-accent px-4 py-2 rounded-full text-sm font-semibold self-start">
                        {position.type}
                    </span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{position.description}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column: Requirements & Location */}
                  <div>
                      <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                          <Briefcase className="h-5 w-5 text-daisou-accent mr-2" />
                          {language === 'ja' ? '応募資格と勤務地' : 'Requirements & Location'}
                      </h3>
                      <div className="space-y-4">
                          <ul className="space-y-2 pl-2">
                              {position.requirements.map((req, reqIndex) => (
                                  <li key={reqIndex} className="flex items-start">
                                      <div className="w-2 h-2 bg-daisou-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                                      <span className="text-gray-700">{req}</span>
                                  </li>
                              ))}
                          </ul>
                          <div className="bg-daisou-bg p-3 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">{language === 'ja' ? '勤務地' : 'Location'}</div>
                              <div className="font-semibold text-daisou-text">{position.workLocation}</div>
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Conditions & Benefits */}
                  <div>
                      <h3 className="text-xl font-semibold text-daisou-text mb-4 flex items-center">
                          <Star className="h-5 w-5 text-daisou-accent mr-2" />
                          {language === 'ja' ? '給与・待遇' : 'Salary & Benefits'}
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-daisou-bg p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{language === 'ja' ? '給与' : 'Salary'}</div>
                            <div className="font-semibold text-daisou-text">{position.conditions.salary}</div>
                            <p className="text-xs text-gray-500 mt-1">{position.conditions.salaryNote}</p>
                        </div>
                        <div className="bg-daisou-bg p-3 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">{language === 'ja' ? '勤務時間・休日' : 'Work Hours & Holidays'}</div>
                            <p className="font-semibold text-daisou-text">{position.conditions.workTime}</p>
                            <p className="font-semibold text-daisou-text mt-1">{position.conditions.holidays}</p>
                        </div>
                        <div>
                           <h4 className="font-semibold text-daisou-text mb-2">{language === 'ja' ? '福利厚生' : 'Benefits'}</h4>
                           <ul className="grid grid-cols-2 gap-2">
                                {position.conditions.benefits.map((benefit, benefitIndex) => (
                                    <li key={benefitIndex} className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-daisou-accent rounded-full flex-shrink-0" />
                                        <span className="text-gray-700 text-sm">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Attractions Section */}
        <div className="mt-20 bg-daisou-bg rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              {content.company.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.company.points.map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-daisou-text mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-daisou-text mb-6">{content.application.contact.title}</h3>
                {content.application.contact.methods.map((method, index) => (
                    <div key={index} className="mb-4">
                        <div className="font-bold text-daisou-text">{method.method}</div>
                        <p className="text-lg text-daisou-accent font-semibold">{method.detail}</p>
                        <p className="text-sm text-gray-500">{method.time}</p>
                    </div>
                ))}
                <div className="mt-8">
                     <h4 className="text-lg font-bold text-daisou-text mb-3">{content.application.contact.documents_title}</h4>
                     <ul className="space-y-2">
                        {content.application.contact.documents.map((doc, index) => (
                             <li key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0" />
                                <span className="text-gray-700">{doc}</span>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
            <div className="lg:col-span-3 bg-daisou-bg rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-daisou-text mb-6">{content.application.title}</h3>
                <div className="space-y-6">
                    {content.application.process.map((item, index) => (
                         <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">{item.icon}</div>
                            <div>
                                <h4 className="font-bold text-daisou-text">{item.step}</h4>
                                <p className="text-gray-600">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {language === 'ja' ? 'ご応募・ご質問をお待ちしております' : 'We Welcome Your Applications and Questions'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ja' 
                ? '未来の同僚となるあなたからのご連絡を、心よりお待ちしております。' 
                : 'We sincerely look forward to hearing from you, our future colleague.'}
            </p>
            <div className="flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-12 py-4 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200 text-lg shadow-lg hover:shadow-xl"
              >
                {language === 'ja' ? 'お問い合わせ・応募' : 'Contact & Apply'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;