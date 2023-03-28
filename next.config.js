/** @type {import('next').NextConfig} */
const {
  NODE_ENV = "development",
  DRUPAL_API_URL,
  APP_DOMAIN,
  SHOW_HTTP_LOGS,
} = process.env;

const env = {
  appDomain: APP_DOMAIN,
  DRUPAL_API_URL: DRUPAL_API_URL,
};

let imageDomains = [];
const imageDomainsStr = process.env.DRUPAL_IMAGE_DOMAINS || '';
if (imageDomainsStr.length > 0) {
  imageDomains = imageDomainsStr.split(',');
}

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
  images: {
    domains: imageDomains,
  },
}

module.exports = nextConfig
