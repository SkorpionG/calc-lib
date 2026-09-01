/**
 * Utility functions for working with significant figures
 */

/**
 * Counts the number of significant figures in a number
 *
 * Rules for significant figures:
 * 1. All non-zero digits are significant
 * 2. Zeros between non-zero digits are significant
 * 3. Leading zeros are not significant
 * 4. Trailing zeros in a decimal number are significant
 * 5. Trailing zeros in a whole number without a decimal point are ambiguous
 *    (we treat them as not significant unless explicitly indicated)
 * 6. In scientific notation, all digits in the coefficient are significant
 *
 * @param value - The number to analyze (number or string)
 * @returns The number of significant figures
 *
 * @example
 * ```typescript
 * sigfigOf(123)       // 3
 * sigfigOf('1.230')   // 4 (trailing zeros after decimal are significant)
 * sigfigOf(0.00123)   // 3 (leading zeros not significant)
 * sigfigOf('1.23e-4') // 3
 * ```
 */
export function sigfigOf(value: number | string): number {
  // Convert to string for analysis
  let str = typeof value === 'string' ? value.trim() : String(value);

  // Handle empty or invalid input
  if (!str || str === '0') return 1;

  // Handle scientific notation (e.g., "1.23e-4", "2.5E+3")
  const scientificMatch = str.match(/^([+-]?)(\d*\.?\d+)[eE]([+-]?\d+)$/i);
  if (scientificMatch) {
    const coefficient = scientificMatch[2];
    return sigfigOf(coefficient);
  }

  // Remove sign
  str = str.replace(/^[+-]/, '');

  // Handle decimal numbers
  if (str.includes('.')) {
    // For decimal numbers, we need to be more careful about leading zeros
    const parts = str.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';

    // Remove leading zeros from integer part
    const cleanIntegerPart = integerPart.replace(/^0+/, '') || '0';

    // If integer part is just zero, only count significant figures in decimal part
    if (cleanIntegerPart === '0') {
      // Remove leading zeros from decimal part
      const cleanDecimalPart = decimalPart.replace(/^0+/, '');
      return cleanDecimalPart.length || 1; // At least 1 sig fig for '0.0'
    } else {
      // Count all digits in both parts (trailing zeros after decimal are significant)
      return cleanIntegerPart.length + decimalPart.length;
    }
  } else {
    // Handle whole numbers
    // Remove leading zeros
    str = str.replace(/^0+/, '');

    if (str === '') return 1; // Was all zeros

    // For whole numbers, trailing zeros are ambiguous
    // We'll treat them as not significant unless the number has a decimal point
    // Remove trailing zeros
    str = str.replace(/0+$/, '');

    return str.length;
  }
}

/**
 * Formats a number to a specific number of significant figures
 *
 * @param value - The number to format
 * @param sigfigs - The desired number of significant figures
 * @returns The formatted number as a string
 *
 * @example
 * ```typescript
 * toSigfig(123.456, 3)   // "123"
 * toSigfig(123.456, 4)   // "123.5"
 * toSigfig(0.001234, 3)  // "1.23e-3"
 * toSigfig(1234567, 3)   // "1.23e+6"
 * ```
 */
export function toSigfig(value: number, sigfigs: number): string {
  if (sigfigs <= 0) throw new Error('Number of significant figures must be positive');

  if (value === 0) return '0';

  // Handle the sign
  const sign = value < 0 ? '-' : '';
  const absValue = Math.abs(value);

  // Find the order of magnitude
  const magnitude = Math.floor(Math.log10(absValue));

  // Calculate the factor to shift decimal point
  const factor = Math.pow(10, sigfigs - 1 - magnitude);

  // Round to the appropriate number of significant figures
  const rounded = Math.round(absValue * factor) / factor;

  // Format the result
  if (magnitude >= 6 || magnitude < -2) {
    // Use scientific notation for very large or very small numbers
    return sign + rounded.toExponential(sigfigs - 1);
  } else {
    // Use fixed notation
    const decimalPlaces = Math.max(0, sigfigs - 1 - magnitude);
    const result = sign + rounded.toFixed(decimalPlaces);

    // Remove unnecessary trailing zeros and decimal point for whole numbers
    if (result.includes('.')) {
      return result.replace(/\.?0+$/, '');
    }
    return result;
  }
}

/**
 * Determines the appropriate number of significant figures for addition/subtraction
 * Based on the least precise decimal place
 *
 * @param values - Array of numbers to analyze
 * @returns The number of decimal places to preserve
 *
 * @example
 * ```typescript
 * getSigfigsForAddOrSub([1.23, 4.5])     // 1 (4.5 has 1 decimal place)
 * getSigfigsForAddOrSub([1.234, 2.56])   // 2 (2.56 has 2 decimal places)
 * getSigfigsForAddOrSub([123, 4.5])      // 0 (123 has 0 decimal places)
 * ```
 */
export function getSigfigsForAddOrSub(values: (number | string)[]): number {
  let minDecimalPlaces = Infinity;

  for (const value of values) {
    const str = String(value).trim();
    const scientificMatch = str.match(/^[+-]?(\d+(?:\.\d*)?|\.\d+)[eE]([+-]?\d+)$/);

    if (scientificMatch) {
      const coefficient = scientificMatch[1];
      const decimalIndex = coefficient.indexOf('.');
      const coefficientDecimalPlaces =
        decimalIndex === -1 ? 0 : coefficient.length - decimalIndex - 1;
      const exponent = Number(scientificMatch[2]);
      minDecimalPlaces = Math.min(minDecimalPlaces, coefficientDecimalPlaces - exponent);
      continue;
    }

    const decimalIndex = str.indexOf('.');

    if (decimalIndex === -1) {
      // No decimal point - this limits precision to whole numbers
      return 0;
    } else {
      const decimalPlaces = str.length - decimalIndex - 1;
      minDecimalPlaces = Math.min(minDecimalPlaces, decimalPlaces);
    }
  }

  return minDecimalPlaces === Infinity ? 0 : minDecimalPlaces;
}

/**
 * Determines the appropriate number of significant figures for multiplication/division
 * Based on the operand with the fewest significant figures
 *
 * @param values - Array of numbers to analyze
 * @returns The minimum number of significant figures
 *
 * @example
 * ```typescript
 * getSigfigsForMulOrDiv([1.23, 4.5])        // 2 (min(3, 2) = 2)
 * getSigfigsForMulOrDiv([1.234, 2.56, 7.8]) // 2 (min(4, 3, 2) = 2)
 * ```
 */
export function getSigfigsForMulOrDiv(values: (number | string)[]): number {
  return Math.min(...values.map((v) => sigfigOf(v)));
}
