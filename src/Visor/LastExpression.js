import React from "react";
import styled from "styled-components";
import { BUTTON_SIZE } from "../Styles";

const ExpressionFormated = props => {
  const { expressionsHistory, ...rest } = props;
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
    <div {...rest}>
      {expression ? `${expression} = ` : ""}
      <b>{result}</b>
    </div>
  );
};

export const LastExpression = styled(ExpressionFormated)`
  height: ${BUTTON_SIZE}rem;
  color: ${({ theme }) => theme.secondaryText};
  padding: 1rem 0 0.5rem 0;
  &:hover {
    overflow-x: auto;
  }
`;
