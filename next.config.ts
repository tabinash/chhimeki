import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images.unsplash.com
  // https://ui-avatars.com
  // https://api.dicebear.com

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
