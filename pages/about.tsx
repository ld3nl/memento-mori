import React from "react";
import Head from "next/head";
// import styles from "../styles/Test.module.scss";

interface Props {
  title: string;
}

const About: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>Visualize Your Life in Weeks | Unlock Your True Potential</title>
        <meta
          name="description"
          content="Visualize your life in weeks and unlock your true potential with our Memento Mori Table online app. Simply enter your birth date and mark off each week. Discover the power of Memento Mori and join high-achieving individuals like Seneca, Steve Jobs, Leo Tolstoy, and Charles Darwin who used hyperawareness of their mortality to accomplish more and live better. Start your life-changing journey today."
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

      <div>
        <h1>{title}</h1>
        <p>
          Welcome to the Memento Mori Table Online App, where you can visualize
          your life in weeks and unlock your true potential with just a few
          clicks. All you need to do is access the page and enter your birth
          date - it's that simple.
        </p>

        <p>
          By marking off each week on the table, you'll quickly experience
          improved focus, a heightened perspective on life, and a rush of
          motivation to take consistent action. This tool is designed as an
          interactive way to help you harness the powerful concept of Memento
          Mori, which has been used for centuries to help people focus on what
          truly matters.
        </p>

        <p>
          From Seneca to Steve Jobs, Leo Tolstoy to Charles Darwin, high
          achieving individuals have used a hyperawareness of their mortality to
          accomplish more and live better. Being aware of your mortality may
          sound scary, but it’s an extremely effective catalyst for reflection
          and change. It puts all the things that don’t matter into perspective,
          melts away fears, and clears a path for you to focus on what's truly
          important.
        </p>

        <p>
          The weekly ritual of marking off a new square will jolt you into the
          present moment, provide you with an improved perspective on life, and
          give you the motivation and drive to take action week after week. Give
          it a try and see how it can improve your life too!
        </p>
      </div>
    </>
  );
};

About.defaultProps = {
  title: "About",
};

export default About;
