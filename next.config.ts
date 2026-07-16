import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  rewrites: async () => [
    {
      source: "/backend/:path*",
      destination: "http://127.0.0.1:8000/:path*",
    },
  ],

  output: "standalone",
  reactCompiler: true,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
