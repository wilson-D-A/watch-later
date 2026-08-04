import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.23"],
  rewrites: async () => [
    {
      source: "/backend/:path*",
      destination: "https://watchlater-681724086022.us-east1.run.app/:path*",
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
