import generateSitemap from "../../next-sitemap";

export default async function handler(req, res) {
  const sitemap = await generateSitemap();
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();
}
