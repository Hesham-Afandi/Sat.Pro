// lib/useSessionSafe.ts
// Hook آمن بيرجع قيمة افتراضية لما الـ Auth يكون معطل

export function useSessionSafe() {
  return {
    data: {
      user: { 
        id: "demo-user", 
        email: "demo@example.com", 
        name: "مستخدم تجريبي",
        role: "user"
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: "authenticated" as const,
    update: () => Promise.resolve(),
  };
}

// ✅ دالة مساعدة عشان تجيب الـ session مباشرة
export function getSessionSafe() {
  return {
    user: { 
      id: "demo-user", 
      email: "demo@example.com", 
      name: "مستخدم تجريبي",
      role: "user"
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}
