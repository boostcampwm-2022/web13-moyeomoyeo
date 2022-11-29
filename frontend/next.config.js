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
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async rewrites() {
    const apiUrl = process.env.NODE_ENV === 'development' ? process.env.DEV_API_URL : process.env.PROD_API_URL;
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`
      }
    ]
  }
}

module.exports = nextConfig
