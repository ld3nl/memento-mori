import * as React from "react";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";

import BetterForm from "../components/BetterForm";
import LifeTable from "../components/LifeTable";
import styles from "../styles/Home.module.scss";
import Nav from "@/components/Nav";

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
  const [yearOfBirth, setYearOfBirth] = React.useState<any>(null);
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
          content="Unlock Your True Potential with Our Interactive Life Visualization Tool
          Looking for a powerful way to make the most of your time and unlock your true potential? Look no further than our interactive life visualization tool. Designed to help you visualize your life in weeks, this tool can provide a range of benefits, including improved focus, heightened perspective on life, and a rush of motivation to take consistent action. With each passing week, simply fill in a new square and watch as your progress grows. It's an easy and effective way to stay on track and make the most of every moment. Start visualizing your life in weeks today with our user-friendly tool."
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
          <BetterForm
            dateFunction={(val: any) => (
              setWeeksLived(val.weeks), setYearOfBirth(val.year)
            )}
          />
        )}
        {weeksLived && (
          <LifeTable
            weeksLived={weeksLived}
            quote={quote}
            yearOfBirth={yearOfBirth}
          />
        )}
      </main>
      <Nav />
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
