/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/taco-night-planner',
    assetPrefix: '/taco-night-planner/',
  } : {}),
}

export default nextConfig
