import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../components/pages/admin/AdminHome";
import AdminLogin from "../components/pages/admin/AdminLogin";
import {
  ADMIN_COMPANIES,
  ADMIN_FIELDS,
  ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
  ADMIN_SKILLS,
  COMPANY_ADMIN_ROUTE,
  COMPANY_LOGIN_ROUTE,
  COMPANY_SIGNUP_ROUTE,
  COMPANY_ADMIN_PROFILE,
  HOME_ROUTE,
  JOB_SEARCH_ROUTE,
  APPLICANT_REGISTER_PAGE,
  APPLICANT_LOGIN_PAGE,
  APPLICANT_PROFILE,
} from "../constants/routes";
import AdminRouter from "./AdminRouter";
import AllCompanies from "../components/pages/admin/company/AllCompanies";
import CompanyAdminRouter from "./CompanyAdminRouter";
import CompanySignup from "../components/pages/company/CompanySignup";
import AllFields from "../components/pages/admin/fields/AllFields";
import AllSkills from "../components/pages/admin/skills/AllSkills";
import CompanyAdminLogin from "../components/pages/company/CompanyLogin";
import CompanyAdminHome from "../components/pages/company/CompanyAdminHome";
import CompanyAdminProfile from "../components/pages/company/CompanyAdminProfile";
import HomePage from "../components/pages/Home";
import JobSearchPage from "../components/pages/JobSearchPage";
import ApplicantRegisterPage from "../components/pages/applicant/ApplicantRegisterPage";
import ApplicantLoginPage from "../components/pages/applicant/ApplicantLogin";
import ApplicantRouter from "./ApplicantRouter";
import ApplicantProfilePage from "../components/pages/applicant/ApplicantProfile";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path={HOME_ROUTE} />
        <Route element={<JobSearchPage />} path={JOB_SEARCH_ROUTE} />

        <Route element={<ApplicantRouter />}>
          <Route element={<ApplicantProfilePage />} path={APPLICANT_PROFILE} />
        </Route>
        <Route
          element={<ApplicantRegisterPage />}
          path={APPLICANT_REGISTER_PAGE}
        />
        <Route element={<ApplicantLoginPage />} path={APPLICANT_LOGIN_PAGE} />

        <Route element={<AdminRouter />}>
          <Route element={<AdminHome />} path={ADMIN_ROUTE} />
          <Route element={<AllCompanies />} path={ADMIN_COMPANIES} />
          <Route element={<AllFields />} path={ADMIN_FIELDS} />
          <Route element={<AllSkills />} path={ADMIN_SKILLS} />
        </Route>
        <Route element={<AdminLogin />} path={ADMIN_LOGIN_ROUTE} />

        <Route element={<CompanyAdminRouter />}>
          <Route element={<CompanyAdminHome />} path={COMPANY_ADMIN_ROUTE} />
          <Route
            element={<CompanyAdminProfile />}
            path={COMPANY_ADMIN_PROFILE}
          />
        </Route>
        <Route element={<CompanySignup />} path={COMPANY_SIGNUP_ROUTE} />
        <Route element={<CompanyAdminLogin />} path={COMPANY_LOGIN_ROUTE} />
      </Routes>
    </>
  );
};

export default Routers;
