/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure trailing slash is not causing issues
  trailingSlash: false,
  // Ensure case sensitivity is handled correctly
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Ensure correct handling of dynamic routes
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/login',
      },
      {
        source: '/dashboard/:slug*',
        destination: '/dashboard/:slug*',
      },
    ];
  },
  // Add cookie settings
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Set-Cookie',
            value: 'SameSite=Lax; Secure',
          },
        ],
      },
    ];
  },
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