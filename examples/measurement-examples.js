// Scientific Measurement with Uncertainty Examples
// Demonstrates uncertainty() and createMeasurement() from the measurement module
import { uncertainty, createMeasurement } from '../dist/index.js';

console.log('=== Scientific Measurement with Uncertainty Examples ===\n');

// ─── 1. Basic Uncertainty Formatting ────────────────────────────────────────

console.log('1. Basic Uncertainty Formatting with uncertainty():');
console.log('Format: "value ± error" — precision derived from the error magnitude');
console.log(`  uncertainty(9.81, 0.02) = ${uncertainty(9.81, 0.02)}`); // 9.81 ± 0.02
console.log(`  uncertainty(123.456, 0.1) = ${uncertainty(123.456, 0.1)}`); // 123.5 ± 0.1
console.log(`  uncertainty(1.23, 0.04) = ${uncertainty(1.23, 0.04)}`); // 1.2 ± 0.04
console.log(`  uncertainty(50.0, 0.5) = ${uncertainty(50.0, 0.5)}`); // 50 ± 0.5
console.log();

// ─── 2. Large and Small Values ──────────────────────────────────────────────

console.log('2. Large and Small Values (scientific notation output):');
console.log(`  uncertainty(1000, 50, 2) = ${uncertainty(1000, 50, 2)}`); // 1.0e+3 ± 5e+1
console.log(`  uncertainty(6.022e23, 0.001e23) = ${uncertainty(6.022e23, 0.001e23)}`);
console.log(`  uncertainty(0.00123, 0.00005) = ${uncertainty(0.00123, 0.00005)}`); // 0.00123 ± 0.00005
console.log(`  uncertainty(9.109e-31, 0.001e-31) = ${uncertainty(9.109e-31, 0.001e-31)}`);
console.log();

// ─── 3. Custom Significant Figures Override ──────────────────────────────────

console.log('3. Custom Significant Figures Override:');
console.log('Pass a third argument to control the number of sig figs in the value:');
console.log(`  uncertainty(3.14159, 0.01, 4) = ${uncertainty(3.14159, 0.01, 4)}`); // 3.142 ± 0.01
console.log(`  uncertainty(9.80665, 0.001, 5) = ${uncertainty(9.80665, 0.001, 5)}`); // 9.8067 ± 0.001
console.log(`  uncertainty(1000, 50, 3) = ${uncertainty(1000, 50, 3)}`); // 1.00e+3 ± 5e+1
console.log();

// ─── 4. Creating Measurement Objects with createMeasurement ─────────────────

console.log('4. Creating Measurement Objects with createMeasurement():');
console.log('Returns a structured { value, uncertainty, sigfigs? } object:');

const gravity = createMeasurement(9.80665, 0.00001);
console.log(`  gravity = createMeasurement(9.80665, 0.00001)`);
console.log(`    .value       = ${gravity.value}`);
console.log(`    .uncertainty = ${gravity.uncertainty}`);
console.log(`    .sigfigs     = ${gravity.sigfigs}`); // undefined (not set)
console.log();

const voltage = createMeasurement(5.02, 0.05, 3);
console.log(`  voltage = createMeasurement(5.02, 0.05, 3)`);
console.log(`    .value       = ${voltage.value}`);
console.log(`    .uncertainty = ${voltage.uncertainty}`);
console.log(`    .sigfigs     = ${voltage.sigfigs}`); // 3
console.log();

// ─── 5. Practical Lab Measurement Examples ───────────────────────────────────

console.log('5. Practical Lab Measurement Examples:');

// Physics lab measurements
const measurements = [
  { label: 'Standard gravity', value: 9.807, error: 0.003, unit: 'm/s²' },
  { label: 'Room temperature', value: 298.15, error: 0.1, unit: 'K' },
  { label: 'Supply voltage', value: 5.02, error: 0.05, unit: 'V' },
  { label: 'Sample mass', value: 0.4521, error: 0.0002, unit: 'g' },
  { label: 'Refractive index', value: 1.4985, error: 0.0003, unit: '' },
];

console.log('Physics lab readings:');
measurements.forEach(({ label, value, error, unit }) => {
  const formatted = uncertainty(value, error);
  console.log(`  ${label}: ${formatted}${unit ? ' ' + unit : ''}`);
});
console.log();

// ─── 6. Error Propagation Workflow ──────────────────────────────────────────

console.log('6. Error Propagation Workflow:');
console.log('Calculating the area of a circle from a measured radius:');

const r = 5.0;
const rError = 0.1; // ±0.1 cm
const areaValue = Math.PI * r * r;
// Error propagation: δA = 2πr·δr
const areaError = 2 * Math.PI * r * rError;

console.log(`  Radius: ${uncertainty(r, rError)} cm`);
console.log(`  Area = π × r² = ${areaValue.toFixed(4)} cm²`);
console.log(`  Area uncertainty (δA = 2πr·δr) = ${areaError.toFixed(4)} cm²`);
console.log(`  Area: ${uncertainty(areaValue, areaError)} cm²`);
console.log();

console.log('Propagating uncertainty through a velocity calculation (v = d / t):');
const distance = createMeasurement(10.0, 0.05, 3); // 10.0 ± 0.05 m
const time = createMeasurement(2.5, 0.01, 3); // 2.50 ± 0.01 s
const velocity = distance.value / time.value;
// Relative error propagation: δv/v = √((δd/d)² + (δt/t)²)
const relativeError = Math.sqrt(
  (distance.uncertainty / distance.value) ** 2 + (time.uncertainty / time.value) ** 2,
);
const velocityError = velocity * relativeError;

console.log(`  Distance: ${uncertainty(distance.value, distance.uncertainty)} m`);
console.log(`  Time:     ${uncertainty(time.value, time.uncertainty)} s`);
console.log(`  Velocity: ${uncertainty(velocity, velocityError)} m/s`);
console.log();

console.log('=== All measurement examples completed! ===\n');
