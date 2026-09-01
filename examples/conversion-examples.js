// Number Base Conversion Examples
import { bin, hex, oct, toBase } from '../dist/index.js';

console.log('=== Number Base Conversion Examples ===\n');

// Binary conversion (similar to Python's bin() function)
console.log('1. Binary Conversion:');
console.log(`bin(10) = ${bin(10)}`); // 0b1010
console.log(`bin(-5) = ${bin(-5)}`); // -0b101
console.log(`bin(255) = ${bin(255)}`); // 0b11111111
console.log(`bin(3.14) = ${bin(3.14)}`); // 0b11 (integer part only)
console.log(`bin("42") = ${bin('42')}`); // 0b101010
console.log(`bin(0) = ${bin(0)}`); // 0b0
console.log();

// Hexadecimal conversion (similar to Python's hex() function)
console.log('2. Hexadecimal Conversion:');
console.log(`hex(255) = ${hex(255)}`); // 0xff
console.log(`hex(-10) = ${hex(-10)}`); // -0xa
console.log(`hex(4095) = ${hex(4095)}`); // 0xfff
console.log(`hex(3.14) = ${hex(3.14)}`); // 0x3 (integer part only)
console.log(`hex("42") = ${hex('42')}`); // 0x2a
console.log(`hex(0) = ${hex(0)}`); // 0x0
console.log();

// Octal conversion (similar to Python's oct() function)
console.log('3. Octal Conversion:');
console.log(`oct(8) = ${oct(8)}`); // 0o10
console.log(`oct(64) = ${oct(64)}`); // 0o100
console.log(`oct(-7) = ${oct(-7)}`); // -0o7
console.log(`oct(255) = ${oct(255)}`); // 0o377
console.log(`oct(0) = ${oct(0)}`); // 0o0
console.log();

// Custom base conversion (base 2-36)
console.log('4. Custom Base Conversion:');
console.log(`toBase(255, 2) = ${toBase(255, 2)}`); // 11111111 (binary without prefix)
console.log(`toBase(255, 8) = ${toBase(255, 8)}`); // 377 (octal without prefix)
console.log(`toBase(255, 16) = ${toBase(255, 16)}`); // ff (hex without prefix)
console.log(`toBase(35, 36) = ${toBase(35, 36)}`); // z (base-36)
console.log(`toBase(1000, 10) = ${toBase(1000, 10)}`); // 1000 (decimal)
console.log(`toBase(100, 5) = ${toBase(100, 5)}`); // 400 (base-5)
console.log();

// Practical examples
console.log('5. Practical Examples:');
console.log('Converting RGB color values:');
console.log(`Red (255): bin=${bin(255)}, hex=${hex(255)}, oct=${oct(255)}`);
console.log(`Green (128): bin=${bin(128)}, hex=${hex(128)}, oct=${oct(128)}`);
console.log(`Blue (64): bin=${bin(64)}, hex=${hex(64)}, oct=${oct(64)}`);
console.log();

console.log('Converting file permissions (Unix):');
console.log(`644 (rw-r--r--): bin=${bin(644)}, hex=${hex(644)}, oct=${oct(644)}`);
console.log(`755 (rwxr-xr-x): bin=${bin(755)}, hex=${hex(755)}, oct=${oct(755)}`);
console.log();

console.log('Converting network addresses:');
console.log(`192: bin=${bin(192)}, hex=${hex(192)}`);
console.log(`168: bin=${bin(168)}, hex=${hex(168)}`);
console.log(`1: bin=${bin(1)}, hex=${hex(1)}`);
console.log();

console.log('=== All conversion examples completed! ===\n');
