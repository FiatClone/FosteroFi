import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images for Vercel
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  // Enable static exports if needed
  output: 'standalone',
  // Transpile packages for compatibility
  transpilePackages: ['lucide-react'],
  // Webpack configuration for Web3 compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Redirects if needed
  async redirects() {
    return [];
  },
};

export default nextConfig;
