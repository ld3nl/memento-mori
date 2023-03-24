import { GetServerSideProps } from "next";

const generateSiteMap = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>https://memento-mori-psi.vercel.app</loc>
       </url>
       <url>
         <loc>https://memento-mori-psi.vercel.app/about</loc>
       </url>
     </urlset>
   `;
};

const SiteMap = () => {
  return null; // render nothing for this component
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SiteMap;
