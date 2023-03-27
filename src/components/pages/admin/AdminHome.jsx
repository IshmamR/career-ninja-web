import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_ROUTE } from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";

const LoginButton = styled(Button)`
  width: 100%;
`;

const AdminHome = () => {
  const { loginAdminApiAction } = useAuthContext();

  const navigate = useNavigate();

  return (
    <div>
      <Button type="danger">Logout</Button>
    </div>
  );
};

export default AdminHome;
