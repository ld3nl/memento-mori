import * as React from "react";

import css from "./LifeTableCell.module.scss";

type Props = {
  className?: string;
  disabled?: any;
  isActive?: any;
  latestWeek?: any;
  keyProp?: any;
  year?: any;
  fullYear?: any;
};

const LifeTableCell: React.FunctionComponent<Props> = ({
  className,
  disabled,
  isActive,
  latestWeek,
  keyProp,
  year,
  fullYear,
}) => {
  const [active, setActive] = React.useState(isActive);

  // console.log('jjs', latestWeek !== false);

  return (
    <button
      key={keyProp}
      className={[
        css.lifeTableCell,
        latestWeek !== false ? css.latestWeek : '',
        isActive ? css.isActive : "",
        className || "",
      ].join(" ")}
      disabled={disabled}
      title={
        year % 1 === 0
          ? `${active ? "Your Age:" : "You Will Be"} ${year} ${
              active ? "was in " : "in "
            } ${fullYear}`
          : ""
      }
      data-year-index={year % 1 === 0 ? year : ""}
      onClick={() => setActive(!active)}
      // style={latestWeek !== false? {background: `linear-gradient(to bottom left, cyan ${latestWeek}%, palegoldenrod ${100 - latestWeek}}%)`} : {}}
    ></button>
  );
};

export default LifeTableCell;
