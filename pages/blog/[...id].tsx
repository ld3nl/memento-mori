import { useRouter } from "next/router";

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
    <div>
      <Link href={"/blog"}>
        <button>Back</button>
      </Link>
      <h1> {article.data.attributes.title}</h1>
      {useHtmlParser(article.data.attributes.body.processed)}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  let node, article, error, errorCode;
  try {
    node = await jsonApiClient(
      "https://dev-cms-creativeflow-agency.pantheonsite.io",
      "translatePath",
      {
        parameters: {
          path: params.resolvedUrl,
        },
      }
    );

    article = await jsonApiClient(
      "https://dev-cms-creativeflow-agency.pantheonsite.io",
      "article",
      {
        parameters: {
          id: node.entity.uuid,
        },
      }
    );
  } catch (e) {
    error = await ApiError.errorToHumanString(e);
    errorCode = e.status || 500;
  }
  return {
    props: {
      article,
    },
  };
};
