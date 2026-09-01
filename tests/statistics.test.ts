/**
 * Tests for statistical functions
 */

import {
  mean,
  standardDeviation,
  median,
  descriptiveStats,
  linearRegression,
  predictLinear,
} from '../src/statistics.js';

describe('mean', () => {
  test('calculates arithmetic mean', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
    expect(mean([1.2, 2.3, 3.4])).toBeCloseTo(2.3, 1);
    expect(mean([10, 20, 30])).toBe(20);
  });

  test('respects custom significant figures', () => {
    expect(mean([1.23, 4.5, 7.89], 3)).toBeCloseTo(4.54, 2);
    expect(mean([1, 2, 3], 2)).toBe(2.0);
  });

  test('handles string inputs', () => {
    expect(mean(['1', '2', '3'])).toBe(2);
    expect(mean(['1.2', '2.3', '3.4'])).toBeCloseTo(2.3, 1);
  });

  test('handles negative numbers', () => {
    expect(mean([-1, -2, -3])).toBe(-2);
    expect(mean([-1, 0, 1])).toBe(0);
  });

  test('throws error for empty array', () => {
    expect(() => mean([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid inputs', () => {
    expect(() => mean(['invalid', '2', '3'])).toThrow('All values must be valid numbers');
    expect(() => mean('not an array' as any)).toThrow('Input must be a non-empty array of numbers');
  });
});

describe('standardDeviation', () => {
  test('calculates sample standard deviation', () => {
    expect(standardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(1.58, 2);
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.14, 2);
  });

  test('calculates population standard deviation', () => {
    expect(standardDeviation([1, 2, 3, 4, 5], undefined, true)).toBeCloseTo(1.41, 2);
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], undefined, true)).toBeCloseTo(2.0, 1);
  });

  test('respects custom significant figures', () => {
    expect(standardDeviation([1, 2, 3, 4, 5], 2)).toBeCloseTo(1.6, 1);
    expect(standardDeviation([1, 2, 3, 4, 5], 3)).toBeCloseTo(1.58, 2);
  });

  test('handles string inputs', () => {
    expect(standardDeviation(['1', '2', '3', '4', '5'])).toBeCloseTo(1.58, 2);
  });

  test('handles single value for population', () => {
    expect(standardDeviation([5], undefined, true)).toBe(0);
  });

  test('throws error for single value in sample mode', () => {
    expect(() => standardDeviation([5])).toThrow(
      'Sample standard deviation requires at least 2 values',
    );
  });

  test('throws error for empty array', () => {
    expect(() => standardDeviation([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid inputs', () => {
    expect(() => standardDeviation(['invalid', '2', '3'])).toThrow(
      'All values must be valid numbers',
    );
  });
});

describe('median', () => {
  test('calculates median for odd number of values', () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
    expect(median([5, 1, 3, 2, 4])).toBe(3); // Should sort first
  });

  test('calculates median for even number of values', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([4, 1, 3, 2])).toBe(2.5); // Should sort first
  });

  test('respects custom significant figures', () => {
    expect(median([1.23, 4.5, 7.89], 2)).toBe(4.5);
    expect(median([1, 2, 3, 4], 2)).toBe(2.5);
  });

  test('handles string inputs', () => {
    expect(median(['1', '2', '3'])).toBe(2);
    expect(median(['1', '2', '3', '4'])).toBe(2.5);
  });

  test('handles negative numbers', () => {
    expect(median([-3, -1, -2])).toBe(-2);
    expect(median([-2, -1, 1, 2])).toBe(0);
  });

  test('throws error for empty array', () => {
    expect(() => median([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid inputs', () => {
    expect(() => median(['invalid', '2', '3'])).toThrow('All values must be valid numbers');
  });
});

describe('descriptiveStats', () => {
  test('calculates all descriptive statistics', () => {
    const stats = descriptiveStats([1, 2, 3, 4, 5]);

    expect(stats.mean).toBe(3);
    expect(stats.median).toBe(3);
    expect(stats.stdDev).toBeCloseTo(1.58, 2);
    expect(stats.min).toBe(1);
    expect(stats.max).toBe(5);
    expect(stats.count).toBe(5);
  });

  test('respects custom significant figures', () => {
    const stats = descriptiveStats([1.23, 4.5, 7.89], 2);

    expect(stats.mean).toBeCloseTo(4.5, 1);
    expect(stats.median).toBe(4.5);
    expect(stats.stdDev).toBeCloseTo(3.3, 1);
    expect(stats.min).toBe(1.23);
    expect(stats.max).toBe(7.89);
    expect(stats.count).toBe(3);
  });

  test('handles string inputs', () => {
    const stats = descriptiveStats(['1', '2', '3', '4', '5']);

    expect(stats.mean).toBe(3);
    expect(stats.median).toBe(3);
    expect(stats.count).toBe(5);
  });

  test('handles single-element array', () => {
    // Single-element: stdDev should be 0 (no spread), not crash
    const stats = descriptiveStats([42]);
    expect(stats.mean).toBe(42);
    expect(stats.median).toBe(42);
    expect(stats.stdDev).toBe(0);
    expect(stats.min).toBe(42);
    expect(stats.max).toBe(42);
    expect(stats.count).toBe(1);
  });

  test('throws error for empty array', () => {
    expect(() => descriptiveStats([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid inputs', () => {
    expect(() => descriptiveStats(['invalid', '2', '3'])).toThrow(
      'All values must be valid numbers',
    );
  });
});

describe('linearRegression', () => {
  test('performs perfect linear regression', () => {
    // Perfect line: y = 2x + 1
    const x = [1, 2, 3, 4, 5];
    const y = [3, 5, 7, 9, 11];
    const result = linearRegression(x, y);

    expect(result.slope).toBeCloseTo(2, 10);
    expect(result.intercept).toBeCloseTo(1, 10);
    expect(result.correlation).toBeCloseTo(1, 10);
    expect(result.rSquared).toBeCloseTo(1, 10);
  });

  test('handles noisy data', () => {
    // Approximately y = 2x + 1 with noise
    const x = [1, 2, 3, 4, 5];
    const y = [3.1, 4.9, 7.2, 8.8, 11.1];
    const result = linearRegression(x, y);

    expect(result.slope).toBeCloseTo(2, 0);
    expect(result.intercept).toBeCloseTo(1, 0);
    expect(result.correlation).toBeGreaterThan(0.95);
    expect(result.rSquared).toBeGreaterThan(0.9);
  });

  test('handles negative correlation', () => {
    // y = -x + 5
    const x = [1, 2, 3, 4, 5];
    const y = [4, 3, 2, 1, 0];
    const result = linearRegression(x, y);

    expect(result.slope).toBeCloseTo(-1, 10);
    expect(result.intercept).toBeCloseTo(5, 10);
    expect(result.correlation).toBeCloseTo(-1, 10);
    expect(result.rSquared).toBeCloseTo(1, 10);
  });

  test('handles horizontal line', () => {
    // y = 5 (horizontal line)
    const x = [1, 2, 3, 4, 5];
    const y = [5, 5, 5, 5, 5];
    const result = linearRegression(x, y);

    expect(result.slope).toBeCloseTo(0, 10);
    expect(result.intercept).toBeCloseTo(5, 10);
    expect(result.correlation).toBe(0);
    expect(result.rSquared).toBe(0);
  });

  test('respects custom significant figures', () => {
    const x = [1.234, 2.345, 3.456];
    const y = [2.468, 4.69, 6.912];
    const result = linearRegression(x, y, 3);

    expect(result.slope).toBeCloseTo(2.0, 2);
    expect(result.intercept).toBeCloseTo(0, 1);
  });

  test('handles string inputs', () => {
    const x = ['1', '2', '3'];
    const y = ['2', '4', '6'];
    const result = linearRegression(x, y);

    expect(result.slope).toBeCloseTo(2, 10);
    expect(result.intercept).toBeCloseTo(0, 10);
  });

  test('throws error for mismatched array lengths', () => {
    expect(() => linearRegression([1, 2, 3], [1, 2])).toThrow(
      'x and y arrays must have the same length',
    );
  });

  test('throws error for insufficient data points', () => {
    expect(() => linearRegression([1], [2])).toThrow(
      'At least 2 data points are required for linear regression',
    );
  });

  test('throws error for identical x values', () => {
    expect(() => linearRegression([1, 1, 1], [2, 3, 4])).toThrow(
      'Cannot perform linear regression: all x values are identical',
    );
  });

  test('throws error for invalid inputs', () => {
    expect(() => linearRegression(['invalid'], [1])).toThrow('All x values must be valid numbers');
    expect(() => linearRegression([1], ['invalid'])).toThrow('All y values must be valid numbers');
    expect(() => linearRegression('not array' as any, [1, 2])).toThrow(
      'Both x and y must be arrays',
    );
  });
});

describe('predictLinear', () => {
  test('makes predictions using linear model', () => {
    const model = { slope: 2, intercept: 1 };
    const predictions = predictLinear([6, 7, 8], model);

    expect(predictions).toEqual([13, 15, 17]);
  });

  test('handles string inputs', () => {
    const model = { slope: 2, intercept: 1 };
    const predictions = predictLinear(['6', '7', '8'], model);

    expect(predictions).toEqual([13, 15, 17]);
  });

  test('respects custom significant figures', () => {
    const model = { slope: 2.123, intercept: 1.456 };
    const predictions = predictLinear([1, 2], model, 3);

    expect(predictions[0]).toBeCloseTo(3.58, 2);
    expect(predictions[1]).toBeCloseTo(5.7, 2);
  });

  test('handles negative slope and intercept', () => {
    const model = { slope: -1.5, intercept: 10 };
    const predictions = predictLinear([2, 4], model);

    expect(predictions).toEqual([7, 4]);
  });

  test('throws error for invalid model', () => {
    expect(() => predictLinear([1, 2], { slope: 'invalid' } as any)).toThrow(
      'Model must have numeric slope and intercept properties',
    );
    expect(() => predictLinear([1, 2], { intercept: 1 } as any)).toThrow(
      'Model must have numeric slope and intercept properties',
    );
  });

  test('throws error for invalid x values', () => {
    const model = { slope: 1, intercept: 0 };
    expect(() => predictLinear(['invalid'], model)).toThrow('All x values must be valid numbers');
    expect(() => predictLinear('not array' as any, model)).toThrow('x values must be an array');
  });
});
