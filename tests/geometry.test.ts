/**
 * Tests for geometry functions
 */

import {
  toRadians,
  toDegrees,
  circleArea,
  circleCircumference,
  sphereArea,
  sphereVolume,
  distance2D,
  distance3D,
} from '../src/geometry.js';

describe('toRadians', () => {
  test('converts common angles to radians', () => {
    expect(toRadians(0)).toBe(0);
    expect(toRadians(90)).toBeCloseTo(Math.PI / 2, 10);
    expect(toRadians(180)).toBeCloseTo(Math.PI, 10);
    expect(toRadians(270)).toBeCloseTo((3 * Math.PI) / 2, 10);
    expect(toRadians(360)).toBeCloseTo(2 * Math.PI, 10);
  });

  test('handles decimal degrees', () => {
    expect(toRadians(45)).toBeCloseTo(Math.PI / 4, 10);
    expect(toRadians(30)).toBeCloseTo(Math.PI / 6, 10);
    expect(toRadians(60)).toBeCloseTo(Math.PI / 3, 10);
  });

  test('handles negative angles', () => {
    expect(toRadians(-90)).toBeCloseTo(-Math.PI / 2, 10);
    expect(toRadians(-180)).toBeCloseTo(-Math.PI, 10);
  });

  test('handles string inputs', () => {
    expect(toRadians('90')).toBeCloseTo(Math.PI / 2, 10);
    expect(toRadians('180')).toBeCloseTo(Math.PI, 10);
  });

  test('respects custom significant figures', () => {
    expect(toRadians(90, 3)).toBeCloseTo(1.57, 2);
    expect(toRadians(180, 4)).toBeCloseTo(3.142, 3);
  });

  test('throws error for invalid input', () => {
    expect(() => toRadians('invalid')).toThrow('Invalid input: degrees must be a valid number');
  });
});

describe('toDegrees', () => {
  test('converts common angles to degrees', () => {
    expect(toDegrees(0)).toBe(0);
    expect(toDegrees(Math.PI / 2)).toBeCloseTo(90, 10);
    expect(toDegrees(Math.PI)).toBeCloseTo(180, 10);
    expect(toDegrees((3 * Math.PI) / 2)).toBeCloseTo(270, 10);
    expect(toDegrees(2 * Math.PI)).toBeCloseTo(360, 10);
  });

  test('handles fractional radians', () => {
    expect(toDegrees(Math.PI / 4)).toBeCloseTo(45, 10);
    expect(toDegrees(Math.PI / 6)).toBeCloseTo(30, 10);
    expect(toDegrees(Math.PI / 3)).toBeCloseTo(60, 10);
  });

  test('handles negative angles', () => {
    expect(toDegrees(-Math.PI / 2)).toBeCloseTo(-90, 10);
    expect(toDegrees(-Math.PI)).toBeCloseTo(-180, 10);
  });

  test('handles string inputs', () => {
    expect(toDegrees(String(Math.PI / 2))).toBeCloseTo(90, 10);
    expect(toDegrees(String(Math.PI))).toBeCloseTo(180, 10);
  });

  test('respects custom significant figures', () => {
    expect(toDegrees(Math.PI, 3)).toBeCloseTo(180, 0);
    expect(toDegrees(Math.PI / 2, 2)).toBeCloseTo(90, 0);
  });

  test('throws error for invalid input', () => {
    expect(() => toDegrees('invalid')).toThrow('Invalid input: radians must be a valid number');
  });
});

describe('circleArea', () => {
  test('calculates circle area correctly', () => {
    expect(circleArea(1)).toBeCloseTo(Math.PI, 10);
    expect(circleArea(2)).toBeCloseTo(4 * Math.PI, 10);
    expect(circleArea(5)).toBeCloseTo(25 * Math.PI, 10);
  });

  test('handles decimal radius', () => {
    expect(circleArea(2.5)).toBeCloseTo(6.25 * Math.PI, 10);
    expect(circleArea(0.5)).toBeCloseTo(0.25 * Math.PI, 10);
  });

  test('handles zero radius', () => {
    expect(circleArea(0)).toBe(0);
  });

  test('handles string inputs', () => {
    expect(circleArea('2')).toBeCloseTo(4 * Math.PI, 10);
    expect(circleArea('2.5')).toBeCloseTo(6.25 * Math.PI, 10);
  });

  test('respects custom significant figures', () => {
    expect(circleArea(5, 3)).toBeCloseTo(78.5, 1);
    expect(circleArea(2, 4)).toBeCloseTo(12.57, 2);
  });

  test('throws error for negative radius', () => {
    expect(() => circleArea(-1)).toThrow('Radius must be non-negative');
  });

  test('throws error for invalid input', () => {
    expect(() => circleArea('invalid')).toThrow('Invalid input: radius must be a valid number');
  });
});

describe('circleCircumference', () => {
  test('calculates circle circumference correctly', () => {
    expect(circleCircumference(1)).toBeCloseTo(2 * Math.PI, 10);
    expect(circleCircumference(2)).toBeCloseTo(4 * Math.PI, 10);
    expect(circleCircumference(5)).toBeCloseTo(10 * Math.PI, 10);
  });

  test('handles decimal radius', () => {
    expect(circleCircumference(2.5)).toBeCloseTo(5 * Math.PI, 10);
    expect(circleCircumference(0.5)).toBeCloseTo(Math.PI, 10);
  });

  test('handles zero radius', () => {
    expect(circleCircumference(0)).toBe(0);
  });

  test('throws error for negative radius', () => {
    expect(() => circleCircumference(-1)).toThrow('Radius must be non-negative');
  });

  test('handles string inputs', () => {
    expect(circleCircumference('5')).toBeCloseTo(10 * Math.PI, 10);
  });

  test('respects custom significant figures', () => {
    expect(circleCircumference(5, 4)).toBeCloseTo(31.42, 2);
    expect(circleCircumference(2.5, 3)).toBeCloseTo(15.7, 1);
  });

  test('throws error for invalid input', () => {
    expect(() => circleCircumference('invalid')).toThrow(
      'Invalid input: radius must be a valid number',
    );
  });
});

describe('sphereArea', () => {
  test('calculates sphere surface area correctly', () => {
    expect(sphereArea(1)).toBeCloseTo(4 * Math.PI, 10);
    expect(sphereArea(2)).toBeCloseTo(16 * Math.PI, 10);
    expect(sphereArea(5)).toBeCloseTo(100 * Math.PI, 10);
  });

  test('handles zero radius', () => {
    expect(sphereArea(0)).toBe(0);
  });

  test('handles decimal radius', () => {
    expect(sphereArea(2.5)).toBeCloseTo(4 * Math.PI * 6.25, 10);
  });

  test('handles string inputs', () => {
    expect(sphereArea('2')).toBeCloseTo(16 * Math.PI, 10);
  });

  test('respects custom significant figures', () => {
    expect(sphereArea(5, 4)).toBeCloseTo(314.2, 1);
    expect(sphereArea(2.5, 3)).toBeCloseTo(78.5, 1);
  });

  test('throws error for negative radius', () => {
    expect(() => sphereArea(-1)).toThrow('Radius must be non-negative');
  });

  test('throws error for invalid input', () => {
    expect(() => sphereArea('invalid')).toThrow('Invalid input: radius must be a valid number');
  });
});

describe('sphereVolume', () => {
  test('calculates sphere volume correctly', () => {
    expect(sphereVolume(1)).toBeCloseTo((4 / 3) * Math.PI, 10);
    expect(sphereVolume(2)).toBeCloseTo((4 / 3) * Math.PI * 8, 10);
    expect(sphereVolume(3)).toBeCloseTo((4 / 3) * Math.PI * 27, 10);
  });

  test('handles zero radius', () => {
    expect(sphereVolume(0)).toBe(0);
  });

  test('handles decimal radius', () => {
    expect(sphereVolume(2.5)).toBeCloseTo((4 / 3) * Math.PI * 15.625, 10);
  });

  test('handles string inputs', () => {
    expect(sphereVolume('3')).toBeCloseTo((4 / 3) * Math.PI * 27, 10);
  });

  test('respects custom significant figures', () => {
    expect(sphereVolume(5, 4)).toBeCloseTo(523.6, 1);
    expect(sphereVolume(2.5, 3)).toBeCloseTo(65.4, 1);
  });

  test('throws error for negative radius', () => {
    expect(() => sphereVolume(-1)).toThrow('Radius must be non-negative');
  });

  test('throws error for invalid input', () => {
    expect(() => sphereVolume('invalid')).toThrow('Invalid input: radius must be a valid number');
  });
});

describe('distance2D', () => {
  test('calculates 2D distance correctly', () => {
    expect(distance2D(0, 0, 3, 4)).toBe(5); // 3-4-5 triangle
    expect(distance2D(0, 0, 0, 0)).toBe(0); // Same point
    expect(distance2D(1, 1, 4, 5)).toBe(5); // Another 3-4-5 triangle
  });

  test('handles decimal coordinates', () => {
    expect(distance2D(0, 0, 1.5, 2)).toBeCloseTo(2.5, 10);
    expect(distance2D(1.1, 2.2, 4.1, 6.2)).toBe(5);
  });

  test('handles negative coordinates', () => {
    expect(distance2D(-3, -4, 0, 0)).toBe(5);
    expect(distance2D(-1, -1, 2, 3)).toBe(5);
  });

  test('handles string inputs', () => {
    expect(distance2D('0', '0', '3', '4')).toBe(5);
    expect(distance2D(0, 0, '3', '4')).toBe(5);
  });

  test('respects custom significant figures', () => {
    expect(distance2D(0, 0, 1, 1, 3)).toBeCloseTo(1.41, 2);
    expect(distance2D(0, 0, 2, 2, 2)).toBeCloseTo(2.8, 1);
  });

  test('throws error for invalid coordinates', () => {
    expect(() => distance2D('invalid', 0, 0, 0)).toThrow(
      'Invalid input: all coordinates must be valid numbers',
    );
    expect(() => distance2D(0, 'invalid', 0, 0)).toThrow(
      'Invalid input: all coordinates must be valid numbers',
    );
  });
});

describe('distance3D', () => {
  test('calculates 3D distance correctly', () => {
    expect(distance3D(0, 0, 0, 1, 1, 1)).toBeCloseTo(Math.sqrt(3), 10);
    expect(distance3D(0, 0, 0, 0, 0, 0)).toBe(0); // Same point
    expect(distance3D(1, 2, 3, 4, 6, 8)).toBeCloseTo(Math.sqrt(50), 10);
  });

  test('handles negative coordinates', () => {
    expect(distance3D(-1, -1, -1, 1, 1, 1)).toBeCloseTo(2 * Math.sqrt(3), 10);
  });

  test('handles string inputs', () => {
    expect(distance3D('0', '0', '0', '1', '1', '1')).toBeCloseTo(Math.sqrt(3), 10);
  });

  test('respects custom significant figures', () => {
    expect(distance3D(0, 0, 0, 1, 1, 1, 3)).toBeCloseTo(1.73, 2);
    expect(distance3D(0, 0, 0, 3, 4, 0, 2)).toBeCloseTo(5.0, 1);
  });

  test('throws error for invalid coordinates', () => {
    expect(() => distance3D('invalid', 0, 0, 0, 0, 0)).toThrow(
      'Invalid input: all coordinates must be valid numbers',
    );
    expect(() => distance3D(0, 0, 'invalid', 0, 0, 0)).toThrow(
      'Invalid input: all coordinates must be valid numbers',
    );
    expect(() => distance3D(0, 0, 0, 0, 0, 'invalid')).toThrow(
      'Invalid input: all coordinates must be valid numbers',
    );
  });
});
