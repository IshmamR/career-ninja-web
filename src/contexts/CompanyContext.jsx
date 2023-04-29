import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { showErrorToastAction, showToastAction } from "../utils/toast";
import {
  getCompanyProfileApi,
  updateCompanyProfileApi,
} from "../api/company/companyApi";
import { handlePrivateApiError } from "../api/errorHandlers";
import { useAuthContext } from "./AuthContext";

const CompanyContext = createContext({
  loading: false,
  updateLoading: false,
  companyProfile: null,
  getCompanyProfileApiAction: async () => null,
  updateCompanyProfileApiAction: async () => null,
});

const CompanyProvider = ({ children }) => {
  const { authCompany, logoutCompanyAdminApiAction } = useAuthContext();

  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const getCompanyProfileApiAction = useCallback(
    async (isLoad = true) => {
      if (!authCompany) return;

      try {
        if (isLoad) {
          setLoading(true);
        }

        const { data } = await getCompanyProfileApi();
        setCompanyProfile(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const { data, error } = handlePrivateApiError(
          err,
          logoutCompanyAdminApiAction
        );
        showErrorToastAction({ message: data?.message || error });
      }
    },
    [authCompany, logoutCompanyAdminApiAction]
  );

  useEffect(() => {
    getCompanyProfileApiAction();
  }, [getCompanyProfileApiAction]);

  const updateCompanyProfileApiAction = useCallback(
    async (data, onSuccess, onFailure) => {
      try {
        setUpdateLoading(true);

        await updateCompanyProfileApi(data);
        await getCompanyProfileApiAction(false);
        setUpdateLoading(false);
        showToastAction({ message: "Updated successfully", type: "success" });
        if (onSuccess) {
          onSuccess();
        }
      } catch (err) {
        console.log(err);
        setUpdateLoading(false);
        if (onFailure) onFailure();
        const { data, error } = handlePrivateApiError(
          err,
          logoutCompanyAdminApiAction
        );
        showErrorToastAction({ message: data?.message || error });
      }
    },
    [logoutCompanyAdminApiAction, getCompanyProfileApiAction]
  );

  return (
    <CompanyContext.Provider
      value={{
        loading,
        updateLoading,
        companyProfile,
        getCompanyProfileApiAction,
        updateCompanyProfileApiAction,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
