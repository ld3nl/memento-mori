/**
 * Error class for an API response outside the 200 range
 *
 * Taken from @drupal/admin-ui-utilities
 *
 * @param {string} url - The URL of the API endpoint
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */
class ApiError extends Error {
  protected url?: string;
  protected status?: number;
  protected statusText?: string;
  protected response?: Response;

  constructor(
    url?: string,
    status?: number,
    statusText?: string,
    response?: Response
  ) {
    super(url);
    this.url = url;
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toString() {
    return `${this.status} ${this.statusText}`;
  }

  static async errorToHumanString(error: any): Promise<string> {
    if (error instanceof ApiError) {
      return ApiError.toHumanString(error);
    }
    return Promise.resolve(error.toString());
  }

  static async toHumanString(error: ApiError): Promise<string> {
    let responseJson = null;
    try {
      switch (error.status) {
        case 403:
          if (error.response) {
            responseJson = await error.response.json();
          }
          return `You don't have access. ${responseJson?.message} Maybe you aren't logged in.`;
        case 404:
          if (error.response) {
            responseJson = await error.response.json();
          }
          return `Some page is missing. ${responseJson?.message}`;
        case 400:
          if (error.response) {
            responseJson = await error.response.json();
          }
          return `You posted some invalid data, contact the administration team. ${responseJson?.message}`;
        case 500:
          if (error.response) {
            responseJson = await error.response.json();
          }
          return `The server crashed, contact the administration team. ${responseJson?.message}`;
        default:
          return error.toString();
      }
    } catch (e) {
      return error.toString();
    }
  }
}

export default ApiError;
