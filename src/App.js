import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme } from "./Styles";
import { Calculator } from "./Calculator";
import { NavigationTabs } from "./NavigationTabs";

export default function App() {
  const tabs = [
    {
      title: "Calculator",
      component: <Calculator />
    },
    {
      title: "History",
      component: <div> Conteúdo do histórico</div>
    }
  ];
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <div className="App">
        <NavigationTabs tabs={tabs} />
      </div>
    </ThemeProvider>
  );
}
