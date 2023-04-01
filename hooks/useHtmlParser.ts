import parse, { HTMLReactParserOptions } from "html-react-parser";

interface UseHtmlParserOptions extends HTMLReactParserOptions {}

const useHtmlParser = (
  html: string,
  options?: UseHtmlParserOptions
): React.ReactNode => {
  if (typeof html === "undefined") return;

  const parseOptions = options ?? {};
  const parsed = parse(html, parseOptions);

  return parsed;
};

export default useHtmlParser;
