import styled from "styled-components";
import React from "react";
import { Button } from "./Button";

export function ButtonWrapper({
  symbol,
  variant,
  size,
  padding,
  borderWidth,
  onClick
}) {
  const buttonOperation = symbol;

  return (
    <ButtonContainer padding={padding}>
      <Button
        id={`calc-btn-${buttonOperation}`}
        variant={variant}
        onClick={onClick}
        size={size || 3}
        borderWidth={borderWidth}
        symbol={symbol}
      >
        {symbol}
      </Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  padding: ${({ padding }) => `${padding || 0.25}rem`};
  display: inline-block;
`;
