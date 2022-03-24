import * as React from "react";

import css from "./LifeTableCell.module.scss";

type Props = {
  className?: string;
  disabled?: any;
  isActive?: any;
  keyProp?: any;
  year?: any;
  fullYear?: any;
};

const LifeTableCell: React.FunctionComponent<Props> = ({
  className,
  disabled,
  isActive,
  keyProp,
  year,
  fullYear,
}) => {
  const [active, setActive] = React.useState(isActive);
  return (
    <button
      key={keyProp}
      className={[
        css.lifeTableCell,
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
    ></button>
  );
};

export default LifeTableCell;
