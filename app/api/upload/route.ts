// مؤقتاً معطل لحد ما نصلح cloudinary
export async function POST(request: Request) {
  return new Response(JSON.stringify({ 
    error: "Upload disabled temporarily" 
  }), { 
    status: 501,
    headers: { 'Content-Type': 'application/json' }
  });
}
