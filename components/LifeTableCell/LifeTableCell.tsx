import * as React from "react";
import css from "./LifeTableCell.module.scss";

// Defining TypeScript types for props to ensure type safety.
type Props = {
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  latestWeek?: number | boolean;
  year?: number;
  fullYear: number; // Making fullYear a required prop for clarity and strictness.
};

const LifeTableCell: React.FunctionComponent<Props> = ({
  className,
  disabled = false, // Default props for controlled behavior and avoiding undefined.
  isActive = false,
  latestWeek = false,
  year = 0,
  fullYear,
}) => {
  // Calculating title outside JSX for better readability and separation of concerns.
  const isWholeYear = year % 1 === 0; // Using strict equality to check for whole year.
  const title = isWholeYear
    ? `${isActive ? "Your Age:" : "You Will Be"} ${year} ${
        isActive ? "was in " : "in "
      } ${fullYear}`
    : "";

  return (
    <button
      // Using array.join for dynamic className generation, enhances readability and maintainability.
      className={[
        css.lifeTableCell,
        latestWeek !== false ? css.latestWeek : "",
        isActive ? css.isActive : "",
        className,
      ].join(" ")}
      disabled={disabled}
      title={title}
      // Conditional rendering of data attribute for semantic correctness.
      data-year-index={isWholeYear ? year : ""}
    ></button>
  );
};

export default LifeTableCell;
