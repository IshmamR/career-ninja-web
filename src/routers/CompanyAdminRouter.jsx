import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const CompanyAdminRouter = () => {
  const { authCompanyAdmin } = useAuthContext();

  return !!authCompanyAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/company/admin/login" />
  );
};

export default CompanyAdminRouter;
