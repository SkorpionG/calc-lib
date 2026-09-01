// Mathematical & Physical Constants Examples
// Demonstrates constants, getConstant, and listConstants from the constants module
import { constants, getConstant, listConstants, toScientific, toSigfig } from '../dist/index.js';

console.log('=== Mathematical & Physical Constants Examples ===\n');

// ─── 1. Mathematical Constants ───────────────────────────────────────────────

console.log('1. Mathematical Constants:');
console.log(`  PI (π)           = ${constants.PI}`); // 3.141592653589793
console.log(`  E (Euler's e)    = ${constants.E}`); // 2.718281828459045
console.log(`  GOLDEN_RATIO (φ) = ${constants.GOLDEN_RATIO}`); // 1.618033988749895
console.log(`  SQRT2 (√2)       = ${constants.SQRT2}`); // 1.4142135623730951
console.log(`  SQRT3 (√3)       = ${constants.SQRT3}`); // 1.7320508075688772
console.log(`  LN2              = ${constants.LN2}`); // 0.6931471805599453
console.log(`  LN10             = ${constants.LN10}`); // 2.302585092994046
console.log(`  LOG10E           = ${constants.LOG10E}`); // 0.4342944819032518
console.log(`  LOG2E            = ${constants.LOG2E}`); // 1.4426950408889634
console.log();

// ─── 2. Physical Constants ───────────────────────────────────────────────────

console.log('2. Physical Constants:');
console.log(`  SPEED_OF_LIGHT     = ${constants.SPEED_OF_LIGHT} m/s`); // 299792458
console.log(`  PLANCK             = ${toScientific(constants.PLANCK)} J·s`); // 6.626e-34
console.log(`  BOLTZMANN          = ${toScientific(constants.BOLTZMANN)} J/K`); // 1.381e-23
console.log(`  AVOGADRO           = ${toScientific(constants.AVOGADRO)} mol⁻¹`); // 6.022e+23
console.log(`  ELEMENTARY_CHARGE  = ${toScientific(constants.ELEMENTARY_CHARGE)} C`); // 1.602e-19
console.log(`  GRAVITATIONAL      = ${toScientific(constants.GRAVITATIONAL)} m³·kg⁻¹·s⁻²`); // 6.674e-11
console.log(`  GRAVITY            = ${constants.GRAVITY} m/s²`); // 9.80665
console.log(`  GAS_CONSTANT       = ${constants.GAS_CONSTANT} J·mol⁻¹·K⁻¹`); // 8.314
console.log(`  FARADAY            = ${constants.FARADAY} C/mol`); // 96485
console.log(`  STEFAN_BOLTZMANN   = ${toScientific(constants.STEFAN_BOLTZMANN)} W·m⁻²·K⁻⁴`); // 5.670e-8
console.log(`  FINE_STRUCTURE     = ${constants.FINE_STRUCTURE}`); // 7.297e-3
console.log();

// ─── 3. Particle & Atomic Constants ─────────────────────────────────────────

console.log('3. Particle & Atomic Constants:');
console.log(`  ELECTRON_MASS    = ${toScientific(constants.ELECTRON_MASS)} kg`); // 9.109e-31
console.log(`  PROTON_MASS      = ${toScientific(constants.PROTON_MASS)} kg`); // 1.673e-27
console.log(`  NEUTRON_MASS     = ${toScientific(constants.NEUTRON_MASS)} kg`); // 1.675e-27
console.log(`  ATOMIC_MASS_UNIT = ${toScientific(constants.ATOMIC_MASS_UNIT)} kg`); // 1.661e-27
console.log(`  BOHR_RADIUS      = ${toScientific(constants.BOHR_RADIUS)} m`); // 5.292e-11
console.log(`  RYDBERG          = ${toScientific(constants.RYDBERG)} m⁻¹`); // 1.097e+7
console.log();

// ─── 4. Unit Conversion Constants ────────────────────────────────────────────

console.log('4. Unit Conversion Constants:');
console.log(`  ELECTRON_VOLT      = ${toScientific(constants.ELECTRON_VOLT)} J`); // 1.602e-19
console.log(`  CALORIE            = ${constants.CALORIE} J`); // 4.184
console.log(`  ATMOSPHERE         = ${constants.ATMOSPHERE} Pa`); // 101325
console.log(`  CELSIUS_TO_KELVIN  = ${constants.CELSIUS_TO_KELVIN}`); // 273.15
console.log(`  MOLAR_VOLUME_STP   = ${constants.MOLAR_VOLUME_STP} m³/mol`); // 0.02241
console.log();

// ─── 5. Using getConstant ────────────────────────────────────────────────────

console.log('5. Accessing Constants by Name with getConstant:');
console.log(`  getConstant('PI')           = ${getConstant('PI')}`);
console.log(`  getConstant('E')            = ${getConstant('E')}`);
console.log(`  getConstant('AVOGADRO')     = ${toScientific(getConstant('AVOGADRO'))}`);
console.log(`  getConstant('SPEED_OF_LIGHT') = ${getConstant('SPEED_OF_LIGHT')}`);
console.log(`  getConstant('PLANCK')       = ${toScientific(getConstant('PLANCK'))}`);
console.log();

// ─── 6. Listing All Available Constants ─────────────────────────────────────

console.log('6. Listing All Available Constants with listConstants:');
const names = listConstants();
console.log(`  Total constants available: ${names.length}`);
console.log(`  Names: ${names.join(', ')}`);
console.log();

// ─── 7. Practical Calculation Examples ──────────────────────────────────────

console.log('7. Practical Calculations Using Constants:');

// Kinetic energy: E = ½mv²
const mass = 1.5; // kg
const velocity = 10.0; // m/s
const kineticEnergy = 0.5 * mass * velocity ** 2;
console.log('Kinetic Energy (E = ½mv²):');
console.log(`  Mass: ${mass} kg, Velocity: ${velocity} m/s`);
console.log(`  E = ${kineticEnergy} J = ${toSigfig(kineticEnergy, 3)} J`);
console.log();

// Photon energy: E = hf
const frequency = 6.0e14; // Hz (visible light ~600 nm)
const photonEnergy = constants.PLANCK * frequency;
console.log('Photon Energy (E = hf), visible light at 6×10¹⁴ Hz:');
console.log(`  h = ${toScientific(constants.PLANCK)} J·s`);
console.log(`  f = ${toScientific(frequency)} Hz`);
console.log(`  E = ${toScientific(photonEnergy)} J`);
console.log();

// Ideal Gas Law: PV = nRT → V = nRT/P
const n = 1.0; // 1 mole
const T = 273.15 + 25; // 25°C in Kelvin
const P = constants.ATMOSPHERE; // 1 atm in Pa
const V = (n * constants.GAS_CONSTANT * T) / P;
console.log('Ideal Gas Law (V = nRT/P) — volume of 1 mol of gas at 25°C and 1 atm:');
console.log(`  n = ${n} mol, T = ${T} K, P = ${P} Pa`);
console.log(`  R = ${constants.GAS_CONSTANT} J·mol⁻¹·K⁻¹`);
console.log(`  V = ${toSigfig(V, 4)} m³ = ${toSigfig(V * 1000, 4)} L`);
console.log();

// de Broglie wavelength: λ = h / (mv)
const electronMass = constants.ELECTRON_MASS;
const electronVelocity = 1e6; // 1 × 10⁶ m/s
const wavelength = constants.PLANCK / (electronMass * electronVelocity);
console.log('de Broglie Wavelength of an Electron (λ = h/mv):');
console.log(`  mₑ = ${toScientific(electronMass)} kg`);
console.log(`  v  = ${toScientific(electronVelocity)} m/s`);
console.log(`  λ  = ${toScientific(wavelength)} m`);
console.log();

// Temperature conversion using CELSIUS_TO_KELVIN
console.log('Temperature Conversions (°C ↔ K):');
const temperatures = [0, 25, 100, -40];
temperatures.forEach((t) => {
  const kelvin = t + constants.CELSIUS_TO_KELVIN;
  console.log(`  ${t}°C = ${kelvin} K`);
});
console.log();

console.log('=== All constants examples completed! ===\n');
