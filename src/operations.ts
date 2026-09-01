/**
 * Precise mathematical operations with significant figure preservation
 */

import { toSigfig, getSigfigsForAddOrSub, getSigfigsForMulOrDiv } from './sigfig.js';
import { parseNumberInput } from './number-input.js';

/**
 * Rounds a value to a decimal place, including places left of the decimal point
 *
 * @param value - Value to round
 * @param decimalPlaces - Decimal places to retain; negative values round tens, hundreds, and beyond
 * @returns Rounded value
 */
function roundToDecimalPlaces(value: number, decimalPlaces: number): number {
  if (decimalPlaces >= 0) {
    return Number(value.toFixed(decimalPlaces));
  }

  const factor = Math.pow(10, -decimalPlaces);
  return Math.round(value / factor) * factor;
}

/**
 * Adds two numbers while preserving significant figures
 * For addition, the result should have the same number of decimal places as the least precise operand
 *
 * @param a - First number
 * @param b - Second number
 * @param toSigfigParam - Optional: specific number of significant figures to preserve in result
 * @returns The sum with appropriate significant figures
 *
 * @example
 * ```typescript
 * add(1.23, 4.5)       // 5.7 (1 decimal place from 4.5)
 * add(1.234, 2.56)     // 3.79 (2 decimal places from 2.56)
 * add(1.23, 4.5, 4)    // 5.73 (custom: 4 significant figures)
 * ```
 */
export function add(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  const result = numA + numB;

  if (toSigfigParam !== undefined) {
    // Use specified significant figures
    return parseFloat(toSigfig(result, toSigfigParam));
  } else {
    // Use addition rules: preserve decimal places of least precise operand
    const decimalPlaces = getSigfigsForAddOrSub([a, b]);
    return roundToDecimalPlaces(result, decimalPlaces);
  }
}

/**
 * Subtracts two numbers while preserving significant figures
 * For subtraction, the result should have the same number of decimal places as the least precise operand
 *
 * @param a - First number (minuend)
 * @param b - Second number (subtrahend)
 * @param toSigfigParam - Optional: specific number of significant figures to preserve in result
 * @returns The difference with appropriate significant figures
 *
 * @example
 * ```typescript
 * sub(5.67, 1.2)       // 4.5 (1 decimal place from 1.2)
 * sub(10.234, 3.45)    // 6.78 (2 decimal places from 3.45)
 * sub(10.234, 3.45, 4) // 6.784 (custom: 4 significant figures)
 * ```
 */
export function sub(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  const result = numA - numB;

  if (toSigfigParam !== undefined) {
    // Use specified significant figures
    return parseFloat(toSigfig(result, toSigfigParam));
  } else {
    // Use subtraction rules: preserve decimal places of least precise operand
    const decimalPlaces = getSigfigsForAddOrSub([a, b]);
    return roundToDecimalPlaces(result, decimalPlaces);
  }
}

/**
 * Multiplies two numbers while preserving significant figures
 * For multiplication, the result should have the same number of significant figures as the least precise operand
 *
 * @param a - First number
 * @param b - Second number
 * @param toSigfigParam - Optional: specific number of significant figures to preserve in result
 * @returns The product with appropriate significant figures
 *
 * @example
 * ```typescript
 * mul(1.23, 4.5)         // 5.5 (2 sig figs from 4.5)
 * mul('2.0', 3.14159)    // 6.3 (2 sig figs from '2.0')
 * mul(1.234, 5.678, 4)   // 7.007 (custom: 4 significant figures)
 * ```
 */
export function mul(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  const result = numA * numB;

  if (toSigfigParam !== undefined) {
    // Use specified significant figures
    return parseFloat(toSigfig(result, toSigfigParam));
  } else {
    // Use multiplication rules: use minimum significant figures from operands
    const sigfigs = getSigfigsForMulOrDiv([a, b]);
    return parseFloat(toSigfig(result, sigfigs));
  }
}

/**
 * Divides two numbers while preserving significant figures
 * For division, the result should have the same number of significant figures as the least precise operand
 *
 * @param a - Dividend
 * @param b - Divisor
 * @param toSigfigParam - Optional: specific number of significant figures to preserve in result
 * @returns The quotient with appropriate significant figures
 *
 * @example
 * ```typescript
 * div('10.0', '3.0')     // 3.3 (2 sig figs from minimum)
 * div(15.6, 2.1)         // 7.4 (2 sig figs from 2.1)
 * div(22.0, 7.0, 4)      // 3.143 (custom: 4 significant figures)
 * ```
 */
export function div(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  if (numB === 0) {
    throw new Error('Division by zero is not allowed');
  }

  const result = numA / numB;

  if (toSigfigParam !== undefined) {
    // Use specified significant figures
    return parseFloat(toSigfig(result, toSigfigParam));
  } else {
    // Use division rules: use minimum significant figures from operands
    const sigfigs = getSigfigsForMulOrDiv([a, b]);
    return parseFloat(toSigfig(result, sigfigs));
  }
}

/**
 * Modulo operation with significant figure handling
 *
 * @param a - Dividend
 * @param b - Divisor
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Remainder of a divided by b
 *
 * @example
 * ```typescript
 * mod(10, 3)       // 1
 * mod(17.5, 5.2)   // 1.9 (exact remainder)
 * mod(100, 7, 3)   // 2.00 (custom: 3 significant figures)
 * ```
 */
export function mod(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  if (numB === 0) {
    throw new Error('Division by zero: modulo by zero is undefined');
  }

  const result = numA % numB;

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Integer division (floor division) with significant figure handling
 *
 * @param a - Dividend
 * @param b - Divisor
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Integer result of a divided by b (floor division)
 *
 * @example
 * ```typescript
 * idiv(10, 3)      // 3 (floor of 10/3)
 * idiv(17, 5)      // 3 (floor of 17/5)
 * idiv(-10, 3)     // -4 (floor of -10/3)
 * idiv(22.0, 7.0, 2) // 3.0 (custom: 2 significant figures)
 * ```
 */
export function idiv(a: number | string, b: number | string, toSigfigParam?: number): number {
  const numA = parseNumberInput(a);
  const numB = parseNumberInput(b);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Invalid input: both operands must be valid numbers');
  }

  if (numB === 0) {
    throw new Error('Division by zero is not allowed');
  }

  const result = Math.floor(numA / numB);

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Power operation with significant figure handling
 *
 * @param base - Base number
 * @param exponent - Exponent
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns base raised to the power of exponent
 *
 * @example
 * ```typescript
 * pow(2, 3)        // 8 (2^3)
 * pow(2.5, 2)      // 6.25 (exact value)
 * pow(2.5, 2, 2)   // 6.3 (custom: 2 significant figures)
 * pow(10, 3, 4)    // 1000 (custom: 4 significant figures)
 * ```
 */
export function pow(
  base: number | string,
  exponent: number | string,
  toSigfigParam?: number,
): number {
  const numBase = parseNumberInput(base);
  const numExponent = parseNumberInput(exponent);

  if (isNaN(numBase) || isNaN(numExponent)) {
    throw new Error('Invalid input: both base and exponent must be valid numbers');
  }

  const result = Math.pow(numBase, numExponent);

  if (!isFinite(result)) {
    throw new Error('Power operation resulted in infinite or invalid result');
  }

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Square root with significant figure handling
 *
 * @param value - Number to find square root of
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Square root of the value
 *
 * @example
 * ```typescript
 * sqrt(9)          // 3
 * sqrt(2.0)        // 1.4142135623730951 (exact value)
 * sqrt(2.0, 2)     // 1.4 (custom: 2 significant figures)
 * sqrt(16, 3)      // 4.00 (custom: 3 significant figures)
 * ```
 */
export function sqrt(value: number | string, toSigfigParam?: number): number {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (num < 0) {
    throw new Error('Cannot take square root of negative number');
  }

  const result = Math.sqrt(num);

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Absolute value with significant figure handling
 *
 * @param value - Number to find absolute value of
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Absolute value
 *
 * @example
 * ```typescript
 * abs(-5)          // 5
 * abs(-3.14)       // 3.14
 * abs(2.5)         // 2.5
 * ```
 */
export function abs(value: number | string, toSigfigParam?: number): number {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  const result = Math.abs(num);

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Maximum of two or more numbers with significant figure handling
 *
 * @param values - Array of numbers to find maximum of
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Maximum value
 *
 * @example
 * ```typescript
 * max([1, 2, 3])       // 3
 * max([1.2, 3.4, 2.1]) // 3.4
 * max([5.0, 3.14], 2)  // 5.0 (custom: 2 significant figures)
 * ```
 */
export function max(values: (number | string)[], toSigfigParam?: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  const numbers = values.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All values must be valid numbers');
    }
    return num;
  });

  const result = Math.max(...numbers);

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}

/**
 * Minimum of two or more numbers with significant figure handling
 *
 * @param values - Array of numbers to find minimum of
 * @param toSigfigParam - Optional: override significant figures for result
 * @returns Minimum value
 *
 * @example
 * ```typescript
 * min([1, 2, 3])       // 1
 * min([1.2, 3.4, 2.1]) // 1.2
 * min([5.0, 3.14], 3)  // 3.14 (custom: 3 significant figures)
 * ```
 */
export function min(values: (number | string)[], toSigfigParam?: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  const numbers = values.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All values must be valid numbers');
    }
    return num;
  });

  const result = Math.min(...numbers);

  if (toSigfigParam !== undefined) {
    return parseFloat(toSigfig(result, toSigfigParam));
  }

  return result;
}
