import { Button, Form, Input, Select, Typography, Upload } from "antd";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  APPLICANT_LOGIN_PAGE,
  APPLICANT_PROFILE,
  APPLICANT_REGISTER_PAGE,
} from "../../../constants/routes";
import { useAuthContext } from "../../../contexts/AuthContext";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

const StyledForm = styled(Form)`
  width: 800px;
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  background-color: white;
  border: 1px solid #696969;
  border-radius: 4px;
`;

const UploadContainer = styled(Form.Item)`
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApplicantRegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authApplicant, loginLoading, registerApplicantApiAction } =
    useAuthContext();

  if (authApplicant && location.pathname === APPLICANT_REGISTER_PAGE) {
    return <Navigate to={APPLICANT_PROFILE} />;
  }

  // image
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleBeforeUpload = async (file) => {
    if (!file) {
      console.error(`not an image, the image file is a ${typeof file}`);
      return;
    }

    setImageFile(file);

    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImageUrl(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append("image", imageFile);

    registerApplicantApiAction(
      formData,
      () => {
        navigate(APPLICANT_PROFILE);
      },
      () => {
        //
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Container>
      <StyledForm
        name="register"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <UploadContainer>
          <Upload
            name="image"
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
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
        </UploadContainer>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
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

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder=""
            allowClear={false}
            options={[
              { label: "male", value: "m" },
              { label: "female", value: "f" },
              { label: "other", value: "o" },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loginLoading}
          >
            Submit
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <Typography.Text>
            Already have an account?&nbsp;
            <Link to={APPLICANT_LOGIN_PAGE}>Login</Link>
          </Typography.Text>
        </div>
      </StyledForm>
    </Container>
  );
};

export default ApplicantRegisterPage;
