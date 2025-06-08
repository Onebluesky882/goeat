import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
        pathname: "**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
