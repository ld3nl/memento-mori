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
          Visualize Your Life in Weeks | {page.data.attributes.title}
        </title>
        <meta name="description" content={page.data.attributes.body.summary} />

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

      <h1> {page.data.attributes.title}</h1>
      {useHtmlParser(page.data.attributes.body.processed)}

      <Nav />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  let node, page, error, errorCode;
  try {
    if (!process.env.DRUPAL_API_URL) {
      throw new Error("DRUPAL_API_URL environment variable is not defined");
    }

    node = await jsonApiClient(process.env.DRUPAL_API_URL, "translatePath", {
      parameters: {
        path: params.resolvedUrl,
      },
    });

    page = await jsonApiClient(process.env.DRUPAL_API_URL, "page", {
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
      page,
    },
  };
};

export default About;
