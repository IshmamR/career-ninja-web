import axios from "axios";

export const apiRequest = axios.create();

export function setAuthorizationApi(token) {
  if (token) {
    apiRequest.defaults.headers.common["Authorization"] = token;
  }
}

export function removeAuthorizationApi() {
  delete apiRequest.defaults.headers.common["Authorization"];
}
