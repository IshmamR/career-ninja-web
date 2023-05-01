import {
  AppstoreOutlined,
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ADMIN_LOGIN_ROUTE } from "../../constants/routes";
import { useAuthContext } from "../../contexts/AuthContext";

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

const ChildContainer = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 0.5px solid #696969;
`;

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

const AdminDashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authAdmin, logoutAdminApiAction } = useAuthContext();

  const onClickLogout = () => {
    logoutAdminApiAction(() => {
      navigate(ADMIN_LOGIN_ROUTE);
    });
  };

  const items = [
    getItem(
      <Link to="/admin/companies">Companies</Link>,
      "/admin/companies",
      <MailOutlined />
    ),

    getItem(
      <Link to="/admin/fields">Fields</Link>,
      "/admin/fields",
      <MailOutlined />
    ),

    getItem(
      <Link to="/admin/skills">Skills</Link>,
      "/admin/skills",
      <MailOutlined />
    ),

    getItem(
      <a href="/admin/circulars">Circulars</a>,
      "/admin/circulars",
      <SettingOutlined />
    ),

    { type: "divider" },

    getItem("Applicants", "/admin/applicants", <AppstoreOutlined />),

    getItem("Applications", "/admin/applications", <AppstoreOutlined />),
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
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Admin Dashboard
        </Typography.Title>
        <Menu
          // onClick={onClick}
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
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {authAdmin.username}
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

export default AdminDashboardLayout;
