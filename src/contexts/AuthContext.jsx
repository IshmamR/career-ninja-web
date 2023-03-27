import React, { createContext, useCallback, useContext, useState } from "react";
import { loginAdminApi, logoutAdminApi } from "../api/admin/adminApi";
import {
  getLocalAuthAdmin,
  removeLocalAuthAdmin,
  setLocalAuthAdmin,
} from "../utils/localstorage";
import { showErrorToastAction } from "../utils/toast";

const localAuthAdmin = getLocalAuthAdmin();

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
  authApplicant: null,
  authCompany: null,
  loginLoading: false,
  logoutLoading: false,
  loginAdminApi: async () => null,
  logoutAdminApi: async () => null,
});

const AuthProvider = ({ children }) => {
  const [authAdmin, setAuthAdmin] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loginAdminApiAction = useCallback(
    async ({ username, password }, onSuccess, onFailure) => {
      setLoginLoading(true);
      try {
        const { data } = await loginAdminApi(username, password);
        setAuthAdmin(data);
        setLocalAuthAdmin(data);
        setLoginLoading(false);
        if (onSuccess) onSuccess();
      } catch (err) {
        setLoginLoading(false);
        showErrorToastAction({
          message: "Failed to login",
          description: err.message,
        });
        if (onFailure) onFailure();
      }
    },
    []
  );

  const logoutAdminApiAction = useCallback(async (onSuccess, onFailure) => {
    setLogoutLoading(true);
    try {
      await logoutAdminApi();
      setAuthAdmin(null);
      removeLocalAuthAdmin();
      setLogoutLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setLogoutLoading(false);
      showErrorToastAction({
        message: "Failed to logout",
        description: err.message,
      });
      if (onFailure) onFailure();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authAdmin,
        loginLoading,
        logoutLoading,
        loginAdminApiAction,
        logoutAdminApiAction,
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
