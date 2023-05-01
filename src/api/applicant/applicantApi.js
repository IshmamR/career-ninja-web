import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function registerApplicantApi(registerFormData) {
  return new Promise((resolve, reject) => {
    apiRequest({
      method: "POST",
      url: `${SERVER_URL}/api/applicant/register`,
      data: registerFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(resolve)
      .catch(reject);
  });
}

export function loginApplicantApi({ email, password }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/applicant/login`, { email, password })
      .then(resolve)
      .catch(reject);
  });
}

export function logoutApplicantApi() {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/applicant/logout`)
      .then(resolve)
      .catch(reject);
  });
}

export function getApplicantProfileApi() {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(`${SERVER_URL}/api/applicant/profile`)
      .then(resolve)
      .catch(reject);
  });
}

export function uploadApplicantImageApi(formData) {
  return new Promise((resolve, reject) => {
    apiRequest({
      method: "POST",
      url: `${SERVER_URL}/api/applicant/image`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(resolve)
      .catch(reject);
  });
}

export function uploadApplicantProfileApi(data) {
  return new Promise((resolve, reject) => {
    apiRequest
      .put(`${SERVER_URL}/api/applicant/profile`, data)
      .then(resolve)
      .catch(reject);
  });
}
