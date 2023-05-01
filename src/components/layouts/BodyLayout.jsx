import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  max-width: 100%;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const BodyLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default BodyLayout;
