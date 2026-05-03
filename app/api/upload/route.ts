import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// تهيئة Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // رفع الصورة لـ Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "sat-pro/users",
      transformation: [
        { width: 1000, crop: "limit" },
        { quality: "auto" },
      ],
    });

    return NextResponse.json({ 
      success: true, 
      url: uploadResponse.secure_url 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to upload image",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}