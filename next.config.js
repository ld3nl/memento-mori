/** @type {import('next').NextConfig} */
const generateSitemap = require("./next-sitemap");

const nextConfig = {
  reactStrictMode: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    },
  },
  webpack5: false,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  async exportPathMap() {
    const sitemap = await generateSitemap();
    fs.writeFileSync("./public/sitemap.xml", sitemap);
    return {};
  },  
}

module.exports = nextConfig
