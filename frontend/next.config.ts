import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        protocol: "https",
        hostname: "98.88.37.45",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
