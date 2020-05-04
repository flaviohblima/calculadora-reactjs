/**
 * Calculates the result from operation stack
 * prioritizing operations properly.
 * First do the multiplications and divisions
 * then make sum and subtractions
 *
 */
export function calculateResultFromStack(expStack) {
  if (expStack.length < 3) {
    return null;
  }

  const sumStack = makeMultiAndDiv(expStack);
  const totalResult = makeSumAndSub(sumStack);
  return totalResult;
}

/**
 * Reduce stack to sums and subtractions
 * by resolving the multiplications and divisions
 * and putting the results in another stack.
 *
 */
const makeMultiAndDiv = expStack => {
  const initialState = { acc: 0, sumStack: [0], op: null };
  const stackReducedToSumAndSub = expStack.reduce((reducerState, element) => {
    if (isOperation(element)) {
      return handleOperationElement(reducerState, element);
    } else {
      return handleOperationNumber(reducerState, element);
    }
  }, initialState);

  // Add accumulator on end
  const { sumStack, acc } = stackReducedToSumAndSub;
  return [...sumStack, acc];
};

function isOperation(element) {
  return typeof element === "string";
}

function handleOperationElement(reducerState, element) {
  const { sumStack, acc } = reducerState || {};
  switch (element) {
    case "×":
    case "÷":
      return prepareMultOrDivOperation(sumStack, acc, element);
    case "+":
    case "-":
    default:
      return addOperationToSumStack(sumStack, acc, element);
  }
}

function addOperationToSumStack(sumStack, acc, element) {
  return {
    acc: 0,
    sumStack: [...sumStack, acc, element],
    op: null
  };
}

function prepareMultOrDivOperation(sumStack, acc, element) {
  return {
    acc,
    sumStack,
    op: element
  };
}

function handleOperationNumber(reducerState, element) {
  const { op } = reducerState;
  if (op) {
    switch (op) {
      case "÷":
        return makeDivision(reducerState, element);
      case "×":
      default:
        return makeMultiplication(reducerState, element);
    }
  } else {
    return updateAcc(reducerState, element);
  }
}

function makeDivision({ sumStack, acc }, element) {
  return {
    acc: acc / element,
    sumStack,
    op: element
  };
}

function makeMultiplication({ sumStack, acc }, element) {
  return {
    acc: acc * element,
    sumStack,
    op: element
  };
}

function updateAcc({ sumStack, op }, element) {
  return {
    acc: element,
    sumStack,
    op
  };
}

/**
 * Calculate the total of the expression
 * resolving the additions and subtractions
 */
function makeSumAndSub(sumStack) {
  const initialSumState = { total: 0, op: "" };
  const totalObject = sumStack.reduce(({ total, op }, element) => {
    if (isOperation(element)) {
      return prepareSumOrAddOp(total, element);
    } else {
      // element is a number
      return makeSubOrAddOperation({ op, total, element });
    }
  }, initialSumState);

  const { total } = totalObject;
  return total;
}

function makeSubOrAddOperation({ op, total, element }) {
  switch (op) {
    case "+":
      return {
        total: total + element,
        op: ""
      };
    case "−":
      return {
        total: total - element,
        op: ""
      };
    case "":
    default:
      return {
        total: element,
        op: ""
      };
  }
}

function prepareSumOrAddOp(total, element) {
  return { total, op: element };
}