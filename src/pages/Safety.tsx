import React from 'react';
import { Shield, Users, CheckCircle, AlertTriangle, FileText, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Safety: React.FC = () => {
  const { t } = useLanguage();

  const safetyPolicies = [
    {
      title: '経営方針',
      description: '輸送の安全を事業の根幹と位置づけ、明確な目標と計画を策定。',
      icon: <FileText className="h-8 w-8" />
    },
    {
      title: '安全第一',
      description: '全従業員が「人命最優先・安全第一」を徹底。',
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: '法規遵守',
      description: '交通法規遵守と環境保護を両立し、継続的に改善。',
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      title: '情報公開',
      description: '安全に関する情報は社内外へ積極的に公開。',
      icon: <Users className="h-8 w-8" />
    }
  ];

  const safetyMeasures = [
    {
      category: '車両安全装備',
      items: [
        'ABS（アンチロックブレーキシステム）',
        'エアバッグシステム',
        'シートベルト（全席）',
        'バックカメラ・ドライブレコーダー',
        '非常口・非常灯',
        '消火器・救急箱'
      ]
    },
    {
      category: '運転者教育',
      items: [
        '入社時安全研修',
        '定期安全講習会',
        '危険予知訓練',
        '健康管理指導',
        '適性診断受診',
        'エコドライブ講習'
      ]
    },
    {
      category: '車両点検・整備',
      items: [
        '日常点検（運行前後）',
        '定期点検（法定点検）',
        '車両清掃・消毒',
        'タイヤ・ブレーキ点検',
        '整備記録管理',
        '不具合時即座対応'
      ]
    }
  ];

  const covidMeasures = [
    {
      title: '車両内の感染症対策',
      measures: [
        '運行前後の車両内消毒',
        '座席・手すり等の清拭',
        '換気システムの活用',
        '乗車人数の調整',
        '座席間隔の確保'
      ]
    },
    {
      title: '乗務員の健康管理',
      measures: [
        '毎日の体温測定',
        'マスク着用の徹底',
        '手指消毒の実施',
        '体調不良時の乗務禁止',
        '定期的なPCR検査'
      ]
    },
    {
      title: 'お客様へのお願い',
      measures: [
        'マスク着用のお願い',
        '手指消毒のご協力',
        '体調不良時のご相談',
        '座席指定のご協力',
        '車内での会話を控えめに'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-6">
            {t('nav.safety')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            お客様の安全・安心を最優先に、徹底した安全管理を実施しています。
          </p>
        </div>

        {/* Safety Policy */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              安全方針
            </h2>
            <p className="text-lg text-gray-600">
              私たちは以下の方針に基づき、安全輸送を実現します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyPolicies.map((policy, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-daisou-accent text-white rounded-full">
                    {policy.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-daisou-text mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-600">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Measures */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4">
              具体的な安全対策
            </h2>
            <p className="text-lg text-gray-600">
              車両・人・システムの三方面から安全を確保します
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {safetyMeasures.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-daisou-text mb-6 text-center">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-daisou-accent flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Training */}
        <div className="mb-20">
          <div className="bg-daisou-bg rounded-3xl p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-daisou-text mb-6">
                  運転者研修制度
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    すべての運転者に対して、入社時研修から継続的な安全教育まで、
                    体系的な研修プログラムを実施しています。
                  </p>
                  <p>
                    安全運転技術の向上はもちろん、接客マナーや緊急時対応まで、
                    お客様に安心してご利用いただくための総合的な教育を行っています。
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">入社時研修</h4>
                    <p className="text-sm text-gray-600">40時間の集中研修</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">定期研修</h4>
                    <p className="text-sm text-gray-600">月1回の安全講習</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">適性診断</h4>
                    <p className="text-sm text-gray-600">年1回の受診義務</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-daisou-text">健康管理</h4>
                    <p className="text-sm text-gray-600">定期健康診断</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/safety-training.jpg"
                  alt="運転者研修"
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COVID-19 Measures */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-daisou-text mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-daisou-accent mr-3" />
              感染症対策
            </h2>
            <p className="text-lg text-gray-600">
              新型コロナウイルス感染症対策を徹底し、安心してご利用いただけます
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {covidMeasures.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-daisou-text mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.measures.map((measure, measureIndex) => (
                    <li key={measureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-daisou-accent rounded-full flex-shrink-0 mt-2" />
                      <span className="text-gray-700">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              緊急時の連絡先
            </h3>
            <p className="text-red-600 mb-6">
              運行中に何らかの異常を感じられた場合は、immediately にご連絡ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+81-80-6588-4932"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200"
              >
                緊急連絡先: 080-6588-4932
              </a>
              <a
                href="tel:110"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-full transition-colors duration-200"
              >
                警察: 110番
              </a>
            </div>
          </div>
        </div>

        {/* Safety Record */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-daisou-text mb-6 text-center">
            安全実績
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">0件</div>
              <div className="text-gray-600">重大事故件数</div>
              <div className="text-sm text-gray-500">（2019年〜現在）</div>
            </div>
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">100%</div>
              <div className="text-gray-600">法定点検実施率</div>
              <div className="text-sm text-gray-500">（毎年）</div>
            </div>
            <div className="bg-daisou-bg p-6 rounded-xl">
              <div className="text-3xl font-bold text-daisou-accent mb-2">月1回</div>
              <div className="text-gray-600">安全講習実施</div>
              <div className="text-sm text-gray-500">（全運転者対象）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
