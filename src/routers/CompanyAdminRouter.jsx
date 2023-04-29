import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { COMPANY_LOGIN_ROUTE } from "../constants/routes";

const CompanyAdminRouter = () => {
  const { authCompany } = useAuthContext();

  return !!authCompany ? <Outlet /> : <Navigate to={COMPANY_LOGIN_ROUTE} />;
};

export default CompanyAdminRouter;
