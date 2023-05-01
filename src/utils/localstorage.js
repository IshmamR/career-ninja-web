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
    companyAdmin: "@auth_company_local",
    authCompanyToken: "@auth_company_token_local",
  },
};

///////////
// admin //
///////////

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

/////////////
// company //
/////////////

export function getLocalAuthCompanyAdminAndToken() {
  const authLocal = localStorage.getItem(LOCAL_KEYS.company.companyAdmin);
  const authTokenLocal = localStorage.getItem(
    LOCAL_KEYS.company.authCompanyToken
  );
  if (authLocal) {
    return {
      companyAdmin: JSON.parse(authLocal),
      authCompanyToken: authTokenLocal,
    };
  }
  return null;
}

export function setLocalAuthCompanyAdminAndToken(
  companyAdmin,
  authCompanyToken
) {
  if (!companyAdmin) return;
  localStorage.setItem(
    LOCAL_KEYS.company.companyAdmin,
    JSON.stringify(companyAdmin)
  );
  localStorage.setItem(LOCAL_KEYS.company.authCompanyToken, authCompanyToken);
}

export function removeLocalAuthCompanyAdminAndToken() {
  localStorage.removeItem(LOCAL_KEYS.company.companyAdmin);
  localStorage.removeItem(LOCAL_KEYS.company.authCompanyToken);
}

///////////////
// applicant //
///////////////

export function getLocalAuthApplicantAndToken() {
  const authLocal = localStorage.getItem(LOCAL_KEYS.applicant.authApplicant);
  const authTokenLocal = localStorage.getItem(
    LOCAL_KEYS.applicant.authApplicantToken
  );
  if (authLocal) {
    return {
      authApplicant: JSON.parse(authLocal),
      authApplicantToken: authTokenLocal,
    };
  }
  return null;
}

export function setLocalAuthApplicantAndToken(
  authApplicant,
  authApplicantToken
) {
  if (!authApplicant) return;
  localStorage.setItem(
    LOCAL_KEYS.applicant.authApplicant,
    JSON.stringify(authApplicant)
  );
  localStorage.setItem(
    LOCAL_KEYS.applicant.authApplicantToken,
    authApplicantToken
  );
}

export function removeLocalAuthApplicantAndToken() {
  localStorage.removeItem(LOCAL_KEYS.applicant.authApplicant);
  localStorage.removeItem(LOCAL_KEYS.applicant.authApplicantToken);
}
