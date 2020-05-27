import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme } from "./Styles";
import { Calculator } from "./Calculator";
import { NavigationTabs } from "./NavigationTabs";
import { History } from "./History";
import { useCalcProcessor } from "./Calculator";

export const Context = React.createContext({
  accumulator: "",
  expression: "",
  expressionsHistory: [],
  handleButtonPress: () => {}
});

export default function App() {
  const tabs = [
    {
      title: "Calculator",
      component: <Calculator />
    },
    {
      title: "History",
      component: <History />
    }
  ];
  const appContext = useCalcProcessor();
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Context.Provider value={appContext}>
        <NavigationTabs tabs={tabs} />
      </Context.Provider>
    </ThemeProvider>
  );
}
