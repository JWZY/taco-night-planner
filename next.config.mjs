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
  basePath: process.env.NODE_ENV === 'production' ? '/taco-night-planner' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taco-night-planner/' : '',
  trailingSlash: true,
}

export default nextConfig
