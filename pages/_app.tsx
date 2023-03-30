import { useEffect } from "react";
import NProgress from "nprogress";
import localFont from "next/font/local";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import "nprogress/nprogress.css";

import "../styles/globals.scss";

const myFontIowan = localFont({
  src: "./fonts/iowan-old-style/iowan-old-style.woff2",
});

NProgress.configure({
  easing: "ease",
  speed: 500,
  template:
    '<div class="bar" role="bar"><div class="peg"></div></div>' +
    '<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-QZ5XN8M8D0"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-QZ5XN8M8D0', {
                  page_path: window.location.pathname,
                  });
                `,
        }}
      />
      <main className={myFontIowan.className}>
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}
export default MyApp;
