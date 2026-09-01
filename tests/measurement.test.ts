/**
 * Tests for measurement utilities
 */

import { uncertainty, createMeasurement } from '../src/measurement.js';

describe('uncertainty', () => {
  test('formats measurements with uncertainty', () => {
    expect(uncertainty(9.81, 0.02)).toBe('9.81 ± 0.02');
    expect(uncertainty(123.456, 0.1)).toBe('123.5 ± 0.1');
    expect(uncertainty(1000, 50)).toBe('1000 ± 50');
  });

  test('handles custom significant figures', () => {
    expect(uncertainty(123.456, 0.1, 3)).toBe('123 ± 0.1');
    expect(uncertainty(9.81, 0.02, 4)).toBe('9.810 ± 0.02');
  });

  test('handles zero uncertainty', () => {
    expect(uncertainty(123.456, 0)).toBe('123.456');
    expect(uncertainty(123.456, 0, 3)).toBe('123');
  });

  test('handles negative values', () => {
    expect(uncertainty(-9.81, 0.02)).toBe('-9.81 ± 0.02');
    expect(uncertainty(9.81, -0.02)).toBe('9.81 ± 0.02'); // Should handle negative uncertainty
  });

  test('handles string inputs', () => {
    expect(uncertainty('9.81', '0.02')).toBe('9.81 ± 0.02');
    expect(uncertainty('123.456', '0.1')).toBe('123.5 ± 0.1');
  });

  test('throws error for invalid inputs', () => {
    expect(() => uncertainty('invalid', 0.02)).toThrow(
      'Invalid input: both value and error must be valid numbers',
    );
    expect(() => uncertainty(9.81, 'invalid')).toThrow(
      'Invalid input: both value and error must be valid numbers',
    );
  });
});

describe('createMeasurement', () => {
  test('creates measurement objects', () => {
    const measurement = createMeasurement(9.81, 0.02);
    expect(measurement.value).toBe(9.81);
    expect(measurement.uncertainty).toBe(0.02);
    expect(measurement.sigfigs).toBeUndefined();
  });

  test('creates measurement with custom significant figures', () => {
    const measurement = createMeasurement(123.456, 0.1, 4);
    expect(measurement.value).toBe(123.456);
    expect(measurement.uncertainty).toBe(0.1);
    expect(measurement.sigfigs).toBe(4);
  });

  test('handles string inputs', () => {
    const measurement = createMeasurement('9.81', '0.02');
    expect(measurement.value).toBe(9.81);
    expect(measurement.uncertainty).toBe(0.02);
  });

  test('throws error for invalid inputs', () => {
    expect(() => createMeasurement('invalid', 0.02)).toThrow(
      'Invalid input: both value and error must be valid numbers',
    );
    expect(() => createMeasurement(9.81, 'invalid')).toThrow(
      'Invalid input: both value and error must be valid numbers',
    );
    expect(() => createMeasurement(9.81, -0.02)).toThrow('Uncertainty must be non-negative');
  });
});
