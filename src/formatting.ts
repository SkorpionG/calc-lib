/**
 * Scientific notation and number formatting utilities
 */

import { sigfigOf, toSigfig } from './sigfig.js';
import { parseNumberInput } from './number-input.js';

/**
 * Formats a number in scientific notation with proper significant figures
 *
 * @param value - The number to format
 * @param sigfigs - Optional: number of significant figures (default: based on input)
 * @returns The number in scientific notation (e.g., "1.23e+4")
 *
 * @example
 * ```typescript
 * toScientific(1234)      // "1.234e+3"
 * toScientific(0.00123)   // "1.23e-3"
 * toScientific(1234, 2)   // "1.2e+3"
 * ```
 */
export function toScientific(value: number | string, sigfigs?: number): string {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (num === 0) {
    return sigfigs && sigfigs > 1 ? `0.${'0'.repeat(sigfigs - 1)}e+0` : '0e+0';
  }

  const actualSigfigs = sigfigs ?? sigfigOf(value);

  // Use toSigfig to handle the significant figures, then format as scientific
  const formatted = toSigfig(num, actualSigfigs);

  // If it's already in scientific notation, return it
  if (formatted.includes('e')) {
    return formatted;
  }

  // Convert to scientific notation
  return num.toExponential(actualSigfigs - 1);
}

/**
 * Formats a number in engineering notation (powers of 3)
 *
 * @param value - The number to format
 * @param sigfigs - Optional: number of significant figures (default: based on input)
 * @returns The number in engineering notation (e.g., "1.23e+3", "123e+0")
 *
 * @example
 * ```typescript
 * toEngineering(1234)     // "1.234e+3"
 * toEngineering(0.00123)  // "1.23e-3"
 * toEngineering(12345)    // "12.345e+3"
 * ```
 */
export function toEngineering(value: number | string, sigfigs?: number): string {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (num === 0) {
    return sigfigs && sigfigs > 1 ? `0.${'0'.repeat(sigfigs - 1)}e+0` : '0e+0';
  }

  const actualSigfigs = sigfigs ?? sigfigOf(value);
  const sign = num < 0 ? '-' : '';
  const absNum = Math.abs(num);

  // Find the appropriate power of 3
  const log10 = Math.log10(absNum);
  const engineeringExponent = Math.floor(log10 / 3) * 3;

  // Calculate the coefficient
  const coefficient = absNum / Math.pow(10, engineeringExponent);

  // Format the coefficient with appropriate significant figures
  const formattedCoeff = parseFloat(coefficient.toPrecision(actualSigfigs));

  return `${sign}${formattedCoeff}e${engineeringExponent >= 0 ? '+' : ''}${engineeringExponent}`;
}

/**
 * Rounds a number to a specific number of significant figures
 *
 * @param value - The number to round
 * @param sigfigs - Number of significant figures to round to
 * @returns The rounded number
 *
 * @example
 * ```typescript
 * round(123.456, 3)   // 123
 * round(0.001234, 2)  // 0.0012
 * round(1234.5, 2)    // 1200
 * ```
 */
export function round(value: number | string, sigfigs: number): number {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (sigfigs <= 0) {
    throw new Error('Number of significant figures must be positive');
  }

  return parseFloat(toSigfig(num, sigfigs));
}

/**
 * Truncates a number to a specific number of significant figures (no rounding)
 *
 * @param value - The number to truncate
 * @param sigfigs - Number of significant figures to truncate to
 * @returns The truncated number
 *
 * @example
 * ```typescript
 * truncate(123.456, 3)   // 123
 * truncate(0.001234, 2)  // 0.0012
 * truncate(1234.5, 2)    // 1200
 * ```
 */
export function truncate(value: number | string, sigfigs: number): number {
  const num = parseNumberInput(value);

  if (isNaN(num)) {
    throw new Error('Invalid input: value must be a valid number');
  }

  if (sigfigs <= 0) {
    throw new Error('Number of significant figures must be positive');
  }

  if (num === 0) {
    return 0;
  }

  const sign = num < 0 ? -1 : 1;
  const absNum = Math.abs(num);

  // Find the order of magnitude
  const magnitude = Math.floor(Math.log10(absNum));

  // Calculate the factor to shift decimal point
  const factor = Math.pow(10, sigfigs - 1 - magnitude);

  // Truncate (don't round) to the appropriate number of significant figures
  const truncated = Math.trunc(absNum * factor) / factor;

  return sign * truncated;
}

/**
 * Calculates percentage with proper significant figure handling
 *
 * @param part - The part value
 * @param whole - The whole value
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns The percentage value
 *
 * @example
 * ```typescript
 * percentage(25, 100)     // 25
 * percentage(1, 3, 3)     // 33.3 (custom: 3 significant figures)
 * percentage(1, 3, 2)     // 33 (custom: 2 significant figures)
 * ```
 */
export function percentage(
  part: number | string,
  whole: number | string,
  sigfigs?: number,
): number {
  const numPart = parseNumberInput(part);
  const numWhole = parseNumberInput(whole);

  if (isNaN(numPart) || isNaN(numWhole)) {
    throw new Error('Invalid input: both values must be valid numbers');
  }

  if (numWhole === 0) {
    throw new Error('Division by zero: whole value cannot be zero');
  }

  const result = (numPart / numWhole) * 100;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(result, sigfigs));
  }

  return result;
}
