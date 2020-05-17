import React from "react";
import styled, { css } from "styled-components";
import { BUTTON_SIZE } from "../Styles";

export const Header = ({ tabs, activeTabIndex, setTabIndex }) => {
  const numOfTabs = tabs ? tabs.length : 0;

  return (
    <Container>
      {tabs &&
        tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={index === activeTabIndex}
            onClick={() => setTabIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      <ActiveTabIndicator
        activeTabIndex={activeTabIndex}
        numOfTabs={numOfTabs}
      />
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
  position: relative;
`;

const transitionCss = css`
  transition: ease all 0.3s;
`;

const Tab = styled.div`
  width: 50%;
  height: 100%;
  font-size: 0.8rem;
  display: flex;
  align-items: flex-end;
  padding: 0.3rem;
  justify-content: center;
  color: ${props => getColor(props)};
  cursor: pointer;
  ${transitionCss}
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: ${props => getLeftOffset(props)};
  width: ${props => getTabWidth(props)};
  height: 2px;
  background-color: ${({ theme }) => theme.primary};
  ${transitionCss}
`;

const getColor = ({ theme, isActive }) => {
  return isActive ? `${theme.primary}` : ``;
};

const getLeftOffset = ({ activeTabIndex, numOfTabs }) => {
  const offsetPercentage = (activeTabIndex * 100) / numOfTabs;
  return `${offsetPercentage}%`;
};

const getTabWidth = ({ numOfTabs }) => `${100 / numOfTabs}%`;
