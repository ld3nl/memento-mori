import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Link from "next/link";
import useHtmlParser from "@/hooks/useHtmlParser";
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
  bodyBionic?: string;
  path?: any;
}

export default function BlogPage({ article, bodyBionic, path }: Props) {
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
          <Link href={"/"}>
            <button>Memento Mori Online Table generator</button>
          </Link>
          <Link href={`/blog/${path}`}>
            <button>Disable Bionic Reading</button>
          </Link>
        </Link>
        <h1>{article.data.attributes.title}</h1>
        {useHtmlParser(bodyBionic || "")}
        <Nav />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://dev-cms-creativeflow-agency.pantheonsite.io/jsonapi/node/article?[fields][node--article]=path"
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
  let bodyBionic;
  let path;

  try {
    if (!params?.id) {
      throw new Error("params?.id is not defined");
    }

    path = params?.id;

    const res = await fetch(
      `https://dev-cms-creativeflow-agency.pantheonsite.io/router/translate-path?path=blog/${params.id}`
    );
    const data = await res.json();
    const res2 = await fetch(
      `https://dev-cms-creativeflow-agency.pantheonsite.io/jsonapi/node/article/${data.entity.uuid}?[fields][node--article]=title,body`
    );
    article = await res2.json();

    const wrapHalfOfWordsInStrong = (html: string) => {
      // Split the HTML into tags and plain text
      const parts = html.split(/(<[^>]*>)/);

      // Map over each plain text part, wrapping half of each word in a <strong> tag
      const wrappedParts = parts.map((part) => {
        if (part.startsWith("<")) {
          // This is an HTML tag, so return it unchanged
          return part;
        } else {
          // This is plain text, so split it into words and wrap them
          const words = part.split(" ");
          const wrappedWords = words.map((word) => {
            const wordLength = word.length;
            const halfLength = Math.ceil(wordLength / 2);
            const firstHalf = word.substring(0, halfLength);
            const secondHalf = word.substring(halfLength, wordLength);
            return `<strong>${firstHalf}</strong>${secondHalf}`;
          });
          return wrappedWords.join(" ");
        }
      });

      // Join the wrapped parts back into a string
      const wrappedHtml = wrappedParts.join("");

      // Return the wrapped HTML
      return wrappedHtml;
    };

    bodyBionic = wrapHalfOfWordsInStrong(
      article.data.attributes.body?.processed
    );

    bodyBionic = wrapHalfOfWordsInStrong(
      article.data.attributes.body?.processed
    );
  } catch (error) {
    // handle the error here
  }

  return { props: { article, bodyBionic, path }, revalidate: 60 };
};
