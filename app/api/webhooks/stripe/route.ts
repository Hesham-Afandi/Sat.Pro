// ⚠️ مؤقتاً معطل لحد ما نضيف مفاتيح Stripe
export async function POST(request: Request) {
  return new Response(JSON.stringify({ 
    message: "Webhook disabled temporarily" 
  }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const dynamic = 'force-dynamic';
