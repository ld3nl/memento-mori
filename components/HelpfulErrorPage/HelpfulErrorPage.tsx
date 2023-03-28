import * as React from "react";
import HeadMeta from "../HeadMeta";

type Props = {
  className?: string;
  routerPath?: string;
  errorCode?: number;
  errorContent?: string;
};

const errorMessages: any = {
  en: {
    "Title 400": "Bad Request",
    "Title 401": "Unauthorized",
    "Title 403": "Forbidden",
    "Title 404": "Page Not Found",
    "Title 405": "Method Not Allowed",
    "Title 500": "Internal Server Error",
    "Body 400":
      "The request could not be understood by the server due to malformed syntax.",
    "Body 401": "The request requires user authentication.",
    "Body 403":
      "The server understood the request, but is refusing to fulfill it.",
    "Body 404": "The server has not found anything matching the Request-URI.",
    "Body 405":
      "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.",
    "Body 500":
      "The server encountered an unexpected condition which prevented it from fulfilling the request.",
  },
};

const HelpfulErrorPage: React.FunctionComponent<Props> = ({
  routerPath = "/",
  errorCode = 500,
  errorContent = "",
  className,
}) => {
  const title =
    errorCode >= 500
      ? errorMessages.en["Title 500"]
      : errorMessages.en[`Title ${errorCode}`] || errorMessages.en["Title 400"];

  const body =
    errorCode >= 500
      ? errorMessages.en["Body 500"]
      : errorMessages.en[`Body ${errorCode}`] || errorMessages.en["Body 400"];

  return (
    <>
      <HeadMeta routerPath={routerPath} pageTitle={title} />
      <div className={["container", className || ""].join(" ")}>
        <h1>{title}</h1>
        <div>
          <div>
            <p>{body}</p>
            <p>{errorContent}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpfulErrorPage;
