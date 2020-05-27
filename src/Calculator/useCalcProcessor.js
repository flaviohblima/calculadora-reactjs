import { useState } from "react";
import { OPERATORS, NUMBERS } from "./calcConfig";

// Hook customizado que implementa a lógica da calculadora
export function useCalcProcessor() {
  const [expression, setExpression] = useState("");
  const [accumulator, setAccumulator] = useState("0");
  const [expressionsHistory, setExpressionsHistory] = useState([]);
  const [evaluated, setEvaluated] = useState(true);

  const handleButtonPress = ({ symbol }) => {
    if (isNumber(symbol)) {
      handleNumber(symbol);
    } else if (isOperator(symbol)) {
      handleOperator(symbol);
    } else {
      executesUniqueFunction(symbol);
    }
  };

  const isOperator = (symbol) => {
    return OPERATORS.includes(symbol);
  };

  const isNumber = (symbol) => {
    return NUMBERS.includes(symbol);
  };

  const handleNumber = (num) => {
    setEvaluated(false);
    if (needReplaceAcumulator()) {
      setAccumulator(num);
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
    return !accumulator || accumulator === "0";
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
      setAccumulator(`${accumulator}.`);
    }
  };

  const evaluateExpression = () => {
    if (evaluated) return;
    const finalExpression = evaluated ? expression : moveAccToExpression();
    const expressionToEvaluate = replaceOperators(finalExpression);

    let result = eval(expressionToEvaluate || accumulator);
    result = Number(result.toPrecision(8));
    setExpressionsHistory([
      ...expressionsHistory,
      { expression: finalExpression, result: `${result}` },
    ]);
    setEvaluated(true);
    setExpression("");
    setAccumulator(`${result}`);
  };

  const moveAccToExpression = () => {
    return `${expression} ${accumulator}`;
  };

  const replaceOperators = (expression) => {
    return expression
      .replace("−", "-")
      .replace("×", "*")
      .replace("÷", "/")
      .replace("%", "/100 *");
  };

  const calcState = {
    accumulator,
    expression,
    expressionsHistory,
    handleButtonPress,
  };

  return calcState;
}
