/**
 * Solution with stack of operations
 */

import { calculateResultFromStack } from "./calculateResult";

export const CALC_BUTTONS = [
  {
    symbol: "C",
    variant: "secondary",
    opFunction: currentState => ({
      ...currentState,
      acc: 0,
      expStack: [0]
    })
  },
  {
    symbol: "±",
    variant: "secondary",
    opFunction: currentState => ({
      ...currentState,
      acc: currentState.acc * -1
    })
  },
  { symbol: "%", variant: "secondary" },
  {
    symbol: "÷",
    operation: "/",
    variant: "secondary",
    opFunction: currentState => prepareOperation(currentState, "÷")
  },
  {
    symbol: "7",
    opFunction: currentState => numberOp(7, currentState)
  },
  {
    symbol: "8",
    opFunction: currentState => numberOp(8, currentState)
  },
  {
    symbol: "9",
    opFunction: currentState => numberOp(9, currentState)
  },
  {
    symbol: "×",
    operation: "*",
    variant: "secondary",
    opFunction: currentState => prepareOperation(currentState, "×")
  },
  {
    symbol: "4",
    opFunction: currentState => numberOp(4, currentState)
  },
  {
    symbol: "5",
    opFunction: currentState => numberOp(5, currentState)
  },
  {
    symbol: "6",
    opFunction: currentState => numberOp(6, currentState)
  },
  {
    symbol: "−",
    operation: "-",
    variant: "secondary",
    opFunction: currentState => prepareOperation(currentState, "−")
  },
  {
    symbol: "1",
    opFunction: currentState => numberOp(1, currentState)
  },
  {
    symbol: "2",
    opFunction: currentState => numberOp(2, currentState)
  },
  {
    symbol: "3",
    opFunction: currentState => numberOp(3, currentState)
  },
  {
    symbol: "+",
    variant: "secondary",
    opFunction: currentState => prepareOperation(currentState, "+")
  },
  {
    symbol: "00",
    variant: "secondary",
    opFunction: ({ acc, ...others }) => {
      const newNumber = acc !== 0 ? acc * 100 : acc;
      return { ...others, acc: newNumber };
    }
  },
  {
    symbol: "0",
    opFunction: currentState => numberOp(0, currentState)
  },
  { symbol: "." },
  { symbol: "=", variant: "primary" }
];

const numberOp = (number, { acc, expStack, ...others }) => {
  const newNumber = acc * 10 + number * (acc >= 0 ? 1 : -1);
  return {
    ...others,
    acc: newNumber,
    expStack: updateStack(expStack, newNumber)
  };
};

const updateStack = (stack, num) => {
  let lastElement = stack[stack.length - 1];
  if (typeof lastElement === "number") {
    stack[stack.length - 1] = num;
  } else {
    stack.push(num);
  }
  return stack;
};

const prepareOperation = (currentState, operation) => {
  const expStack = currentState.expStack;
  expStack.push(operation);
  return {
    ...currentState,
    acc: 0,
    expStack
  };
};

export function formatStack(expStack) {
  const result = calculateResultFromStack(expStack);
  const stackWithResult =
    result !== null ? [...expStack, "=", result] : expStack;
  return stackWithResult.join(" ");
}
