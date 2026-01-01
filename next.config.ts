import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images.unsplash.com
  // https://ui-avatars.com
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
    ],
  },
};

export default nextConfig;
