import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { jsonApiClient, ApiError } from "../api/drupalApi";

interface Props {
  articles: any;
}

export default function BlogHome({ articles }: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {articles.data.map((article: any, i: number) => (
        <Link key={`title-${i}}`} href={article.attributes.path.alias}>
          <h1>{JSON.stringify(article.attributes.title)}</h1>
        </Link>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  let node, articles, error, errorCode;
  try {
    if (!process.env.DRUPAL_API_URL) {
      throw new Error("DRUPAL_API_URL environment variable is not defined");
    }
    articles = await jsonApiClient(process.env.DRUPAL_API_URL, "articles", {});
  } catch (e: any) {
    error = await ApiError.errorToHumanString(e);
    errorCode = e.status || 500;
  }
  return {
    props: {
      articles,
    },
  };
};
