import React from "react";
import styled from "styled-components";
import { calcKeyboardWidth } from "../Keyboard";
//import { formatStack } from "../Calculator";
import { BUTTON_PADDING, BUTTON_SIZE } from "../Styles";

export function Visor({ expression, historyStack, operation }) {
  //const expression = formatStack(expStack);
  const lastExpression = historyStack[historyStack.length - 1];
  return (
    <Container>
      <VisorWrapper>
        {/* <PreviousExpression>
          <span>{previousExpression && previousExpression.expression}</span>
          <span className="result">
            {previousExpression && previousExpression.result}
          </span>
        </PreviousExpression> */}
        <LastExpression>
          {lastExpression
            ? lastExpression.expression + " = " + lastExpression.result
            : ""}
        </LastExpression>

        <OperationWrapper>
          <Expression>{expression}</Expression>
          {/* FIX: Não consegui colocar um auto scroll nos números */}
          <Number>
            <NumberSpan>{operation}</NumberSpan>
          </Number>
        </OperationWrapper>
      </VisorWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: ${3 * BUTTON_SIZE}rem;
  justify-content: center;
  margin-bottom: ${4 * BUTTON_PADDING}rem;
`;

const VisorWrapper = styled.div`
  width: ${calcVisorWidth}rem;
  text-align: right;
  font-family: ${({ theme }) => theme.fontFamily};
  border-bottom: ${({ theme }) => `2px solid ${theme.borderColor}`};
`;

// const PreviousExpression = styled.div`
//   margin-bottom: 3rem;
//   color: ${({ theme }) => theme.secondary};
//   .result {
//     font-weight: 600;
//   }
// `;

/**
 * Styled div para apresentar a última conta que foi feita na calculadora.
 */
const LastExpression = styled.div`
  height: ${BUTTON_SIZE}rem;
  color: ${({ theme }) => theme.secondaryText};
`;

const OperationWrapper = styled.div`
  height: ${2 * BUTTON_SIZE}rem;
  width: ${calcVisorWidth}rem;
  font-family: ${({ theme }) => theme.fontFamily};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  font-size: 2.5rem;
  font-weight: 400;
  width: 100%;
  overflow-x: auto;
  margin-bottom: ${3 * BUTTON_PADDING}rem;
`;

/**
 * Styled span para receber o número inserido.
 */
const NumberSpan = styled.span`
  direction: ltr;
  float: right;
`;

function calcVisorWidth() {
  return calcKeyboardWidth() - 2 * BUTTON_PADDING;
}
