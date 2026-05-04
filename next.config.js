/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // إعدادات الصور عشان متحصلش مشاكل مع الروابط الخارجية
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
