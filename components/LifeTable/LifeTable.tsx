import * as React from "react";
import LifeTableCell from "../LifeTableCell";

import css from "./LifeTable.module.scss";

type Props = {
  className?: string;
  weeksLived?: number;
  yearOfBirth?: string;
  quote?: any;
};

const LifeTable: React.FunctionComponent<Props> = ({
  className = "",
  weeksLived = 0,
  yearOfBirth = "",
  quote,
}) => {
  if (!weeksLived) return <>Loading...</>;

  const newArr = Array.from({ length: 4160 }, (_, i) => (
    <LifeTableCell
      key={`LifeTableCell-key-${i}`}
      latestWeek={Math.trunc(weeksLived) === i && (weeksLived % 1) * 100}
      isActive={i < weeksLived}
      year={(i + 1) / 52}
      fullYear={Number(yearOfBirth) + (i + 1) / 52}
    />
  ));

  var style = {
    "--partialWeek": `${(weeksLived % 1) * 100}%`,
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
