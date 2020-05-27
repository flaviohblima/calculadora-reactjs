import React from "react";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

const transitionDuration = 500;

export const TabsWithTransitions = ({ tabs, activeTabIndex }) => {
  return (
    <>
      <TabsTransitionsContainer>
        <TransitionGroup component={null}>
          {tabs &&
            tabs.map((tab, index) => {
              return (
                activeTabIndex === index && (
                  <CSSTransition
                    key={index}
                    timeout={transitionDuration}
                    classNames={"tab"}
                  >
                    <div className={`tab tab-${index}`}>{tab.component}</div>
                  </CSSTransition>
                )
              );
            })}
        </TransitionGroup>
      </TabsTransitionsContainer>
    </>
  );
};

const TabsTransitionsContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .tab {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .tab-enter {
    opacity: 0;
  }
  .tab-enter-active {
    opacity: 1;
    left: 0;
    transition: all ${transitionDuration}ms ease-in-out;
  }
  .tab-exit {
    left: 0;
    opacity: 1;
  }
  .tab-exit-active {
    opacity: 0;
    transition: all ${transitionDuration}ms ease-in-out;
  }

  .tab-exit-active.tab-0 {
    left: -132px;
  }
  .tab-exit-active.tab-1 {
    left: 132px;
  }
`;
