"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfilePage() {
  const {  session, status } = useSession();
  const router = useRouter();
  const { t, dir } = useLanguage();

  // حالة التحميل
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // صور البروفايل والغلاف - قيم افتراضية
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // بيانات الطالب
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    grade: "Grade 10",
    school: "",
    bio: "",
  });

  // تحميل البيانات عند فتح الصفحة
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user) {
        setFormData({
          name: session.user.name || "",
          email: session.user.email || "",
          phone: "",
          address: "",
          grade: "Grade 10",
          school: "",
          bio: "",
        });
        
        // صور افتراضية
        setProfileImage(session.user.image || "/default-avatar.png");
        setCoverImage("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop");
      }
      setLoading(false);
    }
  }, [status, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl font-bold text-gray-500 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  // دوال رفع الصور
  const uploadImageToCloudinary = async (base64File: string) => {
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: base64File }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setProfileImage(base64);
        
        const imageUrl = await uploadImageToCloudinary(base64);
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setCoverImage(base64);
        
        const imageUrl = await uploadImageToCloudinary(base64);
        if (imageUrl) {
          setCoverImage(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          profileImage: profileImage,
          coverImage: coverImage,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        alert("Profile saved successfully!");
      } else {
        alert("Error saving profile");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div dir={dir} className="min-h-screen bg-gray-50 font-sans">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <span className="font-bold text-xl hidden md:block text-gray-800">SAT PRO</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition text-sm">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          
          {/* 1. غلاف البروفايل (Cover Image) - مع Conditional Rendering */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative group">
            {coverImage ? (
              <img 
                src={coverImage} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            )}
            
            {/* زر تعديل الغلاف */}
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <label className="cursor-pointer bg-white p-3 rounded-full shadow-lg hover:scale-110 transition">
                  <span className="text-xl">📷</span>
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </label>
              </div>
            )}
          </div>

          {/* معلومات البروفايل */}
          <div className="px-6 pb-8 relative">
            
            {/* الصورة الشخصية والاسم */}
            <div className="flex flex-col md:flex-row items-end gap-4 -mt-16 mb-6">
              {/* الصورة الشخصية - مع Conditional Rendering */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-5xl font-bold">
                      {formData.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-1 right-1 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-md border-2 border-white">
                    <span className="text-sm text-white">📷</span>
                    <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* الاسم وأزرار التعديل */}
              <div className="flex-1 mb-2 md:mb-0">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none bg-transparent w-full"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
                )}
              </div>

              <div className="flex gap-2 mb-2">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2"
                    >
                      {saving ? "Saving..." : "💾 Save"}
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-700 mb-2">About Me</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Write something about yourself..."
                />
              ) : (
                <p className="text-gray-600">{formData.bio || "No bio added yet."}</p>
              )}
            </div>
          </div>
        </div>

        {/* Grid للمعلومات */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* معلومات الاتصال */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📞 Contact Info</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{formData.email}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                {isEditing ? (
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+20..." />
                ) : (
                  <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{formData.phone || "Not set"}</div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                {isEditing ? (
                  <input name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="City, Country" />
                ) : (
                  <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{formData.address || "Not set"}</div>
                )}
              </div>
            </div>
          </div>

          {/* المعلومات الأكاديمية */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🎓 Academic Info</h2>
            <div className="space-y-4">
              
              {/* اختيار الصف الدراسي G1-G12 */}
              <div>
                <label className="text-sm text-gray-500">Grade Level</label>
                {isEditing ? (
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={`Grade ${g}`}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="font-medium text-gray-900 bg-blue-50 text-blue-700 p-3 rounded-lg border font-bold">
                    {formData.grade}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500">School Name</label>
                {isEditing ? (
                  <input name="school" value={formData.school} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your School" />
                ) : (
                  <div className="font-medium text-gray-900 bg-gray-50 p-3 rounded-lg border">{formData.school || "Not set"}</div>
                )}
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}