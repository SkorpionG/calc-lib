/**
 * Scientific measurement utilities with uncertainty handling
 */

import { toSigfig } from './sigfig.js';
import { parseNumberInput } from './number-input.js';

/**
 * Represents a measurement with uncertainty
 */
export interface Measurement {
  value: number;
  uncertainty: number;
  sigfigs?: number | undefined;
}

/**
 * Creates a measurement with uncertainty and proper significant figure handling
 *
 * @param value - The measured value
 * @param error - The uncertainty/error in the measurement
 * @param sigfigs - Optional: number of significant figures (default: based on uncertainty)
 * @returns A formatted string representation of the measurement
 *
 * @example
 * ```typescript
 * uncertainty(9.81, 0.02)        // "9.81 ± 0.02"
 * uncertainty(123.456, 0.1)      // "123.5 ± 0.1"
 * uncertainty(1000, 50, 2)       // "1.0e+3 ± 5e+1"
 * ```
 */
export function uncertainty(
  value: number | string,
  error: number | string,
  sigfigs?: number,
): string {
  const numValue = parseNumberInput(value);
  const numError = parseNumberInput(error);

  if (isNaN(numValue) || isNaN(numError)) {
    throw new Error('Invalid input: both value and error must be valid numbers');
  }

  // Take absolute value of error (uncertainty is always non-negative)
  const absError = Math.abs(numError);

  if (absError === 0) {
    return sigfigs ? toSigfig(numValue, sigfigs) : String(numValue);
  }

  // Determine significant figures based on uncertainty if not provided
  let actualSigfigs: number;
  if (sigfigs !== undefined) {
    actualSigfigs = sigfigs;
  } else {
    // The uncertainty determines the precision
    // Find the order of magnitude of the uncertainty
    const errorMagnitude = Math.floor(Math.log10(Math.abs(absError)));
    const valueMagnitude = Math.floor(Math.log10(Math.abs(numValue)));

    // Significant figures should go to the same decimal place as the uncertainty
    actualSigfigs = Math.max(1, valueMagnitude - errorMagnitude + 1);
  }

  // Format value preserving trailing zeros for explicit sigfigs
  const formattedValue =
    sigfigs !== undefined ? numValue.toPrecision(actualSigfigs) : toSigfig(numValue, actualSigfigs);
  const formattedError = toSigfig(absError, 1); // Uncertainty typically has 1 sig fig

  return `${formattedValue} ± ${formattedError}`;
}

/**
 * Creates a measurement object with uncertainty
 *
 * @param value - The measured value
 * @param error - The uncertainty/error in the measurement
 * @param sigfigs - Optional: number of significant figures (default: undefined)
 * @returns A Measurement object
 *
 * @example
 * ```typescript
 * const measurement = createMeasurement(9.81, 0.02);
 * console.log(measurement.value);       // 9.81
 * console.log(measurement.uncertainty); // 0.02
 * ```
 */
export function createMeasurement(
  value: number | string,
  error: number | string,
  sigfigs?: number,
): Measurement {
  const numValue = parseNumberInput(value);
  const numError = parseNumberInput(error);

  if (isNaN(numValue) || isNaN(numError)) {
    throw new Error('Invalid input: both value and error must be valid numbers');
  }

  if (numError < 0) {
    throw new Error('Uncertainty must be non-negative');
  }

  return {
    value: numValue,
    uncertainty: numError,
    sigfigs: sigfigs,
  };
}
