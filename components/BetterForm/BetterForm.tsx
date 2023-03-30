import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import MaskedInput from "react-text-mask";

import enAU from "date-fns/locale/en-AU";
registerLocale("enAU", enAU);

import { useLocalStorage, clearStorageByKeys } from "../../hooks/localStorage";

import {
  calculateWeeksSinceBirth,
  calculateAgeAndLivedWeeksAndDays,
} from "../../hooks/dateCalculator";

import css from "./BetterForm.module.scss";

type Props = {
  className?: string;
  dateFunction?: Function;
};

const BetterForm: React.FunctionComponent<Props> = ({
  className,
  dateFunction,
}) => {
  const [age, setAge] = useState<any>();
  const [weeks, setWeeks] = useState<any>();

  const [startDateLocalStorage, setStartDateNew] = useLocalStorage(
    "date",
    new Date()
  );
  const [name, setName] = useLocalStorage("name", "");
  const [surname, setSurname] = useLocalStorage("surname", "");

  const [save, setSave] = useState(false);

  const transferParam = (value: any) =>
    dateFunction !== undefined && dateFunction(value);

  useEffect(() => {
    if (save) {
      setStartDateNew(startDateLocalStorage);
      setName(name);
      setSurname(surname);
    } else clearStorageByKeys(["name", "surname", "date"]);
  }, [
    name,
    setName,
    setStartDateNew,
    setSurname,
    startDateLocalStorage,
    surname,
  ]);

  useEffect(() => {
    setAge(calculateAgeAndLivedWeeksAndDays(startDateLocalStorage));
    setWeeks(calculateWeeksSinceBirth(startDateLocalStorage));
  }, [startDateLocalStorage]);

  return (
    <div className={[css.betterForm, className || ""].join(" ")}>
      <div
        style={{
          maxWidth: 580,
          padding: "0 1rem",
          margin: "auto auto 2rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Memento Mori App table Generator
        </h1>
        <p>
          Momento Mori is a unique app that helps you reflect on the
          preciousness of time. Simply enter your date of birth, and the app
          generates a table showing 80 years of your life in weeks, with lived
          weeks filled in color. This visual representation of your life&apos;s
          timeline serves as a reminder to make the most of every moment.
        </p>
      </div>

      <div className={css.formItem}>
        <label htmlFor="name">Name</label>
        <div className={css.inputControl}>
          <input
            className={[css["form-control"], css["form-control-lg"]].join(" ")}
            id="name"
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
      </div>
      {/* <div className={css.formItem}>
        <label htmlFor="surname">Surname</label>
        <div className={css.inputControl}>
          <input
            className={[css["form-control"], css["form-control-lg"]].join(" ")}
            id="surname"
            type="text"
            defaultValue={surname}
            onChange={(e) => setSurname(e.currentTarget.value)}
          />
        </div>
      </div> */}

      <div className={css.formItem}>
        <label htmlFor="date">Date of birth</label>
        <DatePicker
          id="date"
          selected={new Date(startDateLocalStorage)}
          onChange={(date: any) => setStartDateNew(date)}
          dateFormat="dd/MM/yyyy"
          type="text"
          customInput={
            <MaskedInput
              className={[css["form-control"], css["form-control-lg"]].join(
                " "
              )}
              keepCharPositions
              mask={[
                /[0-3]/,
                /\d/,
                "/",
                /[0-1]/,
                /\d/,
                "/",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          }
        />
      </div>
      <div className={css["form-check"]}>
        <input
          type="checkbox"
          className={css["form-check-input"]}
          id="save"
          defaultChecked={save}
          onChange={(e) => setSave(e.currentTarget.checked)}
        />
        <label className={css["form-check-label"]} htmlFor="save">
          Save this for future
        </label>
      </div>
      <div className={css["lead"]}>
        {weeks} weeks lived
        <hr />
        {age?.ageLived ? `You are: ${age?.ageLived} young` : ""}
      </div>
      <button
        className={css.cta}
        onClick={() => {
          transferParam({
            weeks: weeks,
            year:
              startDateLocalStorage instanceof Date &&
              startDateLocalStorage?.getFullYear(),
          });
        }}
      >
        Generate Table
      </button>
    </div>
  );
};

export default BetterForm;
