import { Button, Form, Input, Select, Typography, Upload } from "antd";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_LOGIN_ROUTE, ADMIN_ROUTE } from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { companySignupApi } from "../../../api/company/companyApi";
import { showErrorToastAction, showToastAction } from "../../../utils/toast";
import { COMPANY_LOGIN_ROUTE } from "../../../constants/routes";
import { Gap } from "../../common/spaces";

const FormContainer = styled.div`
  width: 500px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const initialCompanyData = {
  title: "",
  description: "",
  logo: "",
  email: "",
  contact: "",
  website: "",
  country: undefined,
  city: "",
};

const initialCompanyAdminData = {
  username: "",
  password: "",
};

const CompanySignup = () => {
  const { authAdmin, loginLoading } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0 -> company | 1 -> companyAdmin
  const [company, setCompany] = useState(initialCompanyData);
  const [companyAdmin, setCompanyAdmin] = useState(initialCompanyAdminData);

  // logo
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // submission
  const [submissionLoading, setSubmissionLoading] = useState(false);

  if (authAdmin && location.pathname === ADMIN_LOGIN_ROUTE) {
    return <Navigate to={ADMIN_ROUTE} />;
  }

  const handleBeforeUpload = async (file) => {
    if (!file) {
      console.error(`not an image, the image file is a ${typeof file}`);
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleFinish = (e) => {
    const { title, description, email, contact, website, country, city } = e;
    setCompany((prev) => ({
      ...prev,
      title,
      description,
      email,
      contact,
      website,
      country,
      city,
    }));

    setStep(1);
  };

  const onSubmit = async (e) => {
    const { username, password } = e;

    if (!username || !password) return;

    setCompanyAdmin({ username, password });
    try {
      setSubmissionLoading(true);

      const formData = new FormData();
      formData.append("company", JSON.stringify(company));
      formData.append("companyAdmin", JSON.stringify({ username, password }));
      formData.append("image", imageFile);

      const { data } = await companySignupApi(formData);
      showToastAction({ message: data.message });
      navigate(COMPANY_LOGIN_ROUTE);
    } catch (err) {
      console.log(err);
      showErrorToastAction({ message: "Failed to submit" });
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <FormContainer>
      {!step ? (
        <Form onFinish={handleFinish} initialValues={company}>
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            Company signup
          </Typography.Title>

          <UploadContainer>
            <Upload
              name="logo"
              listType="picture-card"
              onRemove={() => {
                setImageUrl("");
              }}
              beforeUpload={(file) => {
                handleBeforeUpload(file);
                return false;
              }}
              multiple={false}
              maxCount={1}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  {imageUploading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload Company logo</div>
                </div>
              )}
            </Upload>
          </UploadContainer>

          <Form.Item name="title">
            <Input size="large" placeholder="Company title" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea size="large" placeholder="Company description" />
          </Form.Item>
          <Form.Item name="email">
            <Input size="large" placeholder="E-mail" />
          </Form.Item>
          <Form.Item name="contact">
            <Input size="large" placeholder="Contact" />
          </Form.Item>
          <Form.Item name="website">
            <Input size="large" placeholder="Website" />
          </Form.Item>
          <Form.Item name="country">
            <Select
              allowClear
              size="large"
              placeholder="Country"
              style={{ width: "100%" }}
              options={[{ label: "BD", value: "BD" }]}
            />
          </Form.Item>
          <Form.Item name="city">
            <Input size="large" placeholder="City" />
          </Form.Item>

          <StyledButton size="large" type="primary" htmlType="submit">
            Next step
          </StyledButton>
        </Form>
      ) : (
        <Form onFinish={onSubmit} initialValues={companyAdmin}>
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            Company signup
          </Typography.Title>
          <Form.Item name="username">
            <Input size="large" placeholder="username" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password size="large" placeholder="password" />
          </Form.Item>
          <ButtonsContainer>
            <StyledButton onClick={() => setStep(0)}>Prev</StyledButton>
            <StyledButton
              size="large"
              type="primary"
              htmlType="submit"
              loading={submissionLoading}
            >
              Submit
            </StyledButton>
          </ButtonsContainer>
        </Form>
      )}

      <Gap height="1rem" />

      <Typography.Paragraph style={{ textAlign: "right" }}>
        Already have your company registered?&nbsp;
        <Link to={COMPANY_LOGIN_ROUTE}>Login</Link>
      </Typography.Paragraph>
    </FormContainer>
  );
};

export default CompanySignup;
