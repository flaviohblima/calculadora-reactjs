import React from "react";
import styled from "styled-components";
import { BUTTON_SIZE } from "../Styles";

export const Header = ({ visorState, handleTabSelection }) => {
  console.log(visorState.tab);
  return (
    <Container>
      <Tab
        id="calc"
        active={visorState.tab === "calc"}
        onClick={e => handleTabSelection(e)}
      >
        Calculator
      </Tab>
      <Tab
        id="hist"
        active={visorState.tab === "hist"}
        onClick={e => handleTabSelection(e)}
      >
        History
      </Tab>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: ${0.5 * BUTTON_SIZE}rem;
  font-size: 0.8rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.borderColor}`};
  padding: 0;
`;

const Tab = styled.div`
  width: 50%;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  align-items: flex-end;
  padding: 0.3rem;
  justify-content: center;
  border-bottom: ${props => getBorder(props)};
  color: ${props => getColor(props)};
  cursor: pointer;
`;

const getBorder = ({ theme, active }) => {
  return active ? `2px solid ${theme.primary}}` : ``;
};

const getColor = ({ theme, active }) => {
  return active ? `${theme.primary}` : ``;
};
