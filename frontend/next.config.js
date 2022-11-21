/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = nextConfig
