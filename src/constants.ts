/**
 * Mathematical constants with high precision
 */

/**
 * Mathematical constants object containing commonly used values
 */
export const constants = {
  /** Pi (π) - ratio of circumference to diameter of a circle */
  PI: 3.141592653589793,

  /** Euler's number (e) - base of natural logarithm */
  E: 2.718281828459045,

  /** Golden ratio (φ) - (1 + √5) / 2 */
  GOLDEN_RATIO: 1.618033988749895,

  /** Square root of 2 */
  SQRT2: 1.4142135623730951,

  /** Square root of 3 */
  SQRT3: 1.7320508075688772,

  /** Natural logarithm of 2 */
  LN2: 0.6931471805599453,

  /** Natural logarithm of 10 */
  LN10: 2.302585092994046,

  /** Base-10 logarithm of e */
  LOG10E: 0.4342944819032518,

  /** Base-2 logarithm of e */
  LOG2E: 1.4426950408889634,

  /** Avogadro's number (mol⁻¹) */
  AVOGADRO: 6.02214076e23,

  /** Speed of light in vacuum (m/s) */
  SPEED_OF_LIGHT: 299792458,

  /** Planck's constant (J⋅s) */
  PLANCK: 6.62607015e-34,

  /** Boltzmann constant (J/K) */
  BOLTZMANN: 1.380649e-23,

  /** Elementary charge (C) */
  ELEMENTARY_CHARGE: 1.602176634e-19,

  /** Gravitational constant (m³⋅kg⁻¹⋅s⁻²) */
  GRAVITATIONAL: 6.6743e-11,

  /** Standard gravity (m/s²) - acceleration due to gravity at Earth's surface */
  GRAVITY: 9.80665,

  /** Gas constant (J⋅mol⁻¹⋅K⁻¹) */
  GAS_CONSTANT: 8.314462618,

  /** Faraday constant (C/mol) - charge per mole of electrons */
  FARADAY: 96485.33212,

  /** Stefan-Boltzmann constant (W⋅m⁻²⋅K⁻⁴) */
  STEFAN_BOLTZMANN: 5.670374419e-8,

  /** Fine structure constant (dimensionless) */
  FINE_STRUCTURE: 7.2973525693e-3,

  /** Electron mass (kg) */
  ELECTRON_MASS: 9.1093837015e-31,

  /** Proton mass (kg) */
  PROTON_MASS: 1.67262192369e-27,

  /** Neutron mass (kg) */
  NEUTRON_MASS: 1.67492749804e-27,

  /** Atomic mass unit (kg) */
  ATOMIC_MASS_UNIT: 1.6605390666e-27,

  /** Bohr radius (m) */
  BOHR_RADIUS: 5.29177210903e-11,

  /** Rydberg constant (m⁻¹) */
  RYDBERG: 1.097373156816e7,

  /** Vacuum permeability (H/m) */
  VACUUM_PERMEABILITY: 1.25663706212e-6,

  /** Vacuum permittivity (F/m) */
  VACUUM_PERMITTIVITY: 8.8541878128e-12,

  /** Electron volt (J) */
  ELECTRON_VOLT: 1.602176634e-19,

  /** Calorie (J) - thermochemical calorie */
  CALORIE: 4.184,

  /** Atmosphere (Pa) - standard atmospheric pressure */
  ATMOSPHERE: 101325,

  /** Celsius to Kelvin offset */
  CELSIUS_TO_KELVIN: 273.15,

  /** Wien displacement constant (m⋅K) */
  WIEN_DISPLACEMENT: 2.897771955e-3,

  /** Molar volume of ideal gas at STP (m³/mol) */
  MOLAR_VOLUME_STP: 0.02241396954,
} as const;

/**
 * Get a mathematical constant by name
 * @param name - Name of the constant
 * @returns The constant value
 *
 * @example
 * ```typescript
 * getConstant('PI')        // 3.141592653589793
 * getConstant('E')         // 2.718281828459045
 * getConstant('AVOGADRO')  // 6.02214076e23
 * ```
 */
export function getConstant(name: keyof typeof constants): number {
  return constants[name];
}

/**
 * List all available constant names
 *
 * @returns Array of constant names
 *
 * @example
 * ```typescript
 * const names = listConstants();
 * // ['PI', 'E', 'GOLDEN_RATIO', 'SPEED_OF_LIGHT', ...]
 * ```
 */
export function listConstants(): (keyof typeof constants)[] {
  return Object.keys(constants) as (keyof typeof constants)[];
}
