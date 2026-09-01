/**
 * Statistical functions with significant figure handling
 */

import { sigfigOf, toSigfig } from './sigfig.js';
import { parseNumberInput } from './number-input.js';

/**
 * Calculates the arithmetic mean (average) with proper significant figure handling
 *
 * @param values - Array of numbers to calculate the mean of
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns The mean value with appropriate significant figures
 *
 * @example
 * ```typescript
 * mean([1.2, 2.3, 3.4])        // 2.3
 * mean([10, 20, 30])           // 20
 * mean([1.23, 4.5, 7.89], 3)   // 4.54
 * ```
 */
export function mean(values: (number | string)[], sigfigs?: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  // Convert all values to numbers
  const numbers = values.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All values must be valid numbers');
    }
    return num;
  });

  // Calculate the sum
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const result = sum / numbers.length;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(result, sigfigs));
  }

  return result;
}

/**
 * Calculates the sample standard deviation with proper significant figure handling
 *
 * @param values - Array of numbers to calculate the standard deviation of
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @param population - Whether to calculate population (true) or sample (false) standard deviation
 * @returns The standard deviation with appropriate significant figures
 *
 * @example
 * ```typescript
 * standardDeviation([1, 2, 3, 4, 5])           // 1.5811388300841898 (sample std dev)
 * standardDeviation([1, 2, 3, 4, 5], 3)        // 1.58 (custom: 3 significant figures)
 * standardDeviation([1, 2, 3, 4, 5], 3, true)  // 1.41 (population std dev)
 * ```
 */
export function standardDeviation(
  values: (number | string)[],
  sigfigs?: number,
  population = false,
): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  if (values.length === 1 && !population) {
    throw new Error('Sample standard deviation requires at least 2 values');
  }

  // Convert all values to numbers
  const numbers = values.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All values must be valid numbers');
    }
    return num;
  });

  // Calculate the mean
  const meanValue = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

  // Calculate the sum of squared differences
  const sumSquaredDiffs = numbers.reduce((acc, val) => acc + Math.pow(val - meanValue, 2), 0);

  // Calculate variance (population vs sample)
  const variance = population
    ? sumSquaredDiffs / numbers.length
    : sumSquaredDiffs / (numbers.length - 1);

  const result = Math.sqrt(variance);

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(result, sigfigs));
  }

  return result;
}

/**
 * Calculates the median value with proper significant figure handling
 *
 * @param values - Array of numbers to find the median of
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns The median value with appropriate significant figures
 *
 * @example
 * ```typescript
 * median([1, 2, 3, 4, 5])         // 3
 * median([1, 2, 3, 4])            // 2.5
 * median([1.23, 4.5, 7.89], 2)    // 4.5 (custom: 2 significant figures)
 * ```
 */
export function median(values: (number | string)[], sigfigs?: number): number {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  // Convert all values to numbers and sort
  const numbers = values
    .map((v) => {
      const num = parseNumberInput(v);
      if (isNaN(num)) {
        throw new Error('All values must be valid numbers');
      }
      return num;
    })
    .sort((a, b) => a - b);

  const length = numbers.length;
  let result: number;

  if (length % 2 === 0) {
    // Even number of values - average the two middle values
    const mid1 = numbers[length / 2 - 1];
    const mid2 = numbers[length / 2];
    result = (mid1 + mid2) / 2;
  } else {
    // Odd number of values - take the middle value
    result = numbers[Math.floor(length / 2)];
  }

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(result, sigfigs));
  }

  return result;
}

/**
 * Calculates basic descriptive statistics for a dataset
 *
 * @param values - Array of numbers to analyze
 * @param sigfigs - Optional: number of significant figures for results (default: exact unrounded values)
 * @returns Object containing mean, median, standard deviation, min, max, and count
 *
 * @example
 * ```typescript
 * const stats = descriptiveStats([1, 2, 3, 4, 5]);
 * // { mean: 3, median: 3, stdDev: 1.58, min: 1, max: 5, count: 5 }
 * ```
 */
export function descriptiveStats(
  values: (number | string)[],
  sigfigs?: number,
): {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  count: number;
} {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }

  // Convert all values to numbers
  const numbers = values.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All values must be valid numbers');
    }
    return num;
  });

  return {
    mean: mean(values, sigfigs),
    median: median(values, sigfigs),
    // Use population std dev for single-element arrays (avoids "requires at least 2 values" error);
    // population std dev of 1 value is 0, which is the correct answer.
    stdDev: standardDeviation(values, sigfigs, numbers.length === 1 ? true : false),
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    count: numbers.length,
  };
}

/**
 * Linear regression result interface
 */
export interface LinearRegressionResult {
  /** Slope (m) of the line y = mx + b */
  slope: number;
  /** Y-intercept (b) of the line y = mx + b */
  intercept: number;
  /** Correlation coefficient (r) - measure of linear relationship strength */
  correlation: number;
  /** Coefficient of determination (r²) - proportion of variance explained */
  rSquared: number;
}

/**
 * Performs linear regression to find the best-fit line y = mx + b
 * Uses the least squares method to minimize the sum of squared residuals
 *
 * @param xValues - Array of x-coordinates
 * @param yValues - Array of y-coordinates
 * @param sigfigs - Optional: number of significant figures for results (default: minimum significant figures from inputs)
 * @returns Object containing slope (m), intercept (b), correlation (r), and r²
 *
 * @example
 * ```typescript
 * const x = [1, 2, 3, 4, 5];
 * const y = [2, 4, 6, 8, 10];
 * const result = linearRegression(x, y);
 * // { slope: 2, intercept: 0, correlation: 1, rSquared: 1 }
 *
 * // With some noise
 * const x2 = [1, 2, 3, 4, 5];
 * const y2 = [2.1, 3.9, 6.2, 7.8, 10.1];
 * const result2 = linearRegression(x2, y2);
 * // { slope: 2.02, intercept: -0.06, correlation: 0.999, rSquared: 0.998 }
 * ```
 */
export function linearRegression(
  xValues: (number | string)[],
  yValues: (number | string)[],
  sigfigs?: number,
): LinearRegressionResult {
  if (!Array.isArray(xValues) || !Array.isArray(yValues)) {
    throw new Error('Both x and y must be arrays');
  }

  if (xValues.length !== yValues.length) {
    throw new Error('x and y arrays must have the same length');
  }

  // Convert all values to numbers
  const xNumbers = xValues.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All x values must be valid numbers');
    }
    return num;
  });

  const yNumbers = yValues.map((v) => {
    const num = parseNumberInput(v);
    if (isNaN(num)) {
      throw new Error('All y values must be valid numbers');
    }
    return num;
  });

  if (xNumbers.length < 2) {
    throw new Error('At least 2 data points are required for linear regression');
  }

  const n = xNumbers.length;

  // Calculate means
  const xMean = xNumbers.reduce((sum, x) => sum + x, 0) / n;
  const yMean = yNumbers.reduce((sum, y) => sum + y, 0) / n;

  // Calculate sums for least squares formulas
  let sumXY = 0; // Σ(xi - x̄)(yi - ȳ)
  let sumXX = 0; // Σ(xi - x̄)²
  let sumYY = 0; // Σ(yi - ȳ)²

  for (let i = 0; i < n; i++) {
    const xDiff = xNumbers[i] - xMean;
    const yDiff = yNumbers[i] - yMean;

    sumXY += xDiff * yDiff;
    sumXX += xDiff * xDiff;
    sumYY += yDiff * yDiff;
  }

  // Calculate slope (m) and intercept (b)
  if (sumXX === 0) {
    throw new Error('Cannot perform linear regression: all x values are identical');
  }

  const slope = sumXY / sumXX;
  const intercept = yMean - slope * xMean;

  // Calculate correlation coefficient (r)
  const correlation = sumYY === 0 ? 0 : sumXY / Math.sqrt(sumXX * sumYY);

  // Calculate coefficient of determination (r²)
  const rSquared = correlation * correlation;

  // Apply significant figures if specified
  if (sigfigs !== undefined) {
    return {
      slope: parseFloat(toSigfig(slope, sigfigs)),
      intercept: parseFloat(toSigfig(intercept, sigfigs)),
      correlation: parseFloat(toSigfig(correlation, sigfigs)),
      rSquared: parseFloat(toSigfig(rSquared, sigfigs)),
    };
  } else {
    // Use minimum significant figures from inputs
    const minSigfigs = Math.min(
      Math.min(...xValues.map((v) => sigfigOf(v))),
      Math.min(...yValues.map((v) => sigfigOf(v))),
    );

    return {
      slope: parseFloat(toSigfig(slope, minSigfigs)),
      intercept: parseFloat(toSigfig(intercept, minSigfigs)),
      correlation: parseFloat(toSigfig(correlation, minSigfigs)),
      rSquared: parseFloat(toSigfig(rSquared, minSigfigs)),
    };
  }
}

/**
 * Predicts y values using a linear regression model
 *
 * @param xValues - Array of x values to predict for
 * @param model - Linear regression model (slope and intercept)
 * @param sigfigs - Optional: number of significant figures for results
 * @returns Array of predicted y values
 *
 * @example
 * ```typescript
 * const model = { slope: 2, intercept: 1 };
 * const predictions = predictLinear([6, 7, 8], model);
 * // [13, 15, 17] for y = 2x + 1
 * ```
 */
export function predictLinear(
  xValues: (number | string)[],
  model: { slope: number; intercept: number },
  sigfigs?: number,
): number[] {
  if (!Array.isArray(xValues)) {
    throw new Error('x values must be an array');
  }

  if (typeof model.slope !== 'number' || typeof model.intercept !== 'number') {
    throw new Error('Model must have numeric slope and intercept properties');
  }

  // Convert x values to numbers and calculate predictions
  const predictions = xValues.map((v) => {
    const x = parseNumberInput(v);
    if (isNaN(x)) {
      throw new Error('All x values must be valid numbers');
    }

    const y = model.slope * x + model.intercept;

    if (sigfigs !== undefined) {
      return parseFloat(toSigfig(y, sigfigs));
    }

    return y;
  });

  return predictions;
}
