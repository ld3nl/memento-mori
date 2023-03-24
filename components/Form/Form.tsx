import * as React from "react";
import { useRouter } from "next/router";

import css from "./Form.module.scss";

type Props = {
  className?: string;
  dateFunction?: Function;
};

const Form: React.FunctionComponent<Props> = ({ className, dateFunction }) => {
  const router = useRouter();

  const savedDate = Boolean(
    typeof window !== "undefined" && window.localStorage.getItem("savedDate")
  );

  const [saveData, setSaveData] = React.useState<boolean>(savedDate);

  const [allSet, setAllSet] = React.useState<boolean>(false);

  const [name, setName] = React.useState<any>();
  const [date, setDate] = React.useState<any>();
  const [age, setAge] = React.useState<any>();

  React.useEffect(() => {
    if (!name || !date) return;

    router.push({
      pathname: "/",
      query: { name, date },
    });
  }, [name, date, router]);

  React.useEffect(() => {
    if (!date) return;

    setAge(calculateAge(date));
  }, [date]);

  React.useEffect(() => {
    setDate(router.query.date);
    setName(router.query.name);
  }, [router]);

  React.useEffect(() => {
    if (!allSet) return;

    const savedName = saveData ? name : "";
    const savedAge = saveData ? date : "";
    const savedDate = String(saveData);

    localStorage.setItem("savedName", savedName);
    localStorage.setItem("savedAge", savedAge);
    localStorage.setItem("savedDate", savedDate);
  }, [allSet, saveData, name, date]);

  const calculateAge = (dob: Date) => {
    var diff_ms: number = Date.now() - new Date(dob).getTime();

    const diffWeek = diff_ms / (24 * 3600 * 1000 * 7);

    return diffWeek;
  };

  const transferParam = (value: any) =>
    dateFunction !== undefined && dateFunction(value);

  return (
    <div
      key={"Date and Name Form"}
      className={[css.form, className || ""].join(" ")}
    >
      <h1>Enter Your Date Of Birth</h1>
      <form>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={name ? name : ""}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
          <label htmlFor="name">Name:</label>
        </div>
        <div>
          <input
            // type="text"
            type="date"
            id="birthday"
            name="birthday"
            defaultValue={date ? date : ""}
            pattern="(?:1\d|2\d)\d{2}-(?:(?:1[0-2]|0?[1-9])/(?:[12]\d|0?[1-9]|30)|(?:(?!02)(?:1[0-2]|0?[1-9])/(?:30))|(?:(?:1[02]|0?[13578])-31))"
            // pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
          />
          <label htmlFor="birthday">Birthday:</label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              value="remember-me"
              defaultChecked={saveData}
              onChange={() => setSaveData(!saveData)}
            />{" "}
            Remember me
          </label>
        </div>
        <span
          // disabled={age === 0}
          className={[css.btn].join(" ")}
          onClick={() => {
            setAllSet(true);
            transferParam({ age: age, date: date });
          }}
        >
          Is your Age is {age}?
        </span>
      </form>
    </div>
  );
};

export default Form;
