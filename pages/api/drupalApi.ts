import qs from "qs";

import ApiError from "./ApiError";
import apiCacheMap, { DEFAULT_TTL } from "./cache";

export { ApiError };

type ApiOptions = {
  headers?: any;
  ttl?: number;
  text?: boolean;
};

type CacheOptions = {
  ttl?: number;
};

type ApiConfigType = {
  queryString?: string | any | null;
  parameters?: any;
  options?: ApiOptions;
};

type KeyValuePair = {
  key: string;
  value: string;
};

export const apiUrl = () => {
  const url = process.env.DRUPAL_API_URL;
  if (url) {
    return url.replace(/(^["']|["']$)/g, "");
  }
  return "";
};

export const FILTER_DELIMITER = "|";

export async function jsonApiClient(
  DRUPAL_API_URL: string,
  endpoint: string,
  { queryString = {}, parameters = {}, options = {} }: ApiConfigType = {}
) {
  let url;
  options.headers = options.headers || {};
  let cacheOptions: CacheOptions = {};

  options.headers.Authorization = `Basic ZGVueXMuY3JlYXRpdml0eTp5dEljbHRQS1d3aGdWOFR3Q0E2MnJkTFJ2YVdwaGRCZHhPUXBvZEZuTW1DZm5FUllHd3ZpQWJJVU00RzF4bHY2`;

  switch (endpoint) {
    case "csrf_token":
      url = "/session/token";
      options.text = true;
      cacheOptions.ttl = 0;
      break;

    case "translatePath":
      url = "/router/translate-path";
      const { path: pathToTranslate } = parameters;
      if (pathToTranslate === "/.env") {
        throw new ApiError(
          `${url}?path=${pathToTranslate}`,
          403,
          "Access Denied"
        );
      }
      if (pathToTranslate.match(/\.(php|aspx?|py)$/)) {
        throw new ApiError(
          `${url}?path=${pathToTranslate}`,
          404,
          "Page not found"
        );
      }

      queryString._format = "json";
      queryString.path = pathToTranslate;
      cacheOptions.ttl = 0;
      break;

    case "article":
      url = `/jsonapi/node/article/${parameters.id}`;
      console.log(url);
      queryString = {
        fields: { "node--article": "title,body" },
      };
      break;

    case "page":
      url = `/jsonapi/node/page/${parameters.id}`;
      console.log(url);
      queryString = {
        fields: { "node--page": "title,body" },
      };
      break;

    case "articles":
      url = `/jsonapi/node/article`;
      queryString = {
        filter: { status: "1" },
        sort: "-promote,-created",
        fields: { "node--article": "title,path,changed" },
      };
      break;

    default:
      throw new Error(`Unknown endpoint ${endpoint}`);
  }

  const apiRequestUrl = `${DRUPAL_API_URL}${url}${
    qs.stringify(queryString, { arrayFormat: "brackets" })
      ? `?${qs.stringify(queryString, { arrayFormat: "brackets" })}`
      : ""
  }`;

  if (process.env.DRUPAL_API_DEBUG) {
    console.log("requesting", apiRequestUrl, options);
  }

  const data = await cachedFetch(apiRequestUrl, cacheOptions, options);
  return data;
}

const cachedFetch = async (
  url: string,
  options: ApiOptions = {},
  cacheOptions: CacheOptions = {}
) => {
  // console.log(apiCacheMap.getStats());
  const key = apiCacheMap.getKey("cachedFetch", url, JSON.stringify(options));

  const cachedResponse = await apiCacheMap.get(key);
  if (
    cachedResponse &&
    (process.env.NEXT_PUBLIC_BYPASS_API_CACHE || "0") === "0"
  ) {
    // console.log(`Cache hit ${key}`);
    return cachedResponse;
  }
  // console.log(`Cache miss ${key}`);

  try {
    let returnValue;
    const res = await fetch(url, options);
    if (![200, 201, 204].includes(res.status)) {
      throw new ApiError(url, res.status, res.statusText, res);
    }

    // CSRF tokens return text, not json.
    returnValue = options.text || false ? await res.text() : await res.json();
    apiCacheMap.set(key, returnValue, cacheOptions.ttl || 60);
    return returnValue;
  } catch (e: any) {
    console.error(e);
    if (e instanceof ApiError) {
      throw e;
    }
    throw new ApiError(url, 599, e.toString(), e.getResponse());
  }
};
