import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bingo',
  assetPrefix: '/bingo/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
