import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText, Shield, UserCheck, CircleDollarSign, AlertTriangle, HelpCircle, Ban, Clock, Inbox, Mail } from 'lucide-react';

const Terms: React.FC = () => {
  const { language } = useLanguage();

  const termsData = {
    ja: {
      title: "運送約款",
      subtitle: "当社の貸切バスサービスをご利用いただくにあたっての規約です。",
      lastUpdated: "最終更新日: 2025年6月19日",
      sections: [
        {
          icon: <FileText className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第1条：適用範囲",
          content: "本約款は、当社が経営する一般貸切旅客自動車運送事業（貸切バス事業）に関する運送契約に適用されます。本約款に定めのない事項については、法令または一般の慣習によります。当社が特約に応じた場合は、その特約が優先されます。"
        },
        {
          icon: <UserCheck className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第2条：運送の引受け",
          content: "当社は、次に掲げる場合を除き、旅客の運送を引受けます。\n1. 当該運送に関する申込が、本約款と異なる運送条件を求めるものであるとき。\n2. 天災その他やむを得ない事由による運送上の支障があるとき。\n3. 旅客が、法令の規定または公の秩序、善良の風俗に反する行為をしようとするとき。\n4. 旅客が、泥酔した者または不潔な服装をした者など、他の旅客の迷惑となるおそれのあるとき。\n5. 旅客が、当社の係員の指示に従わないとき。"
        },
        {
          icon: <CircleDollarSign className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第3条：運賃及び料金",
          content: "当社が収受する運賃及び料金は、運送申込時において地方運輸局長に届け出て実施しているものによります。運賃及び料金には、車両費、運転手人件費、燃料費、保険料が含まれます。高速道路利用料、駐車場料金、乗務員の宿泊費（必要な場合）等は別途実費を申し受けます。"
        },
        {
          icon: <Clock className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第4条：違約料（キャンセル料）",
          content: "契約者がその都合により運送契約を解除するときは、次の区分により違約料を申し受けます。\n・配車日の14日前から8日前まで：所定の運賃及び料金の20％\n・配-配車日の7日前から配車日時の24時間前まで：所定の運賃及び料金の30％\n・配車日時の24時間前以降：所定の運賃及び料金の50％\n・配車日当日：所定の運賃及び料金の100％"
        },
        {
          icon: <Ban className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第5条：旅客の禁止行為",
          content: "旅客は、車内において次の行為をしてはなりません。\n1. 喫煙（電子タバコを含む）。\n2. 法令で定められた禁制品、危険物、不潔な物品、その他他の旅客の迷惑となるおそれのある物品を車内に持ち込むこと。\n3. 乗務員や他の旅客の迷惑となるような言動をすること。\n4. 乗務員の許可なく、車両の設備を操作すること。\n5. 安全な運行を妨げる一切の行為。"
        },
        {
          icon: <Shield className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第6条：当社の責任",
          content: "当社は、車両の運行によって旅客の生命または身体を害したときは、これによって生じた損害を賠償する責に任じます。ただし、当社及び当社の係員が自動車の運行に関し注意を怠らなかったこと、当該旅客または当社の係員以外の第三者に故意または過失のあったこと、ならびに車両に構造上の欠陥または機能の障害がなかったことを証明したときは、この限りではありません。手荷物や身の回り品の毀損、滅失については、当社に故意または重大な過失があった場合を除き、賠償の責を負いません。"
        },
        {
          icon: <Inbox className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "第7条：約款の変更",
          content: "当社は、法令の改正または経済情勢の変動等、やむを得ない事由がある場合に本約款を変更することがあります。変更後の約款は、当社ウェブサイト上での掲示をもって効力を生じるものとします。"
        },
      ]
    },
    en: {
      title: "Conditions of Carriage",
      subtitle: "Terms and conditions for using our charter bus services.",
      lastUpdated: "Last Updated: June 19, 2025",
      sections: [
        {
          icon: <FileText className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 1: Scope of Application",
          content: "These Conditions of Carriage apply to all transport contracts related to our general charter passenger vehicle transport business (charter bus business). Matters not stipulated in these Conditions shall be governed by law or general custom. Special agreements shall take precedence if agreed upon by the Company."
        },
        {
          icon: <UserCheck className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 2: Acceptance of Carriage",
          content: "The Company will accept carriage of passengers, except in the following cases:\n1. When the transport application requests conditions different from these Conditions of Carriage.\n2. When there is a hindrance to transport due to a natural disaster or other unavoidable circumstances.\n3. When the passenger intends to act against laws, public order, or good morals.\n4. When the passenger is intoxicated, improperly dressed, or may otherwise be a nuisance to other passengers.\n5. When the passenger fails to follow the instructions of our staff."
        },
        {
          icon: <CircleDollarSign className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 3: Fares and Charges",
          content: "The fares and charges collected by the Company shall be those reported to and implemented by the Director-General of the local Transport Bureau at the time of the transport application. Fares and charges include vehicle costs, driver labor costs, fuel costs, and insurance premiums. Expressway tolls, parking fees, and crew accommodation expenses (if necessary) will be charged separately at actual cost."
        },
        {
          icon: <Clock className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 4: Cancellation Fees",
          content: "If the contractor cancels the transport contract for their own convenience, cancellation fees will be charged as follows:\n• From 14 days to 8 days before the dispatch date: 20% of the prescribed fare and charges.\n• From 7 days before the dispatch date to 24 hours before the dispatch time: 30% of the prescribed fare and charges.\n• Within 24 hours of the dispatch time: 50% of the prescribed fare and charges.\n• On the day of dispatch: 100% of the prescribed fare and charges."
        },
        {
          icon: <Ban className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 5: Prohibited Acts for Passengers",
          content: "Passengers must not engage in the following acts on board:\n1. Smoking (including e-cigarettes).\n2. Bringing prohibited items, dangerous goods, unsanitary items, or other articles that may inconvenience other passengers into the vehicle.\n3. Behaving in a manner that is a nuisance to the crew or other passengers.\n4. Operating the vehicle's equipment without the crew's permission.\n5. Any act that hinders the safe operation of the vehicle."
        },
        {
          icon: <Shield className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 6: Company's Liability",
          content: "The Company shall be liable for compensating for damages caused to the life or body of a passenger as a result of the vehicle's operation. However, this shall not apply if the Company and its staff were not negligent in the operation of the vehicle, if there was intent or negligence on the part of the said passenger or a third party other than the Company's staff, or if there were no structural defects or functional impairments in the vehicle. The Company shall not be liable for damage to or loss of baggage or personal belongings, except in cases of willful misconduct or gross negligence by the Company."
        },
        {
          icon: <Inbox className="h-5 w-5 text-daisou-accent mr-2" />,
          title: "Article 7: Amendment of Conditions",
          content: "The Company may amend these Conditions of Carriage when there are unavoidable reasons such as legal revisions or changes in economic conditions. The amended Conditions shall take effect upon being posted on the Company's website."
        },
      ]
    }
  };

  const content = termsData[language as keyof typeof termsData];

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
          <p className="text-sm text-gray-500 mt-4">{content.lastUpdated}</p>
        </div>

        {/* Terms Sections */}
        <div className="bg-daisou-bg rounded-3xl p-8 lg:p-12 space-y-8">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="flex items-center text-xl font-bold text-daisou-text mb-4">
                {section.icon}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-daisou-text mb-4">
              {language === 'ja' ? 'ご不明な点はお問い合わせください' : 'Contact Us for Any Questions'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'ja' 
                ? '運送約款に関するご質問や、サービスに関するご相談を承っております。' 
                : 'We are available to answer any questions regarding these Conditions of Carriage or our services.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-daisou-accent hover:bg-pink-400 text-white font-semibold rounded-full transition-colors duration-200"
              >
                 <Mail className="w-5 h-5 mr-2" />
                {language === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;