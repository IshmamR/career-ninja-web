import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
} from "../constants/routes";
import AdminRouter from "./AdminRouter";
import AllCompanies from "../components/pages/admin/company/AllCompanies";
import CompanyAdminRouter from "./CompanyAdminRouter";
import CompanySignup from "../components/pages/company/CompanySignup";
import AllFields from "../components/pages/admin/fields/AllFields";
import AllSkills from "../components/pages/admin/skills/AllSkills";
import CompanyAdminLogin from "../components/pages/company/CompanyLogin";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminRouter />}>
          <Route element={<AdminHome />} path={ADMIN_ROUTE} />
          <Route element={<AllCompanies />} path={ADMIN_COMPANIES} />
          <Route element={<AllFields />} path={ADMIN_FIELDS} />
          <Route element={<AllSkills />} path={ADMIN_SKILLS} />
        </Route>
        <Route element={<AdminLogin />} path={ADMIN_LOGIN_ROUTE} />

        <Route element={<CompanyAdminRouter />}>
          <Route element={<AllCompanies />} path={COMPANY_ADMIN_ROUTE} />
        </Route>
        <Route element={<CompanySignup />} path={COMPANY_SIGNUP_ROUTE} />
        <Route element={<CompanyAdminLogin />} path={COMPANY_LOGIN_ROUTE} />
      </Routes>
    </Router>
  );
};

export default Routers;
