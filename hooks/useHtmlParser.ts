import React from "react";
import parse, {
  HTMLReactParserOptions,
  DOMNode,
  Element,
} from "html-react-parser";

// Extending HTMLReactParserOptions to potentially include custom options in the future.
interface UseHtmlParserOptions extends HTMLReactParserOptions {}

const useHtmlParser = (
  html: string,
  options?: UseHtmlParserOptions
): React.ReactNode => {
  // Best Practice: Handle undefined inputs. Consider adding more robust input validation if needed.
  if (typeof html === "undefined") return;

  // Default parsing options. These can be customized or extended.
  const opt = {
    replace: (domNode: DOMNode) => {
      // Custom replacement logic for specific DOM elements.
      // Currently, it targets 'strong' elements with no children.
      if (
        domNode instanceof Element &&
        domNode.name === "strong" &&
        domNode.children.length === 0
      ) {
        // TODO: Review if returning a React.Fragment or null is more appropriate here.
        return React.createElement(React.Fragment, null, "");
      }
      // Additional custom logic can be added here.
      // Example: Handling specific attributes or other element types.
    },
  };

  // Combining custom options with default ones. Custom options take precedence.
  const parseOptions = options ?? opt;
  // Parse the HTML string with the specified options.
  const parsed = parse(html, parseOptions);

  return parsed;
};

export default useHtmlParser;
