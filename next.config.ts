import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images.unsplash.com
  // https://ui-avatars.com
  // https://api.dicebear.com
  // (https://chemiki.b-cdn.net

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
      {
        protocol: "https",
        hostname: "chemiki.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
