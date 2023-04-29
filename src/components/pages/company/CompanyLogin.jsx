import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  COMPANY_ADMIN_ROUTE,
  COMPANY_LOGIN_ROUTE,
  COMPANY_SIGNUP_ROUTE,
} from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Gap } from "../../common/spaces";

const FormContainer = styled.div`
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 3rem;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const CompanyAdminLogin = () => {
  const { authCompany, loginLoading, loginCompanyAdminApiAction } =
    useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  if (authCompany && location.pathname === COMPANY_LOGIN_ROUTE) {
    return <Navigate to={COMPANY_ADMIN_ROUTE} />;
  }

  const handleFinish = (e) => {
    const { username, password } = e;
    loginCompanyAdminApiAction(
      { username, password },
      () => {
        // success
        navigate(COMPANY_ADMIN_ROUTE);
      },
      () => {
        // failure
      }
    );
  };

  return (
    <FormContainer>
      <Form onFinish={handleFinish}>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Company Login
        </Typography.Title>
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

      <Gap height="1rem" />

      <Typography.Paragraph style={{ textAlign: "right" }}>
        Don't have your company registered yet?&nbsp;
        <Link to={COMPANY_SIGNUP_ROUTE}>Register now</Link>
      </Typography.Paragraph>
    </FormContainer>
  );
};

export default CompanyAdminLogin;
