import React, { useState } from "react";
import { CalcContainer } from "../Calculator";
import { Header } from "./Header";

import { map } from "lodash";
import { TabsWithTransitions } from "./Transitions";

export const NavigationTabs = ({ tabs }) => {
  const [activeTabIndex, setTabIndex] = useState(0);
  return (
    <CalcContainer>
      <Header
        tabs={tabs && map(tabs, "title")}
        activeTabIndex={activeTabIndex}
        setTabIndex={setTabIndex}
      />
      <TabsWithTransitions tabs={tabs} activeTabIndex={activeTabIndex} />
    </CalcContainer>
  );
};
