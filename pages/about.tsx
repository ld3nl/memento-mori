import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import useHtmlParser from "../hooks/useHtmlParser";
import { jsonApiClient, ApiError } from "./api/drupalApi";
import Nav from "@/components/Nav";

interface Props {
  page: any;
}

const About: React.FC<Props> = ({ page }) => {
  return (
    <>
      <Head>
        <title>
          Visualize Your Life in Weeks | {page?.data?.attributes.title}
        </title>
        <meta
          name="description"
          content={page?.data?.attributes.body.summary}
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

      <h1> {page?.data?.attributes.title}</h1>
      {useHtmlParser(page?.data?.attributes.body.processed)}

      <Nav />
    </>
  );
};

const DRUPAL_API_URL = process.env.DRUPAL_API_URL || "";

export const getStaticProps = async () => {
  let page, error, errorCode;

  try {
    // todo: fix this
    // TypeError: Failed to parse URL from /jsonapi/node/page/0e22c822-e2f8-4b40-8003-298c01c34cc7?fields%5Bnode--page%5D=title%2Cbody
    // case "page":
    //   url = `/jsonapi/node/page/${parameters.id}`;
    //   console.log(url);
    //   queryString = {
    //     fields: { "node--page": "title,body" },
    //   };
    //   break;
    page = await jsonApiClient(DRUPAL_API_URL, "page", {
      parameters: {
        id: "0e22c822-e2f8-4b40-8003-298c01c34cc7",
      },
    });
  } catch (e: any) {
    error = await ApiError.errorToHumanString(e);
    errorCode = e.status || 500;
  }
  return {
    props: {
      page: page || null,
      error: error || null,
      errorCode: errorCode || null,
    },
    revalidate: 60,
  };
};

export default About;
