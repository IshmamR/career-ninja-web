import { Button, Input, Select, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { Gap } from "../common/spaces";
import { SearchOutlined } from "@ant-design/icons";

const MainContainer = styled.div``;

const Hero = styled.div`
  height: 90vh;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/home_cover.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1280px;
`;

const SelectForm = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  grid-gap: 1rem;
  background-color: #f8fff1;
  border-radius: 10px;
  padding: 1rem;
`;

const HomePage = () => {
  return (
    <MainContainer>
      <Hero>
        <HeroInner>
          <Typography.Title level={5} style={{ color: "white", margin: "0" }}>
            We have 850,000 great job offers you deserve!
          </Typography.Title>

          <Gap height="0.5rem" />

          <Typography.Title style={{ color: "white", margin: "0" }}>
            Your Dream Job <br />
            is Waiting
          </Typography.Title>
          <Gap height="2rem" />

          <SelectForm>
            <Input
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Categories"
              allowClear
              options={[]}
            />
            <Button type="primary" size="large">
              Search
            </Button>
          </SelectForm>
        </HeroInner>
      </Hero>
    </MainContainer>
  );
};

export default HomePage;
