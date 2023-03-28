import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { jsonApiClient, ApiError } from "../api/drupalApi";

interface Props {
  articles: any;
}

export default function BlogHome({ articles }: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Visualize Your Life in Weeks | Unlock Your True Potential</title>
        <meta
          name="description"
          content={article.data.attributes.body.summary}
        />

        <meta
          name="keywords"
          content="life visualization, true potential, weekly ritual, hyperawareness, Memento Mori, improved perspective, fear of failure, motivation, reflection, change, productivity"
        />
        <meta name="author" content="Stoic" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="google-site-verification"
          content="RVviQSzXUtqmgWMTl-js86aPjGV9ui3l5fepFFp-o5Q"
        />
      </Head>
      <div>
        {articles.data.map((article: any, i: number) => (
          <Link key={`title-${i}}`} href={article.attributes.path.alias}>
            <h1>{article.attributes.title}</h1>
          </Link>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  let articles, error, errorCode;
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
