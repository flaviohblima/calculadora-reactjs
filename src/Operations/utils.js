/**
 * Operações matemáticas
 */

export const isInteger = num => {
  return Number(num) % 1 === 0;
};

export const isFloat = num => {
  return Number(num) % 1 !== 0;
};

export const isNumber = num => {
  return isInteger(num) || isFloat(num);
};
