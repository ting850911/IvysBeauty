import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  transpilePackages: [
    "@ivysbeauty/shared",
    "@ivysbeauty/database",
    "@ivysbeauty/ui",
    "@ivysbeauty/core-logic"
  ],
  output: "standalone",
};

export default nextConfig;
