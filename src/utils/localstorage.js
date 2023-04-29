const LOCAL_KEYS = {
  admin: {
    authAdmin: "@auth_admin_local",
    authAdminToken: "@auth_admin_token_local",
  },
  applicant: {
    authApplicant: "@auth_applicant_local",
    authApplicantToken: "@auth_applicant_token_local",
  },
  company: {
    authCompany: "@auth_company_local",
    authCompanyToken: "@auth_company_token_local",
  },
};

export function getLocalAuthAdminAndToken() {
  const authLocal = localStorage.getItem(LOCAL_KEYS.admin.authAdmin);
  const authTokenLocal = localStorage.getItem(LOCAL_KEYS.admin.authAdminToken);
  if (authLocal) {
    return {
      authAdmin: JSON.parse(authLocal),
      authAdminToken: authTokenLocal,
    };
  }
  return null;
}
export function setLocalAuthAdminAndToken(authAdmin, authAdminToken) {
  if (!authAdmin) return;
  localStorage.setItem(LOCAL_KEYS.admin.authAdmin, JSON.stringify(authAdmin));
  localStorage.setItem(LOCAL_KEYS.admin.authAdminToken, authAdminToken);
}

export function removeLocalAuthAdminAndToken() {
  localStorage.removeItem(LOCAL_KEYS.admin.authAdmin);
  localStorage.removeItem(LOCAL_KEYS.admin.authAdminToken);
}
