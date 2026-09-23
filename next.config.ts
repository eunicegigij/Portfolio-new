import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
