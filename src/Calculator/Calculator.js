import React, { useState } from "react";
import { Visor } from "../Visor";
import { Keyboard } from "../Keyboard";
import { Header } from "../NavigationTabs";
import styled, { css } from "styled-components";
//import { CALC_BUTTONS } from "./";
import { CALC_BUTTONS } from "../Operations";

export function Calculator() {
  const initialState = {
    // acc: 0,
    // expStack: [0],
    // previousExpression: {
    //   expression: "",
    //   result: ""
    // },
    historyStack: [],
    lastExpression: "",
    expression: "",
    operation: "0",
    evaluated: true,
    tab: "calc"
  };
  const [visorState, setVisorState] = useState(initialState);

  const handleButtonPress = button =>
    setVisorState(
      button.opFunction ? button.opFunction(visorState) : visorState
    );

  const handleTabSelection = e => {
    if (visorState.tab !== e.target.id) {
      setVisorState({ ...visorState, tab: e.target.id });
    }
  };

  return (
    <Container>
      <Header visorState={visorState} handleTabSelection={handleTabSelection} />
      <Visor {...visorState} />
      <Keyboard
        handleButtonPress={handleButtonPress}
        calcButtons={CALC_BUTTONS}
      />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: fit-content;
  padding: 2rem;

  border-radius: 1rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.6),
    0 0 1rem rgba(0, 0, 0, 0.5);
  display: inline-block;
  ${() => calcBackgroundCss};
`;

const calcBackgroundCss = css`
  --color1: ${({ theme }) => theme.calcBackground2};
  --color2: ${({ theme }) => theme.calcBackground};
  background: linear-gradient(160deg, var(--color1), var(--color2) 35%);
`;
