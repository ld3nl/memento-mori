import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Form from "../components/Form";
import LifeTable from "../components/LifeTable";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [data, setData] = React.useState();

  React.useEffect(()=> console.warn(data), data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <main className={styles.main}>
        {!data && <Form dateFunction={(val: any) => setData(val)} />}

        {data && <LifeTable weeksLived={data.age} />}
      </main>
    </div>
  );
}
