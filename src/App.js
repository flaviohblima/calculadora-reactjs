import React from "react";
import "./styles.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme } from "./Styles";
import { Calculator } from "./Calculator";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Calculator />
      </div>
    </ThemeProvider>
  );
}
