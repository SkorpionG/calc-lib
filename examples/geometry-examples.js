// Geometry & Trigonometry Examples
// Note: Vector mathematics examples are in vector-examples.js
import {
  toRadians,
  toDegrees,
  circleArea,
  circleCircumference,
  sphereArea,
  sphereVolume,
  distance2D,
  distance3D,
} from '../dist/index.js';

console.log('=== Geometry & Trigonometry Examples ===\n');

// Angle conversions
console.log('1. Angle Conversions:');
console.log(`toRadians(90°) = ${toRadians(90)} rad`); // π/2 ≈ 1.5708
console.log(`toRadians(180°) = ${toRadians(180)} rad`); // π ≈ 3.1416
console.log(`toRadians(45°) = ${toRadians(45)} rad`); // π/4 ≈ 0.7854
console.log(`toRadians(360°) = ${toRadians(360)} rad`); // 2π ≈ 6.2832
console.log();

console.log(`toDegrees(π rad) = ${toDegrees(Math.PI)}°`); // 180°
console.log(`toDegrees(π/2 rad) = ${toDegrees(Math.PI / 2)}°`); // 90°
console.log(`toDegrees(π/4 rad) = ${toDegrees(Math.PI / 4)}°`); // 45°
console.log(`toDegrees(2π rad) = ${toDegrees(2 * Math.PI)}°`); // 360°
console.log();

// Circle calculations
console.log('2. Circle Calculations:');
console.log(`circleArea(r=5) = ${circleArea(5)}`); // 25π ≈ 78.54
console.log(`circleArea(r=2.5) = ${circleArea(2.5)}`); // 6.25π ≈ 19.6
console.log(`circleCircumference(r=5) = ${circleCircumference(5)}`); // 10π ≈ 31.42
console.log(`circleCircumference(r=2.5) = ${circleCircumference(2.5)}`); // 5π ≈ 15.7
console.log();

// Sphere calculations
console.log('3. Sphere Calculations:');
console.log(`sphereArea(r=5) = ${sphereArea(5)}`); // 4π(25) = 100π ≈ 314.2
console.log(`sphereArea(r=2.5) = ${sphereArea(2.5)}`); // 4π(6.25) = 25π ≈ 78.5
console.log(`sphereVolume(r=5) = ${sphereVolume(5)}`); // (4/3)π(125) ≈ 523.6
console.log(`sphereVolume(r=2.5) = ${sphereVolume(2.5)}`); // (4/3)π(15.625) ≈ 65.4
console.log();

// Distance calculations
console.log('4. Distance Calculations:');
console.log('2D distances:');
console.log(`distance2D(0,0 to 3,4) = ${distance2D(0, 0, 3, 4)}`); // 5 (3-4-5 triangle)
console.log(`distance2D(1,1 to 4,5) = ${distance2D(1, 1, 4, 5)}`); // 5
console.log(`distance2D(0,0 to 1,1) = ${distance2D(0, 0, 1, 1)}`); // √2 ≈ 1.414
console.log(`distance2D(-2,-2 to 2,2) = ${distance2D(-2, -2, 2, 2)}`); // 4√2 ≈ 5.657
console.log();

console.log('3D distances:');
console.log(`distance3D(0,0,0 to 1,1,1) = ${distance3D(0, 0, 0, 1, 1, 1)}`); // √3 ≈ 1.732
console.log(`distance3D(1,2,3 to 4,5,6) = ${distance3D(1, 2, 3, 4, 5, 6)}`); // √27 ≈ 5.196
console.log(`distance3D(0,0,0 to 3,4,5) = ${distance3D(0, 0, 0, 3, 4, 5)}`); // √50 ≈ 7.071
console.log();

// For vector mathematics, see: vector-examples.js
console.log('5. For Vector Mathematics:');
console.log('  See vector-examples.js for the full Vector class API including:');
console.log('    magnitude, normalize, add, subtract, scale, dot, cross,');
console.log('    angleTo, projectOnto, isParallel, isPerpendicular, and more.');
console.log();

// Practical geometry examples
console.log('6. Practical Geometry Examples:');

// Room area calculation
console.log('Room dimensions and area:');
const roomLength = 12.5;
const roomWidth = 8.3;
const roomArea = roomLength * roomWidth;
console.log(`Room: ${roomLength}m × ${roomWidth}m = ${roomArea.toFixed(1)}m²`);

// Circular garden
const gardenRadius = 3.2;
console.log(`Garden (r=${gardenRadius}m):`);
console.log(`  Area: ${circleArea(gardenRadius)}m²`);
console.log(`  Circumference: ${circleCircumference(gardenRadius)}m`);
console.log();

// Spherical tank volume
const tankRadius = 2.1;
console.log(`Spherical tank (r=${tankRadius}m):`);
console.log(`  Surface area: ${sphereArea(tankRadius)}m²`);
console.log(`  Volume: ${sphereVolume(tankRadius)}m³`);
console.log();

// Navigation example
console.log('7. Navigation Example:');
const startPoint = [0, 0];
const waypoint1 = [5, 3];
const waypoint2 = [8, 7];
const destination = [12, 4];

console.log(`Start: [${startPoint.join(', ')}]`);
console.log(`Waypoint 1: [${waypoint1.join(', ')}]`);
console.log(`Waypoint 2: [${waypoint2.join(', ')}]`);
console.log(`Destination: [${destination.join(', ')}]`);

const dist1 = distance2D(startPoint[0], startPoint[1], waypoint1[0], waypoint1[1]);
const dist2 = distance2D(waypoint1[0], waypoint1[1], waypoint2[0], waypoint2[1]);
const dist3 = distance2D(waypoint2[0], waypoint2[1], destination[0], destination[1]);
const totalDistance = dist1 + dist2 + dist3;

console.log(
  `Distance segments: ${dist1.toFixed(2)} + ${dist2.toFixed(2)} + ${dist3.toFixed(2)} = ${totalDistance.toFixed(2)} units`,
);

// Direct distance
const directDistance = distance2D(startPoint[0], startPoint[1], destination[0], destination[1]);
console.log(`Direct distance: ${directDistance.toFixed(2)} units`);
console.log(`Route efficiency: ${((directDistance / totalDistance) * 100).toFixed(1)}%`);
console.log();

console.log('=== All geometry examples completed! ===\n');
