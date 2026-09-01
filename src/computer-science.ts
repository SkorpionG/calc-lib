/**
 * Computer Science utilities and functions
 */

import { parseNumberInput } from './number-input.js';

/**
 * Converts a string to ASCII codes
 *
 * @param text - String to convert to ASCII codes
 * @returns Array of ASCII code numbers
 *
 * @example
 * ```typescript
 * toAscii("Hello")     // [72, 101, 108, 108, 111]
 * toAscii("ABC")       // [65, 66, 67]
 * toAscii("123")       // [49, 50, 51]
 * ```
 */
export function toAscii(text: string): number[] {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  return Array.from(text).map((char) => char.charCodeAt(0));
}

/**
 * Converts ASCII codes back to a string
 *
 * @param codes - Array of ASCII code numbers
 * @returns String representation
 *
 * @example
 * ```typescript
 * fromAscii([72, 101, 108, 108, 111])  // "Hello"
 * fromAscii([65, 66, 67])              // "ABC"
 * fromAscii([49, 50, 51])              // "123"
 * ```
 */
export function fromAscii(codes: number[]): string {
  if (!Array.isArray(codes)) {
    throw new Error('Input must be an array of numbers');
  }

  return codes
    .map((code) => {
      if (!Number.isInteger(code) || code < 0 || code > 127) {
        throw new Error(`Invalid ASCII code: ${code}. Must be integer between 0-127`);
      }
      return String.fromCharCode(code);
    })
    .join('');
}

/**
 * Converts a string to its binary representation (8-bit per character)
 *
 * @param text - String to convert to binary
 * @returns Binary string representation
 *
 * @example
 * ```typescript
 * toBinary("Hi")       // "0100100001101001"
 * toBinary("A")        // "01000001"
 * toBinary("123")      // "001100010011001000110011"
 * ```
 */
export function toBinary(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

/**
 * Converts binary string back to text
 *
 * @param binary - Binary string (must be multiple of 8 bits)
 * @returns String representation
 *
 * @example
 * ```typescript
 * fromBinary("0100100001101001")          // "Hi"
 * fromBinary("01000001")                  // "A"
 * fromBinary("001100010011001000110011")  // "123"
 * ```
 */
export function fromBinary(binary: string): string {
  if (typeof binary !== 'string') {
    throw new Error('Input must be a string');
  }

  if (binary.length === 0) {
    return '';
  }

  if (binary.length % 8 !== 0) {
    throw new Error('Binary string length must be multiple of 8');
  }

  if (!/^[01]+$/.test(binary)) {
    throw new Error('Binary string must contain only 0s and 1s');
  }

  const result = [];
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    const charCode = parseInt(byte, 2);
    result.push(String.fromCharCode(charCode));
  }

  return result.join('');
}

/**
 * Converts a string to hexadecimal representation
 *
 * @param text - String to convert to hex
 * @returns Hexadecimal string representation
 *
 * @example
 * ```typescript
 * toHex("Hi")          // "4869"
 * toHex("ABC")         // "414243"
 * toHex("Hello")       // "48656c6c6f"
 * ```
 */
export function toHex(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts hexadecimal string back to text
 *
 * @param hex - Hexadecimal string (must be even length)
 * @returns String representation
 *
 * @example
 * ```typescript
 * fromHex("4869")      // "Hi"
 * fromHex("414243")    // "ABC"
 * fromHex("48656c6c6f") // "Hello"
 * ```
 */
export function fromHex(hex: string): string {
  if (typeof hex !== 'string') {
    throw new Error('Input must be a string');
  }

  if (hex.length === 0) {
    return '';
  }

  if (hex.length % 2 !== 0) {
    throw new Error('Hexadecimal string length must be even');
  }

  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error('Hexadecimal string must contain only 0-9 and a-f characters');
  }

  const result = [];
  for (let i = 0; i < hex.length; i += 2) {
    const byte = hex.slice(i, i + 2);
    const charCode = parseInt(byte, 16);
    result.push(String.fromCharCode(charCode));
  }

  return result.join('');
}

/**
 * Performs bitwise AND operation on two numbers
 *
 * @param a - First number
 * @param b - Second number
 * @returns Result of a & b
 *
 * @example
 * ```typescript
 * bitwiseAnd(5, 3)     // 1 (101 & 011 = 001)
 * bitwiseAnd(12, 10)   // 8 (1100 & 1010 = 1000)
 * ```
 */
export function bitwiseAnd(a: number | string, b: number | string): number {
  const numA = Math.floor(parseNumberInput(a));
  const numB = Math.floor(parseNumberInput(b));

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Both inputs must be valid numbers');
  }

  return numA & numB;
}

/**
 * Performs bitwise OR operation on two numbers
 *
 * @param a - First number
 * @param b - Second number
 * @returns Result of a | b
 *
 * @example
 * ```typescript
 * bitwiseOr(5, 3)      // 7 (101 | 011 = 111)
 * bitwiseOr(12, 10)    // 14 (1100 | 1010 = 1110)
 * ```
 */
export function bitwiseOr(a: number | string, b: number | string): number {
  const numA = Math.floor(parseNumberInput(a));
  const numB = Math.floor(parseNumberInput(b));

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Both inputs must be valid numbers');
  }

  return numA | numB;
}

/**
 * Performs bitwise XOR operation on two numbers
 *
 * @param a - First number
 * @param b - Second number
 * @returns Result of a ^ b
 *
 * @example
 * ```typescript
 * bitwiseXor(5, 3)     // 6 (101 ^ 011 = 110)
 * bitwiseXor(12, 10)   // 6 (1100 ^ 1010 = 0110)
 * ```
 */
export function bitwiseXor(a: number | string, b: number | string): number {
  const numA = Math.floor(parseNumberInput(a));
  const numB = Math.floor(parseNumberInput(b));

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error('Both inputs must be valid numbers');
  }

  return numA ^ numB;
}

/**
 * Performs bitwise NOT operation on a number
 *
 * @param value - Number to invert
 * @returns Result of ~value
 *
 * @example
 * ```typescript
 * bitwiseNot(5)        // -6 (~101 in 32-bit)
 * bitwiseNot(0)        // -1
 * ```
 */
export function bitwiseNot(value: number | string): number {
  const num = Math.floor(parseNumberInput(value));

  if (isNaN(num)) {
    throw new Error('Input must be a valid number');
  }

  return ~num;
}

/**
 * Performs left bit shift operation
 *
 * @param value - Number to shift
 * @param positions - Number of positions to shift left
 * @returns Result of value << positions
 *
 * @example
 * ```typescript
 * leftShift(5, 1)      // 10 (101 << 1 = 1010)
 * leftShift(3, 2)      // 12 (11 << 2 = 1100)
 * ```
 */
export function leftShift(value: number | string, positions: number | string): number {
  const num = Math.floor(parseNumberInput(value));
  const pos = Math.floor(parseNumberInput(positions));

  if (isNaN(num) || isNaN(pos)) {
    throw new Error('Both inputs must be valid numbers');
  }

  if (pos < 0) {
    throw new Error('Shift positions must be non-negative');
  }

  return num << pos;
}

/**
 * Performs right bit shift operation
 *
 * @param value - Number to shift
 * @param positions - Number of positions to shift right
 * @returns Result of value >> positions
 *
 * @example
 * ```typescript
 * rightShift(10, 1)    // 5 (1010 >> 1 = 101)
 * rightShift(12, 2)    // 3 (1100 >> 2 = 11)
 * ```
 */
export function rightShift(value: number | string, positions: number | string): number {
  const num = Math.floor(parseNumberInput(value));
  const pos = Math.floor(parseNumberInput(positions));

  if (isNaN(num) || isNaN(pos)) {
    throw new Error('Both inputs must be valid numbers');
  }

  if (pos < 0) {
    throw new Error('Shift positions must be non-negative');
  }

  return num >> pos;
}

/**
 * Counts the number of set bits (1s) in a number's binary representation
 *
 * @param value - Number to count bits in
 * @returns Number of set bits
 *
 * @example
 * ```typescript
 * popCount(7)          // 3 (111 has three 1s)
 * popCount(15)         // 4 (1111 has four 1s)
 * popCount(8)          // 1 (1000 has one 1)
 * ```
 */
export function popCount(value: number | string): number {
  const num = Math.floor(Math.abs(parseNumberInput(value)));

  if (isNaN(num)) {
    throw new Error('Input must be a valid number');
  }

  let count = 0;
  let n = num;
  while (n > 0) {
    count += n % 2;
    n = Math.floor(n / 2);
  }

  return count;
}

/**
 * Checks if a number is a power of 2
 *
 * @param value - Number to check
 * @returns True if the number is a power of 2
 *
 * @example
 * ```typescript
 * isPowerOfTwo(8)      // true (2^3)
 * isPowerOfTwo(16)     // true (2^4)
 * isPowerOfTwo(10)     // false
 * isPowerOfTwo(1)      // true (2^0)
 * ```
 */
export function isPowerOfTwo(value: number | string): boolean {
  const num = Math.floor(parseNumberInput(value));

  if (isNaN(num)) {
    throw new Error('Input must be a valid number');
  }

  if (num <= 0) {
    return false;
  }

  const integer = BigInt(num);
  return (integer & (integer - 1n)) === 0n;
}

/**
 * Finds the next power of 2 greater than or equal to the given number
 *
 * @param value - Number to find next power of 2 for
 * @returns Next power of 2
 *
 * @example
 * ```typescript
 * nextPowerOfTwo(10)   // 16
 * nextPowerOfTwo(16)   // 16
 * nextPowerOfTwo(17)   // 32
 * nextPowerOfTwo(1)    // 1
 * ```
 */
export function nextPowerOfTwo(value: number | string): number {
  const num = Math.floor(parseNumberInput(value));

  if (isNaN(num)) {
    throw new Error('Input must be a valid number');
  }

  if (num <= 0) {
    return 1;
  }

  if (isPowerOfTwo(num)) {
    return num;
  }

  return Math.pow(2, Math.ceil(Math.log2(num)));
}

/**
 * Calculates the hash code of a string (simple hash function)
 *
 * @param text - String to hash
 * @returns Hash code as number
 *
 * @example
 * ```typescript
 * hashCode("hello")    // 99162322
 * hashCode("world")    // 113318802
 * hashCode("")         // 0
 * ```
 */
export function hashCode(text: string): number {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return hash;
}

/**
 * Encodes a string to Base64
 *
 * @param text - String to encode
 * @returns Base64 encoded string
 *
 * @example
 * ```typescript
 * toBase64("Hello")    // "SGVsbG8="
 * toBase64("World")    // "V29ybGQ="
 * toBase64("123")      // "MTIz"
 * ```
 */
export function toBase64(text: string): string {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  // Use built-in btoa if available (browser), otherwise implement manually
  if (typeof btoa !== 'undefined') {
    return btoa(text);
  }

  // Manual Base64 encoding for Node.js environments
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;

  while (i < text.length) {
    const a = text.charCodeAt(i++);
    const bPresent = i < text.length;
    const b = bPresent ? text.charCodeAt(i++) : 0;
    const cPresent = i < text.length;
    const c = cPresent ? text.charCodeAt(i++) : 0;

    const bitmap = (a << 16) | (b << 8) | c;

    result += chars.charAt((bitmap >> 18) & 63);
    result += chars.charAt((bitmap >> 12) & 63);
    result += bPresent ? chars.charAt((bitmap >> 6) & 63) : '=';
    result += cPresent ? chars.charAt(bitmap & 63) : '=';
  }

  return result;
}

/**
 * Decodes a Base64 string
 *
 * @param base64 - Base64 string to decode
 * @returns Decoded string
 *
 * @example
 * ```typescript
 * fromBase64("SGVsbG8=")   // "Hello"
 * fromBase64("V29ybGQ=")   // "World"
 * fromBase64("MTIz")       // "123"
 * ```
 */
export function fromBase64(base64: string): string {
  if (typeof base64 !== 'string') {
    throw new Error('Input must be a string');
  }

  // Use built-in atob if available (browser), otherwise implement manually
  if (typeof atob !== 'undefined') {
    return atob(base64);
  }

  // Manual Base64 decoding for Node.js environments
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  // Strip only whitespace, keep = padding and valid base64 chars
  const cleaned = base64.replace(/[^A-Za-z0-9+/=]/g, '');
  let i = 0;

  while (i < cleaned.length) {
    const encoded1 = chars.indexOf(cleaned.charAt(i++));
    const encoded2 = chars.indexOf(cleaned.charAt(i++));
    const e3char = cleaned.charAt(i++);
    const e4char = cleaned.charAt(i++);
    const encoded3 = e3char === '=' ? -1 : chars.indexOf(e3char);
    const encoded4 = e4char === '=' ? -1 : chars.indexOf(e4char);

    const bitmap =
      (encoded1 << 18) |
      (encoded2 << 12) |
      ((encoded3 !== -1 ? encoded3 : 0) << 6) |
      (encoded4 !== -1 ? encoded4 : 0);

    result += String.fromCharCode((bitmap >> 16) & 255);
    if (encoded3 !== -1) result += String.fromCharCode((bitmap >> 8) & 255);
    if (encoded4 !== -1) result += String.fromCharCode(bitmap & 255);
  }

  return result;
}
