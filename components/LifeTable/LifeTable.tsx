import * as React from "react";
import LifeTableCell from "../LifeTableCell";

import css from "./LifeTable.module.scss";

type Props = {
  className?: string;
  weeksLived?: number;
  yearOfBirth?: string;
};

const LifeTable: React.FunctionComponent<Props> = ({
  className = "",
  weeksLived = 0,
  yearOfBirth = "",
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
        <figure className={css.quoteBlock}>
          <blockquote>
            It is not that we have a short time to live, but that we waste a lot
            of it. Life is long enough, and a sufficiently generous amount has
            been given to us for the highest achievements if it were all well
            invested.
          </blockquote>
          <figcaption>
            <footer>
              ― <cite title="Source Title">Seneca</cite>
            </footer>
          </figcaption>
        </figure>
      </footer>
    </>
  );
};

export default LifeTable;
