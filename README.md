# Calc Lib

A TypeScript/JavaScript package that provides a comprehensive toolkit for common STEM applications - precise math, engineering, computer science, and scientific computing.

## Features

- **Significant Figure Counting**: Accurately count significant figures in numbers, strings, and scientific notation
- **Precise Arithmetic**: Perform addition, subtraction, multiplication, and division while preserving significant figures according to scientific standards
- **Number Base Conversions**: Convert numbers to binary, hexadecimal, octal, and any base (2-36)
- **Scientific Formatting**: Format numbers in scientific notation, engineering notation, and more
- **Statistical Functions**: Calculate mean, standard deviation, median, and perform linear regression
- **Geometry & Trigonometry**: Angle conversions, circle/sphere calculations, distance functions
- **Vector Mathematics**: Comprehensive Vector class with all essential vector operations
- **Scientific Measurements**: Handle measurements with uncertainty and error propagation
- **Mathematical Constants**: Access to 37+ physical and mathematical constants
- **Flexible Input**: Accept both numbers and strings as input
- **TypeScript Support**: Full TypeScript support with type definitions
- **Scientific Standards**: Follows established scientific rules for significant figures

## Installation

```bash
npm install calc-lib
```

## Usage

### ES Modules

```javascript
import {
  sigfigOf,
  add,
  sub,
  mul,
  div,
  bin,
  hex,
  oct,
  toBase,
  toRadians,
  toDegrees,
  circleArea,
  Vector,
  linearRegression,
  constants,
} from 'calc-lib';

// Or import everything
import CalcLib from 'calc-lib';
```

### Basic Examples

```javascript
import { sigfigOf, add, mul, bin, hex, Vector, toRadians } from 'calc-lib';

// Count significant figures
console.log(sigfigOf(123.45)); // 5
console.log(sigfigOf('0.00123')); // 3
console.log(sigfigOf('1.23e-4')); // 3

// Arithmetic with significant figures
console.log(add(1.23, 4.5)); // 5.7 (limited by 4.5's 1 decimal place)
console.log(mul(1.23, 4.5)); // 5.5 (limited by 4.5's 2 sig figs)

// Number conversions
console.log(bin(10)); // "0b1010"
console.log(hex(255)); // "0xff"

// Geometry
console.log(toRadians(90, 5)); // 1.5708 (π/2, 5 sig figs)
console.log(circleArea(5, 4)); // 78.54 (25π, 4 sig figs)

// Vector mathematics
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2]);
console.log(v1.magnitude()); // 5
console.log(v1.add(v2)); // [4, 6]
console.log(v1.dot(v2)); // 11
```

## API Reference

### `sigfigOf(value: number | string): number`

Counts the number of significant figures in a number.

**Rules Applied:**

- All non-zero digits are significant
- Zeros between non-zero digits are significant
- Leading zeros are not significant
- Trailing zeros in decimal numbers are significant
- Trailing zeros in whole numbers (without decimal point) are not significant
- All digits in scientific notation coefficients are significant

```javascript
sigfigOf(123); // 3
sigfigOf('1.230'); // 4 (trailing zero after decimal is significant)
sigfigOf(0.00123); // 3 (leading zeros not significant)
sigfigOf('1.23e-4'); // 3
```

### `add(a: number | string, b: number | string, toSigfigParam?: number): number`

Adds two numbers while preserving significant figures.

For addition and subtraction, the result has the same number of decimal places as the least precise operand.

```javascript
add(1.23, 4.5); // 5.7 (1 decimal place from 4.5)
add(1.23, 4.5, 4); // 5.730 (custom: 4 significant figures)
```

### `sub(a: number | string, b: number | string, toSigfigParam?: number): number`

Subtracts two numbers while preserving significant figures.

```javascript
sub(10.5, 2.34); // 8.2 (2 decimal places from 2.34)
sub(100, 23.4); // 77 (0 decimal places from 100)
```

### `mul(a: number | string, b: number | string, toSigfigParam?: number): number`

Multiplies two numbers while preserving significant figures.

For multiplication and division, the result has the same number of significant figures as the least precise operand.

```javascript
mul(1.23, 4.5); // 5.5 (2 sig figs from 4.5)
mul('2.0', 3.14159); // 6.3 (2 sig figs from '2.0')
```

### `div(a: number | string, b: number | string, toSigfigParam?: number): number`

Divides two numbers while preserving significant figures.

```javascript
div('10.0', '3.0'); // 3.3 (2 sig figs from minimum)
div(22.0, 7.0, 4); // 3.143 (custom: 4 significant figures)
```

### `mod(a: number | string, b: number | string, toSigfigParam?: number): number`

Computes the remainder of `a` divided by `b` (modulo operation).

```javascript
mod(10, 3); // 1
mod(17.5, 5.2); // 1.9
mod(100, 7, 3); // 2 (custom: 3 significant figures)
```

### `idiv(a: number | string, b: number | string, toSigfigParam?: number): number`

Performs integer (floor) division — equivalent to Python's `//` operator.

```javascript
idiv(10, 3); // 3
idiv(-10, 3); // -4 (floor division)
idiv(22.0, 7.0, 2); // 3 (custom: 2 significant figures)
```

### `pow(base: number | string, exponent: number | string, toSigfigParam?: number): number`

Raises `base` to the power of `exponent`.

```javascript
pow(2, 10); // 1024
pow(4, 0.5); // 2 (square root)
pow(2.5, 2, 2); // 6.3 (custom: 2 significant figures)
```

### `sqrt(value: number | string, toSigfigParam?: number): number`

Calculates the square root.

```javascript
sqrt(9); // 3
sqrt(2); // 1.4142135623730951
sqrt(2, 2); // 1.4 (custom: 2 significant figures)
```

### `abs(value: number | string, toSigfigParam?: number): number`

Returns the absolute value.

```javascript
abs(-5); // 5
abs(-3.14159, 3); // 3.14 (custom: 3 significant figures)
```

### `max(values: (number | string)[], toSigfigParam?: number): number`

Returns the maximum value in an array.

```javascript
max([1, 5, 3]); // 5
max([1.2, 3.4, 2.1]); // 3.4
max([5.0, 3.14], 2); // 5 (custom: 2 significant figures)
```

### `min(values: (number | string)[], toSigfigParam?: number): number`

Returns the minimum value in an array.

```javascript
min([1, 5, 3]); // 1
min([1.2, 3.4, 2.1]); // 1.2
min([5.0, 3.14], 3); // 3.14 (custom: 3 significant figures)
```

### `bin(value: number | string): string`

Converts a number to its binary representation (similar to Python's `bin()` function).

**Behavior:**

- Returns binary representation with '0b' prefix
- Handles negative numbers with '-0b' prefix
- For floating point numbers, only converts the integer part
- Accepts both numbers and strings as input

```javascript
bin(10); // "0b1010"
bin(-5); // "-0b101"
bin(0); // "0b0"
bin(255); // "0b11111111"
bin(3.14); // "0b11" (integer part: 3)
bin('42'); // "0b101010"
```

### `hex(value: number | string): string`

Converts a number to its hexadecimal representation (similar to Python's `hex()` function).

**Behavior:**

- Returns hexadecimal representation with '0x' prefix
- Uses lowercase letters (a-f) like Python
- Handles negative numbers with '-0x' prefix
- For floating point numbers, only converts the integer part
- Accepts both numbers and strings as input

```javascript
hex(255); // "0xff"
hex(-10); // "-0xa"
hex(0); // "0x0"
hex(4095); // "0xfff"
hex(3.14); // "0x3" (integer part: 3)
hex('42'); // "0x2a"
```

### Number Base Conversions

#### `oct(value: number | string): string`

Converts a number to its octal representation (similar to Python's `oct()` function).

```javascript
oct(8); // "0o10"
oct(64); // "0o100"
oct(-7); // "-0o7"
```

#### `toBase(value: number | string, base: number): string`

Converts a number to any base (2-36).

```javascript
toBase(255, 2); // "11111111" (binary)
toBase(255, 8); // "377" (octal)
toBase(255, 16); // "ff" (hexadecimal)
toBase(35, 36); // "z" (base-36)
```

### Scientific Formatting

#### `toScientific(value: number | string, sigfigs?: number): string`

Formats a number in scientific notation.

```javascript
toScientific(1234); // "1.234e+3"
toScientific(0.00123); // "1.23e-3"
toScientific(1234, 2); // "1.2e+3"
```

#### `toEngineering(value: number | string, sigfigs?: number): string`

Formats a number in engineering notation (powers of 3).

```javascript
toEngineering(12345); // "12.345e+3"
toEngineering(0.00123); // "1.23e-3"
```

#### `round(value: number | string, sigfigs: number): number`

Rounds a number to specified significant figures.

```javascript
round(123.456, 3); // 123
round(0.001234, 2); // 0.0012
```

#### `truncate(value: number | string, sigfigs: number): number`

Truncates a number to specified significant figures (no rounding).

```javascript
truncate(123.999, 3); // 123 (vs round: 124)
truncate(1999, 2); // 1900
```

#### `percentage(part: number | string, whole: number | string, sigfigs?: number): number`

Calculates percentage with proper significant figure handling.

```javascript
percentage(25, 100); // 25
percentage(1, 3, 3); // 33.3 (3 sig figs)
percentage(1, 3, 2); // 33 (2 sig figs)
```

### Geometry & Trigonometry

#### `toRadians(degrees: number | string, sigfigs?: number): number`

Converts degrees to radians.

```javascript
toRadians(90); // 1.5707963267948966 (π/2)
toRadians(90, 5); // 1.5708 (5 sig figs)
toRadians(180, 5); // 3.1416 (5 sig figs)
toRadians(45, 4); // 0.7854 (4 sig figs)
```

#### `toDegrees(radians: number | string, sigfigs?: number): number`

Converts radians to degrees.

```javascript
toDegrees(Math.PI); // 180
toDegrees(Math.PI / 2); // 90
toDegrees(Math.PI / 4); // 45
```

#### `circleArea(radius: number | string, sigfigs?: number): number`

Calculates the area of a circle (πr²).

```javascript
circleArea(5); // 78.53981633974483
circleArea(5, 4); // 78.54 (4 sig figs)
circleArea(2.5, 3); // 19.6 (3 sig figs)
```

#### `circleCircumference(radius: number | string, sigfigs?: number): number`

Calculates the circumference of a circle (2πr).

```javascript
circleCircumference(5); // 31.41592653589793
circleCircumference(5, 4); // 31.42 (4 sig figs)
circleCircumference(2.5, 3); // 15.7 (3 sig figs)
```

#### `sphereArea(radius: number | string, sigfigs?: number): number`

Calculates the surface area of a sphere (4πr²).

```javascript
sphereArea(5); // 314.1592653589793
sphereArea(5, 4); // 314.2 (4 sig figs)
sphereArea(2.5, 3); // 78.5 (3 sig figs)
```

#### `sphereVolume(radius: number | string, sigfigs?: number): number`

Calculates the volume of a sphere (4/3πr³).

```javascript
sphereVolume(5); // 523.5987755982989
sphereVolume(5, 4); // 523.6 (4 sig figs)
sphereVolume(2.5, 3); // 65.4 (3 sig figs)
```

#### `distance2D(x1, y1, x2, y2, sigfigs?: number): number`

Calculates the distance between two points in 2D space.

```javascript
distance2D(0, 0, 3, 4); // 5 (3-4-5 triangle)
distance2D(1, 1, 4, 5); // 5
distance2D(0, 0, 1, 1, 3); // 1.41 (3 sig figs)
```

#### `distance3D(x1, y1, z1, x2, y2, z2, sigfigs?: number): number`

Calculates the distance between two points in 3D space.

```javascript
distance3D(0, 0, 0, 1, 1, 1); // 1.7320508075688772 (√3)
distance3D(0, 0, 0, 1, 1, 1, 4); // 1.732 (4 sig figs)
distance3D(1, 2, 3, 4, 5, 6, 4); // 5.196 (4 sig figs)
```

### Vector Mathematics

#### `Vector` Class

A comprehensive Vector class for mathematical vector operations.

```javascript
import { Vector } from 'calc-lib';

// Create vectors
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2]);
const v3d = new Vector([1, 0, 0]);

// Basic properties
v1.dimension; // 2
v1.components; // [3, 4]
v1.get(0); // 3
v1.set(1, 5); // new Vector([3, 5])

// Vector operations
v1.magnitude(); // 5
v1.normalize(); // [0.6, 0.8]
v1.add(v2); // [4, 6]
v1.subtract(v2); // [2, 2]
v1.scale(2); // [6, 8]

// Advanced operations
v1.dot(v2); // 11 (scalar product)
v3d.cross(new Vector([0, 1, 0])); // [0, 0, 1] (3D only)
v1.angleTo(v2); // angle in radians
v1.projectOnto(v2); // projection vector

// Vector relationships
v1.isParallel(v2); // false
v1.isPerpendicular(v2); // false
v1.equals(v2); // false

// Static methods
Vector.zero(3); // [0, 0, 0]
Vector.unitVector(3, 0); // [1, 0, 0]
Vector.fromPoints(v1, v2); // vector from v1 to v2

// Utility methods
v1.clone(); // copy of vector
v1.toArray(); // [3, 4]
v1.toString(); // "[3, 4]"
```

### Statistical Functions

#### `mean(values: (number | string)[], sigfigs?: number): number`

Calculates the arithmetic mean with proper significant figure handling.

```javascript
mean([1, 2, 3, 4, 5]); // 3
mean([1.2, 2.3, 3.4]); // 2.3
mean([1.23, 4.5, 7.89], 3); // 4.54
```

#### `standardDeviation(values: (number | string)[], sigfigs?: number, population?: boolean): number`

Calculates standard deviation (sample by default, population if specified).

```javascript
standardDeviation([1, 2, 3, 4, 5]); // 1.5811388300841898 (sample)
standardDeviation([1, 2, 3, 4, 5], 3); // 1.58 (sample, 3 sig figs)
standardDeviation([1, 2, 3, 4, 5], 3, true); // 1.41 (population, 3 sig figs)
```

#### `median(values: (number | string)[], sigfigs?: number): number`

Calculates the median value.

```javascript
median([1, 2, 3, 4, 5]); // 3
median([1, 2, 3, 4]); // 2.5
```

#### `descriptiveStats(values: (number | string)[], sigfigs?: number): object`

Calculates all basic descriptive statistics in a single call.

```javascript
const stats = descriptiveStats([1, 2, 3, 4, 5]);
// { mean: 3, median: 3, stdDev: 1.58, min: 1, max: 5, count: 5 }

const stats2 = descriptiveStats([1.23, 4.5, 7.89], 2);
// { mean: 4.5, median: 4.5, stdDev: 3.3, min: 1.23, max: 7.89, count: 3 }
```

#### `linearRegression(xValues, yValues, sigfigs?: number): LinearRegressionResult`

Performs linear regression to find the best-fit line y = mx + b.

```javascript
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 6, 8, 10];
const result = linearRegression(x, y);
// { slope: 2, intercept: 0, correlation: 1, rSquared: 1 }

// Make predictions
const predictions = predictLinear([6, 7, 8], result);
// [12, 14, 16] for y = 2x + 0
```

### Scientific Measurements

#### `uncertainty(value: number | string, error: number | string, sigfigs?: number): string`

Creates a formatted string representation of a measurement with uncertainty.
The number of significant figures in the result is automatically determined from the uncertainty magnitude.

```javascript
uncertainty(9.81, 0.02); // "9.81 ± 0.02"
uncertainty(123.456, 0.1); // "123.5 ± 0.1"
uncertainty(1000, 50, 2); // "1.0e+3 ± 5e+1"
uncertainty(9.81, 0, 3); // "9.81" (zero uncertainty)
uncertainty(-9.81, 0.02); // "-9.81 ± 0.02"
```

#### `createMeasurement(value: number | string, error: number | string, sigfigs?: number): Measurement`

Creates a `Measurement` object (plain data) with value, uncertainty, and optional significant figures.

```javascript
const m = createMeasurement(9.81, 0.02);
m.value; // 9.81
m.uncertainty; // 0.02
m.sigfigs; // undefined

const m2 = createMeasurement(123.456, 0.1, 4);
m2.sigfigs; // 4
```

### Computer Science Utilities

#### ASCII & Binary Conversions

```javascript
toAscii('Hello'); // [72, 101, 108, 108, 111]
fromAscii([72, 101, 108, 108, 111]); // 'Hello'

toBinary('A'); // '01000001'
fromBinary('01000001'); // 'A'

toHex('Hello'); // '48656c6c6f'
fromHex('48656c6c6f'); // 'Hello'
```

#### Bitwise Operations

```javascript
bitwiseAnd(5, 3); // 1   (0b101 & 0b011 = 0b001)
bitwiseOr(5, 3); // 7   (0b101 | 0b011 = 0b111)
bitwiseXor(5, 3); // 6   (0b101 ^ 0b011 = 0b110)
bitwiseNot(5); // -6  (~5 in 32-bit two's complement)
leftShift(5, 1); // 10  (0b101 << 1 = 0b1010)
rightShift(10, 1); // 5   (0b1010 >> 1 = 0b101)
```

#### Bit Counting & Powers of Two

```javascript
popCount(7); // 3  (0b111 has three 1s)
popCount(255); // 8  (0b11111111)
isPowerOfTwo(16); // true
isPowerOfTwo(10); // false
nextPowerOfTwo(10); // 16
nextPowerOfTwo(16); // 16 (already power of 2)
```

#### Hashing & Base64

```javascript
hashCode('hello'); // 99162322
hashCode(''); // 0

toBase64('Hello'); // 'SGVsbG8='
toBase64('A'); // 'QQ=='
fromBase64('SGVsbG8='); // 'Hello'
fromBase64('QQ=='); // 'A'
```

### Logic Gates & Digital Circuits

#### Basic Gates

```javascript
and([1, 1]); // 1
and([1, 0]); // 0
or([0, 1]); // 1
or([0, 0]); // 0
not(1); // 0
not(0); // 1
nand([1, 1]); // 0  (NOT AND)
nor([0, 0]); // 1  (NOT OR)
xor([1, 0]); // 1  (exclusive OR)
xnor([1, 1]); // 1  (NOT XOR)
buffer(1); // 1  (pass-through)
```

#### Arithmetic Circuits

```javascript
halfAdder(1, 1); // { sum: 0, carry: 1 }
fullAdder(1, 1, 1); // { sum: 1, carry: 1 }
```

#### Data Routing

```javascript
// 4-to-1 MUX: select from 4 inputs using 2 select lines
mux([0, 1, 0, 1], [1, 0]); // 1 (selects input at index 1)

// DEMUX: route 1 input to 4 outputs based on 2 select lines
demux(1, [0, 1]); // [0, 0, 1, 0] (routes to output 2)
```

#### Encoding & Decoding

```javascript
// 2-to-4 Decoder (binary in → one-hot out)
decoder([1, 0]); // [0, 1, 0, 0] (binary 01 → output 1)
decoder([1, 1], 0); // [0, 0, 0, 0] (disabled)

// 4-to-2 Encoder (one-hot in → binary out)
encoder([0, 1, 0, 0]); // [1, 0] (input 1 → binary 01)

// Priority Encoder (highest-index active input wins)
priorityEncoder([1, 0, 1, 0]); // { output: [0, 1], valid: 1 }
priorityEncoder([0, 0, 0, 0]); // { output: [0, 0], valid: 0 }
```

#### Truth Table Generation

```javascript
const andTable = truthTable(2, (inputs) => and(inputs));
// [
//   { inputs: [0, 0], output: 0 },
//   { inputs: [1, 0], output: 0 },
//   { inputs: [0, 1], output: 0 },
//   { inputs: [1, 1], output: 1 }
// ]
```

### Mathematical Constants

Access to 37+ physical and mathematical constants:

```javascript
import { constants, getConstant } from 'calc-lib';

// Mathematical constants
constants.PI; // 3.141592653589793
constants.E; // 2.718281828459045
constants.GOLDEN_RATIO; // 1.618033988749895

// Physical constants
constants.GRAVITY; // 9.80665 (m/s²)
constants.SPEED_OF_LIGHT; // 299792458 (m/s)
constants.AVOGADRO; // 6.02214076e23
constants.PLANCK; // 6.62607015e-34
constants.BOLTZMANN; // 1.380649e-23

// Access by name
getConstant('PI'); // 3.141592653589793
getConstant('GRAVITY'); // 9.80665
listConstants(); // Array of all constant names
```

## Scientific Rules for Significant Figures

### Counting Significant Figures

1. **Non-zero digits** are always significant: `123` has 3 sig figs
2. **Zeros between non-zero digits** are significant: `101` has 3 sig figs
3. **Leading zeros** are not significant: `0.00123` has 3 sig figs
4. **Trailing zeros in decimals** are significant: `1.230` has 4 sig figs
5. **Trailing zeros in whole numbers** are ambiguous (treated as not significant): `1000` has 1 sig fig
6. **Scientific notation**: All digits in coefficient are significant: `1.23e4` has 3 sig figs

### Operations Rules

**Addition & Subtraction**: The result should have the same number of decimal places as the operand with the fewest decimal places.

```javascript
  12.1    (1 decimal place)
+  1.45   (2 decimal places)
-------
  13.6    (result: 1 decimal place)
```

**Multiplication & Division**: The result should have the same number of significant figures as the operand with the fewest significant figures.

```javascript
  2.1  ×  3.456  =  7.3
  (2 sig figs)  (4 sig figs)  (2 sig figs)
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint the code
npm run lint

# Type-check without emitting
npm run typecheck

# Watch TypeScript compilation
npm run dev
```

## License

MIT
