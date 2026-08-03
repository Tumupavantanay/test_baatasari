import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Allow GSAP and other client-only packages
  transpilePackages: [],
};

export default nextConfig;
