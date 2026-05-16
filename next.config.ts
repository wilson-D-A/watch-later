import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */

	basePath: '/project',
	output: 'standalone',
	reactCompiler: true,
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
			},
		],
	},
};

export default nextConfig;
