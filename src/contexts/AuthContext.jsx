import React, { createContext, useCallback, useContext, useState } from "react";
import { loginAdminApi, logoutAdminApi } from "../api/admin/adminApi";
import {
  getLocalAuthAdminAndToken,
  getLocalAuthApplicantAndToken,
  getLocalAuthCompanyAdminAndToken,
  removeLocalAuthAdminAndToken,
  removeLocalAuthApplicantAndToken,
  removeLocalAuthCompanyAdminAndToken,
  setLocalAuthAdminAndToken,
  setLocalAuthApplicantAndToken,
  setLocalAuthCompanyAdminAndToken,
} from "../utils/localstorage";
import { showErrorToastAction, showToastAction } from "../utils/toast";
import { removeAuthorizationApi, setAuthorizationApi } from "../api/apiRequest";
import { companyLoginApi, companyLogoutApi } from "../api/company/companyApi";
import { handlePublicApiError } from "../api/errorHandlers";
import {
  loginApplicantApi,
  logoutApplicantApi,
  registerApplicantApi,
} from "../api/applicant/applicantApi";
import { useNavigate } from "react-router-dom";
import { APPLICANT_LOGIN_PAGE } from "../constants/routes";

const localAuthAdmin = getLocalAuthAdminAndToken();
const localAuthCompanyAdmin = getLocalAuthCompanyAdminAndToken();
const localAuthApplicant = getLocalAuthApplicantAndToken();

const AuthContext = createContext({
  authAdmin: localAuthAdmin,
  authCompany: localAuthCompanyAdmin,
  authApplicant: localAuthApplicant,
  loginLoading: false,
  logoutLoading: false,
  loginAdminApiAction: async () => null,
  logoutAdminApiAction: async () => null,
  loginCompanyAdminApiAction: async () => null,
  logoutCompanyAdminApiAction: async () => null,
  registerApplicantApiAction: async () => null,
  loginApplicantApiAction: async () => null,
  logoutApplicantApiAction: async () => null,
});

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authAdmin, setAuthAdmin] = useState(localAuthAdmin?.authAdmin ?? null);

  const [authCompany, setAuthCompany] = useState(
    localAuthCompanyAdmin?.companyAdmin ?? null
  );

  const [authApplicant, setAuthApplicant] = useState(
    localAuthApplicant?.authApplicant ?? null
  );

  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  if (localAuthAdmin) {
    setAuthorizationApi(localAuthAdmin.authAdminToken);
  } else if (localAuthCompanyAdmin) {
    setAuthorizationApi(localAuthCompanyAdmin.authCompanyToken);
  } else if (localAuthApplicant) {
    setAuthorizationApi(localAuthApplicant.authApplicantToken);
  }

  const removeAdminAuthData = useCallback(() => {
    removeLocalAuthAdminAndToken();
    setAuthAdmin(null);
  }, []);

  const removeCompanyAuthData = useCallback(() => {
    removeLocalAuthCompanyAdminAndToken();
    setAuthCompany(null);
  }, []);

  const removeApplicantAuthData = useCallback(() => {
    removeLocalAuthApplicantAndToken();
    setAuthApplicant(null);
  }, []);

  const loginAdminApiAction = useCallback(
    async ({ username, password }, onSuccess, onFailure) => {
      try {
        setLoginLoading(true);

        // remove previous auth data
        removeCompanyAuthData();
        removeApplicantAuthData();

        const { data } = await loginAdminApi({ username, password });
        const { admin, authAdminToken } = data;
        setAuthAdmin(admin);
        setAuthorizationApi(authAdminToken);
        setLocalAuthAdminAndToken(admin, authAdminToken);
        setLoginLoading(false);
        showToastAction({
          message: "Logged in as " + admin.username,
          type: "info",
        });
        if (onSuccess) onSuccess();
      } catch (err) {
        setLoginLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to login",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeCompanyAuthData, removeApplicantAuthData]
  );

  const logoutAdminApiAction = useCallback(
    async (onSuccess, onFailure) => {
      setLogoutLoading(true);
      try {
        await logoutAdminApi();
        removeAdminAuthData();
        removeAuthorizationApi();
        setLogoutLoading(false);
        showToastAction({ message: "Logged out", type: "info" });
        if (onSuccess) onSuccess();
      } catch (err) {
        setLogoutLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to logout",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeAdminAuthData]
  );

  const loginCompanyAdminApiAction = useCallback(
    async ({ username, password }, onSuccess, onFailure) => {
      try {
        setLoginLoading(true);

        // remove previous auth data
        removeAdminAuthData();
        removeApplicantAuthData();

        const { data } = await companyLoginApi({ username, password });
        const { companyAdmin, authCompanyToken } = data;
        setAuthCompany(companyAdmin);
        setAuthorizationApi(authCompanyToken);
        setLocalAuthCompanyAdminAndToken(companyAdmin, authCompanyToken);
        setLoginLoading(false);

        showToastAction({
          message: "Logged in as " + companyAdmin.username,
          type: "info",
        });

        if (onSuccess) onSuccess();
      } catch (err) {
        setLoginLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to login",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeAdminAuthData, removeApplicantAuthData]
  );

  const logoutCompanyAdminApiAction = useCallback(
    async (onSuccess, onFailure) => {
      setLogoutLoading(true);
      try {
        await companyLogoutApi();
        removeCompanyAuthData();
        removeAuthorizationApi();
        setLogoutLoading(false);
        showToastAction({ message: "Logged out", type: "info" });
        if (onSuccess) onSuccess();
      } catch (err) {
        setLogoutLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to logout",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeCompanyAuthData]
  );

  const registerApplicantApiAction = useCallback(
    async (formData, onSuccess, onFailure) => {
      try {
        setLoginLoading(true);

        // remove previous auth data
        removeAdminAuthData();
        removeCompanyAuthData();

        const { data } = await registerApplicantApi(formData);
        setAuthApplicant(data.authApplicant);
        setAuthorizationApi(data.authApplicantToken);
        setLocalAuthApplicantAndToken(
          data.authApplicant,
          data.authApplicantToken
        );
        setLoginLoading(false);

        showToastAction({
          message: "Logged in as " + data.authApplicant.name,
          type: "info",
        });

        if (onSuccess) onSuccess();
      } catch (err) {
        setLoginLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to register",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeAdminAuthData, removeCompanyAuthData]
  );

  const loginApplicantApiAction = useCallback(
    async ({ email, password }, onSuccess, onFailure) => {
      try {
        console.log(email, password);
        setLoginLoading(true);

        // remove previous auth data
        removeAdminAuthData();
        removeCompanyAuthData();

        const { data } = await loginApplicantApi({ email, password });
        setAuthApplicant(data.authApplicant);
        setAuthorizationApi(data.authApplicantToken);
        setLocalAuthApplicantAndToken(
          data.authApplicant,
          data.authApplicantToken
        );
        setLoginLoading(false);

        showToastAction({
          message: "Logged in as " + data.authApplicant.name,
          type: "info",
        });

        if (onSuccess) onSuccess();
      } catch (err) {
        setLoginLoading(false);
        const { data, error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to login",
          description: data?.message || error,
        });
        if (onFailure) onFailure();
      }
    },
    [removeAdminAuthData, removeCompanyAuthData]
  );

  const logoutApplicantApiAction = useCallback(
    async (onSuccess, onFailure) => {
      setLogoutLoading(true);
      try {
        removeApplicantAuthData();
        removeAuthorizationApi();
        setLogoutLoading(false);
        showToastAction({ message: "Logged out", type: "info" });
        await logoutApplicantApi();
        navigate(APPLICANT_LOGIN_PAGE);
        if (onSuccess) onSuccess();
      } catch (err) {
        setLogoutLoading(false);
        const { data, error } = handlePublicApiError(err);
        // showErrorToastAction({
        //   message: "Failed to logout",
        //   description: data?.message || error,
        // });
        if (onFailure) onFailure();
      }
    },
    [removeApplicantAuthData]
  );

  return (
    <AuthContext.Provider
      value={{
        authAdmin,
        authCompany,
        authApplicant,
        loginLoading,
        logoutLoading,
        loginAdminApiAction,
        logoutAdminApiAction,
        loginCompanyAdminApiAction,
        logoutCompanyAdminApiAction,
        registerApplicantApiAction,
        loginApplicantApiAction,
        logoutApplicantApiAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
