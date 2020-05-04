import styled, { css } from "styled-components";

export const Button = styled.div`
  ${() => declareCssVariables}
  ${() => generalCss}
  ${() => fontCss}
  ${() => borderCss}
  ${() => rippleCss}
`;

const declareCssVariables = css`
  --size: ${({ size }) => `${size}rem`};
  --font-size: calc(var(--size) * 2.75 / 5);
  --font-family: ${({ theme }) => theme.fontFamily};
  --background-color: ${props => getBackgroundColor(props)};
  --border-width: ${props => getBorderWidth(props)};
`;

const generalCss = css`
  width: var(--size);
  height: var(--size);
  background-color: var(--background-color);
  cursor: pointer;
`;

const fontCss = css`
  font-family: var(--font-family);
  font-size: var(--font-size);
  font-weight: 300;
  text-align: center;
  line-height: var(--size);
  color: ${props => getTextColor(props)};
`;

const borderCss = css`
  border-radius: 50%;
  border: var(--border-width) solid;
  border-color: ${props => getBorderColor(props)};
`;

const rippleCss = css`
  background-position: center;
  transition: background 0.8s;
  &:hover {
    background: var(--background-color)
      radial-gradient(circle, transparent 1%, var(--background-color) 1%)
      center/15000%;
  }
  &:active {
    background-color: white;
    background-size: 100%;
    transition: background 0s;
  }
`;

function getBackgroundColor({ variant, theme }) {
  if (isPrimary(variant)) return theme.primary;
  if (isSecondary(variant)) return theme.secondary;
  return theme.calcBackground;
}

function getTextColor({ variant, theme }) {
  return isSecondary(variant) ? theme.secondaryText : theme.text;
}

function getBorderWidth({ borderWidth }) {
  return `${borderWidth || 0.1125}rem`;
}

function getBorderColor({ variant, theme }) {
  return variant ? "transparent" : theme.borderColor;
}

function isPrimary(variant) {
  return variant === "primary";
}

function isSecondary(variant) {
  return variant === "secondary";
}
