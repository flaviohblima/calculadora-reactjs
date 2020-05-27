import React from "react";
import { Visor } from "../Visor";
import { Keyboard } from "../Keyboard";
import { CALC_BUTTONS } from "./calcConfig";
import { Context } from "../App";

export function Calculator() {
  const buttons = CALC_BUTTONS;

  return (
    <Context.Consumer>
      {({ accumulator, expression, expressionsHistory, handleButtonPress }) => (
        <>
          <Visor
            accumulator={accumulator}
            expression={expression}
            expressionsHistory={expressionsHistory}
          />
          <Keyboard
            handleButtonPress={handleButtonPress}
            calcButtons={buttons}
          />
        </>
      )}
    </Context.Consumer>
  );
}
