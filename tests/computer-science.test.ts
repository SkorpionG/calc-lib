/**
 * Tests for computer science utility functions
 */

import {
  toAscii,
  fromAscii,
  toBinary,
  fromBinary,
  toHex,
  fromHex,
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
  bitwiseNot,
  leftShift,
  rightShift,
  popCount,
  isPowerOfTwo,
  nextPowerOfTwo,
  hashCode,
  toBase64,
  fromBase64,
} from '../src/computer-science.js';

describe('ASCII conversions', () => {
  describe('toAscii', () => {
    test('converts string to ASCII codes', () => {
      expect(toAscii('Hello')).toEqual([72, 101, 108, 108, 111]);
      expect(toAscii('ABC')).toEqual([65, 66, 67]);
      expect(toAscii('123')).toEqual([49, 50, 51]);
      expect(toAscii('')).toEqual([]);
    });

    test('handles special characters', () => {
      expect(toAscii(' ')).toEqual([32]); // space
      expect(toAscii('!')).toEqual([33]); // exclamation
      expect(toAscii('\n')).toEqual([10]); // newline
    });

    test('throws error for non-string input', () => {
      expect(() => toAscii(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('fromAscii', () => {
    test('converts ASCII codes to string', () => {
      expect(fromAscii([72, 101, 108, 108, 111])).toBe('Hello');
      expect(fromAscii([65, 66, 67])).toBe('ABC');
      expect(fromAscii([49, 50, 51])).toBe('123');
      expect(fromAscii([])).toBe('');
    });

    test('handles special characters', () => {
      expect(fromAscii([32])).toBe(' '); // space
      expect(fromAscii([33])).toBe('!'); // exclamation
      expect(fromAscii([10])).toBe('\n'); // newline
    });

    test('throws error for invalid input', () => {
      expect(() => fromAscii('not array' as any)).toThrow('Input must be an array of numbers');
      expect(() => fromAscii([128])).toThrow('Invalid ASCII code: 128');
      expect(() => fromAscii([-1])).toThrow('Invalid ASCII code: -1');
      expect(() => fromAscii([65.5])).toThrow('Invalid ASCII code: 65.5');
    });
  });
});

describe('Binary conversions', () => {
  describe('toBinary', () => {
    test('converts string to binary', () => {
      expect(toBinary('A')).toBe('01000001');
      expect(toBinary('Hi')).toBe('0100100001101001');
      expect(toBinary('123')).toBe('001100010011001000110011');
      expect(toBinary('')).toBe('');
    });

    test('throws error for non-string input', () => {
      expect(() => toBinary(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('fromBinary', () => {
    test('converts binary to string', () => {
      expect(fromBinary('01000001')).toBe('A');
      expect(fromBinary('0100100001101001')).toBe('Hi');
      expect(fromBinary('001100010011001000110011')).toBe('123');
      expect(fromBinary('')).toBe('');
    });

    test('throws error for invalid input', () => {
      expect(() => fromBinary(123 as any)).toThrow('Input must be a string');
      expect(() => fromBinary('0100000')).toThrow('Binary string length must be multiple of 8');
      expect(() => fromBinary('0100000a')).toThrow('Binary string must contain only 0s and 1s');
    });
  });
});

describe('Hexadecimal conversions', () => {
  describe('toHex', () => {
    test('converts string to hex', () => {
      expect(toHex('A')).toBe('41');
      expect(toHex('Hi')).toBe('4869');
      expect(toHex('Hello')).toBe('48656c6c6f');
      expect(toHex('')).toBe('');
    });

    test('throws error for non-string input', () => {
      expect(() => toHex(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('fromHex', () => {
    test('converts hex to string', () => {
      expect(fromHex('41')).toBe('A');
      expect(fromHex('4869')).toBe('Hi');
      expect(fromHex('48656c6c6f')).toBe('Hello');
      expect(fromHex('')).toBe('');
    });

    test('handles uppercase hex', () => {
      expect(fromHex('41')).toBe('A');
      expect(fromHex('4A')).toBe('J');
    });

    test('throws error for invalid input', () => {
      expect(() => fromHex(123 as any)).toThrow('Input must be a string');
      expect(() => fromHex('4')).toThrow('Hexadecimal string length must be even');
      expect(() => fromHex('4g')).toThrow(
        'Hexadecimal string must contain only 0-9 and a-f characters',
      );
    });
  });
});

describe('Bitwise operations', () => {
  describe('bitwiseAnd', () => {
    test('performs AND operation', () => {
      expect(bitwiseAnd(5, 3)).toBe(1); // 101 & 011 = 001
      expect(bitwiseAnd(12, 10)).toBe(8); // 1100 & 1010 = 1000
      expect(bitwiseAnd(15, 0)).toBe(0);
    });

    test('handles string inputs', () => {
      expect(bitwiseAnd('5', '3')).toBe(1);
      expect(bitwiseAnd(5, '3')).toBe(1);
    });

    test('throws error for invalid input', () => {
      expect(() => bitwiseAnd('invalid', 3)).toThrow('Both inputs must be valid numbers');
    });
  });

  describe('bitwiseOr', () => {
    test('performs OR operation', () => {
      expect(bitwiseOr(5, 3)).toBe(7); // 101 | 011 = 111
      expect(bitwiseOr(12, 10)).toBe(14); // 1100 | 1010 = 1110
      expect(bitwiseOr(0, 0)).toBe(0);
    });

    test('handles string inputs', () => {
      expect(bitwiseOr('5', '3')).toBe(7);
    });

    test('throws error for invalid input', () => {
      expect(() => bitwiseOr('invalid', 3)).toThrow('Both inputs must be valid numbers');
      expect(() => bitwiseOr(5, 'invalid')).toThrow('Both inputs must be valid numbers');
    });
  });

  describe('bitwiseXor', () => {
    test('performs XOR operation', () => {
      expect(bitwiseXor(5, 3)).toBe(6); // 101 ^ 011 = 110
      expect(bitwiseXor(12, 10)).toBe(6); // 1100 ^ 1010 = 0110
      expect(bitwiseXor(5, 5)).toBe(0); // Same numbers = 0
    });

    test('handles string inputs', () => {
      expect(bitwiseXor('5', '3')).toBe(6);
    });

    test('throws error for invalid input', () => {
      expect(() => bitwiseXor('invalid', 3)).toThrow('Both inputs must be valid numbers');
      expect(() => bitwiseXor(5, 'invalid')).toThrow('Both inputs must be valid numbers');
    });
  });

  describe('bitwiseNot', () => {
    test('performs NOT operation', () => {
      expect(bitwiseNot(5)).toBe(-6);
      expect(bitwiseNot(0)).toBe(-1);
      expect(bitwiseNot(-1)).toBe(0);
    });

    test('handles string inputs', () => {
      expect(bitwiseNot('5')).toBe(-6);
    });

    test('throws error for invalid input', () => {
      expect(() => bitwiseNot('invalid')).toThrow('Input must be a valid number');
    });
  });
});

describe('Bit shift operations', () => {
  describe('leftShift', () => {
    test('performs left shift', () => {
      expect(leftShift(5, 1)).toBe(10); // 101 << 1 = 1010
      expect(leftShift(3, 2)).toBe(12); // 11 << 2 = 1100
      expect(leftShift(1, 3)).toBe(8); // 1 << 3 = 1000
    });

    test('handles string inputs', () => {
      expect(leftShift('5', '1')).toBe(10);
    });

    test('throws error for invalid inputs', () => {
      expect(() => leftShift('invalid', 1)).toThrow('Both inputs must be valid numbers');
      expect(() => leftShift(5, 'invalid')).toThrow('Both inputs must be valid numbers');
    });

    test('throws error for negative positions', () => {
      expect(() => leftShift(5, -1)).toThrow('Shift positions must be non-negative');
    });
  });

  describe('rightShift', () => {
    test('performs right shift', () => {
      expect(rightShift(10, 1)).toBe(5); // 1010 >> 1 = 101
      expect(rightShift(12, 2)).toBe(3); // 1100 >> 2 = 11
      expect(rightShift(8, 3)).toBe(1); // 1000 >> 3 = 1
    });

    test('handles string inputs', () => {
      expect(rightShift('10', '1')).toBe(5);
    });

    test('throws error for invalid input', () => {
      expect(() => rightShift('invalid', 1)).toThrow('Both inputs must be valid numbers');
      expect(() => rightShift(10, 'invalid')).toThrow('Both inputs must be valid numbers');
    });

    test('throws error for negative positions', () => {
      expect(() => rightShift(5, -1)).toThrow('Shift positions must be non-negative');
    });
  });
});

describe('Bit counting and power operations', () => {
  describe('popCount', () => {
    test('counts set bits', () => {
      expect(popCount(7)).toBe(3); // 111 has three 1s
      expect(popCount(15)).toBe(4); // 1111 has four 1s
      expect(popCount(8)).toBe(1); // 1000 has one 1
      expect(popCount(0)).toBe(0); // 0 has zero 1s
    });

    test('counts set bits above the signed 32-bit range', () => {
      expect(popCount(2 ** 31)).toBeCloseTo(1, 10);
      expect(popCount(2 ** 32 - 1)).toBeCloseTo(32, 10);
    });

    test('handles negative numbers', () => {
      expect(popCount(-5)).toBe(popCount(5)); // Uses absolute value
      expect(popCount(-7)).toBe(3); // 111 has three 1s (abs value)
    });

    test('handles string input', () => {
      expect(popCount('7')).toBe(3);
    });

    test('handles negative string input', () => {
      // Ensures negative string inputs are parsed with absolute value
      expect(popCount('-5')).toBe(2); // Same as popCount(5)
      expect(popCount('-7')).toBe(3); // Same as popCount(7)
    });

    test('throws error for invalid input', () => {
      expect(() => popCount('invalid')).toThrow('Input must be a valid number');
    });
  });

  describe('isPowerOfTwo', () => {
    test('identifies powers of two', () => {
      expect(isPowerOfTwo(1)).toBe(true); // 2^0
      expect(isPowerOfTwo(2)).toBe(true); // 2^1
      expect(isPowerOfTwo(4)).toBe(true); // 2^2
      expect(isPowerOfTwo(8)).toBe(true); // 2^3
      expect(isPowerOfTwo(16)).toBe(true); // 2^4
    });

    test('identifies non-powers of two', () => {
      expect(isPowerOfTwo(3)).toBe(false);
      expect(isPowerOfTwo(5)).toBe(false);
      expect(isPowerOfTwo(10)).toBe(false);
      expect(isPowerOfTwo(0)).toBe(false);
      expect(isPowerOfTwo(-4)).toBe(false);
      expect(isPowerOfTwo(2 ** 32 + 1)).toBe(false);
      expect(isPowerOfTwo(2 ** 50 + 1)).toBe(false);
    });

    test('throws error for invalid input', () => {
      expect(() => isPowerOfTwo('invalid')).toThrow('Input must be a valid number');
    });
  });

  describe('nextPowerOfTwo', () => {
    test('finds next power of two', () => {
      expect(nextPowerOfTwo(10)).toBe(16);
      expect(nextPowerOfTwo(16)).toBe(16); // Already power of 2
      expect(nextPowerOfTwo(17)).toBe(32);
      expect(nextPowerOfTwo(1)).toBe(1);
      expect(nextPowerOfTwo(0)).toBe(1);
      expect(nextPowerOfTwo(-5)).toBe(1);
    });

    test('handles string inputs', () => {
      expect(nextPowerOfTwo('10')).toBe(16);
    });

    test('throws error for invalid input', () => {
      expect(() => nextPowerOfTwo('invalid')).toThrow('Input must be a valid number');
    });
  });
});

describe('Hash and encoding functions', () => {
  describe('hashCode', () => {
    test('generates hash codes', () => {
      expect(hashCode('hello')).toBe(99162322);
      expect(hashCode('world')).toBe(113318802);
      expect(hashCode('')).toBe(0);
    });

    test('generates different hashes for different strings', () => {
      const hash1 = hashCode('test1');
      const hash2 = hashCode('test2');
      expect(hash1).not.toBe(hash2);
    });

    test('generates same hash for same string', () => {
      expect(hashCode('test')).toBe(hashCode('test'));
    });

    test('throws error for non-string input', () => {
      expect(() => hashCode(123 as any)).toThrow('Input must be a string');
    });
  });

  describe('Base64 encoding', () => {
    describe('toBase64', () => {
      test('encodes strings to Base64', () => {
        expect(toBase64('Hello')).toBe('SGVsbG8=');
        expect(toBase64('World')).toBe('V29ybGQ=');
        expect(toBase64('123')).toBe('MTIz');
        expect(toBase64('')).toBe('');
      });

      test('handles special characters', () => {
        expect(toBase64('Hello World!')).toBe('SGVsbG8gV29ybGQh');
      });

      test('encodes single-character strings (1 byte → 2 base64 chars + ==)', () => {
        expect(toBase64('A')).toBe('QQ==');
        expect(toBase64('!')).toBe('IQ==');
      });

      test('encodes two-character strings (2 bytes → 3 base64 chars + =)', () => {
        expect(toBase64('Hi')).toBe('SGk=');
        expect(toBase64('AB')).toBe('QUI=');
      });

      test('encodes three-character strings (3 bytes → 4 base64 chars, no padding)', () => {
        expect(toBase64('ABC')).toBe('QUJD');
        expect(toBase64('Man')).toBe('TWFu');
      });

      test('throws error for non-string input', () => {
        expect(() => toBase64(123 as any)).toThrow('Input must be a string');
      });
    });

    describe('fromBase64', () => {
      test('decodes Base64 to strings', () => {
        expect(fromBase64('SGVsbG8=')).toBe('Hello');
        expect(fromBase64('V29ybGQ=')).toBe('World');
        expect(fromBase64('MTIz')).toBe('123');
        expect(fromBase64('')).toBe('');
      });

      test('handles special characters', () => {
        expect(fromBase64('SGVsbG8gV29ybGQh')).toBe('Hello World!');
      });

      test('decodes single-character encoded strings (2 base64 chars + ==)', () => {
        expect(fromBase64('QQ==')).toBe('A');
        expect(fromBase64('IQ==')).toBe('!');
      });

      test('decodes two-character encoded strings (3 base64 chars + =)', () => {
        expect(fromBase64('SGk=')).toBe('Hi');
        expect(fromBase64('QUI=')).toBe('AB');
      });

      test('decodes three-character encoded strings (no padding)', () => {
        expect(fromBase64('QUJD')).toBe('ABC');
        expect(fromBase64('TWFu')).toBe('Man');
      });

      test('throws error for non-string input', () => {
        expect(() => fromBase64(123 as any)).toThrow('Input must be a string');
      });
    });

    test('round trip encoding/decoding', () => {
      const testStrings = [
        'Hello',
        'World',
        '123',
        'Special chars: !@#$%',
        'A', // 1 char — tests == padding
        'Hi', // 2 chars — tests = padding
        'Man', // 3 chars — tests no padding
        'Many', // 4 chars — tests mixed
        'Subjects', // 8 chars
      ];
      testStrings.forEach((str) => {
        expect(fromBase64(toBase64(str))).toBe(str);
      });
    });

    describe('manual Base64 fallback paths', () => {
      // Save originals
      let savedBtoa: typeof btoa;
      let savedAtob: typeof atob;

      beforeEach(() => {
        savedBtoa = globalThis.btoa;
        savedAtob = globalThis.atob;
        // Remove globals to force manual fallback
        (globalThis as any).btoa = undefined;
        (globalThis as any).atob = undefined;
      });

      afterEach(() => {
        globalThis.btoa = savedBtoa;
        globalThis.atob = savedAtob;
      });

      test('manual toBase64 encodes single-char correctly (== padding)', () => {
        expect(toBase64('A')).toBe('QQ==');
        expect(toBase64('!')).toBe('IQ==');
      });

      test('manual toBase64 encodes two-char correctly (= padding)', () => {
        expect(toBase64('Hi')).toBe('SGk=');
        expect(toBase64('AB')).toBe('QUI=');
      });

      test('manual toBase64 encodes three-char correctly (no padding)', () => {
        expect(toBase64('ABC')).toBe('QUJD');
        expect(toBase64('Man')).toBe('TWFu');
      });

      test('manual toBase64 encodes longer strings', () => {
        expect(toBase64('Hello')).toBe('SGVsbG8=');
        expect(toBase64('Hello World!')).toBe('SGVsbG8gV29ybGQh');
        expect(toBase64('')).toBe('');
      });

      test('manual fromBase64 decodes single-char (== padding)', () => {
        expect(fromBase64('QQ==')).toBe('A');
        expect(fromBase64('IQ==')).toBe('!');
      });

      test('manual fromBase64 decodes two-char (= padding)', () => {
        expect(fromBase64('SGk=')).toBe('Hi');
        expect(fromBase64('QUI=')).toBe('AB');
      });

      test('manual fromBase64 decodes three-char (no padding)', () => {
        expect(fromBase64('QUJD')).toBe('ABC');
        expect(fromBase64('TWFu')).toBe('Man');
      });

      test('manual fromBase64 decodes longer strings', () => {
        expect(fromBase64('SGVsbG8=')).toBe('Hello');
        expect(fromBase64('SGVsbG8gV29ybGQh')).toBe('Hello World!');
        expect(fromBase64('')).toBe('');
      });

      test('manual Base64 round-trip', () => {
        const testStrings = ['A', 'Hi', 'ABC', 'Hello', '123', 'Hello World!'];
        testStrings.forEach((str) => {
          expect(fromBase64(toBase64(str))).toBe(str);
        });
      });
    });
  });
});
