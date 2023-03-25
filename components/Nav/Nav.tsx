import * as React from "react";
import Link from "next/link";

import css from "./Nav.module.scss";

type Props = {
  className?: string;
};

const Nav: React.FunctionComponent<Props> = ({ className }) => {
  const items = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
  ];

  return (
    <div className={[css.nav, className || ""].join(" ")}>
      {items.map((item, index) => (
        <Link href={item?.url} key={`item-${index}`}>
          {item?.title}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
