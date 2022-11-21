/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"]
    });
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    }
    return config;
  },
}

module.exports = nextConfig
