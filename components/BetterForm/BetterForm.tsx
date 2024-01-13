import { useState, useEffect, useMemo } from "react";
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

type DateChangeEventType = Date | null;

type Props = {
  className?: string;
  dateFunction?: (value: any) => void;
};

const noop = () => {}; // Default no-operation function

const BetterForm: React.FunctionComponent<Props> = ({
  className,
  dateFunction = noop,
}) => {
  const [age, setAge] = useState<{
    ageLived: string;
    livedWeeksAndDays: string;
  }>();

  const [weeks, setWeeks] = useState<number>(0);

  const defaultDate = new Date();
  const [startDateLocalStorage, setStartDateNew] = useLocalStorage(
    "date",
    defaultDate
  );

  const [name, setName] = useLocalStorage("name", "");
  const [cellColor, setCellColor] = useLocalStorage("cellColor", "#000");

  const [save, setSave] = useState(false);

  const calculatedAge = useMemo(
    () => calculateAgeAndLivedWeeksAndDays(startDateLocalStorage),
    [startDateLocalStorage]
  );
  const calculatedWeeks = useMemo(
    () => calculateWeeksSinceBirth(startDateLocalStorage),
    [startDateLocalStorage]
  );

  const transferParam = (value: any) =>
    dateFunction !== undefined && dateFunction(value);

  // Effect for handling save functionality
  useEffect(() => {
    if (save) {
      setStartDateNew(startDateLocalStorage);
      setName(name);
      setCellColor(cellColor);
    } else {
      clearStorageByKeys(["name", "surname", "date", "cellColor"]);
    }
  }, [
    name,
    startDateLocalStorage,
    cellColor,
    save,
    setStartDateNew,
    setName,
    setCellColor,
  ]);

  // Effect for calculating age and weeks
  useEffect(() => {
    setAge(calculatedAge);
    setWeeks(calculatedWeeks);
  }, [calculatedAge, calculatedWeeks]);

  return (
    <div className={[css.betterForm, className || ""].join(" ")}>
      {/* Inline styles are used here, consider moving them to BetterForm.module.scss */}
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
        {/* Description for the app */}
        <p>
          Momento Mori is a unique app that helps you reflect on the
          preciousness of time. Simply enter your date of birth, and the app
          generates a table showing 80 years of your life in weeks, with lived
          weeks filled in color. This visual representation of your life&apos;s
          timeline serves as a reminder to make the most of every moment.
        </p>
      </div>

      {/* Input field for name */}
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

      {/* Input field for cell color */}
      <div className={css.formItem}>
        <label htmlFor="cellColor">Cell color</label>
        <div className={css.inputControl}>
          <input
            type="color"
            id="cellColor"
            name="cellColor"
            defaultValue={cellColor}
            onChange={(val) => setCellColor(val.target.value)}
          ></input>
        </div>
      </div>

      {/* DatePicker for date of birth */}
      <div className={css.formItem}>
        <label htmlFor="date">Date of birth</label>
        <DatePicker
          id="date"
          selected={
            startDateLocalStorage ? new Date(startDateLocalStorage) : null
          } // Handling potential null values
          onChange={(date: DateChangeEventType) =>
            setStartDateNew(date || new Date())
          } // Explicitly typed date parameter
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
      {/* Checkbox for saving data */}
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

      {/* Display of weeks lived and age */}
      <div className={css["lead"]}>
        {weeks} weeks lived
        <hr />
        {age?.ageLived ? `You are: ${age?.ageLived} young` : ""}
      </div>
      {/* Button for generating the table */}
      <button
        className={css.cta}
        onClick={() => {
          transferParam({
            cellColor: cellColor,
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
