module.exports = {
  reactStrictMode: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    },
  },
}
