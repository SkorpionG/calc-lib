/**
 * Geometry and angle conversion utilities
 */

import { toSigfig } from './sigfig.js';
import { constants } from './constants.js';
import { parseNumberInput } from './number-input.js';

/**
 * Converts degrees to radians
 *
 * @param degrees - Angle in degrees
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Angle in radians
 *
 * @example
 * ```typescript
 * toRadians(180)       // 3.141592653589793 (π)
 * toRadians(90)        // 1.5707963267948966 (π/2)
 * toRadians(90, 4)     // 1.571 (custom: 4 significant figures)
 * toRadians(45)        // 0.7853981633974483 (π/4)
 * toRadians(360)       // 6.283185307179586 (2π)
 * ```
 */
export function toRadians(degrees: number | string, sigfigs?: number): number {
  const deg = parseNumberInput(degrees);

  if (isNaN(deg)) {
    throw new Error('Invalid input: degrees must be a valid number');
  }

  const radians = deg * (constants.PI / 180);

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(radians, sigfigs));
  }

  return radians;
}

/**
 * Converts radians to degrees
 *
 * @param radians - Angle in radians
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Angle in degrees
 *
 * @example
 * ```typescript
 * toDegrees(Math.PI)       // 180
 * toDegrees(Math.PI / 2)   // 90
 * toDegrees(Math.PI / 4)   // 45
 * toDegrees(2 * Math.PI)   // 360
 * toDegrees(1, 4)          // 57.30 (custom: 4 significant figures)
 * ```
 */
export function toDegrees(radians: number | string, sigfigs?: number): number {
  const rad = parseNumberInput(radians);

  if (isNaN(rad)) {
    throw new Error('Invalid input: radians must be a valid number');
  }

  const degrees = rad * (180 / constants.PI);

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(degrees, sigfigs));
  }

  return degrees;
}

/**
 * Calculates the area of a circle
 *
 * @param radius - Radius of the circle
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Area of the circle (πr²)
 *
 * @example
 * ```typescript
 * circleArea(5)      // 78.53981633974483 (25π)
 * circleArea(5, 4)   // 78.54 (custom: 4 significant figures)
 * circleArea(2.5, 3) // 19.6 (custom: 3 significant figures)
 * ```
 */
export function circleArea(radius: number | string, sigfigs?: number): number {
  const r = parseNumberInput(radius);

  if (isNaN(r)) {
    throw new Error('Invalid input: radius must be a valid number');
  }

  if (r < 0) {
    throw new Error('Radius must be non-negative');
  }

  const area = constants.PI * r * r;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(area, sigfigs));
  }

  return area;
}

/**
 * Calculates the circumference of a circle
 *
 * @param radius - Radius of the circle
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Circumference of the circle (2πr)
 *
 * @example
 * ```typescript
 * circleCircumference(5)      // 31.41592653589793 (10π)
 * circleCircumference(5, 4)   // 31.42 (custom: 4 significant figures)
 * circleCircumference(2.5, 3) // 15.7 (custom: 3 significant figures)
 * ```
 */
export function circleCircumference(radius: number | string, sigfigs?: number): number {
  const r = parseNumberInput(radius);

  if (isNaN(r)) {
    throw new Error('Invalid input: radius must be a valid number');
  }

  if (r < 0) {
    throw new Error('Radius must be non-negative');
  }

  const circumference = 2 * constants.PI * r;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(circumference, sigfigs));
  }

  return circumference;
}

/**
 * Calculates the area of a sphere (surface area)
 *
 * @param radius - Radius of the sphere
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Surface area of the sphere (4πr²)
 *
 * @example
 * ```typescript
 * sphereArea(5)      // 314.1592653589793 (100π)
 * sphereArea(5, 4)   // 314.2 (custom: 4 significant figures)
 * sphereArea(2.5, 3) // 78.5 (custom: 3 significant figures)
 * ```
 */
export function sphereArea(radius: number | string, sigfigs?: number): number {
  const r = parseNumberInput(radius);

  if (isNaN(r)) {
    throw new Error('Invalid input: radius must be a valid number');
  }

  if (r < 0) {
    throw new Error('Radius must be non-negative');
  }

  const area = 4 * constants.PI * r * r;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(area, sigfigs));
  }

  return area;
}

/**
 * Calculates the volume of a sphere
 *
 * @param radius - Radius of the sphere
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Volume of the sphere (4/3 × πr³)
 *
 * @example
 * ```typescript
 * sphereVolume(5)      // 523.5987755982989 ((4/3) × π × 125)
 * sphereVolume(5, 4)   // 523.6 (custom: 4 significant figures)
 * sphereVolume(2.5, 3) // 65.4 (custom: 3 significant figures)
 * ```
 */
export function sphereVolume(radius: number | string, sigfigs?: number): number {
  const r = parseNumberInput(radius);

  if (isNaN(r)) {
    throw new Error('Invalid input: radius must be a valid number');
  }

  if (r < 0) {
    throw new Error('Radius must be non-negative');
  }

  const volume = (4 / 3) * constants.PI * r * r * r;

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(volume, sigfigs));
  }

  return volume;
}

/**
 * Calculates the distance between two points in 2D space
 *
 * @param x1 - X coordinate of first point
 * @param y1 - Y coordinate of first point
 * @param x2 - X coordinate of second point
 * @param y2 - Y coordinate of second point
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Distance between the points
 *
 * @example
 * ```typescript
 * distance2D(0, 0, 3, 4)       // 5 (3-4-5 triangle)
 * distance2D(1, 1, 4, 5)       // 5 (√((4-1)² + (5-1)²))
 * distance2D(0, 0, 1, 1, 3)    // 1.41 (custom: 3 significant figures)
 * ```
 */
export function distance2D(
  x1: number | string,
  y1: number | string,
  x2: number | string,
  y2: number | string,
  sigfigs?: number,
): number {
  const numX1 = parseNumberInput(x1);
  const numY1 = parseNumberInput(y1);
  const numX2 = parseNumberInput(x2);
  const numY2 = parseNumberInput(y2);

  if (isNaN(numX1) || isNaN(numY1) || isNaN(numX2) || isNaN(numY2)) {
    throw new Error('Invalid input: all coordinates must be valid numbers');
  }

  const dx = numX2 - numX1;
  const dy = numY2 - numY1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(distance, sigfigs));
  }

  return distance;
}

/**
 * Calculates the distance between two points in 3D space
 *
 * @param x1 - X coordinate of first point
 * @param y1 - Y coordinate of first point
 * @param z1 - Z coordinate of first point
 * @param x2 - X coordinate of second point
 * @param y2 - Y coordinate of second point
 * @param z2 - Z coordinate of second point
 * @param sigfigs - Optional: number of significant figures (default: exact unrounded value)
 * @returns Distance between the points
 *
 * @example
 * ```typescript
 * distance3D(0, 0, 0, 1, 1, 1)       // 1.7320508075688772 (√3)
 * distance3D(0, 0, 0, 1, 1, 1, 4)    // 1.732 (custom: 4 significant figures)
 * distance3D(1, 2, 3, 4, 5, 6, 4)    // 5.196 (√((4-1)² + (5-2)² + (6-3)²))
 * ```
 */
export function distance3D(
  x1: number | string,
  y1: number | string,
  z1: number | string,
  x2: number | string,
  y2: number | string,
  z2: number | string,
  sigfigs?: number,
): number {
  const numX1 = parseNumberInput(x1);
  const numY1 = parseNumberInput(y1);
  const numZ1 = parseNumberInput(z1);
  const numX2 = parseNumberInput(x2);
  const numY2 = parseNumberInput(y2);
  const numZ2 = parseNumberInput(z2);

  if (
    isNaN(numX1) ||
    isNaN(numY1) ||
    isNaN(numZ1) ||
    isNaN(numX2) ||
    isNaN(numY2) ||
    isNaN(numZ2)
  ) {
    throw new Error('Invalid input: all coordinates must be valid numbers');
  }

  const dx = numX2 - numX1;
  const dy = numY2 - numY1;
  const dz = numZ2 - numZ1;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (sigfigs !== undefined) {
    return parseFloat(toSigfig(distance, sigfigs));
  }

  return distance;
}
