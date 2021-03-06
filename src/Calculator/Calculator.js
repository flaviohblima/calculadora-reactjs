import React from "react";
import { Visor } from "../Visor";
import { Keyboard } from "../Keyboard";
import { CALC_BUTTONS } from "./calcConfig";
import { Context } from "../App";

export function Calculator() {
  const buttons = CALC_BUTTONS;

  const isOperator = (symbol) => {
    return OPERATORS.includes(symbol);
  };

  const isNumber = (symbol) => {
    return NUMBERS.includes(symbol);
  };

  const handleNumber = (num) => {
    if (needReplaceAcumulator()) {
      setAccumulator(num);
      setEvaluated(false);
    } else if (lastSymbolWasOperator()) {
      const newExpression = moveAccToExpression();
      setExpression(newExpression);
      setAccumulator(num);
    } else {
      const newAcc = accumulator + num;
      setAccumulator(newAcc);
    }
  };

  const needReplaceAcumulator = () => {
    return !accumulator || accumulator === "0" || evaluated;
  };

  const lastSymbolWasOperator = () => {
    let wasLastSymbolOperator = false;
    OPERATORS.forEach((operator) => {
      if (accumulator && accumulator.endsWith(operator)) {
        wasLastSymbolOperator = true;
      }
    });
    return wasLastSymbolOperator;
  };

  const handleOperator = (operator) => {
    if (!accumulator) {
      return;
    }
    if (lastSymbolWasOperator()) {
      replaceLastOperator(operator);
    } else {
      const newAcc = `${accumulator} ${operator}`;
      setAccumulator(newAcc);
    }
  };

  const replaceLastOperator = (newOperator) => {
    const newAcc = `${accWithoutLastChar()}${newOperator}`;
    setAccumulator(newAcc);
    return;
  };

  const accWithoutLastChar = () => {
    return accumulator.slice(0, -1);
  };

  const executesUniqueFunction = (symbol) => {
    switch (symbol) {
      case "C":
        clearVisor();
        break;
      case "⌫":
        backspace();
        break;
      case "±":
        changeSignal();
        break;
      case ".":
        decimalMode();
        break;
      case "=":
        evaluateExpression();
        break;
      default:
        return;
    }
  };

  const clearVisor = () => {
    setEvaluated(true);
    setExpression("");
    setAccumulator("0");
  };

  const backspace = () => {
    if (!accumulator || accumulator.length === 1) {
      setAccumulator("0");
    } else if (lastSymbolWasOperator()) {
      // Remove space
      const newAcc = accumulator.slice(0, -2);
      setAccumulator(newAcc);
    } else {
      const newAcc = accumulator.slice(0, -1);
      setAccumulator(newAcc);
    }
  };

  const changeSignal = () => {
    const newAcc = `${currentNumber() * -1}`;
    setAccumulator(newAcc);
  };

  const currentNumber = () => {
    if (lastSymbolWasOperator()) {
      return Number(accWithoutLastChar());
    } else {
      return accumulator;
    }
  };

  const decimalMode = () => {
    if (lastSymbolWasOperator()) {
      moveAccToExpression();
      setAccumulator("0.");
    } else if (!accumulator.includes(".")) {
      setAccumulator(accumulator + ".");
    }
  };

  const evaluateExpression = () => {
    const finalExpression = evaluated ? expression : moveAccToExpression();
    const expressionToEvaluate = replaceOperators(finalExpression);

    console.log(expressionToEvaluate);
    const result = eval(expressionToEvaluate || accumulator);

    setExpressionsHistory([
      ...expressionsHistory,
      { expression: finalExpression, result },
    ]);
    setEvaluated(true);
    setExpression("");
    setAccumulator(`${result}`);
  };

  const moveAccToExpression = () => {
    return expression + ` ${accumulator}`;
  };

  const replaceOperators = (expression) => {
    return expression
      .replace("−", "-")
      .replace("×", "*")
      .replace("÷", "/")
      .replace("%", "/100 *");
  };

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
