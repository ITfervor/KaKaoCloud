import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font_weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => {
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button>반갑</Button>
  </Box>;
};

export default StyledComponent;
