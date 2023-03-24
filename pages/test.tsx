import React from "react";
import styles from "../styles/Test.module.scss";

interface Props {
  title: string;
}

const TEst: React.FC<Props> = ({ title }) => {
  const [weeksState, setWeeksState] = React.useState<any>(null);

  React.useEffect(() => {
    const weeks = Array.from({ length: 4160 }, (_, i) => (
      // const weeks = Array.from({ length: 4160 }, (_, i) => (
      <div className={styles.square}></div>
    ));

    setWeeksState(weeks);
  }, []);

  return <div className={styles.container}>{weeksState}</div>;
};

TEst.defaultProps = {
  title: "My Next.js App",
};

export default TEst;
