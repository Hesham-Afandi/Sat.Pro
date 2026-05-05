/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // تجاهل أخطاء TypeScript و ESLint في الـ build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
