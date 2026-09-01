/**
 * Vector mathematics with significant figure handling
 */

import { sigfigOf, toSigfig } from './sigfig.js';
import { parseNumberInput } from './number-input.js';

/**
 * Vector class for mathematical vector operations
 */
export class Vector {
  private readonly _components: number[];
  private readonly _sigfigs?: number | undefined;

  /**
   * Creates a new Vector
   * @param components - Array of vector components
   * @param sigfigs - Optional: number of significant figures to maintain
   */
  constructor(components: (number | string)[], sigfigs?: number) {
    if (!Array.isArray(components) || components.length === 0) {
      throw new Error('Vector must have at least one component');
    }

    // Convert all components to numbers
    this._components = components.map((c) => {
      const num = parseNumberInput(c);
      if (isNaN(num)) {
        throw new Error('All vector components must be valid numbers');
      }
      return num;
    });

    this._sigfigs = sigfigs;
  }

  /**
   * Get the vector components
   */
  get components(): number[] {
    if (this._sigfigs !== undefined) {
      return this._components.map((c) => parseFloat(toSigfig(c, this._sigfigs!)));
    }
    return [...this._components];
  }

  /**
   * Get the dimension of the vector
   */
  get dimension(): number {
    return this._components.length;
  }

  /**
   * Get a specific component by index
   *
   * @param index - Zero-based component index
   * @returns Component value at specified index
   *
   * @example
   * ```typescript
   * const v = new Vector([3, 4, 5]);
   * v.get(0); // 3
   * v.get(1); // 4
   * ```
   */
  get(index: number): number {
    if (index < 0 || index >= this._components.length) {
      throw new Error(`Index ${index} out of bounds for ${this._components.length}D vector`);
    }

    const component = this._components[index];
    if (this._sigfigs !== undefined) {
      return parseFloat(toSigfig(component, this._sigfigs));
    }
    return component;
  }

  /**
   * Return a new vector with a specific component modified
   *
   * @param index - Zero-based component index
   * @param value - New component value
   * @returns A new Vector instance with the updated component
   *
   * @example
   * ```typescript
   * const v = new Vector([1, 2, 3]);
   * const v2 = v.set(1, 5); // Vector([1, 5, 3])
   * ```
   */
  set(index: number, value: number | string): Vector {
    if (index < 0 || index >= this._components.length) {
      throw new Error(`Index ${index} out of bounds for ${this._components.length}D vector`);
    }

    const num = parseNumberInput(value);
    if (isNaN(num)) {
      throw new Error('Component value must be a valid number');
    }

    const newComponents = [...this._components];
    newComponents[index] = num;
    return new Vector(newComponents, this._sigfigs);
  }

  /**
   * Calculate the magnitude (Euclidean norm / length) of the vector
   *
   * @returns Magnitude of the vector
   *
   * @example
   * ```typescript
   * const v = new Vector([3, 4]);
   * v.magnitude(); // 5
   * ```
   */
  magnitude(): number {
    const mag = this.rawMagnitude();

    if (this._sigfigs !== undefined) {
      return parseFloat(toSigfig(mag, this._sigfigs));
    }
    return mag;
  }

  /**
   * Calculate the unrounded Euclidean norm for use in intermediate calculations
   *
   * @returns Exact unrounded magnitude of the vector
   */
  private rawMagnitude(): number {
    const sumOfSquares = this._components.reduce((sum, c) => sum + c * c, 0);
    return Math.sqrt(sumOfSquares);
  }

  /**
   * Calculate the unit vector (normalized vector in same direction)
   *
   * @returns A new normalized unit Vector
   *
   * @example
   * ```typescript
   * const v = new Vector([3, 4]);
   * v.normalize(); // Vector([0.6, 0.8])
   * ```
   */
  normalize(): Vector {
    const mag = this.rawMagnitude();
    if (mag === 0) {
      throw new Error('Cannot normalize zero vector');
    }

    const normalizedComponents = this._components.map((c) => c / mag);
    return new Vector(normalizedComponents, this._sigfigs);
  }

  /**
   * Add another vector to this vector
   *
   * @param other - Vector to add
   * @returns Sum vector
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 2]);
   * const v2 = new Vector([3, 4]);
   * v1.add(v2); // Vector([4, 6])
   * ```
   */
  add(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot add vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`,
      );
    }

    const resultComponents = this._components.map((c, i) => c + other._components[i]);

    // Use minimum significant figures if both vectors have sigfigs specified
    let resultSigfigs = this._sigfigs;
    if (this._sigfigs !== undefined && other._sigfigs !== undefined) {
      resultSigfigs = Math.min(this._sigfigs, other._sigfigs);
    }

    return new Vector(resultComponents, resultSigfigs);
  }

  /**
   * Subtract another vector from this vector
   *
   * @param other - Vector to subtract
   * @returns Difference vector
   *
   * @example
   * ```typescript
   * const v1 = new Vector([4, 6]);
   * const v2 = new Vector([1, 2]);
   * v1.subtract(v2); // Vector([3, 4])
   * ```
   */
  subtract(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot subtract vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`,
      );
    }

    const resultComponents = this._components.map((c, i) => c - other._components[i]);

    // Use minimum significant figures if both vectors have sigfigs specified
    let resultSigfigs = this._sigfigs;
    if (this._sigfigs !== undefined && other._sigfigs !== undefined) {
      resultSigfigs = Math.min(this._sigfigs, other._sigfigs);
    }

    return new Vector(resultComponents, resultSigfigs);
  }

  /**
   * Multiply vector by a scalar
   *
   * @param scalar - Number or numeric string to scale by
   * @returns Scaled vector
   *
   * @example
   * ```typescript
   * const v = new Vector([1, 2, 3]);
   * v.scale(2); // Vector([2, 4, 6])
   * ```
   */
  scale(scalar: number | string): Vector {
    const s = parseNumberInput(scalar);
    if (isNaN(s)) {
      throw new Error('Scalar must be a valid number');
    }

    const scaledComponents = this._components.map((c) => c * s);

    // Determine significant figures for result
    let resultSigfigs = this._sigfigs;
    if (this._sigfigs !== undefined) {
      const scalarSigfigs = sigfigOf(scalar);
      resultSigfigs = Math.min(this._sigfigs, scalarSigfigs);
    }

    return new Vector(scaledComponents, resultSigfigs);
  }

  /**
   * Calculate dot product (scalar product) with another vector
   *
   * @param other - Vector to compute dot product with
   * @returns Dot product scalar value
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 2]);
   * const v2 = new Vector([3, 4]);
   * v1.dot(v2); // 11 (1*3 + 2*4)
   * ```
   */
  dot(other: Vector): number {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot compute dot product of vectors with different dimensions: ${this.dimension}D and ${other.dimension}D`,
      );
    }

    const dotProduct = this._components.reduce((sum, c, i) => sum + c * other._components[i], 0);

    // Use minimum significant figures if both vectors have sigfigs specified
    if (this._sigfigs !== undefined && other._sigfigs !== undefined) {
      const minSigfigs = Math.min(this._sigfigs, other._sigfigs);
      return parseFloat(toSigfig(dotProduct, minSigfigs));
    }

    return dotProduct;
  }

  /**
   * Calculate cross product with another 3D vector
   *
   * @param other - 3D vector to compute cross product with
   * @returns Cross product vector (perpendicular to both inputs)
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 0, 0]);
   * const v2 = new Vector([0, 1, 0]);
   * v1.cross(v2); // Vector([0, 0, 1])
   * ```
   */
  cross(other: Vector): Vector {
    if (this.dimension !== 3 || other.dimension !== 3) {
      throw new Error('Cross product is only defined for 3D vectors');
    }

    const [a1, a2, a3] = this._components;
    const [b1, b2, b3] = other._components;

    const crossComponents = [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];

    // Use minimum significant figures if both vectors have sigfigs specified
    let resultSigfigs = this._sigfigs;
    if (this._sigfigs !== undefined && other._sigfigs !== undefined) {
      resultSigfigs = Math.min(this._sigfigs, other._sigfigs);
    }

    return new Vector(crossComponents, resultSigfigs);
  }

  /**
   * Calculate the angle between this vector and another vector (in radians)
   *
   * @param other - Vector to compute angle to
   * @returns Angle between vectors in radians
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 0]);
   * const v2 = new Vector([0, 1]);
   * v1.angleTo(v2); // 1.5707963267948966 (π/2)
   * ```
   */
  angleTo(other: Vector): number {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot compute angle between vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`,
      );
    }

    const dotProd = this.dot(other);
    const mag1 = this.magnitude();
    const mag2 = other.magnitude();

    if (mag1 === 0 || mag2 === 0) {
      throw new Error('Cannot compute angle with zero vector');
    }

    const cosAngle = dotProd / (mag1 * mag2);
    // Clamp to [-1, 1] to handle floating point errors
    const clampedCos = Math.max(-1, Math.min(1, cosAngle));

    // Snap to exact values when numerically parallel or antiparallel
    let angle: number;
    if (Math.abs(clampedCos - 1) < 1e-7) {
      angle = 0;
    } else if (Math.abs(clampedCos + 1) < 1e-7) {
      angle = Math.PI;
    } else {
      angle = Math.acos(clampedCos);
    }

    // Use minimum significant figures if both vectors have sigfigs specified
    if (this._sigfigs !== undefined && other._sigfigs !== undefined) {
      const minSigfigs = Math.min(this._sigfigs, other._sigfigs);
      return parseFloat(toSigfig(angle, minSigfigs));
    }

    return angle;
  }

  /**
   * Check if this vector is parallel to another vector
   *
   * @param other - Vector to check
   * @param tolerance - Optional angular tolerance in radians (default: 1e-7)
   * @returns True if vectors are parallel or antiparallel
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 2]);
   * const v2 = new Vector([2, 4]);
   * v1.isParallel(v2); // true
   * ```
   */
  isParallel(other: Vector, tolerance = 1e-7): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    try {
      const angle = this.angleTo(other);
      return Math.abs(angle) < tolerance || Math.abs(angle - Math.PI) < tolerance;
    } catch {
      return false; // Zero vectors
    }
  }

  /**
   * Check if this vector is perpendicular to another vector
   *
   * @param other - Vector to check
   * @param tolerance - Optional dot-product tolerance (default: 1e-10)
   * @returns True if vectors are perpendicular (orthogonal)
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 0]);
   * const v2 = new Vector([0, 1]);
   * v1.isPerpendicular(v2); // true
   * ```
   */
  isPerpendicular(other: Vector, tolerance = 1e-10): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    const dotProd = this.dot(other);
    return Math.abs(dotProd) < tolerance;
  }

  /**
   * Project this vector onto another vector
   *
   * @param other - Vector onto which to project
   * @returns Projected vector
   *
   * @example
   * ```typescript
   * const v1 = new Vector([3, 4]);
   * const v2 = new Vector([1, 0]);
   * v1.projectOnto(v2); // Vector([3, 0])
   * ```
   */
  projectOnto(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot project vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`,
      );
    }

    const otherMagSquared = other._components.reduce((sum, c) => sum + c * c, 0);
    if (otherMagSquared === 0) {
      throw new Error('Cannot project onto zero vector');
    }

    const dotProd = this.dot(other);
    const scalar = dotProd / otherMagSquared;

    return other.scale(scalar);
  }

  /**
   * Check if this vector equals another vector within numerical tolerance
   *
   * @param other - Vector to compare against
   * @param tolerance - Optional comparison tolerance per component (default: 1e-10)
   * @returns True if all components match within tolerance
   *
   * @example
   * ```typescript
   * const v1 = new Vector([1, 2]);
   * const v2 = new Vector([1, 2]);
   * v1.equals(v2); // true
   * ```
   */
  equals(other: Vector, tolerance = 1e-10): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    return this._components.every((c, i) => Math.abs(c - other._components[i]) < tolerance);
  }

  /**
   * Create an independent copy of this vector
   *
   * @returns A clone of the vector
   *
   * @example
   * ```typescript
   * const v = new Vector([1, 2, 3]);
   * const copy = v.clone();
   * ```
   */
  clone(): Vector {
    return new Vector([...this._components], this._sigfigs);
  }

  /**
   * Convert vector components to a numeric array
   *
   * @returns Array of component numbers
   *
   * @example
   * ```typescript
   * const v = new Vector([1, 2, 3]);
   * v.toArray(); // [1, 2, 3]
   * ```
   */
  toArray(): number[] {
    return this.components;
  }

  /**
   * Convert vector to string representation
   *
   * @returns String formatted as "[c1, c2, ...]"
   *
   * @example
   * ```typescript
   * const v = new Vector([1, 2, 3]);
   * v.toString(); // "[1, 2, 3]"
   * ```
   */
  toString(): string {
    const components = this.components.map((c) => c.toString()).join(', ');
    return `[${components}]`;
  }

  /**
   * Create a zero vector of specified dimension
   *
   * @param dimension - Number of dimensions
   * @param sigfigs - Optional: number of significant figures
   * @returns Zero vector
   *
   * @example
   * ```typescript
   * Vector.zero(3); // Vector([0, 0, 0])
   * ```
   */
  static zero(dimension: number, sigfigs?: number): Vector {
    if (dimension < 1) {
      throw new Error('Vector dimension must be at least 1');
    }
    return new Vector(new Array<number>(dimension).fill(0), sigfigs);
  }

  /**
   * Create a unit vector along a specific axis
   *
   * @param dimension - Number of dimensions
   * @param axis - Zero-based axis index (e.g., 0 for X, 1 for Y, 2 for Z)
   * @param sigfigs - Optional: number of significant figures
   * @returns Unit vector along specified axis
   *
   * @example
   * ```typescript
   * Vector.unitVector(3, 0); // Vector([1, 0, 0])
   * Vector.unitVector(3, 1); // Vector([0, 1, 0])
   * ```
   */
  static unitVector(dimension: number, axis: number, sigfigs?: number): Vector {
    if (dimension < 1) {
      throw new Error('Vector dimension must be at least 1');
    }
    if (axis < 0 || axis >= dimension) {
      throw new Error(`Axis ${axis} out of bounds for ${dimension}D vector`);
    }

    const components = new Array<number>(dimension).fill(0);
    components[axis] = 1;
    return new Vector(components, sigfigs);
  }

  /**
   * Create a displacement vector from point A to point B (B - A)
   *
   * @param from - Origin vector
   * @param to - Target vector
   * @returns Vector from origin to target
   *
   * @example
   * ```typescript
   * const p1 = new Vector([1, 1]);
   * const p2 = new Vector([4, 5]);
   * Vector.fromPoints(p1, p2); // Vector([3, 4])
   * ```
   */
  static fromPoints(from: Vector, to: Vector): Vector {
    return to.subtract(from);
  }
}
