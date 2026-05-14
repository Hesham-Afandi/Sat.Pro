import Link from 'next/link';

export default function SATHomePage() {
  const subjects = [
    {
      name: 'الرياضيات',
      nameEn: 'Mathematics',
      icon: '📐',
      color: 'bg-blue-500',
      href: '/sat/math',
      description: 'جبر، هندسة، إحصاء، وحساب مثلثات',
    },
    {
      name: 'الفيزياء',
      nameEn: 'Physics',
      icon: '⚛️',
      color: 'bg-purple-500',
      href: '/sat/physics',
      description: 'ميكانيكا، كهرباء، مغناطيسية، وديناميكا',
    },
    {
      name: 'الكيمياء',
      nameEn: 'Chemistry',
      icon: '🧪',
      color: 'bg-green-500',
      href: '/sat/chemistry',
      description: 'كيمياء عضوية، غير عضوية، وتحليلية',
    },
    {
      name: 'اللغة الإنجليزية',
      nameEn: 'English',
      icon: '📖',
      color: 'bg-yellow-500',
      href: '/sat/english',
      description: 'قراءة، كتابة، قواعد، ومفردات',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* الهيدر */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            اختبارات SAT
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            اختر المادة اللي عايز تذاكرها
          </p>
          <p className="text-gray-500">
            كورسات شاملة، امتحانات تجريبية، ومراجعات نهائية
          </p>
        </div>

        {/* المواد */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjects.map((subject) => (
            <Link
              key={subject.nameEn}
              href={subject.href}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-indigo-200"
            >
              <div className={`${subject.color} p-8 text-white`}>
                <div className="text-6xl mb-4">{subject.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{subject.name}</h2>
                <p className="text-white/90 text-lg">{subject.nameEn}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                    استعرض الكورسات ←
                  </span>
                  <span className="text-gray-400 text-sm">
                    كورسات + امتحانات
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🎯 ليه تختار منصتنا؟</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">📚</div>
              <h4 className="font-bold mb-2">محتوى شامل</h4>
              <p className="text-white/80 text-sm">
                كورسات من الصفر للاحتراف
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">✍️</div>
              <h4 className="font-bold mb-2">امتحانات تجريبية</h4>
              <p className="text-white/80 text-sm">
                تدرب على أسئلة زي الامتحان الحقيقي
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="text-4xl mb-3">🎓</div>
              <h4 className="font-bold mb-2">مدرسين خبراء</h4>
              <p className="text-white/80 text-sm">
                شرح مبسط وطرق حل ذكية
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}