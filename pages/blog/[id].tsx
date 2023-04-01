import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import useHtmlParser from "../../hooks/useHtmlParser";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";

interface Article {
  data: {
    id: string;
    attributes: {
      title?: string;
      path?: { alias?: string };
      body?: { processed?: string; summary?: string };
    };
  };
}

interface Props {
  article: Article;
}

export default function BlogPage({ article }: Props) {
  return (
    <>
      <Head>
        <title>
          Visualize Your Life in Weeks | Blog:{" "}
          {article?.data?.attributes?.title}{" "}
        </title>
        <meta
          name="description"
          //   content={article?.data?.attributes?.body.summary}
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
        <Link href={"/blog"}>
          <button>Back</button>
        </Link>
        <h1>{article.data.attributes.title}</h1>
        {useHtmlParser(article.data.attributes.body?.processed || "")}
        <Nav />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://dev-cms-creativeflow-agency.pantheonsite.io/jsonapi/node/article"
  );
  const { data: articles } = await res.json();
  const paths = articles.map((data: any) => {
    const { attributes } = data;
    return {
      params: { id: attributes?.path?.alias?.replace(/^\/blog\//, "") },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  let article;
  try {
    if (!params?.id) {
      throw new Error("params?.id is not defined");
    }
    const res = await fetch(
      `https://dev-cms-creativeflow-agency.pantheonsite.io/router/translate-path?path=blog/${params.id}`
    );
    const data = await res.json();
    const res2 = await fetch(
      `https://dev-cms-creativeflow-agency.pantheonsite.io/jsonapi/node/article/${data.entity.uuid}?[fields][node--article]=title,body`
    );
    article = await res2.json();
  } catch (error) {
    // handle the error here
  }

  return { props: { article }, revalidate: 86400 };
};
