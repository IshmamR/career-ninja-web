import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function loginAdminApi(formData) {
  return new Promise((resolve, reject) => {
    apiRequest({
      method: "POST",
      url: `${SERVER_URL}/api/admin/login/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

export function logoutAdminApi() {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/admin/logout/`)
      .then(resolve)
      .catch(reject);
  });
}
