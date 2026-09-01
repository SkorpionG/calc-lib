/**
 * Tests for mathematical constants
 */

import { constants, getConstant, listConstants } from '../src/constants.js';

describe('constants', () => {
  test('contains expected mathematical constants', () => {
    expect(constants.PI).toBeCloseTo(3.141592653589793, 15);
    expect(constants.E).toBeCloseTo(2.718281828459045, 15);
    expect(constants.GOLDEN_RATIO).toBeCloseTo(1.618033988749895, 15);
    expect(constants.SQRT2).toBeCloseTo(1.4142135623730951, 15);
    expect(constants.SQRT3).toBeCloseTo(1.7320508075688772, 15);
  });

  test('contains physical constants', () => {
    expect(constants.AVOGADRO).toBe(6.02214076e23);
    expect(constants.SPEED_OF_LIGHT).toBe(299792458);
    expect(constants.PLANCK).toBe(6.62607015e-34);
    expect(constants.BOLTZMANN).toBe(1.380649e-23);
    expect(constants.ELEMENTARY_CHARGE).toBe(1.602176634e-19);
    expect(constants.GRAVITATIONAL).toBe(6.6743e-11);
    expect(constants.GRAVITY).toBe(9.80665);
    expect(constants.GAS_CONSTANT).toBe(8.314462618);
    expect(constants.FARADAY).toBe(96485.33212);
  });

  test('contains particle masses', () => {
    expect(constants.ELECTRON_MASS).toBe(9.1093837015e-31);
    expect(constants.PROTON_MASS).toBe(1.67262192369e-27);
    expect(constants.NEUTRON_MASS).toBe(1.67492749804e-27);
    expect(constants.ATOMIC_MASS_UNIT).toBe(1.6605390666e-27);
  });

  test('contains unit conversion constants', () => {
    expect(constants.ELECTRON_VOLT).toBe(1.602176634e-19);
    expect(constants.CALORIE).toBe(4.184);
    expect(constants.ATMOSPHERE).toBe(101325);
    expect(constants.CELSIUS_TO_KELVIN).toBe(273.15);
  });

  test('contains logarithmic constants', () => {
    expect(constants.LN2).toBeCloseTo(0.6931471805599453, 15);
    expect(constants.LN10).toBeCloseTo(2.302585092994046, 15);
    expect(constants.LOG10E).toBeCloseTo(0.4342944819032518, 15);
    expect(constants.LOG2E).toBeCloseTo(1.4426950408889634, 15);
  });
});

describe('getConstant', () => {
  test('returns correct constant values', () => {
    expect(getConstant('PI')).toBe(constants.PI);
    expect(getConstant('E')).toBe(constants.E);
    expect(getConstant('AVOGADRO')).toBe(constants.AVOGADRO);
    expect(getConstant('SPEED_OF_LIGHT')).toBe(constants.SPEED_OF_LIGHT);
  });
});

describe('listConstants', () => {
  test('returns array of all constant names', () => {
    const constantNames = listConstants();
    expect(Array.isArray(constantNames)).toBe(true);
    expect(constantNames).toContain('PI');
    expect(constantNames).toContain('E');
    expect(constantNames).toContain('GOLDEN_RATIO');
    expect(constantNames).toContain('AVOGADRO');
    expect(constantNames).toContain('SPEED_OF_LIGHT');
    expect(constantNames.length).toBeGreaterThan(10);
  });

  test('ensures all listed constants exist in constants object', () => {
    const constantNames = listConstants();
    constantNames.forEach((name: keyof typeof constants) => {
      expect(constants[name]).toBeDefined();
      expect(typeof constants[name]).toBe('number');
    });
  });
});
