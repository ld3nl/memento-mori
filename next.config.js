/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    },
  },
  webpack5: false
}

module.exports = nextConfig
