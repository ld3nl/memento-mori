import { GetServerSideProps } from "next";
import { jsonApiClient, ApiError } from "./api/drupalApi";

const createSitemap = (articles: { data: any }) =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url>
      <loc>https://creativeflow.agency</loc>
      <lastmod>2023-03-25T10:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>         
    </url>
    <url>
      <loc>https://creativeflow.agency/about</loc>
      <lastmod>2023-03-24T12:00:00+00:00</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>         
    </url>
    <url>
      <loc>https://creativeflow.agency/blog</loc>
      <lastmod>2023-03-24T12:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>         
    </url>    
    <!-- Add URLs for blog posts -->
    ${articles.data
      .map((article: any, i: number) => {
        return `
          <url>
            <loc>https://creativeflow.agency${article.attributes.path.alias}</loc>
            <lastmod>${article.attributes.changed}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>         
          </url>
        `;
      })
      .join("")}
  </urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let articles, error, errorCode;
  try {
    if (!process.env.DRUPAL_API_URL) {
      throw new Error("DRUPAL_API_URL environment variable is not defined");
    }
    res.setHeader(
      "Cache-Control",
      "public, max-age=28800, stale-while-revalidate=28800"
    );
    res.setHeader("Content-Type", "text/xml");
    articles = await jsonApiClient(process.env.DRUPAL_API_URL, "articles", {});
    res.write(createSitemap(articles));
    res.end();
  } catch (e: any) {
    error = await ApiError.errorToHumanString(e);
    errorCode = e.status || 500;
  }

  return { props: {} };
};

export default () => null;
