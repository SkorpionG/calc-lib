/**
 * Tests for the index.ts default export (CalcLib bundle object)
 */

import CalcLib from '../src/index.js';

describe('CalcLib default export', () => {
  test('contains significant figure utilities', () => {
    expect(typeof CalcLib.sigfigOf).toBe('function');
    expect(typeof CalcLib.toSigfig).toBe('function');
    expect(CalcLib.sigfigOf(123)).toBe(3);
    expect(CalcLib.toSigfig(123.456, 3)).toBe('123');
  });

  test('contains conversion utilities', () => {
    expect(typeof CalcLib.bin).toBe('function');
    expect(typeof CalcLib.hex).toBe('function');
    expect(typeof CalcLib.oct).toBe('function');
    expect(typeof CalcLib.toBase).toBe('function');
    expect(CalcLib.bin(10)).toBe('0b1010');
    expect(CalcLib.hex(255)).toBe('0xff');
    expect(CalcLib.oct(8)).toBe('0o10');
    expect(CalcLib.toBase(255, 16)).toBe('ff');
  });

  test('contains formatting utilities', () => {
    expect(typeof CalcLib.toScientific).toBe('function');
    expect(typeof CalcLib.toEngineering).toBe('function');
    expect(typeof CalcLib.round).toBe('function');
    expect(typeof CalcLib.percentage).toBe('function');
    expect(typeof CalcLib.truncate).toBe('function');
    expect(CalcLib.round(123.456, 3)).toBe(123);
    expect(CalcLib.percentage(25, 100)).toBe(25);
  });

  test('contains measurement utilities', () => {
    expect(typeof CalcLib.uncertainty).toBe('function');
    expect(typeof CalcLib.createMeasurement).toBe('function');
    expect(CalcLib.uncertainty(9.81, 0.02)).toBe('9.81 ± 0.02');
  });

  test('contains statistical functions', () => {
    expect(typeof CalcLib.mean).toBe('function');
    expect(typeof CalcLib.standardDeviation).toBe('function');
    expect(typeof CalcLib.median).toBe('function');
    expect(typeof CalcLib.descriptiveStats).toBe('function');
    expect(typeof CalcLib.linearRegression).toBe('function');
    expect(typeof CalcLib.predictLinear).toBe('function');
    expect(CalcLib.mean([1, 2, 3])).toBe(2);
    expect(CalcLib.median([1, 2, 3])).toBe(2);
  });

  test('contains geometry functions', () => {
    expect(typeof CalcLib.toRadians).toBe('function');
    expect(typeof CalcLib.toDegrees).toBe('function');
    expect(typeof CalcLib.circleArea).toBe('function');
    expect(typeof CalcLib.circleCircumference).toBe('function');
    expect(typeof CalcLib.sphereArea).toBe('function');
    expect(typeof CalcLib.sphereVolume).toBe('function');
    expect(typeof CalcLib.distance2D).toBe('function');
    expect(typeof CalcLib.distance3D).toBe('function');
    expect(CalcLib.distance2D(0, 0, 3, 4)).toBe(5);
  });

  test('contains Vector class', () => {
    expect(typeof CalcLib.Vector).toBe('function');
    const v = new CalcLib.Vector([3, 4]);
    expect(v.magnitude()).toBe(5);
  });

  test('contains computer science utilities', () => {
    expect(typeof CalcLib.toAscii).toBe('function');
    expect(typeof CalcLib.fromAscii).toBe('function');
    expect(typeof CalcLib.toBinary).toBe('function');
    expect(typeof CalcLib.fromBinary).toBe('function');
    expect(typeof CalcLib.toHex).toBe('function');
    expect(typeof CalcLib.fromHex).toBe('function');
    expect(typeof CalcLib.bitwiseAnd).toBe('function');
    expect(typeof CalcLib.bitwiseOr).toBe('function');
    expect(typeof CalcLib.bitwiseXor).toBe('function');
    expect(typeof CalcLib.bitwiseNot).toBe('function');
    expect(typeof CalcLib.leftShift).toBe('function');
    expect(typeof CalcLib.rightShift).toBe('function');
    expect(typeof CalcLib.popCount).toBe('function');
    expect(typeof CalcLib.isPowerOfTwo).toBe('function');
    expect(typeof CalcLib.nextPowerOfTwo).toBe('function');
    expect(typeof CalcLib.hashCode).toBe('function');
    expect(typeof CalcLib.toBase64).toBe('function');
    expect(typeof CalcLib.fromBase64).toBe('function');
    expect(CalcLib.popCount(7)).toBe(3);
    expect(CalcLib.isPowerOfTwo(8)).toBe(true);
  });

  test('contains logic gate functions', () => {
    expect(typeof CalcLib.and).toBe('function');
    expect(typeof CalcLib.or).toBe('function');
    expect(typeof CalcLib.not).toBe('function');
    expect(typeof CalcLib.nand).toBe('function');
    expect(typeof CalcLib.nor).toBe('function');
    expect(typeof CalcLib.xor).toBe('function');
    expect(typeof CalcLib.xnor).toBe('function');
    expect(typeof CalcLib.buffer).toBe('function');
    expect(typeof CalcLib.halfAdder).toBe('function');
    expect(typeof CalcLib.fullAdder).toBe('function');
    expect(typeof CalcLib.mux).toBe('function');
    expect(typeof CalcLib.demux).toBe('function');
    expect(typeof CalcLib.decoder).toBe('function');
    expect(typeof CalcLib.encoder).toBe('function');
    expect(typeof CalcLib.priorityEncoder).toBe('function');
    expect(typeof CalcLib.truthTable).toBe('function');
    expect(CalcLib.and([1, 1])).toBe(1);
    expect(CalcLib.xor([1, 0])).toBe(1);
  });

  test('contains mathematical constants', () => {
    expect(typeof CalcLib.constants).toBe('object');
    expect(typeof CalcLib.getConstant).toBe('function');
    expect(typeof CalcLib.listConstants).toBe('function');
    expect(CalcLib.constants.PI).toBeCloseTo(Math.PI, 10);
    expect(CalcLib.getConstant('PI')).toBe(CalcLib.constants.PI);
  });

  test('contains arithmetic operations', () => {
    expect(typeof CalcLib.add).toBe('function');
    expect(typeof CalcLib.sub).toBe('function');
    expect(typeof CalcLib.mul).toBe('function');
    expect(typeof CalcLib.div).toBe('function');
    expect(typeof CalcLib.mod).toBe('function');
    expect(typeof CalcLib.idiv).toBe('function');
    expect(typeof CalcLib.pow).toBe('function');
    expect(typeof CalcLib.sqrt).toBe('function');
    expect(typeof CalcLib.abs).toBe('function');
    expect(typeof CalcLib.max).toBe('function');
    expect(typeof CalcLib.min).toBe('function');
    expect(CalcLib.add(1.23, 4.5)).toBe(5.7);
    expect(CalcLib.sqrt(25)).toBe(5);
    expect(CalcLib.pow(2, 8)).toBe(256);
  });
});
