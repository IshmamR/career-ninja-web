import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_LOGIN_ROUTE } from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";
import AdminDashboardLayout from "../../layouts/AdminDashboardLayout";

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const AdminHome = () => {
  const { logoutLoading, logoutAdminApiAction } = useAuthContext();

  const navigate = useNavigate();

  const onClickLogout = () => {
    logoutAdminApiAction(() => {
      navigate(ADMIN_LOGIN_ROUTE);
    });
  };

  return (
    <AdminDashboardLayout>
      <BoxContainer>
        <Button
          type="primary"
          size="large"
          loading={logoutLoading}
          onClick={onClickLogout}
        >
          Logout
        </Button>
      </BoxContainer>
    </AdminDashboardLayout>
  );
};

export default AdminHome;
