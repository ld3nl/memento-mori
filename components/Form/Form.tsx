import * as React from "react";
import { useRouter } from "next/router";

import css from "./Form.module.scss";

type Props = {
  className?: string;
  dateFunction?: Function;
};

const Form: React.FunctionComponent<Props> = ({ className, dateFunction }) => {
  const router = useRouter();

  const savedName: string =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("savedName")) ||
    "";
  const savedAge: string =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("savedAge")) ||
    "";
  const savedDate: boolean = Boolean(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("savedDate")) ||
      false
  );

  const [saveData, setSaveData] = React.useState<boolean>(savedDate);
  const [allSet, setAllSet] = React.useState<boolean>(false);

  const [name, setName] = React.useState<any>();
  const [date, setDate] = React.useState<any>();
  const [age, setAge] = React.useState<any>();

  React.useEffect(() => {
    if (!name && !date) return;
    router.push({
      pathname: "/",
      query: { name: name, date: date },
    });
  }, [name, date]);

  React.useEffect(() => {
    if (!date) return;

    setAge(calculateAge(date));
  }, [date]);

  React.useEffect(() => {
    setDate(router.query.date);
    setName(router.query.name);
  }, [router]);

  React.useEffect(() => {
    if (allSet && saveData) {
      window.localStorage.setItem("savedName", name);
      window.localStorage.setItem("savedAge", date);
      window.localStorage.setItem("savedDate", String(saveData));
    }

    if (!saveData) {
      window.localStorage.setItem("savedName", "");
      window.localStorage.setItem("savedDate", "");
    }
  }, [allSet]);

  const calculateAge = (dob: Date) => {
    var diff_ms:number = Date.now() - new Date(dob).getTime();

    // var age_dt = new Date(diff_ms);

    const diffWeek = (diff_ms / (24*3600*1000*7));

    // return Math.abs(age_dt.getUTCFullYear() - 1970);
    return diffWeek;
  };

  const transferParam = (value: any) =>
    dateFunction !== undefined && dateFunction(value);

  return (
    <div
      key={"Date and Name Form"}
      className={[
        css.form,
        "d-flex flex-column  min-vh-100 min-vw-100",
        className || "",
      ].join(" ")}
    >
      <h1 className="h3 m-auto mb-3 fw-normal">Enter Your Date Of Birth</h1>
      <form className={"m-auto mt-1 w-50"}>
        <div className="form-floating mb-3">
          <input
            className="form-control fs-2"
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
        <div className="form-floating">
          <input
            className="form-control fs-2"
            type="date"
            id="birthday"
            name="birthday"
            value={date ? date : ""}
            pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
          />
          <label htmlFor="birthday">Birthday:</label>
        </div>

        <div className="checkbox mt-3 mb-3">
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
          className={[css.btn, "w-100 btn btn-lg btn-primary mt-2 d-flex"].join(
            " "
          )}
          onClick={() => {
            setAllSet(true);
            // setShowExportBtn(true);
            transferParam({'age': age, 'date': date});
          }}
        >
          Is your Age is {age}?
        </span>
      </form>
    </div>
  );
};

export default Form;
