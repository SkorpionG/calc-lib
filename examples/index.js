// Main Examples Index - Showcasing all calc-lib capabilities
import {
  // Sigfig
  sigfigOf,
  toSigfig,
  // Arithmetic
  add,
  mul,
  pow,
  sqrt,
  max,
  // Conversions
  bin,
  hex,
  toBase,
  // Formatting
  toScientific,
  // Measurement
  uncertainty,
  createMeasurement,
  // Statistics
  mean,
  descriptiveStats,
  linearRegression,
  // Geometry
  toRadians,
  circleArea,
  distance2D,
  Vector,
  // Computer Science
  toAscii,
  bitwiseAnd,
  hashCode,
  toBase64,
  // Logic Gates
  and,
  or,
  halfAdder,
  mux,
  // Constants
  constants,
  getConstant,
  listConstants,
} from '../dist/index.js';

console.log('=== CALC-LIB - Complete Toolkit Showcase ===\n');
console.log('A comprehensive toolkit for Science, Technology, Engineering, and Mathematics\n');

// 1. Precise Arithmetic with Significant Figures
console.log('🔢 1. PRECISE ARITHMETIC');
console.log(`Significant figures in 123.45: ${sigfigOf(123.45)}`);
console.log(`toSigfig(3.14159, 3) = ${toSigfig(3.14159, 3)} (format to 3 sig figs)`);
console.log(`add(1.23, 4.5) = ${add(1.23, 4.5)} (preserves decimal places)`);
console.log(`mul('2.0', 3.14159) = ${mul('2.0', 3.14159)} (preserves sig figs)`);
console.log(`pow(2, 3) = ${pow(2, 3)}, sqrt(16) = ${sqrt(16)}`);
console.log(`max([1.2, 3.4, 2.1]) = ${max([1.2, 3.4, 2.1])}`);
console.log();

// 2. Number Base Conversions
console.log('🔄 2. NUMBER BASE CONVERSIONS');
console.log(`bin(42) = ${bin(42)}, hex(255) = ${hex(255)}`);
console.log(`toBase(35, 36) = ${toBase(35, 36)} (base-36)`);
console.log();

// 3. Scientific Formatting & Measurement
console.log('🔬 3. SCIENTIFIC FORMATTING & MEASUREMENT');
console.log(`toScientific(0.00123) = ${toScientific(0.00123)}`);
console.log(`uncertainty(9.81, 0.02) = ${uncertainty(9.81, 0.02)}`);
const meas = createMeasurement(9.80665, 0.00001);
console.log(
  `createMeasurement(9.80665, 0.00001) → value=${meas.value}, uncertainty=${meas.uncertainty}`,
);
console.log();

// 4. Statistical Analysis
console.log('📊 4. STATISTICAL ANALYSIS');
const data = [1.2, 2.3, 3.1, 4.5, 2.8];
console.log(`Dataset: [${data.join(', ')}]`);
console.log(`Mean: ${mean(data)}`);
const ds = descriptiveStats(data);
console.log(`Descriptive stats: min=${ds.min}, max=${ds.max}, median=${ds.median}`);

const x = [1, 2, 3, 4, 5];
const y = [2.1, 3.9, 6.2, 7.8, 10.1];
const regression = linearRegression(x, y);
console.log(
  `Linear regression: y = ${regression.slope}x + ${regression.intercept} (r² = ${regression.rSquared})`,
);
console.log();

// 5. Geometry & Trigonometry
console.log('📐 5. GEOMETRY & TRIGONOMETRY');
console.log(`toRadians(90°) = ${toRadians(90)} rad`);
console.log(`circleArea(r=5) = ${circleArea(5)}`);
console.log(`distance2D(0,0 to 3,4) = ${distance2D(0, 0, 3, 4)}`);

const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2]);
console.log(`Vector [3,4] magnitude: ${v1.magnitude()}`);
console.log(`Vector dot product: ${v1.dot(v2)}`);
console.log();

// 6. Computer Science Utilities
console.log('💻 6. COMPUTER SCIENCE UTILITIES');
console.log(`toAscii("Hi") = [${toAscii('Hi').join(', ')}]`);
console.log(`bitwiseAnd(5, 3) = ${bitwiseAnd(5, 3)} (101 & 011 = 001)`);
console.log(`hashCode("calc-lib") = ${hashCode('calc-lib')}`);
console.log(`toBase64("Hello") = ${toBase64('Hello')}`);
console.log();

// 7. Logic Gates & Digital Circuits
console.log('⚡ 7. LOGIC GATES & DIGITAL CIRCUITS');
console.log(`and([1, 1, 0]) = ${and([1, 1, 0])}`);
console.log(`or([0, 1, 0]) = ${or([0, 1, 0])}`);
console.log(`halfAdder(1, 1) = ${JSON.stringify(halfAdder(1, 1))}`);
console.log(`mux([0, 1, 0, 1], [1, 0]) = ${mux([0, 1, 0, 1], [1, 0])} (select input 2)`);
console.log();

// 8. Mathematical & Physical Constants
console.log('🌌 8. MATHEMATICAL & PHYSICAL CONSTANTS');
console.log(`π (PI) = ${constants.PI}`);
console.log(`e (Euler's number) = ${constants.E}`);
console.log(`Speed of light = ${constants.SPEED_OF_LIGHT} m/s`);
console.log(`Avogadro's number = ${getConstant('AVOGADRO')}`);
console.log(
  `Total constants available: ${listConstants().length} (run constants-examples.js for all)`,
);
console.log();

// Practical Example: Engineering Calculation
console.log('🔧 PRACTICAL EXAMPLE: Engineering Calculation');
console.log('Calculating the area of a circular pipe and converting units:');

const pipeRadius = 0.05; // 5 cm in meters
const area = circleArea(pipeRadius);
const areaInCm2 = area * 10000; // Convert m² to cm²

console.log(`Pipe radius: ${pipeRadius} m`);
console.log(`Cross-sectional area: ${area} m²`);
console.log(`Cross-sectional area: ${areaInCm2} cm²`);
console.log(`Area in scientific notation: ${toScientific(area)} m²`);

// Flow rate calculation with uncertainty
const velocity = 2.5; // m/s
const velocityError = 0.1;
const flowRate = area * velocity;
const flowRateError = flowRate * Math.sqrt((0.01 / area) ** 2 + (velocityError / velocity) ** 2);

console.log(`Flow velocity: ${uncertainty(velocity, velocityError)} m/s`);
console.log(`Flow rate: ${uncertainty(flowRate, flowRateError)} m³/s`);
console.log();

// Digital System Example
console.log('💾 PRACTICAL EXAMPLE: Digital System Design');
console.log('Designing a 2-bit binary counter with logic gates:');

function binaryCounter(count) {
  const bit0 = count & 1;
  const bit1 = (count >> 1) & 1;
  return [bit0, bit1];
}

for (let i = 0; i < 4; i++) {
  const bits = binaryCounter(i);
  console.log(`Count ${i}: [${bits.join(', ')}] (binary: ${bin(i)})`);
}
console.log();

// Data Analysis Example
console.log('📈 PRACTICAL EXAMPLE: Scientific Data Analysis');
console.log('Temperature measurements over time:');

const timeHours = [0, 2, 4, 6, 8, 10];
const tempCelsius = [15.2, 18.1, 21.5, 24.8, 27.2, 25.9];

console.log(`Time (hours): [${timeHours.join(', ')}]`);
console.log(`Temperature (°C): [${tempCelsius.join(', ')}]`);

const tempStats = {
  mean: mean(tempCelsius),
  max: max(tempCelsius),
  min: Math.min(...tempCelsius),
};

console.log(`Mean temperature: ${tempStats.mean}°C`);
console.log(`Temperature range: ${tempStats.min}°C to ${tempStats.max}°C`);

// Convert to Fahrenheit and show in scientific notation
const tempFahrenheit = tempCelsius.map((c) => (c * 9) / 5 + 32);
console.log(`Mean temperature in Fahrenheit: ${toScientific(mean(tempFahrenheit))}°F`);
console.log();

console.log('🎯 SUMMARY');
console.log('calc-lib provides comprehensive tools for:');
console.log('• Precise arithmetic with significant figure handling');
console.log('• Statistical analysis and data processing');
console.log('• Geometric calculations and vector mathematics');
console.log('• Computer science utilities and data encoding');
console.log('• Digital circuit design and logic operations');
console.log('• Scientific formatting and measurement uncertainty');
console.log('• Mathematical and physical constants');
console.log();

console.log('Perfect for students, engineers, scientists, and developers!');
console.log('=== End of calc-lib showcase ===\n');
