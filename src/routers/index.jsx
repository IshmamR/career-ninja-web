import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHome from "../components/pages/admin/AdminHome";
import AdminLogin from "../components/pages/admin/AdminLogin";
import { ADMIN_LOGIN_ROUTE, ADMIN_ROUTE } from "../constants/routes";
import AdminRouter from "./AdminRouter";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminRouter />}>
          <Route element={<AdminHome />} path={ADMIN_ROUTE} />
        </Route>
        <Route element={<AdminLogin />} path={ADMIN_LOGIN_ROUTE} />
      </Routes>
    </Router>
  );
};

export default Routers;
