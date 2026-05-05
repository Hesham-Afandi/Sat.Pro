/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // تجاهل أخطاء TypeScript فقط
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
