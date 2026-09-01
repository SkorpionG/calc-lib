/**
 * Tests for Vector class and operations
 */

import { Vector } from '../src/vector.js';

describe('Vector', () => {
  describe('constructor', () => {
    test('creates vector from number array', () => {
      const v = new Vector([1, 2, 3]);
      expect(v.components).toEqual([1, 2, 3]);
      expect(v.dimension).toBe(3);
    });

    test('creates vector from string array', () => {
      const v = new Vector(['1', '2', '3']);
      expect(v.components).toEqual([1, 2, 3]);
    });

    test('creates vector with significant figures', () => {
      const v = new Vector([1.234, 2.567, 3.891], 3);
      expect(v.get(0)).toBeCloseTo(1.23, 2);
      expect(v.get(1)).toBeCloseTo(2.57, 2);
      expect(v.get(2)).toBeCloseTo(3.89, 2);
    });

    test('throws error for empty array', () => {
      expect(() => new Vector([])).toThrow('Vector must have at least one component');
    });

    test('throws error for invalid components', () => {
      expect(() => new Vector(['invalid', '2'])).toThrow(
        'All vector components must be valid numbers',
      );
    });
  });

  describe('basic operations', () => {
    test('gets and sets components', () => {
      const v = new Vector([1, 2, 3]);
      expect(v.get(0)).toBe(1);
      expect(v.get(1)).toBe(2);
      expect(v.get(2)).toBe(3);

      const v2 = v.set(1, 5);
      expect(v2.get(1)).toBe(5);
      expect(v.get(1)).toBe(2); // Original unchanged
    });

    test('set with string value', () => {
      const v = new Vector([1, 2, 3]);
      const v2 = v.set(0, '9.9');
      expect(v2.get(0)).toBeCloseTo(9.9, 10);
      expect(v2.get(1)).toBe(2); // Others unchanged
    });

    test('throws error for out of bounds access', () => {
      const v = new Vector([1, 2, 3]);
      expect(() => v.get(-1)).toThrow('Index -1 out of bounds for 3D vector');
      expect(() => v.get(3)).toThrow('Index 3 out of bounds for 3D vector');
      expect(() => v.set(-1, 5)).toThrow('Index -1 out of bounds for 3D vector');
      expect(() => v.set(3, 5)).toThrow('Index 3 out of bounds for 3D vector');
    });

    test('throws error for invalid set value', () => {
      const v = new Vector([1, 2, 3]);
      expect(() => v.set(0, NaN)).toThrow('Component value must be a valid number');
    });

    test('calculates magnitude', () => {
      const v1 = new Vector([3, 4]);
      expect(v1.magnitude()).toBe(5); // 3-4-5 triangle

      const v2 = new Vector([1, 1, 1]);
      expect(v2.magnitude()).toBeCloseTo(Math.sqrt(3), 10);

      const v3 = new Vector([0, 0, 0]);
      expect(v3.magnitude()).toBe(0);
    });

    test('calculates magnitude with sigfigs', () => {
      const v = new Vector([3, 4], 2); // 2 sigfigs
      expect(v.magnitude()).toBeCloseTo(5.0, 1); // 5.0 with 2 sigfigs = 5.0
    });

    test('gets components with sigfigs', () => {
      const v = new Vector([1.234, 2.567], 3);
      // components getter applies sigfig rounding
      const comps = v.components;
      expect(comps[0]).toBeCloseTo(1.23, 2);
      expect(comps[1]).toBeCloseTo(2.57, 2);
    });

    test('normalizes vector', () => {
      const v = new Vector([3, 4]);
      const normalized = v.normalize();
      expect(normalized.magnitude()).toBeCloseTo(1, 10);
      expect(normalized.get(0)).toBeCloseTo(0.6, 10);
      expect(normalized.get(1)).toBeCloseTo(0.8, 10);
    });

    test('normalizes using an unrounded intermediate magnitude', () => {
      const normalized = new Vector([1, 1], 1).normalize();

      expect(normalized.get(0)).toBeCloseTo(0.7, 10);
      expect(normalized.get(1)).toBeCloseTo(0.7, 10);
    });

    test('throws error when normalizing zero vector', () => {
      const v = new Vector([0, 0, 0]);
      expect(() => v.normalize()).toThrow('Cannot normalize zero vector');
    });
  });

  describe('vector arithmetic', () => {
    test('adds vectors', () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const result = v1.add(v2);
      expect(result.components).toEqual([5, 7, 9]);
    });

    test('subtracts vectors', () => {
      const v1 = new Vector([5, 7, 9]);
      const v2 = new Vector([1, 2, 3]);
      const result = v1.subtract(v2);
      expect(result.components).toEqual([4, 5, 6]);
    });

    test('subtraction with sigfigs', () => {
      const v1 = new Vector([5.678, 7.89], 3);
      const v2 = new Vector([1.23, 2.34], 3);
      const result = v1.subtract(v2);
      // Both have 3 sigfigs; min(3,3)=3
      expect(result.get(0)).toBeCloseTo(4.45, 2);
    });

    test('scales vector by scalar', () => {
      const v = new Vector([1, 2, 3]);
      const scaled = v.scale(2);
      expect(scaled.components).toEqual([2, 4, 6]);

      const scaledNegative = v.scale(-1);
      expect(scaledNegative.components).toEqual([-1, -2, -3]);
    });

    test('scales vector by string scalar', () => {
      const v = new Vector([1, 2, 3]);
      const scaled = v.scale('3');
      expect(scaled.components).toEqual([3, 6, 9]);
    });

    test('scales by zero', () => {
      const v = new Vector([1, 2, 3]);
      const zero = v.scale(0);
      expect(zero.components).toEqual([0, 0, 0]);
    });

    test('throws error for invalid scalar', () => {
      const v = new Vector([1, 2, 3]);
      expect(() => v.scale(NaN)).toThrow('Scalar must be a valid number');
      expect(() => v.scale('invalid')).toThrow('Scalar must be a valid number');
    });

    test('throws error for mismatched dimensions', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(() => v1.add(v2)).toThrow('Cannot add vectors of different dimensions: 2D and 3D');
      expect(() => v1.subtract(v2)).toThrow(
        'Cannot subtract vectors of different dimensions: 2D and 3D',
      );
    });
  });

  describe('dot product', () => {
    test('calculates dot product', () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const dot = v1.dot(v2);
      expect(dot).toBe(32); // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
    });

    test('dot product with sigfigs', () => {
      const v1 = new Vector([1.2, 3.4], 2);
      const v2 = new Vector([5.6, 7.8], 2);
      const dot = v1.dot(v2);
      // result is sigfig rounded
      expect(typeof dot).toBe('number');
      expect(dot).toBeCloseTo(33.24, 0); // 1.2*5.6 + 3.4*7.8 = 6.72+26.52 = 33.24
    });

    test('dot product with perpendicular vectors', () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      expect(v1.dot(v2)).toBe(0);
    });

    test('dot product with parallel vectors', () => {
      const v1 = new Vector([2, 4]);
      const v2 = new Vector([1, 2]);
      expect(v1.dot(v2)).toBe(10); // 2*1 + 4*2 = 10
    });

    test('throws error for mismatched dimensions in dot', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(() => v1.dot(v2)).toThrow(
        'Cannot compute dot product of vectors with different dimensions: 2D and 3D',
      );
    });
  });

  describe('cross product', () => {
    test('calculates cross product for 3D vectors', () => {
      const v1 = new Vector([1, 0, 0]);
      const v2 = new Vector([0, 1, 0]);
      const cross = v1.cross(v2);
      expect(cross.components).toEqual([0, 0, 1]);
    });

    test('cross product with sigfigs', () => {
      const v1 = new Vector([1.23, 0, 0], 2);
      const v2 = new Vector([0, 4.56, 0], 2);
      const cross = v1.cross(v2);
      // Result should be sigfig-aware
      expect(cross.dimension).toBe(3);
      expect(cross.get(2)).toBeCloseTo(5.6, 1); // 1.2*4.6 ~ 5.6 with 2 sigfigs
    });

    test('cross product of parallel vectors is zero', () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([2, 4, 6]);
      const cross = v1.cross(v2);
      expect(cross.components).toEqual([0, 0, 0]);
    });

    test('throws error for non-3D vectors', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([3, 4]);
      expect(() => v1.cross(v2)).toThrow('Cross product is only defined for 3D vectors');
    });
  });

  describe('angle calculations', () => {
    test('calculates angle between vectors', () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(Math.PI / 2, 10); // 90 degrees
    });

    test('angle calculation with sigfigs', () => {
      const v1 = new Vector([1, 0], 3);
      const v2 = new Vector([0, 1], 3);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(Math.PI / 2, 2); // Should be sigfig-rounded
    });

    test('angle between parallel vectors', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([2, 4]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(0, 10);
    });

    test('angle between opposite vectors', () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([-1, 0]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(Math.PI, 10); // 180 degrees
    });

    test('throws error for zero vector angle', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([0, 0]);
      expect(() => v1.angleTo(v2)).toThrow('Cannot compute angle with zero vector');
    });

    test('throws error for mismatched dimensions in angleTo', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(() => v1.angleTo(v2)).toThrow(
        'Cannot compute angle between vectors of different dimensions: 2D and 3D',
      );
    });
  });

  describe('vector relationships', () => {
    test('checks if vectors are parallel', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([2, 4]);
      const v3 = new Vector([-1, -2]);
      const v4 = new Vector([2, 1]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true); // Opposite direction
      expect(v1.isParallel(v4)).toBe(false);
    });

    test('isParallel returns false for zero vector', () => {
      const v1 = new Vector([1, 2]);
      const zero = new Vector([0, 0]);
      expect(v1.isParallel(zero)).toBe(false);
      expect(zero.isParallel(v1)).toBe(false);
    });

    test('checks if vectors are perpendicular', () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const v3 = new Vector([1, 1]);

      expect(v1.isPerpendicular(v2)).toBe(true);
      expect(v1.isPerpendicular(v3)).toBe(false);
    });

    test('checks vector equality', () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([1, 2, 3]);
      const v3 = new Vector([1, 2, 4]);

      expect(v1.equals(v2)).toBe(true);
      expect(v1.equals(v3)).toBe(false);
    });

    test('equals returns false for different dimensions', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(v1.equals(v2)).toBe(false);
    });

    test('isParallel returns false for different dimensions', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(v1.isParallel(v2)).toBe(false);
    });

    test('isPerpendicular returns false for different dimensions', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(v1.isPerpendicular(v2)).toBe(false);
    });

    test('projects vector onto another', () => {
      const v1 = new Vector([3, 4]);
      const v2 = new Vector([1, 0]);
      const projection = v1.projectOnto(v2);
      expect(projection.components).toEqual([3, 0]);
    });

    test('throws error when projecting onto zero vector', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([0, 0]);
      expect(() => v1.projectOnto(v2)).toThrow('Cannot project onto zero vector');
    });

    test('throws error for mismatched dimensions in projectOnto', () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(() => v1.projectOnto(v2)).toThrow(
        'Cannot project vectors of different dimensions: 2D and 3D',
      );
    });
  });

  describe('static methods', () => {
    test('creates zero vector', () => {
      const zero2D = Vector.zero(2);
      expect(zero2D.components).toEqual([0, 0]);

      const zero3D = Vector.zero(3);
      expect(zero3D.components).toEqual([0, 0, 0]);
    });

    test('creates unit vector', () => {
      const unitX = Vector.unitVector(3, 0);
      expect(unitX.components).toEqual([1, 0, 0]);

      const unitY = Vector.unitVector(3, 1);
      expect(unitY.components).toEqual([0, 1, 0]);

      const unitZ = Vector.unitVector(3, 2);
      expect(unitZ.components).toEqual([0, 0, 1]);
    });

    test('creates vector from points', () => {
      const from = new Vector([1, 2]);
      const to = new Vector([4, 6]);
      const vector = Vector.fromPoints(from, to);
      expect(vector.components).toEqual([3, 4]);
    });

    test('throws error for invalid dimensions', () => {
      expect(() => Vector.zero(0)).toThrow('Vector dimension must be at least 1');
      expect(() => Vector.unitVector(0, 0)).toThrow('Vector dimension must be at least 1');
      expect(() => Vector.unitVector(3, 3)).toThrow('Axis 3 out of bounds for 3D vector');
    });
  });

  describe('utility methods', () => {
    test('clones vector', () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = v1.clone();
      expect(v2.components).toEqual([1, 2, 3]);
      expect(v2).not.toBe(v1); // Different objects
    });

    test('converts to array', () => {
      const v = new Vector([1, 2, 3]);
      expect(v.toArray()).toEqual([1, 2, 3]);
    });

    test('converts to string', () => {
      const v = new Vector([1, 2, 3]);
      expect(v.toString()).toBe('[1, 2, 3]');
    });
  });

  describe('significant figures handling', () => {
    test('maintains significant figures in operations', () => {
      const v1 = new Vector([1.234, 2.567], 3);
      const v2 = new Vector([3.456, 4.789], 2);

      const sum = v1.add(v2);
      // Should use minimum sigfigs (2)
      expect(sum.get(0)).toBeCloseTo(4.7, 1);
      expect(sum.get(1)).toBeCloseTo(7.4, 1);
    });

    test('handles scalar multiplication with sigfigs', () => {
      const v = new Vector([1.234, 2.567], 3);
      const scaled = v.scale(2.1); // 2 sigfigs

      // Should use minimum sigfigs (2)
      expect(scaled.get(0)).toBeCloseTo(2.6, 1);
      expect(scaled.get(1)).toBeCloseTo(5.4, 1);
    });
  });
});
