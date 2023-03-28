import { useEffect, useState } from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

interface UseHtmlParserOptions extends HTMLReactParserOptions {}

const useHtmlParser = (
  html: string,
  options?: UseHtmlParserOptions
): React.ReactElement => {
  const [parsedHtml, setParsedHtml] = useState<React.ReactElement>(null);

  useEffect(() => {
    if (html) {
      const parseOptions = options ?? {};
      const parsed = parse(html, parseOptions);
      setParsedHtml(parsed);
    }
  }, [html, options]);

  return parsedHtml;
};

export default useHtmlParser;
