import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bus, Calendar, Clock, Milestone, CircleDollarSign, BedDouble, Moon } from 'lucide-react';

// --- ページ内テキストデータ ---
const pageText = {
  ja: {
    title: "料金シミュレーター",
    subtitle: "簡単なステップで貸切バスの概算料金をご確認いただけます。",
    step1: "STEP 1: ご利用内容",
    tripType: "ご利用形態",
    dayTrip: "日帰り",
    overnight: "宿泊",
    nightsLabel: "ご宿泊日数",
    nightsUnit: "泊",
    daysUnit: "日",
    passengersLabel: "ご利用人数",
    busTypeLabel: "バスタイプ",
    busTypeLarge: "大型バス",
    busTypeMedium: "中型バス",
    busTypeSmall: "小型・マイクロバス",
    step2: "STEP 2: ご利用時間と走行距離",
    departureDateLabel: "出発日",
    departureTimeLabel: "出発時刻",
    returnTimeLabel: "帰着時刻（最終日）",
    timeNote: "※ 料金計算時には、運行前後の安全点検時間（2時間）が自動加算されます。",
    mileageLabel: "総走行距離 (km)",
    mileageNote: "※ 車庫から出発し、車庫に戻るまでの合計距離をご入力ください。",
    lateNightLabel: "22時～翌5時の深夜早朝運行を含む",
    resultTitle: "概算料金",
    timeFare: "時間制運賃",
    kiloFare: "キロ制運賃",
    accommodationFee: "乗務員宿泊費 (概算)",
    lateNightSurcharge: "深夜早朝料金",
    totalFare: "合計金額（概算・税込）",
    resultRestrained: "拘束",
    resultHours: "時間",
    resultDays: "日間",
    resultMileage: "走行",
    resultNights: "泊",
    disclaimerTitle: "【ご注意】",
    disclaimer1: "※ 上記はシミュレーション上の概算料金です。",
    disclaimer2: "※ 深夜早朝料金は、拘束時間全体に一律の割増率を適用する概算です。",
    disclaimer3: "※ 有料道路代、駐車場代、ガイド代等は別途実費でご請求いたします。",
  },
  en: {
    title: "Fare Simulator",
    subtitle: "Check the estimated charter bus fare with a few simple steps.",
    step1: "STEP 1: Usage Details",
    tripType: "Trip Type",
    dayTrip: "Day Trip",
    overnight: "Overnight",
    nightsLabel: "Number of Nights",
    nightsUnit: "night(s)",
    daysUnit: "day(s)",
    passengersLabel: "Number of Passengers",
    busTypeLabel: "Bus Type",
    busTypeLarge: "Large Bus",
    busTypeMedium: "Mid-size Bus",
    busTypeSmall: "Small/Microbus",
    step2: "STEP 2: Time and Distance",
    departureDateLabel: "Departure Date",
    departureTimeLabel: "Departure Time",
    returnTimeLabel: "Return Time (Last Day)",
    timeNote: "※ A mandatory 2-hour safety inspection time will be added automatically for fare calculation.",
    mileageLabel: "Total Mileage (km)",
    mileageNote: "※ Please enter the approximate total mileage from our garage and back.",
    lateNightLabel: "Includes late-night/early-morning driving (22:00-05:00)",
    resultTitle: "Estimated Fare",
    timeFare: "Time-based Fare",
    kiloFare: "Kilometer-based Fare",
    accommodationFee: "Driver's Accommodation (Est.)",
    lateNightSurcharge: "Late-Night Surcharge",
    totalFare: "Estimated Total (Tax Inc.)",
    resultRestrained: "Restrained",
    resultHours: "hours",
    resultDays: "day(s)",
    resultMileage: "Mileage",
    resultNights: "night(s)",
    disclaimerTitle: "[NOTE]",
    disclaimer1: "※ The fare above is an estimate based on this simulation.",
    disclaimer2: "※ The late-night surcharge is an estimate applying a flat rate increase to the entire restrained time.",
    disclaimer3: "※ Toll fees, parking fees, guide fees, etc., will be charged separately at actual cost.",
  }
};

// --- 料金データ ---
const busRatesData = {
  large: { hourly: 6720, kilo: 160, lateNightSurchargeRate: 0.2 },
  medium: { hourly: 5630, kilo: 130, lateNightSurchargeRate: 0.2 },
  small: { hourly: 4890, kilo: 110, lateNightSurchargeRate: 0.2 },
};
const DRIVER_ACCOMMODATION_FEE_PER_NIGHT = 15000;

type BusType = keyof typeof busRatesData;

const QuoteSimulator: React.FC = () => {
  const { language } = useLanguage();
  const texts = language === 'en' ? pageText.en : pageText.ja;
  
  const today = new Date().toISOString().split('T')[0];
  const [inputs, setInputs] = useState({
    tripType: 'day_trip' as ('day_trip' | 'overnight'),
    nights: 1,
    passengers: 20,
    busType: 'medium' as BusType,
    departureDate: today,
    startTime: '09:00',
    endTime: '17:00',
    mileage: 150,
    hasLateNightDriving: false,
  });

  const [result, setResult] = useState({
    timeFare: 0,
    kiloFare: 0,
    accommodationFee: 0,
    lateNightSurcharge: 0,
    totalFare: 0,
    restrainedHours: 0,
    days: 1,
  });

  useEffect(() => {
    const calculateFare = () => {
      const { tripType, nights, busType, departureDate, startTime, endTime, mileage, hasLateNightDriving } = inputs;
      if (!busType || !departureDate || !startTime || !endTime || !mileage) return;

      const rates = busRatesData[busType];
      const mileageNum = Number(mileage);

      let restrainedHours = 0;
      let accommodationFee = 0;
      let days = 1;

      if (tripType === 'overnight') {
        days = nights + 1;
        restrainedHours = (days * 10) + 2;
        accommodationFee = nights * DRIVER_ACCOMMODATION_FEE_PER_NIGHT;
      } else {
        const start = new Date(`2000-01-01T${startTime}`);
        let end = new Date(`2000-01-01T${endTime}`);
        if (end <= start) end.setDate(end.getDate() + 1);
        
        let usageHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        usageHours = Math.max(usageHours, 3);
        restrainedHours = usageHours + 2;
      }
      
      const timeFare = restrainedHours * rates.hourly;
      const kiloFare = mileageNum * rates.kilo;
      const lateNightSurcharge = hasLateNightDriving ? (timeFare * rates.lateNightSurchargeRate) : 0;
      
      const totalFare = timeFare + kiloFare + accommodationFee + lateNightSurcharge;

      setResult({ timeFare, kiloFare, accommodationFee, lateNightSurcharge, totalFare, restrainedHours, days });
    };

    calculateFare();
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        setInputs(prev => ({...prev, [name]: (e.target as HTMLInputElement).checked}));
    } else {
        setInputs(prev => ({ ...prev, [name]: name === 'passengers' || name === 'mileage' || name === 'nights' ? Number(value) : value }));
    }
  };
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-daisou-text mb-4">{texts.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{texts.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <form className="space-y-10">
              <fieldset>
                <legend className="text-2xl font-bold text-daisou-text mb-6">{texts.step1}</legend>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{texts.tripType}</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center"><input type="radio" name="tripType" value="day_trip" checked={inputs.tripType === 'day_trip'} onChange={handleInputChange} className="h-4 w-4 text-daisou-accent focus:ring-daisou-accent"/> <span className="ml-2">{texts.dayTrip}</span></label>
                      <label className="flex items-center"><input type="radio" name="tripType" value="overnight" checked={inputs.tripType === 'overnight'} onChange={handleInputChange} className="h-4 w-4 text-daisou-accent focus:ring-daisou-accent"/> <span className="ml-2">{texts.overnight}</span></label>
                    </div>
                  </div>
                  {inputs.tripType === 'overnight' && (
                    <div>
                      <label htmlFor="nights" className="block text-sm font-semibold text-gray-700 mb-2">{texts.nightsLabel}</label>
                      <select id="nights" name="nights" value={inputs.nights} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg">
                        {[...Array(10).keys()].map(n => <option key={n+1} value={n+1}>{n+1}{texts.nightsUnit}{n+2}{texts.daysUnit}</option>)}
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 mb-2">{texts.passengersLabel}</label>
                      <input type="number" id="passengers" name="passengers" value={inputs.passengers} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg"/>
                    </div>
                    <div>
                      <label htmlFor="busType" className="block text-sm font-semibold text-gray-700 mb-2">{texts.busTypeLabel}</label>
                      <select id="busType" name="busType" value={inputs.busType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg">
                        <option value="medium">{texts.busTypeMedium}</option>
                        <option value="large">{texts.busTypeLarge}</option>
                        <option value="small">{texts.busTypeSmall}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-2xl font-bold text-daisou-text mb-6">{texts.step2}</legend>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="departureDate" className="block text-sm font-semibold text-gray-700 mb-2">{texts.departureDateLabel}</label>
                    <input type="date" id="departureDate" name="departureDate" value={inputs.departureDate} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700 mb-2">{texts.departureTimeLabel}</label>
                      <input type="time" id="startTime" name="startTime" value={inputs.startTime} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg" />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-semibold text-gray-700 mb-2">{texts.returnTimeLabel}</label>
                      <input type="time" id="endTime" name="endTime" value={inputs.endTime} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg" />
                    </div>
                  </div>
                   <p className="text-xs text-gray-500 mt-1">{texts.timeNote}</p>
                  <div>
                    <label htmlFor="mileage" className="block text-sm font-semibold text-gray-700 mb-2">{texts.mileageLabel}</label>
                    <input type="number" id="mileage" name="mileage" value={inputs.mileage} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-daisou-bg" />
                    <p className="text-xs text-gray-500 mt-1">{texts.mileageNote}</p>
                  </div>
                  <div className="flex items-center pt-4 border-t">
                    <input type="checkbox" id="hasLateNightDriving" name="hasLateNightDriving" checked={inputs.hasLateNightDriving} onChange={handleInputChange} className="h-4 w-4 text-daisou-accent rounded border-gray-300 focus:ring-daisou-accent"/>
                    <label htmlFor="hasLateNightDriving" className="ml-2 block text-sm font-semibold text-gray-700">{texts.lateNightLabel}</label>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="lg:col-span-2 bg-daisou-bg rounded-3xl shadow-xl p-8 lg:p-12 sticky top-12 self-start">
            <h2 className="text-2xl font-bold text-daisou-text flex items-center mb-6">
              <CircleDollarSign className="h-7 w-7 mr-3 text-daisou-accent"/>
              {texts.resultTitle}
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{texts.timeFare}</p>
                  <p className="text-xs text-gray-500">({texts.resultRestrained} {result.restrainedHours.toFixed(1)}{texts.resultHours} / {result.days}{texts.resultDays})</p>
                </div>
                <p className="text-xl font-bold text-daisou-text">{formatCurrency(result.timeFare)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{texts.kiloFare}</p>
                  <p className="text-xs text-gray-500">({texts.resultMileage} {inputs.mileage}km)</p>
                </div>
                <p className="text-xl font-bold text-daisou-text">{formatCurrency(result.kiloFare)}</p>
              </div>
              {inputs.tripType === 'overnight' && (
                <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">{texts.accommodationFee}</p>
                    <p className="text-xs text-gray-500">({inputs.nights}{texts.resultNights})</p>
                  </div>
                  <p className="text-xl font-bold text-daisou-text">{formatCurrency(result.accommodationFee)}</p>
                </div>
              )}
               {inputs.hasLateNightDriving && (
                <div className="bg-white p-4 rounded-lg flex justify-between items-center">
                  <p className="text-sm text-gray-600">{texts.lateNightSurcharge}</p>
                  <p className="text-xl font-bold text-daisou-text">{formatCurrency(result.lateNightSurcharge)}</p>
                </div>
              )}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-daisou-accent/50 text-right">
                <p className="text-lg font-semibold text-daisou-text">{texts.totalFare}</p>
                <p className="text-4xl font-extrabold text-daisou-accent">{formatCurrency(result.totalFare)}</p>
              </div>
            </div>
             <div className="mt-8 text-xs text-gray-600 bg-yellow-100/50 p-3 rounded-lg">
              <h5 className="font-bold mb-1">{texts.disclaimerTitle}</h5>
              <p>{texts.disclaimer1}</p>
              <p>{texts.disclaimer2}</p>
              <p>{texts.disclaimer3}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSimulator;