// lib/useSessionSafe.ts
// Hook آمن بيرجع قيمة افتراضية لما الـ Auth يكون معطل

export function useSessionSafe() {
  try {
    // لو الـ NextAuth شغال، هيعمل الـ import عادي
    const { useSession } = require("next-auth/react");
    return useSession();
  } catch {
    // لو الـ Auth معطل، نرجع قيمة افتراضية
    return {
      data: {
        user: { id: "demo", email: "demo@example.com", name: "Demo User" },
        expires: new Date().toISOString(),
      },
      status: "authenticated",
      update: () => {},
    };
  }
}
