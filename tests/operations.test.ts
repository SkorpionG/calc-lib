/**
 * Tests for arithmetic operations with significant figures
 */

import { add, sub, mul, div, mod, idiv, pow, sqrt, abs, max, min } from '../src/operations.js';

describe('add', () => {
  test('adds numbers with proper significant figure handling', () => {
    expect(add(1.23, 4.5)).toBe(5.7);
    expect(add(1.234, 2.56)).toBe(3.79);
    expect(add(123, 4.567)).toBe(128);
  });

  test('handles string inputs', () => {
    expect(add('1.23', '4.5')).toBe(5.7);
    expect(add(1.23, '4.5')).toBe(5.7);
  });

  test('handles scientific notation precision', () => {
    expect(add('1.2e3', '2.34e3')).toBeCloseTo(3500, 10);
    expect(add('1e3', '2e3')).toBeCloseTo(3000, 10);
  });

  test('respects custom sigfig parameter', () => {
    expect(add(1.234, 5.678, 3)).toBeCloseTo(6.91, 2);
    expect(add(123.456, 78.9, 2)).toBeCloseTo(200, 0);
  });

  test('handles negative numbers', () => {
    expect(add(-1.23, 4.5)).toBe(3.3);
    expect(add(1.23, -4.5)).toBe(-3.3);
    expect(add(-1.2, -3.4)).toBe(-4.6);
  });

  test('handles zero', () => {
    // Integer 0 has 0 decimal places, so result rounds to integer
    expect(add(0, 5.5)).toBe(6);
    expect(add(5.5, 0)).toBe(6);
    // Float 0.0 treated as a string preserves decimal context
    expect(add('0.0', 5.5)).toBe(5.5);
  });

  test('throws error for invalid inputs', () => {
    expect(() => add('invalid', 5)).toThrow();
    expect(() => add(5, 'invalid')).toThrow();
    expect(() => add(NaN, 5)).toThrow();
    expect(() => add('12junk', 3)).toThrow('Invalid input: both operands must be valid numbers');
    expect(() => add('', 3)).toThrow('Invalid input: both operands must be valid numbers');
    expect(() => add(Infinity, 3)).toThrow('Invalid input: both operands must be valid numbers');
    expect(() => add('1e999', 3)).toThrow('Invalid input: both operands must be valid numbers');
  });
});

describe('sub', () => {
  test('subtracts numbers with proper significant figure handling', () => {
    expect(sub(5.67, 1.2)).toBe(4.5);
    expect(sub(10.234, 3.45)).toBe(6.78);
    expect(sub(500, 23.4)).toBe(477);
  });

  test('handles string inputs', () => {
    expect(sub('5.67', '1.2')).toBe(4.5);
    expect(sub(5.67, '1.2')).toBe(4.5);
  });

  test('handles scientific notation precision', () => {
    expect(sub('2.34e3', '1.2e3')).toBeCloseTo(1100, 10);
  });

  test('respects custom sigfig parameter', () => {
    expect(sub(10.234, 3.456, 3)).toBeCloseTo(6.78, 2);
  });

  test('handles negative results', () => {
    expect(sub(1.2, 5.6)).toBe(-4.4);
  });

  test('handles zero', () => {
    // Integer 0 has 0 decimal places, so result rounds to integer
    expect(sub(0, 5.5)).toBe(-6);
    expect(sub(5.5, 0)).toBe(6);
    expect(sub('0.0', 5.5)).toBe(-5.5);
  });

  test('throws error for invalid inputs', () => {
    expect(() => sub('invalid', 5)).toThrow();
    expect(() => sub(5, 'invalid')).toThrow();
    expect(() => sub(NaN, 5)).toThrow();
  });
});

describe('mul', () => {
  test('multiplies numbers with proper significant figure handling', () => {
    expect(mul(1.23, 4.5)).toBeCloseTo(5.5, 1);
    expect(mul(2.34, 5.6)).toBeCloseTo(13, 1);
    expect(mul(100, 2.5)).toBeCloseTo(300, 0);
  });

  test('handles string inputs', () => {
    expect(mul('1.23', '4.5')).toBeCloseTo(5.5, 1);
    expect(mul(1.23, '4.5')).toBeCloseTo(5.5, 1);
    expect(mul('2.0', 3.14159)).toBeCloseTo(6.3, 1);
  });

  test('respects custom sigfig parameter', () => {
    expect(mul(1.234, 5.678, 4)).toBeCloseTo(7.007, 3);
  });

  test('handles negative numbers', () => {
    expect(mul(-2.0, 3.0)).toBeCloseTo(-6.0, 1);
    expect(mul(2.0, -3.0)).toBeCloseTo(-6.0, 1);
    expect(mul(-2.0, -3.0)).toBeCloseTo(6.0, 1);
  });

  test('handles zero', () => {
    expect(mul(0, 5.5)).toBe(0);
    expect(mul(5.5, 0)).toBe(0);
  });

  test('throws error for invalid inputs', () => {
    expect(() => mul('invalid', 5)).toThrow();
    expect(() => mul(5, 'invalid')).toThrow();
    expect(() => mul(NaN, 5)).toThrow();
  });
});

describe('div', () => {
  test('divides numbers with proper significant figure handling', () => {
    expect(div('10.0', '3.0')).toBeCloseTo(3.3, 1);
    expect(div(15.6, 2.1)).toBeCloseTo(7.4, 1);
  });

  test('handles string inputs', () => {
    expect(div('10.0', '3.0')).toBeCloseTo(3.3, 1);
  });

  test('respects custom sigfig parameter', () => {
    expect(div(22.0, 7.0, 4)).toBeCloseTo(3.143, 3);
  });

  test('handles negative numbers', () => {
    expect(div(-10.0, 2.0)).toBeCloseTo(-5.0, 1);
    expect(div(10.0, -2.0)).toBeCloseTo(-5.0, 1);
    expect(div(-10.0, -2.0)).toBeCloseTo(5.0, 1);
  });

  test('throws error for division by zero', () => {
    expect(() => div(5, 0)).toThrow('Division by zero is not allowed');
    expect(() => div(5, '0')).toThrow('Division by zero is not allowed');
  });

  test('throws error for invalid inputs', () => {
    expect(() => div('invalid', 5)).toThrow();
    expect(() => div(5, 'invalid')).toThrow();
    expect(() => div(NaN, 5)).toThrow();
  });
});

describe('mod', () => {
  test('performs modulo operation', () => {
    expect(mod(10, 3)).toBe(1);
    expect(mod(17, 5)).toBe(2);
    expect(mod(100, 7)).toBe(2);
  });

  test('handles decimal numbers', () => {
    expect(mod(17.5, 5.2)).toBeCloseTo(1.9, 1);
    expect(mod(10.7, 3.2)).toBeCloseTo(1.1, 1);
  });

  test('handles negative numbers', () => {
    expect(mod(-10, 3)).toBe(-1);
    expect(mod(10, -3)).toBe(1);
  });

  test('handles string inputs', () => {
    expect(mod('10', '3')).toBe(1);
    expect(mod('17.5', '5.2')).toBeCloseTo(1.9, 1);
  });

  test('respects custom sigfig parameter', () => {
    expect(mod(100, 7, 3)).toBeCloseTo(2.0, 2);
  });

  test('throws error for modulo by zero', () => {
    expect(() => mod(5, 0)).toThrow('Division by zero: modulo by zero is undefined');
  });

  test('throws error for invalid inputs', () => {
    expect(() => mod('invalid', 3)).toThrow();
    expect(() => mod(10, 'invalid')).toThrow();
  });
});

describe('idiv', () => {
  test('performs integer division', () => {
    expect(idiv(10, 3)).toBe(3);
    expect(idiv(17, 5)).toBe(3);
    expect(idiv(20, 4)).toBe(5);
  });

  test('handles negative numbers correctly', () => {
    expect(idiv(-10, 3)).toBe(-4);
    expect(idiv(10, -3)).toBe(-4);
    expect(idiv(-10, -3)).toBe(3);
  });

  test('handles string inputs', () => {
    expect(idiv('10', '3')).toBe(3);
    expect(idiv('17', '5')).toBe(3);
  });

  test('respects custom sigfig parameter', () => {
    expect(idiv(22.0, 7.0, 2)).toBeCloseTo(3.0, 1);
  });

  test('throws error for division by zero', () => {
    expect(() => idiv(5, 0)).toThrow('Division by zero is not allowed');
  });

  test('throws error for invalid inputs', () => {
    expect(() => idiv('invalid', 3)).toThrow();
    expect(() => idiv(10, 'invalid')).toThrow();
  });
});

describe('pow', () => {
  test('performs power operation', () => {
    expect(pow(2, 3)).toBe(8);
    expect(pow(5, 2)).toBe(25);
    expect(pow(10, 0)).toBe(1);
  });

  test('handles decimal exponents', () => {
    expect(pow(4, 0.5)).toBe(2);
    expect(pow(8, 1 / 3)).toBeCloseTo(2, 10);
  });

  test('handles negative bases', () => {
    expect(pow(-2, 3)).toBe(-8);
    expect(pow(-2, 2)).toBe(4);
  });

  test('handles string inputs', () => {
    expect(pow('2', '3')).toBe(8);
    expect(pow('4', '0.5')).toBe(2);
  });

  test('returns exact result without sigfig param', () => {
    expect(pow(2.5, 2)).toBe(6.25);
  });

  test('respects custom sigfig parameter', () => {
    expect(pow(2.5, 2, 2)).toBeCloseTo(6.3, 1);
  });

  test('handles pow(0, n)', () => {
    expect(pow(0, 5)).toBe(0);
  });

  test('throws error for invalid results (infinity and NaN)', () => {
    expect(() => pow(0, -1)).toThrow('Power operation resulted in infinite or invalid result');
    expect(() => pow(Infinity, 2)).toThrow();
    expect(() => pow(-1, 0.5)).toThrow('Power operation resulted in infinite or invalid result');
  });

  test('throws error for invalid inputs', () => {
    expect(() => pow('invalid', 2)).toThrow();
    expect(() => pow(2, 'invalid')).toThrow();
  });
});

describe('sqrt', () => {
  test('calculates square root', () => {
    expect(sqrt(9)).toBe(3);
    expect(sqrt(16)).toBe(4);
    expect(sqrt(25)).toBe(5);
  });

  test('handles zero', () => {
    expect(sqrt(0)).toBe(0);
  });

  test('handles decimal numbers', () => {
    expect(sqrt(2.0)).toBeCloseTo(1.4142135623730951, 10);
    expect(sqrt(6.25)).toBe(2.5);
  });

  test('handles string inputs', () => {
    expect(sqrt('9')).toBe(3);
    expect(sqrt('0')).toBe(0);
  });

  test('respects custom sigfig parameter', () => {
    expect(sqrt(16, 3)).toBeCloseTo(4.0, 2);
    expect(sqrt(2, 2)).toBeCloseTo(1.4, 1);
  });

  test('throws error for negative numbers', () => {
    expect(() => sqrt(-4)).toThrow('Cannot take square root of negative number');
    expect(() => sqrt(-0.001)).toThrow();
  });

  test('throws error for invalid inputs', () => {
    expect(() => sqrt('invalid')).toThrow();
  });
});

describe('abs', () => {
  test('calculates absolute value', () => {
    expect(abs(-5)).toBe(5);
    expect(abs(5)).toBe(5);
    expect(abs(0)).toBe(0);
  });

  test('handles decimal numbers', () => {
    expect(abs(-3.14)).toBe(3.14);
    expect(abs(2.5)).toBe(2.5);
  });

  test('handles string inputs', () => {
    expect(abs('-5.5')).toBe(5.5);
    expect(abs('3.14')).toBe(3.14);
  });

  test('respects custom sigfig parameter', () => {
    expect(abs(-5.0, 2)).toBe(5);
    expect(abs(-3.14159, 3)).toBeCloseTo(3.14, 2);
  });

  test('handles negative zero', () => {
    expect(abs(-0)).toBe(0);
  });

  test('throws error for invalid inputs', () => {
    expect(() => abs('invalid')).toThrow();
  });
});

describe('max', () => {
  test('finds maximum value', () => {
    expect(max([1, 2, 3])).toBe(3);
    expect(max([5, 1, 9, 3])).toBe(9);
    expect(max([-1, -5, -2])).toBe(-1);
  });

  test('handles decimal numbers', () => {
    expect(max([1.2, 3.4, 2.1])).toBe(3.4);
    expect(max([5.0, 3.14])).toBeCloseTo(5.0, 1);
  });

  test('handles string inputs', () => {
    expect(max(['1', '5', '3'])).toBe(5);
    expect(max(['1.2', '3.4'])).toBe(3.4);
  });

  test('handles single-element array', () => {
    expect(max([42])).toBe(42);
    expect(max([-7.5])).toBe(-7.5);
  });

  test('respects custom sigfig parameter', () => {
    expect(max([5.0, 3.14], 2)).toBeCloseTo(5.0, 1);
  });

  test('throws error for empty array', () => {
    expect(() => max([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid values', () => {
    expect(() => max(['invalid', 2])).toThrow('All values must be valid numbers');
  });

  test('throws error for non-array input', () => {
    expect(() => max(null as unknown as number[])).toThrow();
  });
});

describe('min', () => {
  test('finds minimum value', () => {
    expect(min([1, 2, 3])).toBe(1);
    expect(min([5, 1, 9, 3])).toBe(1);
    expect(min([-1, -5, -2])).toBe(-5);
  });

  test('handles decimal numbers', () => {
    expect(min([1.2, 3.4, 2.1])).toBe(1.2);
    expect(min([5.0, 3.14])).toBeCloseTo(3.14, 2);
  });

  test('handles string inputs', () => {
    expect(min(['1', '5', '3'])).toBe(1);
    expect(min(['1.2', '3.4'])).toBe(1.2);
  });

  test('handles single-element array', () => {
    expect(min([42])).toBe(42);
    expect(min([-7.5])).toBe(-7.5);
  });

  test('respects custom sigfig parameter', () => {
    expect(min([5.0, 3.14], 3)).toBeCloseTo(3.14, 2);
  });

  test('throws error for empty array', () => {
    expect(() => min([])).toThrow('Input must be a non-empty array of numbers');
  });

  test('throws error for invalid values', () => {
    expect(() => min([1, 'invalid'])).toThrow('All values must be valid numbers');
  });

  test('throws error for non-array input', () => {
    expect(() => min(null as unknown as number[])).toThrow();
  });
});
