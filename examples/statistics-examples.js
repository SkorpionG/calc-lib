// Statistical Functions Examples
import {
  mean,
  standardDeviation,
  median,
  descriptiveStats,
  linearRegression,
  predictLinear,
} from '../dist/index.js';

console.log('=== Statistical Functions Examples ===\n');

// Sample datasets
const dataset1 = [1.2, 2.3, 3.1, 4.5, 2.8];
const dataset2 = [10, 12, 14, 16, 18, 20];
const dataset3 = [85, 92, 78, 96, 88, 91, 87, 93];

// Basic statistics
console.log('1. Basic Statistical Measures:');
console.log(`Dataset: [${dataset1.join(', ')}]`);
console.log(`mean = ${mean(dataset1)}`); // 2.8
console.log(`median = ${median(dataset1)}`); // 2.8
console.log(`standardDeviation = ${standardDeviation(dataset1)}`); // 1.2 (sample)
console.log(`standardDeviation (population) = ${standardDeviation(dataset1, 3, true)}`); // 1.1 (population)
console.log();

console.log('2. Larger Dataset Analysis:');
console.log(`Dataset: [${dataset2.join(', ')}]`);
console.log(`mean = ${mean(dataset2)}`); // 15
console.log(`median = ${median(dataset2)}`); // 15
console.log(`standardDeviation = ${standardDeviation(dataset2)}`); // 3.7
console.log();

console.log('3. Test Scores Analysis:');
console.log(`Test scores: [${dataset3.join(', ')}]`);
console.log(`mean = ${mean(dataset3)}`); // 88.8
console.log(`median = ${median(dataset3)}`); // 89.5
console.log(`standardDeviation = ${standardDeviation(dataset3)}`); // 5.8
console.log();

// Descriptive statistics summary
console.log('4. Descriptive Statistics Summary:');
const stats = descriptiveStats(dataset3);
console.log(`  Descriptive stats for test scores:`, stats);
console.log();

// Linear regression examples
console.log('5. Linear Regression Analysis:');

// Perfect linear relationship
const x1 = [1, 2, 3, 4, 5];
const y1 = [2.1, 3.9, 6.2, 7.8, 10.1];

console.log('Perfect linear relationship:');
console.log(`x: [${x1.join(', ')}]`);
console.log(`y: [${y1.join(', ')}]`);

const result1 = linearRegression(x1, y1);
console.log(`slope (m) = ${result1.slope}`); // ~2
console.log(`intercept (b) = ${result1.intercept}`); // ~0.05
console.log(`correlation (r) = ${result1.correlation}`); // ~1
console.log(`r² = ${result1.rSquared}`); // ~1
console.log(`Equation: y = ${result1.slope}x + ${result1.intercept}`);

// Make predictions
const predictions1 = predictLinear([6, 7, 8], result1);
console.log(`Predictions for x=[6,7,8]: [${predictions1.join(', ')}]`);
console.log();

// Real-world example: Temperature vs. Time
console.log('6. Real-world Example - Temperature vs. Time:');
const hours = [0, 2, 4, 6, 8, 10, 12];
const temperature = [15.2, 18.1, 21.5, 24.8, 27.2, 25.9, 23.1];

console.log(`Hours: [${hours.join(', ')}]`);
console.log(`Temperature (°C): [${temperature.join(', ')}]`);

const tempResult = linearRegression(hours, temperature);
console.log(`slope = ${tempResult.slope}°C/hour`);
console.log(`intercept = ${tempResult.intercept}°C`);
console.log(`correlation = ${tempResult.correlation}`);
console.log(`r² = ${tempResult.rSquared}`);

// Predict temperature at different times
const futureTimes = [14, 16, 18];
const futureTempPredictions = predictLinear(futureTimes, tempResult);
console.log(
  `Predicted temperatures at hours [${futureTimes.join(', ')}]: [${futureTempPredictions.join(', ')}]°C`,
);
console.log();

// Sales vs. Advertising example
console.log('7. Business Example - Sales vs. Advertising Spend:');
const adSpend = [1000, 1500, 2000, 2500, 3000, 3500];
const sales = [50000, 65000, 78000, 92000, 105000, 118000];

console.log(`Advertising Spend ($): [${adSpend.join(', ')}]`);
console.log(`Sales ($): [${sales.join(', ')}]`);

const salesResult = linearRegression(adSpend, sales);
console.log(`slope = ${salesResult.slope} (sales per $ of advertising)`);
console.log(`intercept = ${salesResult.intercept} (base sales)`);
console.log(`correlation = ${salesResult.correlation}`);
console.log(`r² = ${salesResult.rSquared}`);

// ROI calculation
const newAdSpend = [4000, 5000];
const projectedSales = predictLinear(newAdSpend, salesResult);
console.log(
  `Projected sales for ad spend [${newAdSpend.join(', ')}]: [${projectedSales.join(', ')}]`,
);
console.log();

// Statistical significance example
console.log('8. Comparing Different Datasets:');
const groupA = [85, 87, 90, 92, 88, 91, 89];
const groupB = [78, 82, 85, 80, 83, 86, 81];

console.log(`Group A: [${groupA.join(', ')}]`);
console.log(`  Mean: ${mean(groupA)}, StdDev: ${standardDeviation(groupA)}`);
console.log(`Group B: [${groupB.join(', ')}]`);
console.log(`  Mean: ${mean(groupB)}, StdDev: ${standardDeviation(groupB)}`);

const difference = mean(groupA) - mean(groupB);
console.log(`Difference in means: ${difference.toFixed(2)}`);
console.log();

console.log('=== All statistics examples completed! ===\n');
