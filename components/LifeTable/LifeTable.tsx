import * as React from "react";
import LifeTableCell from "../LifeTableCell";

import css from "./LifeTable.module.scss";

type Props = {
  className?: string;
  weeksLived?: number;
  yearOfBirth?: string;
  quote?: any;
  cellColor?: string;
  people?: any;
};

const LifeTable: React.FunctionComponent<Props> = ({
  weeksLived = 0,
  yearOfBirth = "",
  cellColor,
  quote,
  people,
}) => {
  if (!weeksLived) return <>Loading...</>;

  const newArr = Array.from({ length: 4160 }, (_, i) => {
    // Calculate year and fullYear outside the JSX for clarity
    const yearIndex = i + 1; // Calculate the 1-indexed year position
    const year = yearIndex / 52;
    const fullYear = Number(yearOfBirth) + Math.floor(year);

    console.log(people.filter((val: any) => weeksLived >= val.weeks));

    const person = people.filter((val: any) => val.weeks === i)[0];

    const customCell = {
      // "--partialWeek": `${(weeksLived % 1) * 100}%`,
      "--cellColor": person?.color,
    } as React.CSSProperties;

    return (
      <LifeTableCell
        key={`LifeTableCell-key-${i}`}
        latestWeek={weeksLived === i ? (weeksLived % 1) * 100 : undefined}
        isActive={weeksLived >= i}
        year={year}
        fullYear={fullYear}
        customTitle={person?.name}
        style={person && customCell}
      />
    );
  });

  var style = {
    "--partialWeek": `${(weeksLived % 1) * 100}%`,
    "--cellColor": cellColor,
  } as React.CSSProperties;
  return (
    <>
      <header className={css.header}>
        <h1
          title={`Memento mori (Latin for 'remember that you [have to] die')`}
        >
          MEMENTO MORI
        </h1>
      </header>
      <div className={[css.momentoMori, "row"].join(" ")} style={style}>
        <div className={[css.col, ""].join(" ")}>{newArr}</div>
      </div>
      <footer>
        {quote && (
          <figure className={css.quoteBlock}>
            <blockquote>{quote.quote}</blockquote>
            <figcaption>
              <footer>
                ― <cite title="Source Title">{quote.author}</cite>
              </footer>
            </figcaption>
          </figure>
        )}
      </footer>
    </>
  );
};

export default LifeTable;
