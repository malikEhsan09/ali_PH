import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'gobispaint.com.pk' },
      { protocol: 'https', hostname: 'happilacpaints.com' },
      { protocol: 'https', hostname: 'bluebirdpaints.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
};

export default nextConfig;
