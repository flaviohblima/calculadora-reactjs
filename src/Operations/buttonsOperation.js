// Outra solução: https://mathjs.org/

/**************************
 *    Solução com eval    *
 **************************/

/**
 * Array constante de configurações dos botões da calculadora.
 */
export const CALC_BUTTONS = [
  { symbol: "C", opFunction: state => clear(state), variant: "secondary" },
  { symbol: "±", opFunction: state => signal(state), variant: "secondary" },
  { symbol: "%", opFunction: state => percentage(state), variant: "secondary" },
  { symbol: "÷", opFunction: state => division(state), variant: "secondary" },
  { symbol: "7", opFunction: state => insertNumber("7", state) },
  { symbol: "8", opFunction: state => insertNumber("8", state) },
  { symbol: "9", opFunction: state => insertNumber("9", state) },
  { symbol: "×", opFunction: state => multiply(state), variant: "secondary" },
  { symbol: "4", opFunction: state => insertNumber("4", state) },
  { symbol: "5", opFunction: state => insertNumber("5", state) },
  { symbol: "6", opFunction: state => insertNumber("6", state) },
  { symbol: "−", opFunction: state => subtract(state), variant: "secondary" },
  { symbol: "1", opFunction: state => insertNumber("1", state) },
  { symbol: "2", opFunction: state => insertNumber("2", state) },
  { symbol: "3", opFunction: state => insertNumber("3", state) },
  { symbol: "+", opFunction: state => sum(state), variant: "secondary" },
  { symbol: "00", opFunction: state => add2Zeros(state), variant: "secondary" },
  { symbol: "0", opFunction: state => insertNumber("0", state) },
  { symbol: ".", opFunction: state => addDot(state), operation: "." },
  { symbol: "=", opFunction: state => result(state), variant: "primary" }
];

/**
 * Função para limpar a expressão da calculadora.
 * @param {Object} state Estado da caculadora
 */
const clear = state => {
  return {
    ...state,
    evaluated: true,
    expression: "",
    operation: "0"
  };
};

/**
 * Função para trocar o sinal do último número inserido na calculadora.
 * @param {Object} state Estado da caculadora
 */
const signal = state => {
  let operation = state.operation;
  operation = Number(operation) * -1;

  return {
    ...state,
    evaluated: false,
    operation: String(operation)
  };
};

/**
 * Função que torna o último número uma porcentagem, isto é, divide ele por cem.
 * @param {Object} state Estado da caculadora
 */
const percentage = state => {
  let operation = state.operation;

  if (operation.includes("%")) {
    return state;
  } else if (hasOperator(operation)) {
    operation = replaceOperation(operation, "%");
  } else {
    operation = operation + "%";
  }
  return {
    ...state,
    evaluated: false,
    operation
  };
};

/**
 * Função que adiciona o operador de divisão na expressão da calculadora.
 * @param {Object} state
 */
const division = state => {
  let operation = state.operation;

  if (hasOperator(operation)) {
    operation = replaceOperation(operation, "÷");
  } else {
    operation += " ÷";
  }

  return {
    ...state,
    evaluated: false,
    operation
  };
};

/**
 * Função para inserir um número na calculadora.
 * @param {Number} num Número a ser inserido
 * @param {Object} state Estado da caculadora
 */
const insertNumber = (num, state) => {
  let { operation, expression, evaluated } = state;

  if (operation === "0" || evaluated) {
    operation = num;
  } else if (hasOperator(operation)) {
    expression = expression + " " + operation;
    operation = num;
  } else {
    operation = operation + num;
  }

  return {
    ...state,
    evaluated: false,
    expression,
    operation
  };
};

/**
 * Função para adicionar uma multiplicação ao final da expressão.
 * @param {Object} state
 */
const multiply = state => {
  let operation = state.operation;

  if (hasOperator(operation)) {
    operation = replaceOperation(operation, "×");
  } else {
    operation += " ×";
  }

  return {
    ...state,
    evaluated: false,
    operation: operation
  };
};

const subtract = state => {
  let operation = state.operation;

  if (hasOperator(operation)) {
    operation = replaceOperation(operation, "-");
  } else {
    operation += " -";
  }

  return {
    ...state,
    evaluated: false,
    operation: operation
  };
};

const sum = state => {
  let operation = state.operation;

  if (hasOperator(operation)) {
    operation = replaceOperation(operation, "+");
  } else {
    operation += " +";
  }

  return {
    ...state,
    evaluated: false,
    operation: operation
  };
};

const add2Zeros = state => {
  let { operation, expression } = state;

  if (operation === "0") {
    return state;
  } else if (hasOperator(operation)) {
    expression = expression + " " + operation;
    operation = "0";
  } else {
    operation += "00";
  }

  return {
    ...state,
    expression,
    operation
  };
};

const addDot = state => {
  let { operation, expression } = state;

  if (hasOperator(operation)) {
    expression = expression + " " + operation;
    operation = "0.";
  } else if (operation.includes(".")) {
    return state;
  } else {
    operation += ".";
  }

  return {
    ...state,
    expression,
    operation
  };
};

const result = state => {
  let { expression, operation, evaluated } = state;
  if (!evaluated) {
    expression = expression + " " + operation;
  }
  let result = eval(replaceOperators(expression));

  return {
    ...state,
    historyStack: [...state.historyStack, { expression, result }],
    evaluated: true,
    expression: "",
    operation: String(result)
  };
};

const hasOperator = expression => {
  return (
    expression.includes("÷") ||
    expression.includes("×") ||
    expression.includes("+") ||
    expression.endsWith("-") ||
    expression.endsWith("%")
  );
};

const replaceOperation = (expression, newOp) => {
  let exps = expression.split(" ");
  console.log(exps);
  let op = expression.pop();
  console.log(op);
  if (hasOperator(op)) {
    exps = exps.push(newOp);
  }
  return exps.join(" ");
};

const replaceOperators = expression => {
  return expression
    .replace("÷", "/")
    .replace("×", "*")
    .replace("%", "/100 *");
};

const isCleared = state => {
  return state.expression === "" && state.operation === "0";
};
