// ⚠️ مؤقتاً معطل - للحل السريع
export const handlers = {
  GET: async (req: Request) => {
    return new Response(JSON.stringify({ message: "Auth disabled temporarily" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  },
  POST: async (req: Request) => {
    return new Response(JSON.stringify({ message: "Auth disabled temporarily" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  },
};

export const signIn = () => Promise.resolve("");
export const signOut = () => Promise.resolve("");
export const auth = () => Promise.resolve(null);
