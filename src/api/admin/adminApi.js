import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function loginAdminApi({ username, password }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/admin/login`, {
        username: username,
        password: password,
      })
      .then(resolve)
      .catch(reject);
  });
}

export function logoutAdminApi() {
  return new Promise((resolve, reject) => {
    apiRequest
      .put(`${SERVER_URL}/api/admin/logout`)
      .then(resolve)
      .catch(reject);
  });
}
