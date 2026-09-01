// Quick Start Example for calc-lib
// For comprehensive examples, see the examples/ folder

import { add, mul, bin, Vector, constants } from './dist/index.js';

console.log('=== calc-lib Quick Start ===\n');

// Basic arithmetic with significant figures
console.log('Precise arithmetic:');
console.log(`add(1.23, 4.5) = ${add(1.23, 4.5)}`); // 5.7
console.log(`mul('2.0', 3.14159) = ${mul('2.0', 3.14159)}`); // 6.3

// Number conversions
console.log(`\nNumber conversion:`);
console.log(`bin(42) = ${bin(42)}`); // 0b101010

// Vector math
console.log(`\nVector mathematics:`);
const v1 = new Vector([3, 4]);
console.log(`Vector [3,4] magnitude = ${v1.magnitude()}`); // 5

// Constants
console.log(`\nMathematical constants:`);
console.log(`π = ${constants.PI}`);

console.log('\n🎯 For comprehensive examples, run:');
console.log('   node examples/index.js           # Complete showcase');
console.log('   node examples/arithmetic-examples.js');
console.log('   node examples/geometry-examples.js');
console.log('   node examples/computer-science-examples.js');
console.log('   ... and more in the examples/ folder!\n');
