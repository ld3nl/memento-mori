import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";

import useHtmlParser from "../../hooks/useHtmlParser";

import { jsonApiClient, ApiError } from "../api/drupalApi";

interface Props {
  article: any;
}

export default function DynamicBlog({ article }: Props) {
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
        <Link href={"/blog"}>
          <button>Back</button>
        </Link>
        <h1> {article.data.attributes.title}</h1>
        {useHtmlParser(article.data.attributes.body.processed)}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  let node, article, error, errorCode;
  try {
    if (!process.env.DRUPAL_API_URL) {
      throw new Error("DRUPAL_API_URL environment variable is not defined");
    }

    node = await jsonApiClient(process.env.DRUPAL_API_URL, "translatePath", {
      parameters: {
        path: params.resolvedUrl,
      },
    });

    article = await jsonApiClient(process.env.DRUPAL_API_URL, "article", {
      parameters: {
        id: node.entity.uuid,
      },
    });
  } catch (e: any) {
    error = await ApiError.errorToHumanString(e);
    errorCode = e.status || 500;
  }
  return {
    props: {
      article,
    },
  };
};
