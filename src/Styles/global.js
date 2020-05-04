import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Montserrat', sans-serif;
    transition: all 0.25s linear;
    text-align: center;
    .App {
      display: flex;
      align-items: center;
      justify-content:center;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }
  `;
