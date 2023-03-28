import { NextPageContext } from "next";

type Props = {
  statusCode: number;
};

const ErrorPage = ({ statusCode }: Props) => {
  return (
    <div>
      {statusCode === 500 ? (
        <p>Sorry, something went wrong.</p>
      ) : (
        <p>Sorry, this page could not be found.</p>
      )}
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
