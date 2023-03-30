import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { jsonApiClient, ApiError } from "../api/drupalApi";
import Nav from "@/components/Nav";

interface Props {
  articles: any;
}

export default function BlogHome({ articles }: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Visualize Your Life in Weeks | Blog</title>
        <meta
          name="description"
          content="Unlock Your True Potential with Our Interactive Life Visualization Tool
          Looking for a powerful way to make the most of your time and unlock your true potential? Look no further than our interactive life visualization tool. Designed to help you visualize your life in weeks, this tool can provide a range of benefits, including improved focus, heightened perspective on life, and a rush of motivation to take consistent action. With each passing week, simply fill in a new square and watch as your progress grows. It's an easy and effective way to stay on track and make the most of every moment. Start visualizing your life in weeks today with our user-friendly tool."
        />
        <meta
          name="keywords"
          content="life visualization, true potential, weekly ritual, hyperawareness, Memento Mori, improved perspective, fear of failure, motivation, reflection, change, productivity"
        />
        <meta name="author" content="Stoic" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0"
        />

        <meta
          name="google-site-verification"
          content="RVviQSzXUtqmgWMTl-js86aPjGV9ui3l5fepFFp-o5Q"
        />
      </Head>
      <div>
        <h1>Blog posts</h1>
        {articles?.data?.map((article: any, i: number) => (
          <Link key={`title-${i}}`} href={article.attributes.path.alias}>
            <h2>{article.attributes.title}</h2>
          </Link>
        ))}
        <Nav />
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
