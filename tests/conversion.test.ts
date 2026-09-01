/**
 * Tests for number conversion utilities
 */

import { bin, hex, oct, toBase } from '../src/conversion.js';

describe('bin', () => {
  test('converts positive integers to binary', () => {
    expect(bin(0)).toBe('0b0');
    expect(bin(1)).toBe('0b1');
    expect(bin(2)).toBe('0b10');
    expect(bin(5)).toBe('0b101');
    expect(bin(10)).toBe('0b1010');
    expect(bin(255)).toBe('0b11111111');
  });

  test('converts negative integers to binary', () => {
    expect(bin(-1)).toBe('-0b1');
    expect(bin(-5)).toBe('-0b101');
    expect(bin(-10)).toBe('-0b1010');
    expect(bin(-255)).toBe('-0b11111111');
  });

  test('converts floating point numbers to binary (integer part only)', () => {
    expect(bin(3.14)).toBe('0b11');
    expect(bin(5.99)).toBe('0b101');
    expect(bin(-3.14)).toBe('-0b11');
    expect(bin(0.5)).toBe('0b0');
    expect(bin(0.99)).toBe('0b0');
  });

  test('handles string inputs', () => {
    expect(bin('10')).toBe('0b1010');
    expect(bin('-5')).toBe('-0b101');
    expect(bin('3.14')).toBe('0b11');
    expect(bin('0')).toBe('0b0');
  });

  test('throws error for invalid inputs', () => {
    expect(() => bin('invalid')).toThrow('Invalid input: value must be a valid number');
    expect(() => bin('')).toThrow('Invalid input: value must be a valid number');
    expect(() => bin('abc')).toThrow('Invalid input: value must be a valid number');
  });

  test('handles large numbers', () => {
    expect(bin(1024)).toBe('0b10000000000');
    expect(bin(65535)).toBe('0b1111111111111111');
  });

  test('throws error for Infinity inputs', () => {
    expect(() => bin(Infinity)).toThrow();
    expect(() => bin(-Infinity)).toThrow();
  });
});

describe('hex', () => {
  test('converts positive integers to hexadecimal', () => {
    expect(hex(0)).toBe('0x0');
    expect(hex(1)).toBe('0x1');
    expect(hex(10)).toBe('0xa');
    expect(hex(15)).toBe('0xf');
    expect(hex(16)).toBe('0x10');
    expect(hex(255)).toBe('0xff');
    expect(hex(256)).toBe('0x100');
  });

  test('converts negative integers to hexadecimal', () => {
    expect(hex(-1)).toBe('-0x1');
    expect(hex(-10)).toBe('-0xa');
    expect(hex(-15)).toBe('-0xf');
    expect(hex(-255)).toBe('-0xff');
  });

  test('converts floating point numbers to hexadecimal (integer part only)', () => {
    expect(hex(3.14)).toBe('0x3');
    expect(hex(15.99)).toBe('0xf');
    expect(hex(-10.5)).toBe('-0xa');
    expect(hex(0.5)).toBe('0x0');
    expect(hex(0.99)).toBe('0x0');
  });

  test('handles string inputs', () => {
    expect(hex('255')).toBe('0xff');
    expect(hex('-10')).toBe('-0xa');
    expect(hex('3.14')).toBe('0x3');
    expect(hex('0')).toBe('0x0');
  });

  test('throws error for invalid inputs', () => {
    expect(() => hex('invalid')).toThrow('Invalid input: value must be a valid number');
    expect(() => hex('')).toThrow('Invalid input: value must be a valid number');
    expect(() => hex('xyz')).toThrow('Invalid input: value must be a valid number');
  });

  test('handles large numbers', () => {
    expect(hex(4095)).toBe('0xfff');
    expect(hex(65535)).toBe('0xffff');
    expect(hex(1048575)).toBe('0xfffff');
  });

  test('converts numbers matching Python hex() output', () => {
    expect(hex(42)).toBe('0x2a');
    expect(hex(255)).toBe('0xff');
    expect(hex(4096)).toBe('0x1000');
  });

  test('throws error for Infinity inputs', () => {
    expect(() => hex(Infinity)).toThrow();
    expect(() => hex(-Infinity)).toThrow();
  });
});

describe('oct', () => {
  test('converts positive integers to octal', () => {
    expect(oct(0)).toBe('0o0');
    expect(oct(1)).toBe('0o1');
    expect(oct(7)).toBe('0o7');
    expect(oct(8)).toBe('0o10');
    expect(oct(64)).toBe('0o100');
    expect(oct(255)).toBe('0o377');
  });

  test('converts negative integers to octal', () => {
    expect(oct(-1)).toBe('-0o1');
    expect(oct(-8)).toBe('-0o10');
    expect(oct(-64)).toBe('-0o100');
  });

  test('converts floating point numbers to octal (integer part only)', () => {
    expect(oct(8.7)).toBe('0o10');
    expect(oct(-7.9)).toBe('-0o7');
    expect(oct(0.9)).toBe('0o0');
  });

  test('handles string inputs', () => {
    expect(oct('8')).toBe('0o10');
    expect(oct('-7')).toBe('-0o7');
    expect(oct('0')).toBe('0o0');
  });

  test('throws error for invalid inputs', () => {
    expect(() => oct('invalid')).toThrow('Invalid input: value must be a valid number');
  });

  test('throws error for Infinity inputs', () => {
    expect(() => oct(Infinity)).toThrow();
    expect(() => oct(-Infinity)).toThrow();
  });
});

describe('toBase', () => {
  test('converts to binary (base 2)', () => {
    expect(toBase(255, 2)).toBe('11111111');
    expect(toBase(10, 2)).toBe('1010');
  });

  test('converts to octal (base 8)', () => {
    expect(toBase(64, 8)).toBe('100');
    expect(toBase(255, 8)).toBe('377');
  });

  test('converts to hexadecimal (base 16)', () => {
    expect(toBase(255, 16)).toBe('ff');
    expect(toBase(4096, 16)).toBe('1000');
  });

  test('converts to base 36', () => {
    expect(toBase(35, 36)).toBe('z');
    expect(toBase(1295, 36)).toBe('zz');
  });

  test('handles negative numbers', () => {
    expect(toBase(-10, 2)).toBe('-1010');
    expect(toBase(-255, 16)).toBe('-ff');
  });

  test('handles floating point numbers (integer part only)', () => {
    expect(toBase(10.7, 2)).toBe('1010');
    expect(toBase(-8.9, 8)).toBe('-10');
  });

  test('throws error for invalid base', () => {
    expect(() => toBase(10, 1)).toThrow('Base must be an integer between 2 and 36');
    expect(() => toBase(10, 37)).toThrow('Base must be an integer between 2 and 36');
    expect(() => toBase(10, 2.5)).toThrow('Base must be an integer between 2 and 36');
  });

  test('handles zero input', () => {
    expect(toBase(0, 2)).toBe('0');
    expect(toBase(0, 16)).toBe('0');
  });

  test('throws error for invalid inputs', () => {
    expect(() => toBase('invalid', 10)).toThrow('Invalid input: value must be a valid number');
  });

  test('throws error for Infinity inputs', () => {
    expect(() => toBase(Infinity, 2)).toThrow();
    expect(() => toBase(-Infinity, 16)).toThrow();
  });
});
