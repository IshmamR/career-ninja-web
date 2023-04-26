import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHome from "../components/pages/admin/AdminHome";
import AdminLogin from "../components/pages/admin/AdminLogin";
import {
  ADMIN_COMPANIES,
  ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
  COMPANY_ADMIN_ROUTE,
  COMPANY_LOGIN_ROUTE,
  COMPANY_SIGNUP_ROUTE,
} from "../constants/routes";
import AdminRouter from "./AdminRouter";
import AllCompanies from "../components/pages/admin/company/AllCompanies";
import CompanyAdminRouter from "./CompanyAdminRouter";
import CompanySignup from "../components/pages/company/CompanySignup";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminRouter />}>
          <Route element={<AdminHome />} path={ADMIN_ROUTE} />
          <Route element={<AllCompanies />} path={ADMIN_COMPANIES} />
        </Route>
        <Route element={<AdminLogin />} path={ADMIN_LOGIN_ROUTE} />

        <Route element={<CompanyAdminRouter />}>
          <Route element={<AllCompanies />} path={COMPANY_ADMIN_ROUTE} />
        </Route>
        <Route element={<CompanySignup />} path={COMPANY_SIGNUP_ROUTE} />
        <Route element={<AdminLogin />} path={COMPANY_LOGIN_ROUTE} />
      </Routes>
    </Router>
  );
};

export default Routers;
