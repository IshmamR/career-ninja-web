import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const AdminRouter = () => {
  const { authAdmin } = useAuthContext();

  return !!authAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRouter;
