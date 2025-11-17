import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "3.87.74.58",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "backend.masalamoves.co.uk",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "backend.masalamoves.co.uk",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "98.88.37.45",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
