// ⚠️ امسح كل القديم أولاً ثم الصق ده

import Link from "next/link";

export default function PricingPage() {
  // ❌ امسح أي سطر فيه: import { useSession } from "next-auth/react";
  // ❌ امسح أي سطر فيه: const {  session } = useSession();

  const plans = [
    {
      name: "مجاني",
      price: "0",
      period: "دائماً",
      features: ["3 دروس مجانية", "امتحان تجريبي واحد", "متابعة أساسية"],
      cta: "ابدأ مجاناً",
      href: "/register",
      popular: false,
    },
    {
      name: "محترف",
      price: "49",
      period: "شهرياً",
      features: ["كل الكورسات", "امتحانات غير محدودة", "تحليل أداء مفصل", "دعم فني", "شهادة إتمام"],
      cta: "اشترك الآن",
      href: "/register",
      popular: true,
    },
    {
      name: "مميز",
      price: "99",
      period: "شهرياً",
      features: ["كل مميزات محترف", "جلسات خاصة أونلاين", "خطة دراسة مخصصة", "أولوية الدعم", "تحديثات دائمة"],
      cta: "احصل على المميز",
      href: "/register",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">اختر الخطة المناسبة لك</h1>
          <p className="text-xl text-gray-600">استثمر في مستقبلك وابدأ رحلة التحضير لاختبار الـ SAT</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 transition ${
                plan.popular ? "border-indigo-600 shadow-lg scale-105" : "border-gray-100 hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                  الأكثر شعبية
                </span>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full py-3 px-6 text-center font-medium rounded-xl transition ${
                  plan.popular 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">أسئلة شائعة</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-right">
              <h4 className="font-bold text-gray-900 mb-2">هل يمكنني التغيير بين الخطط لاحقاً؟</h4>
              <p className="text-gray-600">نعم، يمكنك الترقية أو التخفيض في أي وقت من لوحة التحكم.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-right">
              <h4 className="font-bold text-gray-900 mb-2">هل هناك ضمان استرداد الأموال؟</h4>
              <p className="text-gray-600">نعم، ضمان استرداد كامل خلال 7 أيام إذا لم تكن راضياً.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
