import { Button, Form, Input, Typography, Upload } from "antd";
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ADMIN_LOGIN_ROUTE, ADMIN_ROUTE } from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { storage } from "../../../../firebase";
import { companySignupApi } from "../../../api/company/companyApi";
import { showErrorToastAction, showToastAction } from "../../../utils/toast";
import { COMPANY_LOGIN_ROUTE } from "../../../constants/routes";

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
  country: "",
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

  // submission
  const [submissionLoading, setSubmissionLoading] = useState(false);

  if (authAdmin && location.pathname === ADMIN_LOGIN_ROUTE) {
    return <Navigate to={ADMIN_ROUTE} />;
  }

  const handleUpload = async (file) => {
    if (!file) {
      console.error(`not an image, the image file is a ${typeof file}`);
      return;
    }

    setImageUploading(true);

    const storageRef = ref(storage, `company/logo/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        // setProgresspercent(progress);
      },
      (error) => {
        console.log(error);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setCompany((prev) => ({ ...prev, logo: downloadURL }));
          setImageUploading(false);
        });
      }
    );
  };

  const uploadProps = {
    onRemove: () => {
      setImageUrl("");
    },
    beforeUpload: (file) => {
      handleUpload(file);
      return false;
    },
    multiple: false,
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
    setCompanyAdmin({ username, password });
    try {
      setSubmissionLoading(true);
      const { data } = await companySignupApi({ company, companyAdmin });
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
            <Upload name="logo" listType="picture-card" {...uploadProps}>
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
            <Input size="large" placeholder="Country" />
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
    </FormContainer>
  );
};

export default CompanySignup;
