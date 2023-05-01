import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Select, Tooltip, Upload } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../../contexts/AuthContext";
import { handlePrivateApiError } from "../../../api/errorHandlers";
import { showErrorToastAction, showToastAction } from "../../../utils/toast";
import BodyLayout from "../../layouts/BodyLayout";
import {
  getApplicantProfileApi,
  uploadApplicantImageApi,
  uploadApplicantProfileApi,
} from "../../../api/applicant/applicantApi";
import { FlexContainer } from "../../common/spaces";
import { SERVER_URL } from "../../../config";

const Container = styled.div`
  border: 1px solid #ababab;
  border-radius: 6px;
  padding: 1rem;
  width: 700px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const UploadAvatar = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
`;

const StyledForm = styled(Form)`
  margin-top: 2rem;
  width: 100%;
`;

// interface IFieldData {
//   name: string | number | (string | number)[];
//   value?: any;
//   touched?: boolean;
//   validating?: boolean;
//   errors?: string[];
// }

const ApplicantProfilePage = () => {
  const { logoutApplicantApiAction } = useAuthContext();

  const [fields, setFields] = useState([
    { name: ["name"], value: "" },
    { name: ["gender"], value: "m" },
    { name: ["email"], value: "" },
    { name: ["phone"], value: "" },
    { name: ["password"], value: "" },
    { name: ["website"], value: "" },
    { name: ["bio"], value: "" },
  ]);

  const [profile, setProfile] = useState(undefined);

  const getApplicantProfileApiAction = useCallback(async () => {
    try {
      const { data } = await getApplicantProfileApi();
      setProfile(data);
      setFields([
        { name: ["name"], value: data.name },
        { name: ["gender"], value: data.gender },
        { name: ["email"], value: data.email },
        { name: ["phone"], value: data.phone },
        { name: ["bio"], value: data.bio },
        { name: ["website"], value: data.website },
      ]);
    } catch (err) {
      const { data, error } = handlePrivateApiError(
        err,
        logoutApplicantApiAction
      );
      showErrorToastAction({ message: data?.message || error });
    }
  }, [logoutApplicantApiAction]);

  useEffect(() => {
    getApplicantProfileApiAction();
  }, [getApplicantProfileApiAction]);

  const handleBeforeUpload = async (file) => {
    try {
      if (!file) {
        console.error(`not an image, the image file is a ${typeof file}`);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      await uploadApplicantImageApi(formData);
      await getApplicantProfileApiAction();
      showToastAction({ message: "Image uploaded", type: "success" });
      location.reload();
    } catch (err) {
      const { data, error } = handlePrivateApiError(
        err,
        logoutApplicantApiAction
      );
      showErrorToastAction({ message: data?.message || error });
    }
  };

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      await uploadApplicantProfileApi(values);
      await getApplicantProfileApiAction();
      showToastAction({ message: "Updated", type: "success" });
    } catch (err) {
      const { data, error } = handlePrivateApiError(
        err,
        logoutApplicantApiAction
      );
      showErrorToastAction({
        message: data?.message || error || "Failed to update profile",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <BodyLayout>
      <Container>
        <AvatarContainer>
          <Avatar
            size={{ xs: 40, sm: 36, md: 48, lg: 72, xl: 98, xxl: 112 }}
            icon={<UserOutlined />}
            src={`${SERVER_URL}${profile?.image}`}
            alt={profile?.name}
          />

          <UploadAvatar>
            <Tooltip title="Upload profile photo" placement="bottomLeft">
              <Upload
                multiple={false}
                maxCount={1}
                beforeUpload={(file) => {
                  handleBeforeUpload(file);
                  return false;
                }}
                fileList={[]}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CameraOutlined />}
                />
              </Upload>
            </Tooltip>
          </UploadAvatar>
        </AvatarContainer>

        <StyledForm
          name="profile"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          fields={fields}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          autoComplete="off"
        >
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
          {/* <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item> */}

          <Form.Item label="Gender" name="gender">
            <Select
              options={[
                { label: "male", value: "m" },
                { label: "female", value: "f" },
                { label: "other", value: "o" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Website" name="website">
            <Input />
          </Form.Item>

          <FlexContainer gap="2rem" justifyContent="flex-end">
            <Button danger size="large" onClick={logoutApplicantApiAction}>
              Logout
            </Button>
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button>
            </Form.Item>
          </FlexContainer>
        </StyledForm>
      </Container>
    </BodyLayout>
  );
};

export default ApplicantProfilePage;
