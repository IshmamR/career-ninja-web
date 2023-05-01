import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { APPLICANT_LOGIN_PAGE } from "../constants/routes";

const ApplicantRouter = () => {
  const { authApplicant } = useAuthContext();

  return !!authApplicant ? <Outlet /> : <Navigate to={APPLICANT_LOGIN_PAGE} />;
};

export default ApplicantRouter;
