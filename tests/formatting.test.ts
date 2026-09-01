/**
 * Tests for formatting utilities
 */

import { toScientific, toEngineering, round, percentage, truncate } from '../src/formatting.js';

describe('toScientific', () => {
  test('formats numbers in scientific notation', () => {
    expect(toScientific(1234)).toBe('1.234e+3');
    expect(toScientific(0.00123)).toBe('1.23e-3');
    expect(toScientific(0)).toBe('0e+0');
  });

  test('formats zero with sigfigs', () => {
    // Covers the sigfigs branch of the zero case
    expect(toScientific(0, 3)).toBe('0.00e+0');
    expect(toScientific(0, 1)).toBe('0e+0');
  });

  test('formats numbers that toSigfig does not express in scientific notation', () => {
    // Numbers in range 1-999 are formatted as fixed by toSigfig, then converted to exponential
    expect(toScientific(123, 3)).toBe('1.23e+2');
    expect(toScientific(5, 1)).toBe('5e+0');
  });

  test('respects custom significant figures', () => {
    expect(toScientific(1234, 2)).toBe('1.2e+3');
    expect(toScientific(0.00123, 4)).toBe('1.230e-3');
  });

  test('handles negative numbers', () => {
    expect(toScientific(-1234)).toBe('-1.234e+3');
    expect(toScientific(-0.00123)).toBe('-1.23e-3');
  });

  test('handles string inputs', () => {
    expect(toScientific('1234')).toBe('1.234e+3');
    expect(toScientific('0.00123')).toBe('1.23e-3');
  });

  test('throws error for invalid inputs', () => {
    expect(() => toScientific('invalid')).toThrow('Invalid input: value must be a valid number');
  });
});

describe('toEngineering', () => {
  test('formats numbers in engineering notation', () => {
    expect(toEngineering(1234)).toBe('1.234e+3');
    expect(toEngineering(12345)).toBe('12.345e+3');
    expect(toEngineering(0.00123)).toBe('1.23e-3');
    expect(toEngineering(0.000123)).toBe('123e-6');
  });

  test('respects custom significant figures', () => {
    expect(toEngineering(12345, 3)).toBe('12.3e+3');
    expect(toEngineering(0.000123, 2)).toBe('120e-6');
  });

  test('handles negative numbers', () => {
    expect(toEngineering(-1234)).toBe('-1.234e+3');
    expect(toEngineering(-0.00123)).toBe('-1.23e-3');
  });

  test('handles zero', () => {
    expect(toEngineering(0)).toBe('0e+0');
    expect(toEngineering(0, 3)).toBe('0.00e+0');
  });

  test('throws error for invalid inputs', () => {
    expect(() => toEngineering('invalid')).toThrow('Invalid input: value must be a valid number');
  });
});

describe('round', () => {
  test('rounds to specified significant figures', () => {
    expect(round(123.456, 3)).toBe(123);
    expect(round(123.456, 4)).toBe(123.5);
    expect(round(0.001234, 2)).toBeCloseTo(0.0012, 6);
  });

  test('handles negative numbers', () => {
    expect(round(-123.456, 3)).toBe(-123);
    expect(round(-0.001234, 2)).toBeCloseTo(-0.0012, 6);
  });

  test('handles string inputs', () => {
    expect(round('123.456', 3)).toBe(123);
    expect(round('0.001234', 2)).toBeCloseTo(0.0012, 6);
  });

  test('throws error for invalid inputs', () => {
    expect(() => round('invalid', 3)).toThrow('Invalid input: value must be a valid number');
    expect(() => round(123, 0)).toThrow('Number of significant figures must be positive');
    expect(() => round(123, -1)).toThrow('Number of significant figures must be positive');
  });
});

describe('percentage', () => {
  test('calculates percentages with proper significant figures', () => {
    expect(percentage(25, 100)).toBe(25);
    expect(percentage(1, 3)).toBeCloseTo(33.3, 1);
    expect(percentage(2, 3)).toBeCloseTo(66.7, 1);
  });

  test('respects custom significant figures', () => {
    expect(percentage(1, 3, 2)).toBe(33);
    expect(percentage(1, 3, 4)).toBeCloseTo(33.33, 2);
  });

  test('handles string inputs', () => {
    expect(percentage('25', '100')).toBe(25);
    expect(percentage('1', '3')).toBeCloseTo(33.3, 1);
  });

  test('handles negative numbers', () => {
    expect(percentage(-25, 100)).toBe(-25);
    expect(percentage(25, -100)).toBe(-25);
  });

  test('throws error for division by zero', () => {
    expect(() => percentage(25, 0)).toThrow('Division by zero: whole value cannot be zero');
  });

  test('throws error for invalid inputs', () => {
    expect(() => percentage('invalid', 100)).toThrow(
      'Invalid input: both values must be valid numbers',
    );
    expect(() => percentage(25, 'invalid')).toThrow(
      'Invalid input: both values must be valid numbers',
    );
  });
});

describe('truncate', () => {
  test('truncates to specified significant figures without rounding', () => {
    expect(truncate(123.456, 3)).toBe(123);
    expect(truncate(123.999, 3)).toBe(123); // Should truncate, not round
    expect(truncate(0.001234, 2)).toBeCloseTo(0.0012, 6);
    expect(truncate(1999, 2)).toBe(1900); // Should truncate to 2 sig figs
  });

  test('handles negative numbers', () => {
    expect(truncate(-123.456, 3)).toBe(-123);
    expect(truncate(-123.999, 3)).toBe(-123);
    expect(truncate(-0.001234, 2)).toBeCloseTo(-0.0012, 6);
  });

  test('handles zero', () => {
    expect(truncate(0, 3)).toBe(0);
    expect(truncate('0', 2)).toBe(0);
  });

  test('handles string inputs', () => {
    expect(truncate('123.456', 3)).toBe(123);
    expect(truncate('0.001234', 2)).toBeCloseTo(0.0012, 6);
  });

  test('throws error for invalid inputs', () => {
    expect(() => truncate('invalid', 3)).toThrow('Invalid input: value must be a valid number');
    expect(() => truncate(123, 0)).toThrow('Number of significant figures must be positive');
    expect(() => truncate(123, -1)).toThrow('Number of significant figures must be positive');
  });

  test('demonstrates difference from round function', () => {
    // Demonstrate difference between truncate and round
    expect(truncate(123.999, 3)).toBe(123); // truncate
    expect(round(123.999, 3)).toBe(124); // round

    expect(truncate(199.9, 2)).toBe(190); // truncate
    expect(round(199.9, 2)).toBe(200); // round
  });
});
