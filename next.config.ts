import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'pitch.balabite.ai' }],
        destination: '/pitch',
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'pitch.balabite.ai' }],
        destination: '/pitch/:path*',
      },
    ];
  },
};

export default nextConfig;
