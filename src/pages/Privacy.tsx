import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Lock, User, Target, Share2, Server, Edit, Mail, Info } from 'lucide-react';

const Privacy: React.FC = () => {
  const { language } = useLanguage();

  const privacyData = {
    ja: {
      title: "プライバシーポリシー",
      subtitle: "お客様の個人情報を保護するための当社の基本方針です。",
      effectiveDate: "施行日: 2025年6月19日",
      intro: "大爽観光バス株式会社（以下、「当社」といいます）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）を遵守するとともに、以下のプライバシーポリシーに従い、適切な取扱い及び保護に努めます。",
      sections: [
        {
          icon: <User className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第1条：個人情報の定義",
          content: "本プライバシーポリシーにおいて、個人情報とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報、及び他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものをいいます。"
        },
        {
          icon: <Target className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第2条：個人情報の利用目的",
          content: "当社は、お客様の個人情報を以下の目的で利用いたします。\n1. 貸切バスの運送サービスの提供、予約、運行管理のため。\n2. お客様からのお問い合わせ、ご相談に対する回答及び資料送付のため。\n3. 当社サービスに関するご案内、アンケート調査、キャンペーンの実施のため。\n4. 料金のご請求、お支払いとその確認のため。\n5. 緊急時の連絡のため。\n6. サービスの改善、新サービスの開発等に役立てるため。"
        },
        {
          icon: <Share2 className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第3条：個人情報の第三者提供",
          content: "当社は、次に掲げる場合を除いて、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。\n1. 法令に基づく場合。\n2. 人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき。\n3. 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき。\n4. 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき。"
        },
        {
          icon: <Lock className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第4条：個人情報の安全管理措置",
          content: "当社は、取り扱う個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。具体的には、組織的、人的、物理的、技術的な安全管理措置を整備し、定期的に見直しを行います。"
        },
        {
          icon: <Edit className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第5条：個人情報の開示・訂正等",
          content: "当社は、お客様ご本人から自己の個人情報についての開示の請求がある場合、速やかに開示をいたします。その際、ご本人であることが確認できない場合には、開示に応じません。個人情報の内容に誤りがあり、ご本人から訂正・追加・削除の請求がある場合、調査の上、速やかにこれらの請求に対応いたします。これらの請求は、下記の「お問い合わせ窓口」までご連絡ください。"
        },
        {
          icon: <Info className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第6条：プライバシーポリシーの変更",
          content: "本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく、変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。"
        },
      ],
      contact: {
          icon: <Mail className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "第7条：お問い合わせ窓口",
          content: "本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。\n社名：大爽観光バス株式会社\n住所：〒270-1142 千葉県我孫子市都12-31\n担当部署：個人情報管理担当\nEメール：c.sawamura55@gmail.com"
      }
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Our basic policy for protecting your personal information.",
      effectiveDate: "Effective Date: June 19, 2025",
      intro: "DAISOU Travel Bus Inc. (hereinafter, \"the Company\") recognizes the importance of your personal information and will comply with the Act on the Protection of Personal Information (APPI) and strive for appropriate handling and protection in accordance with the following privacy policy.",
      sections: [
        {
          icon: <User className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 1: Definition of Personal Information",
          content: "In this privacy policy, \"personal information\" refers to information about a living individual that can identify a specific individual by name, date of birth, address, telephone number, contact information, or other descriptions contained in such information, and information that can be easily collated with other information, thereby enabling the identification of a specific individual."
        },
        {
          icon: <Target className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 2: Purpose of Use of Personal Information",
          content: "The Company will use your personal information for the following purposes:\n1. To provide, reserve, and manage charter bus transportation services.\n2. To respond to inquiries and consultations from customers and to send related materials.\n3. To provide information on our services, conduct surveys, and implement campaigns.\n4. For billing, payment, and confirmation thereof.\n5. For emergency contact.\n6. To help improve our services and develop new ones."
        },
        {
          icon: <Share2 className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 3: Provision of Personal Information to Third Parties",
          content: "The Company will not provide personal information to a third party without the prior consent of the customer, except in the following cases:\n1. When based on laws and regulations.\n2. When it is necessary for the protection of a person's life, body, or property, and it is difficult to obtain the consent of the individual.\n3. When it is particularly necessary for improving public health or promoting the sound growth of children, and it is difficult to obtain the consent of the individual.\n4. When it is necessary to cooperate with a state organ, a local government, or an individual entrusted by one in executing the affairs prescribed by laws and regulations, and obtaining the consent of the individual is likely to impede the execution of the said affairs."
        },
        {
          icon: <Lock className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 4: Security Management of Personal Information",
          content: "The Company will take necessary and appropriate measures to prevent the leakage, loss, or damage of the personal information it handles and for other security management of personal information. Specifically, we will establish and periodically review organizational, human, physical, and technical security management measures."
        },
        {
          icon: <Edit className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 5: Disclosure and Correction of Personal Information",
          content: "If a customer requests disclosure of their own personal information, we will promptly disclose it. We will not respond to disclosure requests if we cannot confirm the identity of the individual. If there is an error in the content of the personal information and the customer requests correction, addition, or deletion, we will investigate and promptly respond to these requests. Please direct these requests to the contact point listed below."
        },
        {
          icon: <Info className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 6: Changes to the Privacy Policy",
          content: "The contents of this policy may be changed without notice to the customer, except for matters otherwise stipulated by law or in this policy. Unless otherwise specified by the Company, the revised privacy policy shall become effective from the time it is posted on this website."
        },
      ],
       contact: {
          icon: <Mail className="h-5 w-5 text-daisou-accent mr-3" />,
          title: "Article 7: Contact Information",
          content: "For inquiries regarding this policy, please contact us at the following:\nCompany Name: DAISOU Travel Bus Inc.\nAddress: 12-31 Miyako, Abiko City, Chiba, 270-1142, Japan\nDepartment: Personal Information Management Officer\nEmail: c.sawamura55@gmail.com"
      }
    }
  };

  const content = privacyData[language as keyof typeof privacyData];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
           <p className="text-sm text-gray-500 mt-4">{content.effectiveDate}</p>
        </div>

        {/* Intro */}
        <div className="bg-daisou-bg rounded-3xl p-8 lg:p-10 mb-12">
            <p className="text-gray-800 leading-relaxed text-center">{content.intro}</p>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-l-4 border-daisou-accent">
              <h2 className="flex items-center text-xl font-bold text-daisou-text mb-4">
                {section.icon}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line pl-8">
                {section.content}
              </p>
            </div>
          ))}
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border-l-4 border-daisou-accent">
              <h2 className="flex items-center text-xl font-bold text-daisou-text mb-4">
                {content.contact.icon}
                {content.contact.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line pl-8">
                {content.contact.content}
              </p>
            </div>
        </div>

        {/* Return to Top or Contact */}
        <div className="mt-16 text-center">
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-daisou-accent text-daisou-accent hover:bg-daisou-accent hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                {language === 'ja' ? 'ページ上部へ戻る' : 'Back to Top'}
            </a>
        </div>
      </div>
    </div>
  );
};

export default Privacy;