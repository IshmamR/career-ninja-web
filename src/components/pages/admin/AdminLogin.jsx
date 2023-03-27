import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_ROUTE } from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";

const LoginButton = styled(Button)`
  width: 100%;
`;

const AdminLogin = () => {
  const { loginLoading, loginAdminApiAction } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const handleFinish = (e) => {
    const { username, password } = e;
    loginAdminApiAction(
      { username, password },
      () => {
        // success
        navigate(ADMIN_ROUTE);
      },
      () => {
        // failure
      }
    );
  };

  return (
    <div>
      <Form onFinish={handleFinish}>
        <Typography.Title>Admin Login</Typography.Title>
        <Form.Item name="username">
          <Input size="large" placeholder="username" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password size="large" placeholder="password" />
        </Form.Item>
        <LoginButton
          size="large"
          type="primary"
          htmlType="submit"
          loading={loginLoading}
        >
          Login
        </LoginButton>
      </Form>
    </div>
  );
};

export default AdminLogin;
