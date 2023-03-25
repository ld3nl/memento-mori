import { GetServerSideProps } from "next";

const createSitemap = () =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--We manually set the two URLs we know already-->
  <url>
    <loc>https://memento-mori.vercel.app</loc>
    <lastmod>2023-03-25T10:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>         
  </url>
  <url>
    <loc>https://memento-mori.vercel.app/about</loc>
    <lastmod>2023-03-24T12:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>         
  </url>
</urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, max-age=28800, stale-while-revalidate=28800"
  );
  res.setHeader("Content-Type", "text/xml");
  // res.write(sitemap);
  res.write(createSitemap());

  res.end();

  return { props: {} };
};

export default () => null;
