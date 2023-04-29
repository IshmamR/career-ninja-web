import React, { useEffect, useState } from "react";
import CompanyAdminDashboardLayout from "../../layouts/CompanyAdminDashboardLayout";
import { useCompanyContext } from "../../../contexts/CompanyContext";
import styled from "styled-components";
import { Button, Input, Select, Typography } from "antd";

const MainContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 3rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CompanyAdminProfile = () => {
  const { companyProfile, updateLoading, updateCompanyProfileApiAction } =
    useCompanyContext();

  const [updateData, setUpdateData] = useState({
    title: companyProfile?.title,
    description: companyProfile?.description,
    email: companyProfile?.email,
    contact: companyProfile?.contact,
    website: companyProfile?.website,
    country: companyProfile?.country,
    city: companyProfile?.city,
    address: companyProfile?.address,
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (companyProfile) {
      setUpdateData({
        title: companyProfile.title,
        description: companyProfile.description,
        email: companyProfile.email,
        contact: companyProfile.contact,
        website: companyProfile.website,
        country: companyProfile.country,
        city: companyProfile.city,
        address: companyProfile.address,
      });
    }
  }, [companyProfile]);

  const handleChangeName = (name, value) => {
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const onClickSave = () => {
    updateCompanyProfileApiAction(updateData, () => {
      setIsEdit(false);
    });
  };

  return (
    <CompanyAdminDashboardLayout>
      <MainContainer>
        <Typography.Title level={2}>Company Profile</Typography.Title>
        <FormContainer>
          <LabelInputContainer>
            <Typography.Text strong>Title: </Typography.Text>
            <Input
              name="title"
              readOnly={!isEdit}
              value={updateData.title}
              onChange={(e) => handleChangeName("title", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Description: </Typography.Text>
            <Input.TextArea
              name="description"
              readOnly={!isEdit}
              value={updateData.description}
              onChange={(e) => handleChangeName("description", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Email: </Typography.Text>
            <Input
              name="email"
              readOnly={!isEdit}
              value={updateData.email}
              onChange={(e) => handleChangeName("email", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Contact: </Typography.Text>
            <Input
              name="contact"
              readOnly={!isEdit}
              value={updateData.contact}
              onChange={(e) => handleChangeName("contact", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Website: </Typography.Text>
            <Input
              name="website"
              readOnly={!isEdit}
              value={updateData.website}
              onChange={(e) => handleChangeName("website", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Country: </Typography.Text>
            <Select
              name="country"
              value={updateData.country}
              disabled={!isEdit}
              options={[{ label: "BD", value: "BD" }]}
              onChange={(e) => handleChangeName("country", e)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>City: </Typography.Text>
            <Input
              name="city"
              readOnly={!isEdit}
              value={updateData.city}
              onChange={(e) => handleChangeName("city", e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Typography.Text strong>Address: </Typography.Text>
            <Input
              name="address"
              readOnly={!isEdit}
              value={updateData.address}
              onChange={(e) => handleChangeName("address", e.target.value)}
            />
          </LabelInputContainer>

          {isEdit ? (
            <Button
              type="primary"
              size="large"
              loading={updateLoading}
              onClick={onClickSave}
            >
              Save
            </Button>
          ) : (
            <Button type="primary" size="large" onClick={() => setIsEdit(true)}>
              Edit profile
            </Button>
          )}
        </FormContainer>
      </MainContainer>
    </CompanyAdminDashboardLayout>
  );
};

export default CompanyAdminProfile;
