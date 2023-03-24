const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const fs = require("fs");

const generateSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: "https://memento-mori-psi.vercel.app",
  });

  const pipeline = smStream.pipe(createGzip());

  // Add static pages to the sitemap
  smStream.write({ url: "/", changefreq: "daily", priority: 0.9 });
  smStream.write({ url: "/about", changefreq: "weekly", priority: 0.8 });
  smStream.write({ url: "/contact", changefreq: "monthly", priority: 0.7 });

  // Add dynamic pages to the sitemap
//   const dynamicPages = ["blog", "product"];
//   const currentDate = new Date().toISOString().slice(0, 10);
//   dynamicPages.forEach((page) => {
//     smStream.write({
//       url: `/${page}/${currentDate}`,
//       changefreq: "daily",
//       priority: 0.8,
//     });
//   });

  // End the sitemap stream
  smStream.end();

  // Return the sitemap as a string
  const sitemap = await streamToPromise(pipeline);
  return sitemap.toString();
};

module.exports = generateSitemap;
