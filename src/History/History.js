import React from "react";
import styled from "styled-components";
import { Context } from "../App";
import { keyboardHeight } from "../Keyboard";
import { visorHeight } from "../Visor/Visor";

export const History = props => {
  return (
    <Context.Consumer>
      {({ expressionsHistory }) => (
        <Wrapper>
          <Container>
            {expressionsHistory.map((exp, idx) => (
              <Expression key={idx}>
                <Operation>{exp.expression} =</Operation>
                <Result>{exp.result}</Result>
              </Expression>
            ))}
          </Container>
        </Wrapper>
      )}
    </Context.Consumer>
  );
};

const Wrapper = styled.div`
  height: ${keyboardHeight() + visorHeight()}rem;
  width: 100%;
  margin: 0.4rem 0;
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
`;

const Expression = styled.div`
  height: 3.4rem;
  padding: 0.8rem;
  color: ${({ theme }) => theme.text};
  border-bottom: ${({ theme }) => `1px solid ${theme.borderColor}`};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Operation = styled.div``;

const Result = styled.div`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.secondaryText};
`;
