'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";

// تعريف الأنواع
interface Course {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  category: string | null;
  level: string;
  isPublished: boolean;
}

// بيانات الفلاتر
const grades = [
  { value: 'all', label: 'كل الصفوف' },
  { value: 'grade1', label: 'الصف الأول' },
  { value: 'grade2', label: 'الصف الثاني' },
  { value: 'grade3', label: 'الصف الثالث' },
  { value: 'grade4', label: 'الصف الرابع' },
  { value: 'grade5', label: 'الصف الخامس' },
  { value: 'grade6', label: 'الصف السادس' },
  { value: 'grade7', label: 'الصف السابع' },
  { value: 'grade8', label: 'الصف الثامن' },
  { value: 'grade9', label: 'الصف التاسع' },
  { value: 'grade10', label: 'الصف العاشر' },
  { value: 'grade11', label: 'الحادي عشر' },
  { value: 'grade12', label: 'الثاني عشر' },
  { value: 'sat', label: 'SAT' },
  { value: 'act', label: 'ACT' },
];

const semesters = [
  { value: 'all', label: 'كل الفصول' },
  { value: 'first', label: 'الأول' },
  { value: 'second', label: 'الثاني' },
  { value: 'third', label: 'الثالث' },
];

const paths = [
  { value: 'all', label: 'كل المسارات' },
  { value: 'general', label: 'عام' },
  { value: 'advanced', label: 'متقدم' },
];

const subjects = [
  { value: 'all', label: 'كل المواد' },
  { value: 'Math', label: 'الرياضيات' },
  { value: 'English', label: 'اللغة الإنجليزية' },
  { value: 'Arabic', label: 'اللغة العربية' },
  { value: 'Physics', label: 'الفيزياء' },
  { value: 'Chemistry', label: 'الكيمياء' },
  { value: 'Biology', label: 'الأحياء' },
  { value: 'History', label: 'التاريخ' },
  { value: 'Geography', label: 'الجغرافيا' },
  { value: 'Science', label: 'العلوم' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // الفلاتر
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedPath, setSelectedPath] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // جلب الكورسات
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = [...courses];

    // لو مش مختار SAT، مظهرش الكورسات
    if (selectedGrade !== 'sat' && selectedGrade !== 'act') {
      setFilteredCourses([]);
      return;
    }

    // فلتر الصف (SAT أو ACT)
    if (selectedGrade === 'sat' || selectedGrade === 'act') {
      filtered = filtered.filter(course => 
        course.level?.toLowerCase().includes(selectedGrade) || 
        course.category?.toLowerCase().includes(selectedGrade) ||
        course.title?.toLowerCase().includes(selectedGrade)
      );
    }

    // فلتر المسار
    if (selectedPath !== 'all') {
      filtered = filtered.filter(course => 
        course.category?.toLowerCase().includes(selectedPath) ||
        course.level?.toLowerCase().includes(selectedPath)
      );
    }

    // فلتر المادة
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(course => 
        course.subject === selectedSubject
      );
    }

    // البحث النصي
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  }, [selectedGrade, selectedPath, selectedSubject, searchQuery, courses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            الكورسات المتاحة
          </h1>
          <p className="text-lg text-gray-600">
            اختر الكورس المناسب وابدأ رحلة التعلم
          </p>
        </div>

        {/* الفلاتر */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* البحث */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 ابحث عن كورس
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم أو الوصف..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* الصف */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📚 الصف
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>

            {/* المسار */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🎯 المسار
              </label>
              <select
                value={selectedPath}
                onChange={(e) => setSelectedPath(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {paths.map(path => (
                  <option key={path.value} value={path.value}>
                    {path.label}
                  </option>
                ))}
              </select>
            </div>

            {/* المادة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📖 المادة
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* رسالة توضيحية */}
          <div className="mt-4 p-4 bg-blue-50 border-r-4 border-blue-500 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>ملاحظة:</strong> اختر <strong>SAT</strong> أو <strong>ACT</strong> من قائمة الصفوف لعرض الكورسات المتاحة
            </p>
          </div>

          {/* زر إعادة تعيين الفلاتر */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {selectedGrade === 'sat' || selectedGrade === 'act' ? (
                <>
                  تم العثور على <span className="font-bold text-indigo-600">{filteredCourses.length}</span> كورس
                </>
              ) : (
                <>
                  اختر <span className="font-bold text-indigo-600">SAT</span> أو <span className="font-bold text-indigo-600">ACT</span> لعرض الكورسات
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedPath('all');
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition"
            >
              🔄 إعادة تعيين
            </button>
          </div>
        </div>

        {/* الكورسات */}
        {selectedGrade !== 'sat' && selectedGrade !== 'act' ? (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              اختر SAT أو ACT لعرض الكورسات
            </h3>
            <p className="text-gray-500 mb-4">
              الكورسات متاحة فقط لاختبارات SAT و ACT
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setSelectedGrade('sat')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold"
              >
                عرض كورسات SAT
              </button>
              <button
                onClick={() => setSelectedGrade('act')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold"
              >
                عرض كورسات ACT
              </button>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لا توجد كورسات مطابقة للبحث
            </h3>
            <p className="text-gray-500">
              جرب تغيير الفلاتر أو ابحث عن شيء آخر
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  {/* الشارات */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                      {course.level === 'beginner' || course.level?.includes('general') ? 'عام' : 
                       course.level?.includes('advanced') ? 'متقدم' : 'متخصص'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.subject || 'عام'}
                    </span>
                  </div>

                  {/* العنوان */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* الوصف */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description || 'وصف الكورس سيظهر هنا...'}
                  </p>

                  {/* الفئة */}
                  {course.category && (
                    <div className="mb-4">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </div>
                  )}

                  {/* الفوتر */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-indigo-600">
                      ابدأ الآن ←
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {course.isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}