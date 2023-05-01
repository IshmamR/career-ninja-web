import { SERVER_URL } from "../../config";
import { apiRequest } from "../apiRequest";

export function getAllCircularsApi(
  search = "",
  page,
  limit,
  fieldId = "",
  companyId = ""
) {
  return new Promise((resolve, reject) => {
    apiRequest
      .get(
        `${SERVER_URL}/api/circular/all?search=${search}&page=${page}&limit=${limit}&fieldId=${fieldId}&companyId=${companyId}`
      )
      .then(resolve)
      .catch(reject);
  });
}
