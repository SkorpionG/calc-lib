/**
 * Tests for significant figure utilities
 */

import { sigfigOf, toSigfig, getSigfigsForAddOrSub, getSigfigsForMulOrDiv } from '../src/sigfig.js';

describe('sigfigOf', () => {
  test('counts significant figures in integers', () => {
    expect(sigfigOf(123)).toBe(3);
    expect(sigfigOf(100)).toBe(1); // Trailing zeros in whole numbers are not significant
    expect(sigfigOf(101)).toBe(3);
    expect(sigfigOf(1000)).toBe(1);
    expect(sigfigOf(1001)).toBe(4);
    expect(sigfigOf(1)).toBe(1);
    expect(sigfigOf(9)).toBe(1);
  });

  test('counts significant figures in decimals', () => {
    expect(sigfigOf(1.23)).toBe(3);
    expect(sigfigOf('1.230')).toBe(4); // Trailing zeros after decimal are significant
    expect(sigfigOf(0.123)).toBe(3); // Leading zeros are not significant
    expect(sigfigOf(0.0123)).toBe(3);
    expect(sigfigOf('1.0')).toBe(2);
    expect(sigfigOf('10.0')).toBe(3);
    expect(sigfigOf(0.1)).toBe(1);
    expect(sigfigOf(0.01)).toBe(1);
  });

  test('counts significant figures in scientific notation', () => {
    expect(sigfigOf('1.23e4')).toBe(3);
    expect(sigfigOf('1.230E-4')).toBe(4);
    expect(sigfigOf('2.0e10')).toBe(2);
    expect(sigfigOf('1.23e-4')).toBe(3);
  });

  test('handles string inputs', () => {
    expect(sigfigOf('123')).toBe(3);
    expect(sigfigOf('1.23')).toBe(3);
    expect(sigfigOf('0.0123')).toBe(3);
    expect(sigfigOf('100.')).toBe(3); // Decimal point indicates trailing zeros are significant
  });

  test('handles edge cases', () => {
    expect(sigfigOf(0)).toBe(1);
    expect(sigfigOf('0')).toBe(1);
    expect(sigfigOf('0.0')).toBe(1);
    expect(sigfigOf(-123)).toBe(3);
    expect(sigfigOf('-1.23')).toBe(3);
    expect(sigfigOf(-0.001)).toBe(1);
    // Multi-zero string: '00' does not start with decimal, removes leading zeros -> '' -> return 1
    expect(sigfigOf('00')).toBe(1);
  });

  test('handles negative decimals', () => {
    expect(sigfigOf(-1.23)).toBe(3);
    expect(sigfigOf('-0.00123')).toBe(3);
    expect(sigfigOf('-1.230')).toBe(4);
  });
});

describe('toSigfig', () => {
  test('formats numbers to specified significant figures', () => {
    expect(toSigfig(123.456, 3)).toBe('123');
    expect(toSigfig(123.456, 4)).toBe('123.5');
    expect(toSigfig(0.001234, 3)).toBe('1.23e-3');
    expect(toSigfig(1234567, 3)).toBe('1.23e+6');
  });

  test('handles negative numbers', () => {
    expect(toSigfig(-123.456, 3)).toBe('-123');
    expect(toSigfig(-0.001234, 2)).toBe('-1.2e-3');
  });

  test('handles zero', () => {
    expect(toSigfig(0, 3)).toBe('0');
  });

  test('handles rounding at decade boundaries', () => {
    expect(toSigfig(9.95, 2)).toBe('10');
    expect(toSigfig(99.5, 2)).toBe('100');
  });

  test('handles very small numbers', () => {
    expect(toSigfig(0.0099, 2)).toBe('9.9e-3');
    expect(toSigfig(0.0001, 1)).toBe('1e-4');
  });

  test('handles 1 significant figure', () => {
    expect(toSigfig(123, 1)).toBe('100');
    expect(toSigfig(0.0567, 1)).toBe('0.06');
  });

  test('throws error for invalid sigfig count', () => {
    expect(() => toSigfig(123, 0)).toThrow();
    expect(() => toSigfig(123, -1)).toThrow();
  });
});

describe('getSigfigsForAddOrSub', () => {
  test('determines decimal places for addition', () => {
    expect(getSigfigsForAddOrSub([1.23, 4.5])).toBe(1); // 4.5 has 1 decimal place
    expect(getSigfigsForAddOrSub([1.234, 2.56])).toBe(2); // 2.56 has 2 decimal places
    expect(getSigfigsForAddOrSub([123, 4.5])).toBe(0); // 123 has no decimal places
  });

  test('handles all whole numbers', () => {
    expect(getSigfigsForAddOrSub([10, 20])).toBe(0);
    expect(getSigfigsForAddOrSub([100])).toBe(0);
  });

  test('handles single value', () => {
    expect(getSigfigsForAddOrSub([1.5])).toBe(1);
    expect(getSigfigsForAddOrSub([100])).toBe(0);
  });

  test('returns 0 for empty array', () => {
    expect(getSigfigsForAddOrSub([])).toBe(0);
  });

  test('handles string inputs', () => {
    expect(getSigfigsForAddOrSub(['1.23', '4.5'])).toBe(1);
    expect(getSigfigsForAddOrSub(['100', '4.567'])).toBe(0);
  });
});

describe('getSigfigsForMulOrDiv', () => {
  test('determines minimum significant figures for multiplication', () => {
    expect(getSigfigsForMulOrDiv([1.23, 4.5])).toBe(2); // min(3, 2) = 2
    expect(getSigfigsForMulOrDiv([1.234, 2.56, 7.8])).toBe(2); // min(4, 3, 2) = 2
  });

  test('handles single value', () => {
    expect(getSigfigsForMulOrDiv([1.23])).toBe(3);
    expect(getSigfigsForMulOrDiv([100])).toBe(1);
  });

  test('handles string inputs', () => {
    expect(getSigfigsForMulOrDiv(['1.23', '4.5'])).toBe(2);
    expect(getSigfigsForMulOrDiv(['1.0', '2.00'])).toBe(2); // min(2, 3) = 2
  });
});
