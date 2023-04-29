import { AxiosError } from "axios";

/**
 * @typedef {AxiosError} IErrorApi
 * @typedef {{
 * status: number;
 * error: string;
 * data?: E;
 * }} IErrorData<E>
 */

/**
 * @param {AxiosError} err
 * @param {() => void} logoutAction
 * @returns {IErrorData}
 */
export function handlePrivateApiError(err, logoutAction) {
  if (err.response && err.response.status) {
    switch (err.response.status) {
      case 400: {
        return { status: 400, error: "", data: err.response.data };
      }
      case 401: {
        logoutAction();
        return {
          status: 401,
          error: "Your session has expired",
          data: err.response.data,
        };
      }
      case 403: {
        return { status: 403, error: "", data: err.response.data };
      }
      case 404: {
        return { status: 404, error: "", data: err.response.data };
      }
      case 500:
        return { status: 500, error: "Server error", data: err.response.data };
      default:
        return { status: 520, error: "Something went wrong!" };
    }
  } else {
    return { status: 520, error: "Something went wrong!" };
  }
}

/**
 * @param {AxiosError} err
 * @returns {IErrorData}
 */
export function handlePublicApiError(err) {
  if (err.response && err.response.status) {
    switch (err.response.status) {
      case 400: {
        return { status: 400, error: "", data: err.response.data };
      }
      case 401: {
        return { status: 401, error: "", data: err.response.data };
      }
      case 403: {
        return { status: 403, error: "", data: err.response.data };
      }
      case 500:
        return { status: 500, error: "Server error", data: err.response.data };
      default:
        return { status: 520, error: "Something went wrong!" };
    }
  } else {
    return { status: 520, error: "Something went wrong!" };
  }
}
