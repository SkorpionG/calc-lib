/**
 * Calc Lib - A TypeScript/JavaScript package for precise mathematical calculations with significant figures
 *
 * This package provides utilities for performing mathematical operations while properly
 * handling significant figures according to scientific standards.
 */

// Export significant figure utilities
export { sigfigOf, toSigfig } from './sigfig.js';

// Export conversion utilities
export { bin, hex, oct, toBase } from './conversion.js';

// Export formatting utilities
export { toScientific, toEngineering, round, percentage, truncate } from './formatting.js';

// Export measurement utilities
export { uncertainty, createMeasurement } from './measurement.js';
export type { Measurement } from './measurement.js';

// Export statistical functions
export {
  mean,
  standardDeviation,
  median,
  descriptiveStats,
  linearRegression,
  predictLinear,
} from './statistics.js';
export type { LinearRegressionResult } from './statistics.js';

// Export geometry functions
export {
  toRadians,
  toDegrees,
  circleArea,
  circleCircumference,
  sphereArea,
  sphereVolume,
  distance2D,
  distance3D,
} from './geometry.js';

// Export vector mathematics
export { Vector } from './vector.js';

// Export computer science utilities
export {
  toAscii,
  fromAscii,
  toBinary,
  fromBinary,
  toHex,
  fromHex,
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
  bitwiseNot,
  leftShift,
  rightShift,
  popCount,
  isPowerOfTwo,
  nextPowerOfTwo,
  hashCode,
  toBase64,
  fromBase64,
} from './computer-science.js';

// Export logic gates and digital circuits
export {
  and,
  or,
  not,
  nand,
  nor,
  xor,
  xnor,
  buffer,
  halfAdder,
  fullAdder,
  mux,
  demux,
  decoder,
  encoder,
  priorityEncoder,
  truthTable,
} from './logic-gates.js';
export type { LogicValue, LogicInput } from './logic-gates.js';

// Export mathematical constants
export { constants, getConstant, listConstants } from './constants.js';

// Export arithmetic operations
export { add, sub, mul, div, mod, idiv, pow, sqrt, abs, max, min } from './operations.js';

// Export types for better TypeScript support
export type NumberInput = number | string;

// Import for default export
import { sigfigOf, toSigfig } from './sigfig.js';
import { bin, hex, oct, toBase } from './conversion.js';
import { toScientific, toEngineering, round, percentage, truncate } from './formatting.js';
import { uncertainty, createMeasurement } from './measurement.js';
import {
  mean,
  standardDeviation,
  median,
  descriptiveStats,
  linearRegression,
  predictLinear,
} from './statistics.js';
import {
  toRadians,
  toDegrees,
  circleArea,
  circleCircumference,
  sphereArea,
  sphereVolume,
  distance2D,
  distance3D,
} from './geometry.js';
import { Vector } from './vector.js';
import {
  toAscii,
  fromAscii,
  toBinary,
  fromBinary,
  toHex,
  fromHex,
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
  bitwiseNot,
  leftShift,
  rightShift,
  popCount,
  isPowerOfTwo,
  nextPowerOfTwo,
  hashCode,
  toBase64,
  fromBase64,
} from './computer-science.js';
import {
  and,
  or,
  not,
  nand,
  nor,
  xor,
  xnor,
  buffer,
  halfAdder,
  fullAdder,
  mux,
  demux,
  decoder,
  encoder,
  priorityEncoder,
  truthTable,
} from './logic-gates.js';
import { constants, getConstant, listConstants } from './constants.js';
import { add, sub, mul, div, mod, idiv, pow, sqrt, abs, max, min } from './operations.js';

/**
 * Default export containing all functions for convenience
 */
const CalcLib = {
  // Significant figures
  sigfigOf,
  toSigfig,

  // Number conversion
  bin,
  hex,
  oct,
  toBase,

  // Formatting
  toScientific,
  toEngineering,
  round,
  percentage,
  truncate,

  // Measurement
  uncertainty,
  createMeasurement,

  // Statistics
  mean,
  standardDeviation,
  median,
  descriptiveStats,
  linearRegression,
  predictLinear,

  // Geometry
  toRadians,
  toDegrees,
  circleArea,
  circleCircumference,
  sphereArea,
  sphereVolume,
  distance2D,
  distance3D,

  // Vector mathematics
  Vector,

  // Computer science utilities
  toAscii,
  fromAscii,
  toBinary,
  fromBinary,
  toHex,
  fromHex,
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
  bitwiseNot,
  leftShift,
  rightShift,
  popCount,
  isPowerOfTwo,
  nextPowerOfTwo,
  hashCode,
  toBase64,
  fromBase64,

  // Logic gates and digital circuits
  and,
  or,
  not,
  nand,
  nor,
  xor,
  xnor,
  buffer,
  halfAdder,
  fullAdder,
  mux,
  demux,
  decoder,
  encoder,
  priorityEncoder,
  truthTable,

  // Constants
  constants,
  getConstant,
  listConstants,

  // Arithmetic
  add,
  sub,
  mul,
  div,
  mod,
  idiv,
  pow,
  sqrt,
  abs,
  max,
  min,
};

export default CalcLib;
