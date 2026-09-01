// Computer Science Utilities Examples
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
} from '../dist/index.js';

console.log('=== Computer Science Utilities Examples ===\n');

// ASCII conversions
console.log('1. ASCII Conversions:');
console.log(`toAscii("Hi") = [${toAscii('Hi').join(', ')}]`); // [72, 105]
console.log(`toAscii("Hello") = [${toAscii('Hello').join(', ')}]`); // [72, 101, 108, 108, 111]
console.log(`fromAscii([72, 105]) = "${fromAscii([72, 105])}"`); // "Hi"
console.log(`fromAscii([87, 111, 114, 108, 100]) = "${fromAscii([87, 111, 114, 108, 100])}"`); // "World"
console.log();

// Binary string conversions
console.log('2. Binary String Conversions:');
console.log(`toBinary("A") = ${toBinary('A')}`); // 01000001
console.log(`toBinary("Hi") = ${toBinary('Hi')}`); // 0100100001101001
console.log(`fromBinary("01000001") = "${fromBinary('01000001')}"`); // "A"
console.log(`fromBinary("0100100001101001") = "${fromBinary('0100100001101001')}"`); // "Hi"
console.log();

// Hexadecimal string conversions
console.log('3. Hexadecimal String Conversions:');
console.log(`toHex("A") = ${toHex('A')}`); // 41
console.log(`toHex("Hi") = ${toHex('Hi')}`); // 4869
console.log(`fromHex("41") = "${fromHex('41')}"`); // "A"
console.log(`fromHex("4869") = "${fromHex('4869')}"`); // "Hi"
console.log();

// Bitwise operations
console.log('4. Bitwise Operations:');
console.log(`bitwiseAnd(5, 3) = ${bitwiseAnd(5, 3)}`); // 1 (101 & 011 = 001)
console.log(`bitwiseOr(5, 3) = ${bitwiseOr(5, 3)}`); // 7 (101 | 011 = 111)
console.log(`bitwiseXor(5, 3) = ${bitwiseXor(5, 3)}`); // 6 (101 ^ 011 = 110)
console.log(`bitwiseNot(5) = ${bitwiseNot(5)}`); // -6 (~101 = ...11111010)
console.log(`bitwiseAnd(12, 7) = ${bitwiseAnd(12, 7)}`); // 4 (1100 & 0111 = 0100)
console.log(`bitwiseOr(12, 7) = ${bitwiseOr(12, 7)}`); // 15 (1100 | 0111 = 1111)
console.log();

// Bit shifting
console.log('5. Bit Shifting Operations:');
console.log(`leftShift(5, 1) = ${leftShift(5, 1)}`); // 10 (101 << 1 = 1010)
console.log(`leftShift(5, 2) = ${leftShift(5, 2)}`); // 20 (101 << 2 = 10100)
console.log(`rightShift(20, 1) = ${rightShift(20, 1)}`); // 10 (10100 >> 1 = 1010)
console.log(`rightShift(20, 2) = ${rightShift(20, 2)}`); // 5 (10100 >> 2 = 101)
console.log(`leftShift(1, 8) = ${leftShift(1, 8)}`); // 256 (1 << 8)
console.log();

// Bit manipulation utilities
console.log('6. Bit Manipulation Utilities:');
console.log(`popCount(7) = ${popCount(7)}`); // 3 (111 has 3 ones)
console.log(`popCount(15) = ${popCount(15)}`); // 4 (1111 has 4 ones)
console.log(`popCount(255) = ${popCount(255)}`); // 8 (11111111 has 8 ones)
console.log(`isPowerOfTwo(8) = ${isPowerOfTwo(8)}`); // true
console.log(`isPowerOfTwo(10) = ${isPowerOfTwo(10)}`); // false
console.log(`isPowerOfTwo(16) = ${isPowerOfTwo(16)}`); // true
console.log(`nextPowerOfTwo(10) = ${nextPowerOfTwo(10)}`); // 16
console.log(`nextPowerOfTwo(17) = ${nextPowerOfTwo(17)}`); // 32
console.log();

// Hash functions
console.log('7. Hash Functions:');
console.log(`hashCode("Hello") = ${hashCode('Hello')}`); // Java-style hash
console.log(`hashCode("World") = ${hashCode('World')}`); // Different hash
console.log(`hashCode("") = ${hashCode('')}`); // Empty string hash
console.log(`hashCode("A") = ${hashCode('A')}`); // Single character
console.log(`hashCode("calc-lib") = ${hashCode('calc-lib')}`); // Package name hash
console.log();

// Base64 encoding/decoding
console.log('8. Base64 Encoding/Decoding:');
console.log(`toBase64("Hello") = ${toBase64('Hello')}`); // SGVsbG8=
console.log(`toBase64("World") = ${toBase64('World')}`); // V29ybGQ=
console.log(`fromBase64("SGVsbG8=") = "${fromBase64('SGVsbG8=')}"`); // "Hello"
console.log(`fromBase64("V29ybGQ=") = "${fromBase64('V29ybGQ=')}"`); // "World"
console.log(`toBase64("calc-lib") = ${toBase64('calc-lib')}`); // Package name encoded
console.log();

// Practical examples
console.log('9. Practical Computer Science Examples:');

// File permissions (Unix-style)
console.log('File permissions (Unix-style):');
const readPerm = 4; // 100
const writePerm = 2; // 010
const execPerm = 1; // 001

console.log(`Read permission: ${readPerm} (binary: ${readPerm.toString(2).padStart(3, '0')})`);
console.log(`Write permission: ${writePerm} (binary: ${writePerm.toString(2).padStart(3, '0')})`);
console.log(`Execute permission: ${execPerm} (binary: ${execPerm.toString(2).padStart(3, '0')})`);

const rwxPerm = bitwiseOr(bitwiseOr(readPerm, writePerm), execPerm);
const rwPerm = bitwiseOr(readPerm, writePerm);
const rxPerm = bitwiseOr(readPerm, execPerm);

console.log(`rwx (7): ${rwxPerm} (binary: ${rwxPerm.toString(2).padStart(3, '0')})`);
console.log(`rw- (6): ${rwPerm} (binary: ${rwPerm.toString(2).padStart(3, '0')})`);
console.log(`r-x (5): ${rxPerm} (binary: ${rxPerm.toString(2).padStart(3, '0')})`);
console.log();

// Network subnetting
console.log('Network subnetting example:');
const ipAddress = (192 << 24) | (168 << 16) | (1 << 8) | 100; // 192.168.1.100
const subnetMask = (255 << 24) | (255 << 16) | (255 << 8) | 0; // 255.255.255.0

console.log(
  `IP Address: ${(ipAddress >>> 24) & 255}.${(ipAddress >>> 16) & 255}.${(ipAddress >>> 8) & 255}.${ipAddress & 255}`,
);
console.log(
  `Subnet Mask: ${(subnetMask >>> 24) & 255}.${(subnetMask >>> 16) & 255}.${(subnetMask >>> 8) & 255}.${subnetMask & 255}`,
);

const networkAddress = bitwiseAnd(ipAddress, subnetMask);
console.log(
  `Network: ${(networkAddress >>> 24) & 255}.${(networkAddress >>> 16) & 255}.${(networkAddress >>> 8) & 255}.${networkAddress & 255}`,
);
console.log();

// Data encoding example
console.log('Data encoding pipeline:');
const originalText = 'Hello, World!';
console.log(`Original: "${originalText}"`);

const asciiCodes = toAscii(originalText);
console.log(`ASCII codes: [${asciiCodes.join(', ')}]`);

const binaryString = toBinary(originalText);
console.log(`Binary: ${binaryString}`);

const hexString = toHex(originalText);
console.log(`Hex: ${hexString}`);

const base64String = toBase64(originalText);
console.log(`Base64: ${base64String}`);

const hashValue = hashCode(originalText);
console.log(`Hash: ${hashValue}`);
console.log();

// Bit manipulation for flags
console.log('Feature flags using bit manipulation:');
const FEATURE_A = 1; // 001
const FEATURE_B = 2; // 010
const FEATURE_C = 4; // 100

let userFlags = 0;
console.log(`Initial flags: ${userFlags} (binary: ${userFlags.toString(2).padStart(3, '0')})`);

// Enable features
userFlags = bitwiseOr(userFlags, FEATURE_A);
console.log(`Enable Feature A: ${userFlags} (binary: ${userFlags.toString(2).padStart(3, '0')})`);

userFlags = bitwiseOr(userFlags, FEATURE_C);
console.log(`Enable Feature C: ${userFlags} (binary: ${userFlags.toString(2).padStart(3, '0')})`);

// Check features
console.log(`Has Feature A: ${bitwiseAnd(userFlags, FEATURE_A) !== 0}`);
console.log(`Has Feature B: ${bitwiseAnd(userFlags, FEATURE_B) !== 0}`);
console.log(`Has Feature C: ${bitwiseAnd(userFlags, FEATURE_C) !== 0}`);
console.log();

console.log('=== All computer science examples completed! ===\n');
