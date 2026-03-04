import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
        pathname: "/CRDImages/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
