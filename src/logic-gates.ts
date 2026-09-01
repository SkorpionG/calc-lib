/**
 * Logic gate functions for electrical engineering and digital circuit design
 */

import { parseNumberInput } from './number-input.js';

/**
 * Type for logic values (0 or 1)
 */
export type LogicValue = 0 | 1;

/**
 * Type for logic inputs (can be numbers, strings, or booleans)
 */
export type LogicInput = number | string | boolean;

/**
 * Converts input to logic value (0 or 1)
 * @param input - Input value to convert
 * @returns 0 or 1
 */
function toLogicValue(input: LogicInput): LogicValue {
  if (typeof input === 'boolean') {
    return input ? 1 : 0;
  }

  const num = parseNumberInput(input);

  if (isNaN(num)) {
    throw new Error('Invalid logic input: must be a valid number, boolean, or numeric string');
  }

  // Any non-zero number is considered logic 1, zero is logic 0
  return num !== 0 ? 1 : 0;
}

/**
 * AND gate - outputs 1 only when all inputs are 1
 *
 * @param inputs - Array of logic inputs
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * and([1, 1])        // 1
 * and([1, 0])        // 0
 * and([1, 1, 1])     // 1
 * and([true, false]) // 0
 * ```
 */
export function and(inputs: LogicInput[]): LogicValue {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new Error('AND gate requires at least one input');
  }

  return inputs.every((input) => toLogicValue(input) === 1) ? 1 : 0;
}

/**
 * OR gate - outputs 1 when at least one input is 1
 *
 * @param inputs - Array of logic inputs
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * or([0, 1])         // 1
 * or([0, 0])         // 0
 * or([1, 1, 0])      // 1
 * or([false, true])  // 1
 * ```
 */
export function or(inputs: LogicInput[]): LogicValue {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new Error('OR gate requires at least one input');
  }

  return inputs.some((input) => toLogicValue(input) === 1) ? 1 : 0;
}

/**
 * NOT gate - inverts the input (0 becomes 1, 1 becomes 0)
 *
 * @param input - Logic input
 * @returns Inverted logic output (0 or 1)
 *
 * @example
 * ```typescript
 * not(1)       // 0
 * not(0)       // 1
 * not(true)    // 0
 * not(false)   // 1
 * ```
 */
export function not(input: LogicInput): LogicValue {
  return toLogicValue(input) === 1 ? 0 : 1;
}

/**
 * NAND gate - NOT AND (inverted AND gate)
 *
 * @param inputs - Array of logic inputs
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * nand([1, 1])       // 0
 * nand([1, 0])       // 1
 * nand([0, 0])       // 1
 * ```
 */
export function nand(inputs: LogicInput[]): LogicValue {
  return not(and(inputs));
}

/**
 * NOR gate - NOT OR (inverted OR gate)
 *
 * @param inputs - Array of logic inputs
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * nor([0, 0])        // 1
 * nor([0, 1])        // 0
 * nor([1, 1])        // 0
 * ```
 */
export function nor(inputs: LogicInput[]): LogicValue {
  return not(or(inputs));
}

/**
 * XOR gate - Exclusive OR (outputs 1 when inputs are different)
 *
 * @param inputs - Array of logic inputs (typically 2)
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * xor([0, 1])        // 1
 * xor([1, 0])        // 1
 * xor([1, 1])        // 0
 * xor([0, 0])        // 0
 * ```
 */
export function xor(inputs: LogicInput[]): LogicValue {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new Error('XOR gate requires at least one input');
  }

  const logicInputs = inputs.map(toLogicValue);
  const onesCount = logicInputs.filter((val) => val === 1).length;

  // XOR is true when odd number of inputs are 1
  return onesCount % 2 === 1 ? 1 : 0;
}

/**
 * XNOR gate - Exclusive NOR (NOT XOR, outputs 1 when inputs are the same)
 *
 * @param inputs - Array of logic inputs (typically 2)
 * @returns Logic output (0 or 1)
 *
 * @example
 * ```typescript
 * xnor([0, 0])       // 1
 * xnor([1, 1])       // 1
 * xnor([0, 1])       // 0
 * xnor([1, 0])       // 0
 * ```
 */
export function xnor(inputs: LogicInput[]): LogicValue {
  return not(xor(inputs));
}

/**
 * Buffer gate - outputs the same as input (used for signal amplification/isolation)
 *
 * @param input - Logic input
 * @returns Same logic output (0 or 1)
 *
 * @example
 * ```typescript
 * buffer(1)          // 1
 * buffer(0)          // 0
 * buffer(true)       // 1
 * ```
 */
export function buffer(input: LogicInput): LogicValue {
  return toLogicValue(input);
}

/**
 * Half adder - adds two single bits, returns sum and carry
 *
 * @param a - First bit
 * @param b - Second bit
 * @returns Object with sum and carry bits
 *
 * @example
 * ```typescript
 * halfAdder(0, 0)    // { sum: 0, carry: 0 }
 * halfAdder(0, 1)    // { sum: 1, carry: 0 }
 * halfAdder(1, 1)    // { sum: 0, carry: 1 }
 * ```
 */
export function halfAdder(a: LogicInput, b: LogicInput): { sum: LogicValue; carry: LogicValue } {
  const bitA = toLogicValue(a);
  const bitB = toLogicValue(b);

  return {
    sum: xor([bitA, bitB]),
    carry: and([bitA, bitB]),
  };
}

/**
 * Full adder - adds two bits plus carry input, returns sum and carry output
 *
 * @param a - First bit
 * @param b - Second bit
 * @param carryIn - Carry input bit
 * @returns Object with sum and carry bits
 *
 * @example
 * ```typescript
 * fullAdder(1, 1, 1) // { sum: 1, carry: 1 }
 * fullAdder(1, 0, 1) // { sum: 0, carry: 1 }
 * fullAdder(0, 0, 1) // { sum: 1, carry: 0 }
 * ```
 */
export function fullAdder(
  a: LogicInput,
  b: LogicInput,
  carryIn: LogicInput,
): { sum: LogicValue; carry: LogicValue } {
  const bitA = toLogicValue(a);
  const bitB = toLogicValue(b);
  const bitCarryIn = toLogicValue(carryIn);

  const sum1 = xor([bitA, bitB]);
  const carry1 = and([bitA, bitB]);

  const sum = xor([sum1, bitCarryIn]);
  const carry2 = and([sum1, bitCarryIn]);

  return {
    sum,
    carry: or([carry1, carry2]),
  };
}

/**
 * Multiplexer (MUX) - selects one of multiple inputs based on select lines
 *
 * @param inputs - Array of data inputs
 * @param select - Array of select bits (determines which input to output)
 * @returns Selected input value
 *
 * @example
 * ```typescript
 * mux([0, 1, 0, 1], [0, 0])  // 0 (selects input 0)
 * mux([0, 1, 0, 1], [1, 0])  // 1 (selects input 1)
 * mux([0, 1, 0, 1], [0, 1])  // 0 (selects input 2)
 * mux([0, 1, 0, 1], [1, 1])  // 1 (selects input 3)
 * ```
 */
export function mux(inputs: LogicInput[], select: LogicInput[]): LogicValue {
  if (!Array.isArray(inputs) || !Array.isArray(select)) {
    throw new Error('MUX requires arrays for inputs and select lines');
  }

  const selectBits = select.map(toLogicValue);
  const expectedInputs = Math.pow(2, selectBits.length);

  if (inputs.length !== expectedInputs) {
    throw new Error(
      `MUX with ${selectBits.length} select lines requires ${expectedInputs} inputs, got ${inputs.length}`,
    );
  }

  // Convert select bits to decimal index
  let index = 0;
  for (let i = 0; i < selectBits.length; i++) {
    index += selectBits[i] * Math.pow(2, i);
  }

  return toLogicValue(inputs[index]);
}

/**
 * Demultiplexer (DEMUX) - routes input to one of multiple outputs based on select lines
 *
 * @param input - Data input
 * @param select - Array of select bits (determines which output gets the input)
 * @returns Array of outputs (only one will be active)
 *
 * @example
 * ```typescript
 * demux(1, [0, 0])   // [1, 0, 0, 0] (routes to output 0)
 * demux(1, [1, 0])   // [0, 1, 0, 0] (routes to output 1)
 * demux(1, [0, 1])   // [0, 0, 1, 0] (routes to output 2)
 * ```
 */
export function demux(input: LogicInput, select: LogicInput[]): LogicValue[] {
  if (!Array.isArray(select)) {
    throw new Error('DEMUX requires array for select lines');
  }

  if (select.length === 0) {
    throw new Error('DEMUX requires at least one select line');
  }

  const inputBit = toLogicValue(input);
  const selectBits = select.map(toLogicValue);
  const numOutputs = Math.pow(2, selectBits.length);

  // Convert select bits to decimal index
  let activeIndex = 0;
  for (let i = 0; i < selectBits.length; i++) {
    activeIndex += selectBits[i] * Math.pow(2, i);
  }

  // Create output array with all zeros except the selected output
  const outputs: LogicValue[] = new Array<LogicValue>(numOutputs).fill(0);
  outputs[activeIndex] = inputBit;

  return outputs;
}

/**
 * Decoder - converts binary input to one-hot output
 *
 * @param inputs - Array of binary input bits
 * @param enable - Optional enable input (default: true)
 * @returns Array of decoded outputs (one-hot encoding)
 *
 * @example
 * ```typescript
 * decoder([0, 0])    // [1, 0, 0, 0] (binary 00 -> output 0 active)
 * decoder([1, 0])    // [0, 1, 0, 0] (binary 01 -> output 1 active)
 * decoder([0, 1])    // [0, 0, 1, 0] (binary 10 -> output 2 active)
 * decoder([1, 1])    // [0, 0, 0, 1] (binary 11 -> output 3 active)
 * ```
 */
export function decoder(inputs: LogicInput[], enable: LogicInput = true): LogicValue[] {
  if (!Array.isArray(inputs)) {
    throw new Error('Decoder requires array for inputs');
  }

  if (inputs.length === 0) {
    throw new Error('Decoder requires at least one input');
  }

  const enableBit = toLogicValue(enable);
  if (enableBit === 0) {
    // If disabled, all outputs are 0
    return new Array<LogicValue>(Math.pow(2, inputs.length)).fill(0);
  }

  const inputBits = inputs.map(toLogicValue);
  const numOutputs = Math.pow(2, inputBits.length);

  // Convert input bits to decimal index
  let activeIndex = 0;
  for (let i = 0; i < inputBits.length; i++) {
    activeIndex += inputBits[i] * Math.pow(2, i);
  }

  // Create output array with all zeros except the decoded output
  const outputs: LogicValue[] = new Array<LogicValue>(numOutputs).fill(0);
  outputs[activeIndex] = 1;

  return outputs;
}

/**
 * Encoder - converts one-hot input to binary output
 *
 * @param inputs - Array of one-hot inputs
 * @returns Array of binary output bits
 *
 * @example
 * ```typescript
 * encoder([1, 0, 0, 0])  // [0, 0] (input 0 active -> binary 00)
 * encoder([0, 1, 0, 0])  // [1, 0] (input 1 active -> binary 01)
 * encoder([0, 0, 1, 0])  // [0, 1] (input 2 active -> binary 10)
 * encoder([0, 0, 0, 1])  // [1, 1] (input 3 active -> binary 11)
 * ```
 */
export function encoder(inputs: LogicInput[]): LogicValue[] {
  if (!Array.isArray(inputs)) {
    throw new Error('Encoder requires array for inputs');
  }

  const inputBits = inputs.map(toLogicValue);

  // Validate power-of-2 input count for proper encoding
  if (inputs.length > 0 && (inputs.length & (inputs.length - 1)) !== 0) {
    throw new Error('Encoder requires a power-of-2 number of inputs');
  }

  const activeInputs = inputBits.filter((bit) => bit === 1).length;

  if (activeInputs === 0) {
    // No active inputs - return all zeros
    const outputSize = Math.ceil(Math.log2(inputs.length));
    return new Array<LogicValue>(outputSize).fill(0);
  }

  if (activeInputs > 1) {
    throw new Error('Encoder requires exactly one active input (one-hot encoding)');
  }

  // Find the index of the active input
  const activeIndex = inputBits.findIndex((bit) => bit === 1);

  // Convert index to binary
  const outputSize = Math.ceil(Math.log2(inputs.length));
  const outputs: LogicValue[] = [];

  for (let i = 0; i < outputSize; i++) {
    outputs[i] = ((activeIndex >> i) & 1) as LogicValue;
  }

  return outputs;
}

/**
 * Priority encoder - encodes the highest priority active input
 *
 * @param inputs - Array of inputs (higher index = higher priority)
 * @returns Object with binary output and valid flag
 *
 * @example
 * ```typescript
 * priorityEncoder([1, 0, 1, 0])  // { output: [0, 1], valid: 1 } (input 2 has priority)
 * priorityEncoder([1, 1, 0, 0])  // { output: [1, 0], valid: 1 } (input 1 has priority)
 * priorityEncoder([0, 0, 0, 0])  // { output: [0, 0], valid: 0 } (no active inputs)
 * ```
 */
export function priorityEncoder(inputs: LogicInput[]): { output: LogicValue[]; valid: LogicValue } {
  if (!Array.isArray(inputs)) {
    throw new Error('Priority encoder requires array for inputs');
  }

  const inputBits = inputs.map(toLogicValue);

  // Validate power-of-2 input count
  if (inputs.length > 0 && (inputs.length & (inputs.length - 1)) !== 0) {
    throw new Error('Priority encoder requires a power-of-2 number of inputs');
  }

  // Find the highest priority active input (highest index)
  let highestActiveIndex = -1;
  for (let i = inputBits.length - 1; i >= 0; i--) {
    if (inputBits[i] === 1) {
      highestActiveIndex = i;
      break;
    }
  }

  const outputSize = Math.ceil(Math.log2(inputs.length));

  if (highestActiveIndex === -1) {
    // No active inputs
    return {
      output: new Array<LogicValue>(outputSize).fill(0),
      valid: 0,
    };
  }

  // Convert index to binary
  const outputs: LogicValue[] = [];
  for (let i = 0; i < outputSize; i++) {
    outputs[i] = ((highestActiveIndex >> i) & 1) as LogicValue;
  }

  return {
    output: outputs,
    valid: 1,
  };
}

/**
 * Generates truth table for a logic function
 *
 * @param numInputs - Number of input variables
 * @param logicFunction - Function that takes array of inputs and returns output
 * @returns Array of truth table rows
 *
 * @example
 * ```typescript
 * const andTable = truthTable(2, (inputs) => and(inputs));
 * // [
 * //   { inputs: [0, 0], output: 0 },
 * //   { inputs: [1, 0], output: 0 },
 * //   { inputs: [0, 1], output: 0 },
 * //   { inputs: [1, 1], output: 1 }
 * // ]
 * ```
 */
export function truthTable(
  numInputs: number,
  logicFunction: (inputs: LogicValue[]) => LogicValue,
): { inputs: LogicValue[]; output: LogicValue }[] {
  if (numInputs < 1 || numInputs > 10) {
    throw new Error('Number of inputs must be between 1 and 10');
  }

  const numRows = Math.pow(2, numInputs);
  const table: { inputs: LogicValue[]; output: LogicValue }[] = [];

  for (let i = 0; i < numRows; i++) {
    const inputs: LogicValue[] = [];

    // Generate binary representation of i
    for (let j = 0; j < numInputs; j++) {
      inputs[j] = ((i >> j) & 1) as LogicValue;
    }

    const output = logicFunction(inputs);
    table.push({ inputs, output });
  }

  return table;
}
