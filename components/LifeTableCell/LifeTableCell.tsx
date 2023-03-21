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
  className = "",
  disabled = false,
  isActive = false,
  latestWeek = false,
  keyProp = "",
  year = 0,
  fullYear = "",
}) => {
  const [active, setActive] = React.useState(isActive);

  // const handleActive = React.useCallback(
  //   () => setActive((prev: any) => !prev),
  //   []
  // );

  return (
    <button
      key={keyProp}
      className={`${css.lifeTableCell} ${
        latestWeek !== false ? css.latestWeek : ""
      } ${isActive ? css.isActive : ""} ${className}`}
      disabled={disabled}
      title={
        year % 1 === 0
          ? `${active ? "Your Age:" : "You Will Be"} ${year} ${
              active ? "was in " : "in "
            } ${fullYear}`
          : ""
      }
      data-year-index={year % 1 === 0 ? year : ""}
      // onClick={handleActive}
      // style={latestWeek !== false? {background: `linear-gradient(to bottom left, cyan ${latestWeek}%, palegoldenrod ${100 - latestWeek}}%)`} : {}}
    ></button>
  );
};

export default LifeTableCell;
