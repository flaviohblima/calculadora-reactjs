import React from "react";
import styled from "styled-components";
import { keyboardWidth } from "../Keyboard";
import { BUTTON_PADDING, BUTTON_SIZE } from "../Styles";
import { LastExpression } from "./LastExpression";

export function Visor({ accumulator, expression, expressionsHistory }) {
  return (
    <Container>
      <VisorWrapper>
        <LastExpression expressionsHistory={expressionsHistory} />

        <OperationWrapper>
          <Expression>{expression}</Expression>
          <Number>{accumulator}</Number>
        </OperationWrapper>
      </VisorWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: ${visorHeight()}rem;
  justify-content: center;
  margin-bottom: ${visorMargin()}rem;
`;

const VisorWrapper = styled.div`
  width: ${visorWidth}rem;
  text-align: right;
  font-family: ${({ theme }) => theme.fontFamily};
  border-bottom: ${({ theme }) => `2px solid ${theme.borderColor}`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OperationWrapper = styled.div`
  width: ${visorWidth}rem;
  font-family: ${({ theme }) => theme.fontFamily};
`;

/**
 * Styled div para apresentar a expressão que está sendo formada enquanto
 * o usuário digita e ainda não clicou sobre o igual.
 */
const Expression = styled.div``;

/**
 * Styled div para apresentar a operacao atual que o usuário está inserindo.
 */
const Number = styled.div`
  font-size: 2.25rem;
  font-weight: 300;
  width: 100%;
  direction: ltr;
  float: right;
  margin-bottom: 0.5rem;
  &:hover {
    overflow-x: auto;
  }
`;

function visorWidth() {
  return keyboardWidth() - 2 * BUTTON_PADDING;
}

function visorMargin() {
  return 4 * BUTTON_PADDING;
}

export function visorHeight() {
  return 3 * BUTTON_SIZE + visorMargin();
}
