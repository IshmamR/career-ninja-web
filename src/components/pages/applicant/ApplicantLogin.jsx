import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  APPLICANT_LOGIN_PAGE,
  APPLICANT_PROFILE,
  APPLICANT_REGISTER_PAGE,
} from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

const StyledForm = styled(Form)`
  width: 500px;
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  background-color: white;
  border: 1px solid #696969;
  border-radius: 4px;
`;

const ApplicantLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authApplicant, loginApplicantApiAction } = useAuthContext();

  if (authApplicant && location.pathname === APPLICANT_LOGIN_PAGE) {
    return <Navigate to={APPLICANT_PROFILE} />;
  }

  const onFinish = (values) => {
    const { email, password } = values;
    loginApplicantApiAction(
      { email, password },
      () => {
        navigate(APPLICANT_PROFILE);
      },
      () => {
        // showErrorToastAction({ message: "Failed to login" });
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <StyledForm
        name="login"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Typography.Text>
            No account? <Link to={APPLICANT_REGISTER_PAGE}>Register</Link>
          </Typography.Text>
        </div>
      </StyledForm>
    </Container>
  );
};

export default ApplicantLoginPage;
