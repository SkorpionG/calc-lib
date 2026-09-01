// Vector Mathematics Examples
// Demonstrates the full Vector class API for n-dimensional vector math
import { Vector } from '../dist/index.js';

console.log('=== Vector Mathematics Examples ===\n');

// ─── 1. Constructing Vectors ─────────────────────────────────────────────────

console.log('1. Constructing Vectors:');
const v2d = new Vector([3, 4]);
const v3d = new Vector([1, 2, 3]);
const v4d = new Vector([1, 0, 0, 0]);

console.log(`  2D vector: ${v2d.toString()}, dimension: ${v2d.dimension}`);
console.log(`  3D vector: ${v3d.toString()}, dimension: ${v3d.dimension}`);
console.log(`  4D vector: ${v4d.toString()}, dimension: ${v4d.dimension}`);
console.log();

// String inputs (for precision-preserving workflows)
const vStr = new Vector(['1.50', '2.50', '3.50']);
console.log(`  String components: ${vStr.toString()}`);
console.log(`  .components = [${vStr.components.join(', ')}]`);
console.log();

// ─── 2. Static Factory Methods ────────────────────────────────────────────────

console.log('2. Static Factory Methods:');
const zero3 = Vector.zero(3);
const unitX = Vector.unitVector(3, 0); // [1, 0, 0]
const unitY = Vector.unitVector(3, 1); // [0, 1, 0]
const unitZ = Vector.unitVector(3, 2); // [0, 0, 1]

console.log(`  Vector.zero(3)          = ${zero3.toString()}`);
console.log(`  Vector.unitVector(3, 0) = ${unitX.toString()} (X axis)`);
console.log(`  Vector.unitVector(3, 1) = ${unitY.toString()} (Y axis)`);
console.log(`  Vector.unitVector(3, 2) = ${unitZ.toString()} (Z axis)`);
console.log();

const p1 = new Vector([1, 1]);
const p2 = new Vector([4, 5]);
const displacement = Vector.fromPoints(p1, p2);
console.log(`  fromPoints([1,1] → [4,5]) = ${displacement.toString()}`); // [3, 4]
console.log();

// ─── 3. Magnitude and Normalization ─────────────────────────────────────────

console.log('3. Magnitude and Normalization:');
const a = new Vector([3, 4]);
console.log(`  v = ${a.toString()}`);
console.log(`  v.magnitude() = ${a.magnitude()}`); // 5 (3-4-5 triangle)
console.log(`  v.normalize() = ${a.normalize().toString()}`); // [0.6, 0.8]
console.log(`  |normalize(v)| = ${a.normalize().magnitude()}`); // 1
console.log();

const b = new Vector([1, 1, 1]);
console.log(`  v = ${b.toString()}`);
console.log(`  v.magnitude() = ${b.magnitude()}`); // √3 ≈ 1.732
console.log(`  v.normalize() = ${b.normalize().toString()}`);
console.log();

// ─── 4. Arithmetic Operations ────────────────────────────────────────────────

console.log('4. Arithmetic Operations:');
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2]);

console.log(`  v1 = ${v1.toString()}, v2 = ${v2.toString()}`);
console.log(`  v1.add(v2)      = ${v1.add(v2).toString()}`); // [4, 6]
console.log(`  v1.subtract(v2) = ${v1.subtract(v2).toString()}`); // [2, 2]
console.log(`  v1.scale(2)     = ${v1.scale(2).toString()}`); // [6, 8]
console.log(`  v1.scale(-1)    = ${v1.scale(-1).toString()}`); // [-3, -4] (negation)
console.log();

// ─── 5. Dot and Cross Products ───────────────────────────────────────────────

console.log('5. Dot and Cross Products:');
const u = new Vector([1, 2, 3]);
const w = new Vector([4, 5, 6]);

console.log(`  u = ${u.toString()}, w = ${w.toString()}`);
console.log(`  u.dot(w) = ${u.dot(w)}`); // 1*4 + 2*5 + 3*6 = 32
console.log(`  u.cross(w) = ${u.cross(w).toString()}`); // [2*6-3*5, 3*4-1*6, 1*5-2*4] = [-3, 6, -3]
console.log();

// Verify cross product is perpendicular to both inputs
const cross = u.cross(w);
console.log(`  u.dot(u × w) = ${u.dot(cross)} (should be 0 — perpendicular)`);
console.log(`  w.dot(u × w) = ${w.dot(cross)} (should be 0 — perpendicular)`);
console.log();

// ─── 6. Angles and Relationships ────────────────────────────────────────────

console.log('6. Angles and Geometric Relationships:');
const x = new Vector([1, 0]);
const y = new Vector([0, 1]);
const diag = new Vector([1, 1]);

console.log(`  x = ${x.toString()}, y = ${y.toString()}`);
console.log(`  x.angleTo(y) = ${x.angleTo(y)} rad (= π/2 ≈ 1.5708)`);
console.log(`  x.angleTo(diag) = ${x.angleTo(diag).toFixed(6)} rad (= π/4 ≈ 0.7854)`);
console.log(`  x.isParallel(y)      = ${x.isParallel(y)}`); // false
console.log(`  x.isPerpendicular(y) = ${x.isPerpendicular(y)}`); // true
console.log();

const v = new Vector([2, 0]);
const u2 = new Vector([2, 0]);
console.log(`  v = ${v.toString()}, u = ${u2.toString()}`);
console.log(`  v.isParallel(u)      = ${v.isParallel(u2)}`); // true
console.log(`  v.equals(u)          = ${v.equals(u2)}`); // true
console.log();

// ─── 7. Projection ───────────────────────────────────────────────────────────

console.log('7. Vector Projection:');
const force = new Vector([3, 4]);
const xAxis = new Vector([1, 0]);
const yAxis = new Vector([0, 1]);

console.log(`  force = ${force.toString()}`);
console.log(`  force.projectOnto(xAxis) = ${force.projectOnto(xAxis).toString()}`); // [3, 0]
console.log(`  force.projectOnto(yAxis) = ${force.projectOnto(yAxis).toString()}`); // [0, 4]
console.log();

// ─── 8. Component Access and Mutation ───────────────────────────────────────

console.log('8. Component Access and Mutation:');
const p = new Vector([10, 20, 30]);
console.log(`  p = ${p.toString()}`);
console.log(`  p.get(0) = ${p.get(0)}, p.get(1) = ${p.get(1)}, p.get(2) = ${p.get(2)}`);
console.log(`  p.toArray() = [${p.toArray().join(', ')}]`);
const p2b = p.set(1, 99);
console.log(`  p.set(1, 99) = ${p2b.toString()} (immutable — original unchanged: ${p.toString()})`);
console.log(`  p.clone() = ${p.clone().toString()}`);
console.log();

// ─── 9. Practical Physics Examples ──────────────────────────────────────────

console.log('9. Practical Physics Examples:');

// Projectile motion decomposition
console.log('Projectile velocity decomposition:');
const speed = 50; // m/s
const angleDeg = 30; // degrees
const angleRad = (angleDeg * Math.PI) / 180;
const projectile = new Vector([speed * Math.cos(angleRad), speed * Math.sin(angleRad)]);
console.log(`  Launch speed: ${speed} m/s at ${angleDeg}°`);
console.log(`  Velocity vector: ${projectile.toString()}`);
console.log(`  Magnitude (sanity check): ${projectile.magnitude().toFixed(4)} m/s`);
console.log(`  Horizontal: ${projectile.get(0).toFixed(4)} m/s`);
console.log(`  Vertical:   ${projectile.get(1).toFixed(4)} m/s`);
console.log();

// 3D Force vector decomposition
console.log('3D Force vector decomposition:');
const forceVector = new Vector([3, -2, 5]); // Newtons
const xUnit = Vector.unitVector(3, 0);
const yUnit = Vector.unitVector(3, 1);
const zUnit = Vector.unitVector(3, 2);

console.log(`  Force F = ${forceVector.toString()} N`);
console.log(`  |F|     = ${forceVector.magnitude().toFixed(4)} N`);
console.log(`  Fx = F·x̂ = ${forceVector.dot(xUnit)} N`);
console.log(`  Fy = F·ŷ = ${forceVector.dot(yUnit)} N`);
console.log(`  Fz = F·ẑ = ${forceVector.dot(zUnit)} N`);
console.log(`  F̂ (unit vector) = ${forceVector.normalize().toString()}`);
console.log();

// Distance between two 3D points
console.log('Distance between two 3D points via Vector:');
const pointA = new Vector([1, 2, 3]);
const pointB = new Vector([4, 6, 8]);
const diff = Vector.fromPoints(pointA, pointB);
console.log(`  A = ${pointA.toString()}, B = ${pointB.toString()}`);
console.log(`  B - A = ${diff.toString()}`);
console.log(`  |B - A| = ${diff.magnitude().toFixed(4)}`); // √(9+16+25) = √50 ≈ 7.071
console.log();

console.log('=== All vector examples completed! ===\n');
