import React, { createContext, useCallback, useContext, useState } from "react";
import { loginAdminApi, logoutAdminApi } from "../api/admin/adminApi";
import {
  getLocalAuthAdminAndToken,
  getLocalAuthCompanyAdminAndToken,
  removeLocalAuthAdminAndToken,
  removeLocalAuthCompanyAdminAndToken,
  setLocalAuthAdminAndToken,
  setLocalAuthCompanyAdminAndToken,
} from "../utils/localstorage";
import { showErrorToastAction } from "../utils/toast";
import { removeAuthorizationApi, setAuthorizationApi } from "../api/apiRequest";
import { companyLoginApi, companyLogoutApi } from "../api/company/companyApi";
import { handlePublicApiError } from "../api/errorHandlers";
import { Alert } from "antd";

const localAuthAdmin = getLocalAuthAdminAndToken();
const localAuthCompanyAdmin = getLocalAuthCompanyAdminAndToken();

/**
 * @typedef {{
 *  authAdmin: {id: string; username: string; type: string} | null;
 *  authApplicant: null;
 *  authCompany: null;
 *  loginLoading: boolean;
 *  loginAdminApiAction: ({username: string; password: string}, () => void, () => void) => Promise<void>;
 *  logoutLoading: boolean;
 *  logoutAdminApiAction: (() => void, () => void) => Promise<void>;
 * }} IAuthContext
 */

/**
 * @type {React.Context<IAuthContext>}
 */
const AuthContext = createContext({
  authAdmin: localAuthAdmin,
  authCompany: null,
  authApplicant: null,
  loginLoading: false,
  logoutLoading: false,
  loginAdminApiAction: async () => null,
  logoutAdminApiAction: async () => null,
  loginCompanyAdminApiAction: async () => null,
  logoutCompanyAdminApiAction: async () => null,
});

const AuthProvider = ({ children }) => {
  const [authAdmin, setAuthAdmin] = useState(localAuthAdmin?.authAdmin ?? null);

  const [authCompany, setAuthCompany] = useState(
    localAuthCompanyAdmin?.companyAdmin ?? null
  );

  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  if (localAuthAdmin) {
    setAuthorizationApi(localAuthAdmin.authAdminToken);
  } else if (localAuthCompanyAdmin) {
    setAuthorizationApi(localAuthCompanyAdmin.authCompanyToken);
  }

  const removeAdminAuthData = useCallback(() => {
    removeLocalAuthAdminAndToken();
    setAuthAdmin(null);
  }, []);

  const removeCompanyAuthData = useCallback(() => {
    removeLocalAuthCompanyAdminAndToken();
    setAuthCompany(null);
  }, []);

  const loginAdminApiAction = useCallback(
    async ({ username, password }, onSuccess, onFailure) => {
      try {
        setLoginLoading(true);

        // remove previous auth data
        removeCompanyAuthData();

        const { data } = await loginAdminApi({ username, password });
        const { admin, authAdminToken } = data;
        setAuthAdmin(admin);
        setAuthorizationApi(authAdminToken);
        setLocalAuthAdminAndToken(admin, authAdminToken);
        setLoginLoading(false);
        Alert({ message: "Logged in as " + admin.username, type: "info" });
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
    [removeCompanyAuthData]
  );

  const logoutAdminApiAction = useCallback(
    async (onSuccess, onFailure) => {
      setLogoutLoading(true);
      try {
        await logoutAdminApi();
        removeAdminAuthData();
        removeAuthorizationApi();
        setLogoutLoading(false);
        Alert({ message: "Logged out", type: "info" });
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

        const { data } = await companyLoginApi({ username, password });
        const { companyAdmin, authCompanyToken } = data;
        setAuthCompany(companyAdmin);
        setAuthorizationApi(authCompanyToken);
        setLocalAuthCompanyAdminAndToken(companyAdmin, authCompanyToken);
        setLoginLoading(false);

        Alert({
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
    [removeAdminAuthData]
  );

  const logoutCompanyAdminApiAction = useCallback(
    async (onSuccess, onFailure) => {
      setLogoutLoading(true);
      try {
        await companyLogoutApi();
        removeCompanyAuthData();
        removeAuthorizationApi();
        setLogoutLoading(false);
        Alert({ message: "Logged out", type: "info" });
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

  return (
    <AuthContext.Provider
      value={{
        authAdmin,
        authCompany,
        loginLoading,
        logoutLoading,
        loginAdminApiAction,
        logoutAdminApiAction,
        loginCompanyAdminApiAction,
        logoutCompanyAdminApiAction,
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
