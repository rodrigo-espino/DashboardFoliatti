// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Esto permite que la build continúe incluso si hay errores de linting
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
