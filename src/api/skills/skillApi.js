import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function getAllSkillsApi({ page, limit }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(`${SERVER_URL}/api/skill/all?page=${page}&limit=${limit}`)
      .then(resolve)
      .catch(reject);
  });
}

export function addSkillApi({ title, fieldId }) {
  return new Promise((resolve, reject) => {
    apiRequest
      .post(`${SERVER_URL}/api/skill/add`, { title, fieldId })
      .then(resolve)
      .catch(reject);
  });
}

export function deleteSkillApi(skillId) {
  return new Promise((resolve, reject) => {
    apiRequest
      .delete(`${SERVER_URL}/api/skill/${skillId}`)
      .then(resolve)
      .catch(reject);
  });
}
