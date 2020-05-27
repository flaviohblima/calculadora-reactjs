import styled, { css } from "styled-components";
import { keyboardWidth, keyboardHeight } from "../Keyboard";
import { visorHeight } from "../Visor/Visor";

export const CalcContainer = styled.div`
  text-align: center;
  width: ${keyboardWidth()}rem;
  height: ${keyboardHeight() + visorHeight() + 2.5}rem;
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
