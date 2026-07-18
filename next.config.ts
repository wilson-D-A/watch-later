import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */

  rewrites: async () => [
    {
      source: "/backend/:path*",
      destination: "http://127.0.0.1:8000/:path*",
    },
  ],

  output: "standalone",
  outputFileTracingRoot: projectRoot,
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
