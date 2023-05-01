import React from "react";
import styled from "styled-components";

export const Gap = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: ${({ gap }) => gap};
`;
