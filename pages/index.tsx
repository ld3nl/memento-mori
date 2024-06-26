import * as React from "react";
import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";

import BetterForm from "../components/BetterForm";
import LifeTable from "../components/LifeTable";
import styles from "../styles/Home.module.scss";
import Nav from "@/components/Nav";

import {
  calculateWeeksSinceBirth,
  calculateAgeAndLivedWeeksAndDays,
} from "@/hooks/dateCalculator";

interface Props {
  data: [
    {
      quote: string;
      author: string;
    }
  ];
  dataPeople: [
    { name: string; dob: string | Date; dod: string | Date; color: string }
  ];
}

export default function Home({ data, dataPeople }: Props) {
  const [weeksLived, setWeeksLived] = React.useState<any>(null);
  const [cellColor, setCellColor] = React.useState<any>(null);
  const [yearOfBirth, setYearOfBirth] = React.useState<any>(null);
  const [quote, setQuote] = React.useState<any>(null);
  const [people, setPeople] = React.useState<any>(null);

  React.useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data.sort(() => 0.5 - Math.random())[randomIndex]);
    }
  }, [data]);

  React.useEffect(() => {
    if (dataPeople) {
      setPeople(
        dataPeople.map((val) => {
          return {
            weeks: calculateWeeksSinceBirth(val.dob, val.dod),
            name: val.name,
            color: val.color,
          };
        })
      );
    }
  }, [dataPeople]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualize Your Life in Weeks | Unlock Your True Potential</title>
        <meta
          name="description"
          content="If you're looking to unlock your true potential and make the most of your time, why not try visualizing your life in weeks? Our interactive tool is designed to help you do just that. With each passing week, you can fill in a new square and experience a range of benefits, including improved focus, a heightened perspective on life, and a rush of motivation to take consistent action. It's a powerful way to stay on track and make the most of every moment. So why wait? Start visualizing your life in weeks today with our easy-to-use tool."
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

      <main className={styles.main}>
        {!weeksLived && (
          <BetterForm
            dateFunction={(val: any) => (
              setWeeksLived(val.weeks),
              setYearOfBirth(val.year),
              setCellColor(val.cellColor)
            )}
          />
        )}
        {weeksLived && (
          <LifeTable
            weeksLived={weeksLived}
            quote={quote}
            yearOfBirth={yearOfBirth}
            cellColor={cellColor}
            people={people}
          />
        )}
      </main>
      <Nav />
    </div>
  );
}

export async function getStaticProps() {
  const quotesFilePath = path.join(process.cwd(), "data", "quotes.json");
  const peopleFilePath = path.join(process.cwd(), "data", "people.json");

  const fileContents = await fs.readFile(quotesFilePath, "utf8");
  const fileContentsPeople = await fs.readFile(peopleFilePath, "utf8");

  const data = JSON.parse(fileContents);
  const dataPeople = JSON.parse(fileContentsPeople);
  return {
    props: {
      data,
      dataPeople,
    },
  };
}
