import React from "react";
import Head from "next/head";
import getConfig from "next/config";

import defaultMeta from "./DefaultMeta";

import { apiUrl } from "../../pages/api/drupalApi";

const {
  publicRuntimeConfig: { appDomain, siteName },
} = getConfig();

type Props = {
  routerPath?: string;
  pageTitle?: string;
};

type MetaTags = {
  [key: string]: string;
};

type MetaListProps = {
  metaTags: MetaTags;
};

const CanonicalMeta = ({ domain = "", routerPath = "" }) => {
  if (domain.length === 0) {
    return null;
  }
  return (
    <Head>
      <link rel="canonical" href={`https://${domain}${routerPath}`} />
      <meta
        name="dcterms.identifier"
        content={`https://${domain}${routerPath}`}
      />
      <meta property="og:url" content={`https://${domain}${routerPath}`} />
    </Head>
  );
};

const DctermsMeta = ({ key = "", content = "" }) => (
  <meta name={key} content={content} />
);

const OgMeta = ({ key = "", content = "" }) => (
  <meta property={key} content={content} />
);

const DefaultMeta = ({ key = "", content = "" }) => (
  <meta name={key} content={content} />
);

const MetaList = ({ metaTags }: MetaListProps) => (
  <Head>
    {Object.keys(metaTags).map((key) => {
      if (key.match(/^dcterms\./)) {
        return <DctermsMeta key={key} content={metaTags[key]} />;
      }
      if (key.match(/^og:/)) {
        return <OgMeta key={key} content={metaTags[key]} />;
      }
      return <DefaultMeta key={key} content={metaTags[key]} />;
    })}
  </Head>
);

const HeadMeta: React.FunctionComponent<Props> = ({
  routerPath = "",
  pageTitle = "",
}) => {
  const fullPageTitle =
    pageTitle.length > 0 ? `${pageTitle} | ${siteName}` : siteName;

  const pageMeta = { ...defaultMeta };

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="expires" content="timestamp" />

        <link rel="preconnect" href={apiUrl()} />

        <title>{fullPageTitle}</title>

        <meta property="og:type" content="website" />

        <meta
          property="og:site_name"
          content={siteName}
          key="meta-og:site_name"
        />

        <meta property="og:locale" content="en_AU" key="meta-og:locale" />

        <meta
          property="og:title"
          content={pageTitle || siteName}
          key="meta-og:title"
        />

        <meta name="dcterms.title" content={pageTitle || siteName} />
      </Head>
      <CanonicalMeta domain={appDomain} routerPath={routerPath} />
      <MetaList metaTags={pageMeta} />
    </React.Fragment>
  );
};

export default HeadMeta;
