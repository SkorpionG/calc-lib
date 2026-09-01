// Scientific Formatting Examples
// Note: uncertainty() and createMeasurement() are in measurement-examples.js
import { toScientific, toEngineering, round, percentage, truncate } from '../dist/index.js';

console.log('=== Scientific Formatting Examples ===\n');

// Scientific notation
console.log('1. Scientific Notation:');
console.log(`toScientific(1234) = ${toScientific(1234)}`); // 1.234e+3
console.log(`toScientific(0.00123) = ${toScientific(0.00123)}`); // 1.23e-3
console.log(`toScientific(1234, 2) = ${toScientific(1234, 2)}`); // 1.2e+3 (custom sig figs)
console.log(`toScientific(0.000001) = ${toScientific(0.000001)}`); // 1e-6
console.log(`toScientific(6.022e23) = ${toScientific(6.022e23)}`); // 6.022e+23
console.log();

// Engineering notation (powers of 3)
console.log('2. Engineering Notation:');
console.log(`toEngineering(12345) = ${toEngineering(12345)}`); // 12.345e+3
console.log(`toEngineering(0.00123) = ${toEngineering(0.00123)}`); // 1.23e-3
console.log(`toEngineering(1234567) = ${toEngineering(1234567)}`); // 1.234567e+6
console.log(`toEngineering(0.000001) = ${toEngineering(0.000001)}`); // 1e-6
console.log(`toEngineering(1500, 3) = ${toEngineering(1500, 3)}`); // 1.50e+3 (custom sig figs)
console.log();

// Rounding to significant figures
console.log('3. Rounding to Significant Figures:');
console.log(`round(123.456, 3) = ${round(123.456, 3)}`); // 123
console.log(`round(0.001234, 2) = ${round(0.001234, 2)}`); // 0.0012
console.log(`round(1999, 2) = ${round(1999, 2)}`); // 2000
console.log(`round(3.14159, 4) = ${round(3.14159, 4)}`); // 3.142
console.log(`round(0.9999, 3) = ${round(0.9999, 3)}`); // 1.00
console.log();

// Truncating (no rounding)
console.log('4. Truncating to Significant Figures:');
console.log(`truncate(123.999, 3) = ${truncate(123.999, 3)}`); // 123 (vs round: 124)
console.log(`truncate(1999, 2) = ${truncate(1999, 2)}`); // 1900 (vs round: 2000)
console.log(`truncate(3.14159, 4) = ${truncate(3.14159, 4)}`); // 3.141 (vs round: 3.142)
console.log(`truncate(0.9999, 3) = ${truncate(0.9999, 3)}`); // 0.999 (vs round: 1.00)
console.log();

// Percentage calculations
console.log('5. Percentage Calculations:');
console.log(`percentage(25, 100) = ${percentage(25, 100)}%`); // 25%
console.log(`percentage(1, 3) = ${percentage(1, 3)}%`); // 33.333333333333336% (exact)
console.log(`percentage(1, 3, 3) = ${percentage(1, 3, 3)}%`); // 33.3% (custom: 3 sig figs)
console.log(`percentage(1, 3, 2) = ${percentage(1, 3, 2)}%`); // 33% (custom: 2 sig figs)
console.log(`percentage(22, 7) = ${percentage(22, 7)}%`); // 314.2857142857143% (exact)
console.log(`percentage(22, 7, 3) = ${percentage(22, 7, 3)}%`); // 314% (custom: 3 sig figs)
console.log(`percentage(0.5, 2) = ${percentage(0.5, 2)}%`); // 25%
console.log();

// Practical examples
console.log('6. Practical Scientific Examples:');
console.log('Physical constants in different formats:');
const speedOfLight = 299792458;
const avogadro = 6.02214076e23;
const planck = 6.62607015e-34;

console.log(`Speed of light: ${speedOfLight} m/s`);
console.log(`  Scientific: ${toScientific(speedOfLight)} m/s`);
console.log(`  Engineering: ${toEngineering(speedOfLight)} m/s`);
console.log();

console.log(`Avogadro's number: ${avogadro}`);
console.log(`  Scientific: ${toScientific(avogadro)} mol⁻¹`);
console.log(`  Engineering: ${toEngineering(avogadro)} mol⁻¹`);
console.log();

console.log(`Planck constant: ${planck} J⋅s`);
console.log(`  Scientific: ${toScientific(planck)} J⋅s`);
console.log(`  Engineering: ${toEngineering(planck)} J⋅s`);
console.log();

console.log('Experimental measurements (precise rounding):');
console.log(`Gravity measurement: ${round(9.807, 4)} m/s² (rounded to 4 sig figs)`);
console.log(`Temperature reading: ${round(298.15, 4)} K (rounded to 4 sig figs)`);
console.log(`Voltage in scientific: ${toScientific(5.02, 3)} V`);
console.log();

console.log();
console.log('For uncertainty and measurement formatting, see: measurement-examples.js');
console.log();
console.log('=== All formatting examples completed! ===\n');
