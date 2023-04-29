import {
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COMPANY_LOGIN_ROUTE } from "../../constants/routes";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { SERVER_URL } from "../../config";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-gap: 1rem;
`;

const SideBarContainer = styled.div`
  height: 100px;
`;

const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChildContainer = styled.div`
  max-width: 1000px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 0.5px solid #696969;
`;

const CompanyLogoContainer = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  object-fit: contain;
  border: 1px solid #696969;
`;

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

const CompanyAdminDashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authCompany, logoutCompanyAdminApiAction } = useAuthContext();
  const { companyProfile } = useCompanyContext();

  const onClickLogout = () => {
    logoutCompanyAdminApiAction(() => {
      navigate(COMPANY_LOGIN_ROUTE);
    });
  };

  const items = [
    getItem(
      <Link to="/company/admin">Dashboard</Link>,
      "/company/admin",
      <DashboardOutlined />
    ),

    getItem(
      <Link to="/company/admin/profile">Profile</Link>,
      "/company/admin/profile",
      <MailOutlined />
    ),

    { type: "divider" },

    getItem(
      <Link to="/company/admin/circulars">Circulars</Link>,
      "/company/admin/circulars",
      <MailOutlined />
    ),
  ];

  const dropdownItems = [
    {
      key: "1",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: onClickLogout,
    },
  ];

  return (
    <MainContainer>
      <SideBarContainer>
        <CompanyLogoContainer>
          <CompanyLogo src={`${SERVER_URL}/${companyProfile?.logo}`} />
        </CompanyLogoContainer>

        <Typography.Title level={2} style={{ textAlign: "center" }}>
          {companyProfile?.title}
        </Typography.Title>
        <Menu
          style={{ width: 240 }}
          mode="inline"
          items={items}
          activeKey={location.pathname}
        />
      </SideBarContainer>

      <RightSideContainer>
        <Header>
          <div />
          <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
            <a
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {authCompany?.username}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>

        <ChildContainer>{children}</ChildContainer>
      </RightSideContainer>
    </MainContainer>
  );
};

export default CompanyAdminDashboardLayout;
