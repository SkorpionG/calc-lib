// Logic Gates & Digital Circuits Examples
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
} from '../dist/index.js';

console.log('=== Logic Gates & Digital Circuits Examples ===\n');

// Basic logic gates
console.log('1. Basic Logic Gates:');
console.log(`and([1, 1]) = ${and([1, 1])}`); // 1
console.log(`and([1, 0]) = ${and([1, 0])}`); // 0
console.log(`and([0, 0]) = ${and([0, 0])}`); // 0
console.log(`or([0, 1]) = ${or([0, 1])}`); // 1
console.log(`or([0, 0]) = ${or([0, 0])}`); // 0
console.log(`not(1) = ${not(1)}`); // 0
console.log(`not(0) = ${not(0)}`); // 1
console.log();

// Composite logic gates
console.log('2. Composite Logic Gates:');
console.log(`nand([1, 1]) = ${nand([1, 1])}`); // 0 (NOT AND)
console.log(`nand([1, 0]) = ${nand([1, 0])}`); // 1
console.log(`nor([0, 0]) = ${nor([0, 0])}`); // 1 (NOT OR)
console.log(`nor([0, 1]) = ${nor([0, 1])}`); // 0
console.log(`xor([1, 0]) = ${xor([1, 0])}`); // 1 (exclusive OR)
console.log(`xor([1, 1]) = ${xor([1, 1])}`); // 0
console.log(`xnor([1, 1]) = ${xnor([1, 1])}`); // 1 (exclusive NOR)
console.log(`xnor([1, 0]) = ${xnor([1, 0])}`); // 0
console.log(`buffer(1) = ${buffer(1)}`); // 1 (identity)
console.log();

// Multi-input gates
console.log('3. Multi-Input Logic Gates:');
console.log(`and([1, 1, 1]) = ${and([1, 1, 1])}`); // 1
console.log(`and([1, 1, 0]) = ${and([1, 1, 0])}`); // 0
console.log(`or([0, 0, 1]) = ${or([0, 0, 1])}`); // 1
console.log(`or([0, 0, 0]) = ${or([0, 0, 0])}`); // 0
console.log(`nand([1, 1, 1]) = ${nand([1, 1, 1])}`); // 0
console.log(`nor([0, 0, 0]) = ${nor([0, 0, 0])}`); // 1
console.log();

// Arithmetic circuits
console.log('4. Arithmetic Circuits:');
console.log('Half Adder:');
console.log(`halfAdder(0, 0) = ${JSON.stringify(halfAdder(0, 0))}`); // {sum: 0, carry: 0}
console.log(`halfAdder(0, 1) = ${JSON.stringify(halfAdder(0, 1))}`); // {sum: 1, carry: 0}
console.log(`halfAdder(1, 0) = ${JSON.stringify(halfAdder(1, 0))}`); // {sum: 1, carry: 0}
console.log(`halfAdder(1, 1) = ${JSON.stringify(halfAdder(1, 1))}`); // {sum: 0, carry: 1}
console.log();

console.log('Full Adder:');
console.log(`fullAdder(0, 0, 0) = ${JSON.stringify(fullAdder(0, 0, 0))}`); // {sum: 0, carry: 0}
console.log(`fullAdder(0, 1, 1) = ${JSON.stringify(fullAdder(0, 1, 1))}`); // {sum: 0, carry: 1}
console.log(`fullAdder(1, 1, 0) = ${JSON.stringify(fullAdder(1, 1, 0))}`); // {sum: 0, carry: 1}
console.log(`fullAdder(1, 1, 1) = ${JSON.stringify(fullAdder(1, 1, 1))}`); // {sum: 1, carry: 1}
console.log();

// Data routing circuits
console.log('5. Data Routing Circuits:');
console.log('Multiplexer (2-to-1):');
console.log(`mux([0, 1], [0]) = ${mux([0, 1], [0])}`); // 0 (select input 0)
console.log(`mux([0, 1], [1]) = ${mux([0, 1], [1])}`); // 1 (select input 1)
console.log();

console.log('Multiplexer (4-to-1):');
console.log(`mux([0, 1, 0, 1], [0, 0]) = ${mux([0, 1, 0, 1], [0, 0])}`); // 0 (select input 0)
console.log(`mux([0, 1, 0, 1], [0, 1]) = ${mux([0, 1, 0, 1], [0, 1])}`); // 1 (select input 1)
console.log(`mux([0, 1, 0, 1], [1, 0]) = ${mux([0, 1, 0, 1], [1, 0])}`); // 0 (select input 2)
console.log(`mux([0, 1, 0, 1], [1, 1]) = ${mux([0, 1, 0, 1], [1, 1])}`); // 1 (select input 3)
console.log();

console.log('Demultiplexer:');
console.log(`demux(1, [0]) = [${demux(1, [0]).join(', ')}]`); // [1, 0] (route to output 0)
console.log(`demux(1, [1]) = [${demux(1, [1]).join(', ')}]`); // [0, 1] (route to output 1)
console.log(`demux(1, [1, 0]) = [${demux(1, [1, 0]).join(', ')}]`); // [0, 0, 1, 0] (route to output 2)
console.log();

// Encoding/Decoding circuits
console.log('6. Encoding/Decoding Circuits:');
console.log('Binary Encoder:');
console.log(`encoder([1, 0, 0, 0]) = [${encoder([1, 0, 0, 0]).join(', ')}]`); // [0, 0] (input 0 active)
console.log(`encoder([0, 1, 0, 0]) = [${encoder([0, 1, 0, 0]).join(', ')}]`); // [0, 1] (input 1 active)
console.log(`encoder([0, 0, 1, 0]) = [${encoder([0, 0, 1, 0]).join(', ')}]`); // [1, 0] (input 2 active)
console.log(`encoder([0, 0, 0, 1]) = [${encoder([0, 0, 0, 1]).join(', ')}]`); // [1, 1] (input 3 active)
console.log();

console.log('Binary Decoder:');
console.log(`decoder([0, 0]) = [${decoder([0, 0]).join(', ')}]`); // [1, 0, 0, 0] (activate output 0)
console.log(`decoder([0, 1]) = [${decoder([0, 1]).join(', ')}]`); // [0, 1, 0, 0] (activate output 1)
console.log(`decoder([1, 0]) = [${decoder([1, 0]).join(', ')}]`); // [0, 0, 1, 0] (activate output 2)
console.log(`decoder([1, 1]) = [${decoder([1, 1]).join(', ')}]`); // [0, 0, 0, 1] (activate output 3)
console.log();

console.log('Priority Encoder:');
console.log(`priorityEncoder([0, 0, 0, 0]) = ${JSON.stringify(priorityEncoder([0, 0, 0, 0]))}`); // {output: [0, 0], valid: 0}
console.log(`priorityEncoder([1, 0, 0, 0]) = ${JSON.stringify(priorityEncoder([1, 0, 0, 0]))}`); // {output: [0, 0], valid: 1}
console.log(`priorityEncoder([1, 1, 0, 0]) = ${JSON.stringify(priorityEncoder([1, 1, 0, 0]))}`); // {output: [0, 1], valid: 1} (higher priority)
console.log(`priorityEncoder([1, 1, 1, 1]) = ${JSON.stringify(priorityEncoder([1, 1, 1, 1]))}`); // {output: [1, 1], valid: 1} (highest priority)
console.log();

// Truth table generation
console.log('7. Truth Table Generation:');
console.log('AND gate truth table:');
const andTable = truthTable(2, (inputs) => and(inputs));
console.log('A | B | Output');
console.log('--|---|-------');
andTable.forEach((row) => {
  console.log(`${row.inputs.join(' | ')} | ${row.output}`);
});
console.log();

console.log('XOR gate truth table:');
const xorTable = truthTable(2, (inputs) => xor(inputs));
console.log('A | B | Output');
console.log('--|---|-------');
xorTable.forEach((row) => {
  console.log(`${row.inputs.join(' | ')} | ${row.output}`);
});
console.log();

// Practical digital circuit examples
console.log('8. Practical Digital Circuit Examples:');

// Binary addition using full adders
console.log('4-bit binary addition using full adders:');
function add4Bit(a, b) {
  const result = [];
  let carry = 0;

  for (let i = 0; i < 4; i++) {
    const sum = fullAdder(a[i], b[i], carry);
    result[i] = sum.sum;
    carry = sum.carry;
  }

  return { result, carry };
}

const num1 = [1, 0, 1, 0]; // 5 in binary (LSB first)
const num2 = [1, 1, 0, 0]; // 3 in binary (LSB first)
const addition = add4Bit(num1, num2);

console.log(
  `${num1.reverse().join('')} (5) + ${num2.reverse().join('')} (3) = ${addition.result.reverse().join('')} (8), carry: ${addition.carry}`,
);
console.log();

// Memory address decoding
console.log('Memory address decoding (2-bit address):');
function memoryDecoder(address, enable) {
  if (!enable) return [0, 0, 0, 0];
  return decoder(address);
}

console.log(`Address 00, Enable=1: [${memoryDecoder([0, 0], 1).join(', ')}]`); // Select memory location 0
console.log(`Address 01, Enable=1: [${memoryDecoder([0, 1], 1).join(', ')}]`); // Select memory location 1
console.log(`Address 10, Enable=0: [${memoryDecoder([1, 0], 0).join(', ')}]`); // No selection (disabled)
console.log();

// Traffic light controller logic
console.log('Traffic light controller logic:');
function trafficLight(sensor1, sensor2, timer) {
  // Simplified logic: green if any sensor active and timer allows
  const greenNS = and([or([sensor1, sensor2]), timer]);
  const greenEW = and([or([sensor1, sensor2]), not(timer)]);
  const redNS = not(greenNS);
  const redEW = not(greenEW);

  return {
    northSouth: { red: redNS, green: greenNS },
    eastWest: { red: redEW, green: greenEW },
  };
}

console.log('Traffic scenarios:');
console.log(`No cars, Timer=0: ${JSON.stringify(trafficLight(0, 0, 0))}`);
console.log(`Car on sensor 1, Timer=1: ${JSON.stringify(trafficLight(1, 0, 1))}`);
console.log(`Car on sensor 2, Timer=0: ${JSON.stringify(trafficLight(0, 1, 0))}`);
console.log();

console.log('=== All logic gates examples completed! ===\n');
