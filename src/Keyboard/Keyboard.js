import { ButtonWrapper } from "../Button";
import React from "react";
import styled from "styled-components";
import {
  BUTTON_SIZE,
  BUTTON_PADDING,
  BUTTON_BORDER_WIDTH,
  BUTTONS_PER_LINE
} from "../Styles";

export function Keyboard({ calcButtons, handleButtonPress }) {
  document.onkeydown = keyboardInputEventHandler;

  return (
    <KeyboardContainer>
      <CalcKeyboard>
        {calcButtons &&
          calcButtons.map((button, idx) => (
            <ButtonWrapper
              key={idx}
              size={BUTTON_SIZE}
              padding={BUTTON_PADDING}
              borderWidth={BUTTON_BORDER_WIDTH}
              onClick={() => handleButtonPress(button)}
              {...button}
            />
          ))}
      </CalcKeyboard>
    </KeyboardContainer>
  );
}

const KeyboardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CalcKeyboard = styled.div`
  display: flex;
  justify-content: flex-start;
  width: ${() => calcKeyboardWidth()}rem;
  flex-wrap: wrap;
`;

const keyboardInputEventHandler = event => {
  const key = event.key.toUpperCase();
  const calcButton = document.getElementById(`calc-btn-${key}`);
  if (calcButton) {
    event.preventDefault();
    calcButton.click();
  }
};

export function calcKeyboardWidth() {
  const buttonWidth =
    BUTTON_SIZE + 2 * BUTTON_PADDING + 2 * BUTTON_BORDER_WIDTH;
  return `${BUTTONS_PER_LINE * buttonWidth}`;
}
