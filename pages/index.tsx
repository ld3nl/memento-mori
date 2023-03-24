import * as React from "react";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";

import BetterForm from "../components/BetterForm";
import LifeTable from "../components/LifeTable";
import styles from "../styles/Home.module.scss";

interface Props {
  data: [
    {
      quote: string;
      author: string;
    }
  ];
}

export default function Home({ data }: Props) {
  const [weeksLived, setWeeksLived] = React.useState<any>(null);
  const [quote, setQuote] = React.useState<any>(null);

  React.useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data.sort(() => 0.5 - Math.random())[randomIndex]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualize Your Life in Weeks | Unlock Your True Potential</title>
        <meta
          name="description"
          content="Unlock your true potential by visualizing your life in weeks. Use this interactive tool to fill in a new square with each passing week and experience improved focus, a heightened perspective on life, and a rush of motivation to take consistent action."
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

      <main className={styles.main}>
        {!weeksLived && (
          <BetterForm dateFunction={(val: any) => setWeeksLived(val.weeks)} />
        )}
        {weeksLived && (
          <LifeTable
            weeksLived={weeksLived}
            quote={quote}
            // yearOfBirth={data?.date?.split("-")[0]}
          />
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "quotes.json");

  const fileContents = await fs.readFile(filePath, "utf8");

  const data = JSON.parse(fileContents);
  return {
    props: {
      data,
    },
  };
}
