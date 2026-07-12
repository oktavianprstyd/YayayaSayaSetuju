/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  swcMinify: false,
  webpack: (config) => {
    // Disable SWC loader / compiler by forcing babel or fallback options if necessary
    return config;
  }
};

module.exports = nextConfig;
