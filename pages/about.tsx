import React from "react";
// import styles from "../styles/Test.module.scss";

interface Props {
  title: string;
}

const About: React.FC<Props> = ({ title }) => {
  return <div>{<h1>title</h1>}</div>;
};

About.defaultProps = {
  title: "About",
};

export default About;
