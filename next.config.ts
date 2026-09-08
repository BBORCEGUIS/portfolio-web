import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-web",
  assetPrefix: "/portfolio-web",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: resolve(__dirname),
  },
};

export default nextConfig;
