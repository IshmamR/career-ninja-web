import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function getAllFieldsApi({ page, limit }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(`${SERVER_URL}/api/field/all?page=${page}&limit=${limit}`)
      .then(resolve)
      .catch(reject);
  });
}

export function addFieldApi({ title }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/field/add`, { title })
      .then(resolve)
      .catch(reject);
  });
}

export function deleteFieldApi(fieldId) {
  return new Promise((resolve, reject) => {
    apiRequest
      .delete(`${SERVER_URL}/api/field/${fieldId}`)
      .then(resolve)
      .catch(reject);
  });
}
