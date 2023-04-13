import React from "react";

import parse, {
  HTMLReactParserOptions,
  DOMNode,
  Element,
  Text,
} from "html-react-parser";

interface UseHtmlParserOptions extends HTMLReactParserOptions {}

const useHtmlParser = (
  html: string,
  options?: UseHtmlParserOptions
): React.ReactNode => {
  if (typeof html === "undefined") return;

  const opt = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === "strong" &&
        domNode.children.length === 0
      ) {
        // console.log(domNode);
        return React.createElement(React.Fragment, null, "");
        // return null;
      }
      // console.log(domNode instanceof Text && domNode && domNode.data);

      // if (domNode instanceof Element  && domNode.attribs && domNode.attribs.id === 'replace') {
      //   return React.createElement('span', {}, 'replaced');
      // }
    },
  };

  const parseOptions = options ?? opt;
  const parsed = parse(html, parseOptions);

  return parsed;
};

export default useHtmlParser;
