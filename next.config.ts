import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Skip TypeScript build errors during production build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
