import { useEffect } from "react";
import NProgress from "nprogress";

import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";

import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga";
ReactGA.initialize("G-GKF2PC9R54");

import "nprogress/nprogress.css";

import "../styles/globals.scss";

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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.set({ page: url });
      ReactGA.pageview(url);
    };

    // Initialize GA on first page load
    ReactGA.pageview(router.asPath);

    // Track page changes after initialization
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up event listener
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
export default MyApp;
