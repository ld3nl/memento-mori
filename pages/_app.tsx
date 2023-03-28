import { useEffect } from 'react';

import type { AppProps } from "next/app";
import { useRouter } from 'next/router';

import { Analytics } from "@vercel/analytics/react";
import ReactGA from 'react-ga';
ReactGA.initialize('G-GKF2PC9R54');

import "../styles/globals.scss";

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
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
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
