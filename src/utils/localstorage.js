const LOCAL_KEYS = {
  authAdmin: "@auth_admin_local",
  authApplicant: "@auth_applicant_local",
  authCompany: "@auth_company_local",
};

export function getLocalAuthAdmin() {
  const authLocal = localStorage.getItem(LOCAL_KEYS.authAdmin);
  if (authLocal) return JSON.parse(authLocal);
  return null;
}
export function setLocalAuthAdmin(authLocal) {
  if (!authLocal) return;
  localStorage.setItem(LOCAL_KEYS.authAdmin, JSON.stringify(authLocal));
}
export function removeLocalAuthAdmin() {
  localStorage.removeItem(LOCAL_KEYS.authAdmin);
}
