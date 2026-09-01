// Significant Figures Examples
// Demonstrates sigfigOf and toSigfig — the core precision utilities
import { sigfigOf, toSigfig, add, sub, mul, div } from '../dist/index.js';

console.log('=== Significant Figures Examples ===\n');

// ─── 1. Counting Significant Figures ────────────────────────────────────────

console.log('1. Counting Significant Figures with sigfigOf:');
console.log('Non-zero digits:');
console.log(`  sigfigOf(123.45) = ${sigfigOf(123.45)}`); // 5
console.log(`  sigfigOf(7) = ${sigfigOf(7)}`); // 1
console.log();

console.log('Zeros between non-zero digits (always significant):');
console.log(`  sigfigOf(1002) = ${sigfigOf(1002)}`); // 4
console.log(`  sigfigOf(10.07) = ${sigfigOf(10.07)}`); // 4
console.log();

console.log('Leading zeros (never significant):');
console.log(`  sigfigOf('0.0025') = ${sigfigOf('0.0025')}`); // 2
console.log(`  sigfigOf('0.00123') = ${sigfigOf('0.00123')}`); // 3
console.log();

console.log('Trailing zeros after a decimal point (always significant):');
console.log(`  sigfigOf('2.00') = ${sigfigOf('2.00')}`); // 3 — string input preserves the zeros
console.log(`  sigfigOf('1.230') = ${sigfigOf('1.230')}`); // 4
console.log(`  sigfigOf('10.0') = ${sigfigOf('10.0')}`); // 3
console.log();

console.log('Trailing zeros in whole numbers (ambiguous — treated as non-significant):');
console.log(`  sigfigOf(100) = ${sigfigOf(100)}`); // 1
console.log(`  sigfigOf(1000) = ${sigfigOf(1000)}`); // 1
console.log(`  sigfigOf('100.') = ${sigfigOf('100.')}`); // 3 — trailing decimal makes them significant
console.log();

console.log('Scientific notation (all coefficient digits are significant):');
console.log(`  sigfigOf('1.20e3') = ${sigfigOf('1.20e3')}`); // 3
console.log(`  sigfigOf('1.23e-4') = ${sigfigOf('1.23e-4')}`); // 3
console.log(`  sigfigOf('6.022e23') = ${sigfigOf('6.022e23')}`); // 4
console.log();

// ─── 2. Why String Inputs Matter ────────────────────────────────────────────

console.log('2. Why String Inputs Preserve Precision:');
console.log('JavaScript strips trailing zeros from numeric literals at runtime:');
console.log(`  typeof 2.0 === 'number', value = ${2.0}`); // 2 — trailing zero lost
console.log(`  sigfigOf(2.0) = ${sigfigOf(2.0)}`); // 1 — only 1 sig fig seen
console.log(`  sigfigOf('2.0') = ${sigfigOf('2.0')}`); // 2 — string preserves precision
console.log();
console.log('This matters for multiplication/division:');
console.log(`  mul('2.0', 3.14159) = ${mul('2.0', 3.14159)} (2 sig figs from '2.0')`);
console.log(`  mul(2.0, 3.14159)   = ${mul(2.0, 3.14159)}  (1 sig fig — 2.0 is just 2 at runtime)`);
console.log();

// ─── 3. Formatting to Significant Figures ───────────────────────────────────

console.log('3. Formatting Numbers with toSigfig:');
console.log('Fixed-range values (10⁻² to 10⁶) → fixed decimal notation:');
console.log(`  toSigfig(3.14159, 3) = ${toSigfig(3.14159, 3)}`); // 3.14
console.log(`  toSigfig(123.456, 4) = ${toSigfig(123.456, 4)}`); // 123.5
console.log(`  toSigfig(0.004567, 2) = ${toSigfig(0.004567, 2)}`); // 0.0046
console.log(`  toSigfig(1234.5, 2) = ${toSigfig(1234.5, 2)}`); // 1200
console.log(`  toSigfig(999.9, 3) = ${toSigfig(999.9, 3)}`); // 1000
console.log();

console.log('Out-of-range values (≥10⁶ or <10⁻²) → scientific notation:');
console.log(`  toSigfig(1234567, 4) = ${toSigfig(1234567, 4)}`); // 1.235e+6
console.log(`  toSigfig(6.02214076e23, 4) = ${toSigfig(6.02214076e23, 4)}`); // 6.022e+23
console.log(`  toSigfig(0.000001234, 3) = ${toSigfig(0.000001234, 3)}`); // 1.23e-6
console.log(`  toSigfig(6.62607015e-34, 3) = ${toSigfig(6.62607015e-34, 3)}`); // 6.63e-34
console.log();

console.log('Special cases:');
console.log(`  toSigfig(0, 3) = ${toSigfig(0, 3)}`); // 0
console.log(`  toSigfig(-42.567, 3) = ${toSigfig(-42.567, 3)}`); // -42.6
console.log(`  toSigfig(1.0, 4) = ${toSigfig(1.0, 4)}`); // 1
console.log();

// ─── 4. Precision Rules in Addition/Subtraction ──────────────────────────────

console.log('4. Precision Rules — Addition & Subtraction:');
console.log('Result is limited to the least precise decimal place of any operand:');
console.log(`  add(1.234, 2.56)  = ${add(1.234, 2.56)}`); // 3.79 (2 decimal places from 2.56)
console.log(`  add(123, 4.567)   = ${add(123, 4.567)}`); // 128 (0 decimal places from 123)
console.log(`  sub(10.5, 2.34)   = ${sub(10.5, 2.34)}`); // 8.2 (1 decimal place from 10.5)
console.log(`  sub(500, 23.4)    = ${sub(500, 23.4)}`); // 477 (0 decimal places from 500)
console.log();

// ─── 5. Precision Rules in Multiplication/Division ───────────────────────────

console.log('5. Precision Rules — Multiplication & Division:');
console.log('Result is limited to the minimum significant figures of any operand:');
console.log(`  mul(2.34, 5.6)    = ${mul(2.34, 5.6)}`); // 13 (2 sig figs from 5.6)
console.log(`  mul('2.0', 3.14159) = ${mul('2.0', 3.14159)}`); // 6.3 (2 sig figs from '2.0')
console.log(`  div('10.0', '3.0')  = ${div('10.0', '3.0')}`); // 3.3 (2 sig figs from minimum)
console.log(`  div(15.6, 2.1)    = ${div(15.6, 2.1)}`); // 7.4 (2 sig figs from 2.1)
console.log();

// ─── 6. Practical Science Examples ──────────────────────────────────────────

console.log('6. Practical Science: Reporting Measurements Correctly');
console.log('Lab instrument readings with appropriate significant figures:');

const measured = [3.14, 2.7, 9.81, 6.022e23];
const labels = ['π approximation', 'speed constant', 'gravity (m/s²)', 'Avogadro'];
measured.forEach((v, i) => {
  console.log(`  ${labels[i]}: ${v} → 3 sig figs: ${toSigfig(v, 3)}`);
});
console.log();

console.log('Converting a chain of calculations to proper precision:');
const radius = 5.2; // 2 sig figs
const pi = 3.14159265; // many sig figs
const area = pi * radius * radius;
const radiusSigfigs = sigfigOf(radius);
console.log(`  Radius: ${radius} m (${radiusSigfigs} sig figs)`);
console.log(`  π: ${pi}`);
console.log(`  Area = π × r² = ${area}`);
console.log(`  Area rounded to ${radiusSigfigs} sig figs: ${toSigfig(area, radiusSigfigs)} m²`);
console.log();

console.log('=== All significant figures examples completed! ===\n');
