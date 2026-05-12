// ️ تعطيل مؤقت للـ Auth عشان الموقع يشتغل مستقر
export const auth = async () => null;
export const signIn = async () => ({ error: undefined });
export const signOut = async () => {};

export const handlers = {
  GET: () => new Response(JSON.stringify({ message: "Auth temporarily disabled" }), { status: 200 }),
  POST: () => new Response(JSON.stringify({ message: "Auth temporarily disabled" }), { status: 200 }),
};
