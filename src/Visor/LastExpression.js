import styled from "styled-components";
import React from "react";
import { BUTTON_SIZE } from "../Styles";

const ExpressionFormated = ({ expressionsHistory }) => {
  const getLastExpression = () => {
    const defaultValue = { expression: "", result: "" };
    if (expressionsHistory && expressionsHistory.length > 0) {
      const lastExpression = expressionsHistory[expressionsHistory.length - 1];
      return lastExpression || defaultValue;
    } else {
      return defaultValue;
    }
  };

  const { expression, result } = getLastExpression();

  return (
    <span>
      {expression ? `${expression} = ` : ""}
      <b>{result}</b>
    </span>
  );
};

export const LastExpression = styled(ExpressionFormated)`
  height: ${BUTTON_SIZE}rem;
  color: ${({ theme }) => theme.secondaryText};
`;
