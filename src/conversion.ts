/**
 * Number conversion utilities (similar to Python's bin() and hex() functions)
 */

import { parseNumberInput } from './number-input.js';

/**
 * Converts a number to its binary representation (similar to Python's bin() function)
 *
 * @param value - The number to convert to binary (integer or float)
 * @returns The binary representation as a string with '0b' prefix
 *
 * @example
 * ```typescript
 * bin(10)    // returns "0b1010"
 * bin(-5)    // returns "-0b101"
 * bin(0)     // returns "0b0"
 * bin(3.14)  // returns "0b11" (integer part only)
 * ```
 */
export function bin(value: number | string): string {
  const num = parseNumberInput(value);

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  // Handle zero case
  if (num === 0) {
    return '0b0';
  }

  // Handle negative numbers
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Convert to integer (Python's bin() only works with integers)
  const integerPart = Math.floor(absNum);

  // Convert to binary
  const binaryString = integerPart.toString(2);

  // Add prefix and handle sign
  return isNegative ? `-0b${binaryString}` : `0b${binaryString}`;
}

/**
 * Converts a number to its hexadecimal representation (similar to Python's hex() function)
 *
 * @param value - The number to convert to hexadecimal (integer or float)
 * @returns The hexadecimal representation as a string with '0x' prefix
 *
 * @example
 * ```typescript
 * hex(255)   // returns "0xff"
 * hex(-10)   // returns "-0xa"
 * hex(0)     // returns "0x0"
 * hex(3.14)  // returns "0x3" (integer part only)
 * ```
 */
export function hex(value: number | string): string {
  const num = parseNumberInput(value);

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  // Handle zero case
  if (num === 0) {
    return '0x0';
  }

  // Handle negative numbers
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Convert to integer (Python's hex() only works with integers)
  const integerPart = Math.floor(absNum);

  // Convert to hexadecimal (lowercase like Python)
  const hexString = integerPart.toString(16);

  // Add prefix and handle sign
  return isNegative ? `-0x${hexString}` : `0x${hexString}`;
}

/**
 * Converts a number to its octal representation (similar to Python's oct() function)
 *
 * @param value - The number to convert to octal (integer or float)
 * @returns The octal representation as a string with '0o' prefix
 *
 * @example
 * ```typescript
 * oct(8)     // returns "0o10"
 * oct(-7)    // returns "-0o7"
 * oct(0)     // returns "0o0"
 * oct(3.14)  // returns "0o3" (integer part only)
 * ```
 */
export function oct(value: number | string): string {
  const num = parseNumberInput(value);

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  // Handle zero case
  if (num === 0) {
    return '0o0';
  }

  // Handle negative numbers
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Convert to integer (Python's oct() only works with integers)
  const integerPart = Math.floor(absNum);

  // Convert to octal
  const octalString = integerPart.toString(8);

  // Add prefix and handle sign
  return isNegative ? `-0o${octalString}` : `0o${octalString}`;
}

/**
 * Converts a number to any base (2-36)
 *
 * @param value - The number to convert (integer or float)
 * @param base - The target base (2-36)
 * @returns The number in the specified base as a string
 *
 * @example
 * ```typescript
 * toBase(255, 2)   // returns "11111111" (binary)
 * toBase(255, 16)  // returns "ff" (hexadecimal)
 * toBase(100, 8)   // returns "144" (octal)
 * toBase(35, 36)   // returns "z" (base-36)
 * ```
 */
export function toBase(value: number | string, base: number): string {
  const num = parseNumberInput(value);

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error('Base must be an integer between 2 and 36');
  }

  // Handle zero case
  if (num === 0) {
    return '0';
  }

  // Handle negative numbers
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Convert to integer (only works with integers)
  const integerPart = Math.floor(absNum);

  // Convert to specified base
  const baseString = integerPart.toString(base);

  // Handle sign
  return isNegative ? `-${baseString}` : baseString;
}
