import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function companySignupApi({ company, companyAdmin }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/company/signup.php`, { company, companyAdmin })
      .then(resolve)
      .catch(reject);
  });
}

export function companyLoginApi({ username, password }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/company/login.php`, { username, password })
      .then(resolve)
      .catch(reject);
  });
}

export function verifyCompanyApi(companyId) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/company/verify.php`, { companyId })
      .then(resolve)
      .catch(reject);
  });
}

export function getAllCompanies(pageNo, limit) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(
        `${SERVER_URL}/api/company/get/all.php?pageNo=${pageNo}&limit=${limit}`
      )
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
