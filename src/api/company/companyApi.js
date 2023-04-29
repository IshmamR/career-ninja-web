import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function companySignupApi(bodyFormData) {
  return new Promise((resolve, reject) => {
    apiRequest({
      method: "POST",
      url: `${SERVER_URL}/api/company/signup`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(resolve)
      .catch(reject);
  });
}

export function companyLoginApi({ username, password }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/company/login`, { username, password })
      .then(resolve)
      .catch(reject);
  });
}

export function companyLogoutApi() {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/company/logout`)
      .then(resolve)
      .catch(reject);
  });
}

export function verifyCompanyApi(companyId) {
  return new Promise((resolve, reject) => {
    apiRequest
      .put(`${SERVER_URL}/api/company/verify/${companyId}`)
      .then(resolve)
      .catch(reject);
  });
}

export function getAllCompanies(pageNo, limit) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(`${SERVER_URL}/api/company/all?pageNo=${pageNo}&limit=${limit}`)
      .then(resolve)
      .catch(reject);
  });
}

export function getSingleCompany(companyId) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(`${SERVER_URL}/api/company/get/single.php?companyId=${companyId}`)
      .then(resolve)
      .catch(reject);
  });
}
