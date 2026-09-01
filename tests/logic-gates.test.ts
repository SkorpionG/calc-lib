/**
 * Tests for logic gate functions
 */

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
} from '../src/logic-gates.js';
import type { LogicInput } from '../src/logic-gates.js';

describe('Basic Logic Gates', () => {
  describe('and', () => {
    test('performs AND operation', () => {
      expect(and([0, 0])).toBe(0);
      expect(and([0, 1])).toBe(0);
      expect(and([1, 0])).toBe(0);
      expect(and([1, 1])).toBe(1);
    });

    test('handles multiple inputs', () => {
      expect(and([1, 1, 1])).toBe(1);
      expect(and([1, 1, 0])).toBe(0);
      expect(and([1, 1, 1, 1])).toBe(1);
    });

    test('handles boolean inputs', () => {
      expect(and([true, true])).toBe(1);
      expect(and([true, false])).toBe(0);
      expect(and([false, false])).toBe(0);
    });

    test('handles string inputs', () => {
      expect(and(['1', '1'])).toBe(1);
      expect(and(['1', '0'])).toBe(0);
    });

    test('throws error for empty input', () => {
      expect(() => and([])).toThrow('AND gate requires at least one input');
    });
  });

  describe('or', () => {
    test('performs OR operation', () => {
      expect(or([0, 0])).toBe(0);
      expect(or([0, 1])).toBe(1);
      expect(or([1, 0])).toBe(1);
      expect(or([1, 1])).toBe(1);
    });

    test('handles multiple inputs', () => {
      expect(or([0, 0, 0])).toBe(0);
      expect(or([0, 0, 1])).toBe(1);
      expect(or([1, 0, 0, 0])).toBe(1);
    });

    test('throws error for empty input', () => {
      expect(() => or([])).toThrow('OR gate requires at least one input');
    });
  });

  describe('not', () => {
    test('performs NOT operation', () => {
      expect(not(0)).toBe(1);
      expect(not(1)).toBe(0);
      expect(not(true)).toBe(0);
      expect(not(false)).toBe(1);
    });

    test('handles numeric values', () => {
      expect(not(5)).toBe(0); // Any non-zero is 1, inverted to 0
      expect(not(0)).toBe(1);
      expect(not(-3)).toBe(0);
    });
  });

  describe('nand', () => {
    test('performs NAND operation', () => {
      expect(nand([0, 0])).toBe(1);
      expect(nand([0, 1])).toBe(1);
      expect(nand([1, 0])).toBe(1);
      expect(nand([1, 1])).toBe(0);
    });
  });

  describe('nor', () => {
    test('performs NOR operation', () => {
      expect(nor([0, 0])).toBe(1);
      expect(nor([0, 1])).toBe(0);
      expect(nor([1, 0])).toBe(0);
      expect(nor([1, 1])).toBe(0);
    });
  });

  describe('xor', () => {
    test('performs XOR operation', () => {
      expect(xor([0, 0])).toBe(0);
      expect(xor([0, 1])).toBe(1);
      expect(xor([1, 0])).toBe(1);
      expect(xor([1, 1])).toBe(0);
    });

    test('handles multiple inputs', () => {
      expect(xor([0, 0, 0])).toBe(0); // Even number of 1s
      expect(xor([0, 0, 1])).toBe(1); // Odd number of 1s
      expect(xor([1, 1, 1])).toBe(1); // Odd number of 1s
      expect(xor([1, 1, 1, 1])).toBe(0); // Even number of 1s
    });

    test('throws error for empty input', () => {
      expect(() => xor([])).toThrow('XOR gate requires at least one input');
    });
  });

  describe('xnor', () => {
    test('performs XNOR operation', () => {
      expect(xnor([0, 0])).toBe(1);
      expect(xnor([0, 1])).toBe(0);
      expect(xnor([1, 0])).toBe(0);
      expect(xnor([1, 1])).toBe(1);
    });
  });

  describe('buffer', () => {
    test('outputs same as input', () => {
      expect(buffer(0)).toBe(0);
      expect(buffer(1)).toBe(1);
      expect(buffer(true)).toBe(1);
      expect(buffer(false)).toBe(0);
    });
  });
});

describe('Arithmetic Circuits', () => {
  describe('halfAdder', () => {
    test('adds two bits', () => {
      expect(halfAdder(0, 0)).toEqual({ sum: 0, carry: 0 });
      expect(halfAdder(0, 1)).toEqual({ sum: 1, carry: 0 });
      expect(halfAdder(1, 0)).toEqual({ sum: 1, carry: 0 });
      expect(halfAdder(1, 1)).toEqual({ sum: 0, carry: 1 });
    });

    test('handles boolean inputs', () => {
      expect(halfAdder(true, true)).toEqual({ sum: 0, carry: 1 });
      expect(halfAdder(true, false)).toEqual({ sum: 1, carry: 0 });
    });
  });

  describe('fullAdder', () => {
    test('adds two bits with carry input', () => {
      expect(fullAdder(0, 0, 0)).toEqual({ sum: 0, carry: 0 });
      expect(fullAdder(0, 0, 1)).toEqual({ sum: 1, carry: 0 });
      expect(fullAdder(0, 1, 0)).toEqual({ sum: 1, carry: 0 });
      expect(fullAdder(0, 1, 1)).toEqual({ sum: 0, carry: 1 });
      expect(fullAdder(1, 0, 0)).toEqual({ sum: 1, carry: 0 });
      expect(fullAdder(1, 0, 1)).toEqual({ sum: 0, carry: 1 });
      expect(fullAdder(1, 1, 0)).toEqual({ sum: 0, carry: 1 });
      expect(fullAdder(1, 1, 1)).toEqual({ sum: 1, carry: 1 });
    });
  });
});

describe('Data Routing Circuits', () => {
  describe('mux', () => {
    test('selects correct input (2-to-1 MUX)', () => {
      expect(mux([0, 1], [0])).toBe(0); // Select input 0
      expect(mux([0, 1], [1])).toBe(1); // Select input 1
    });

    test('selects correct input (4-to-1 MUX)', () => {
      expect(mux([0, 1, 0, 1], [0, 0])).toBe(0); // Select input 0
      expect(mux([0, 1, 0, 1], [1, 0])).toBe(1); // Select input 1
      expect(mux([0, 1, 0, 1], [0, 1])).toBe(0); // Select input 2
      expect(mux([0, 1, 0, 1], [1, 1])).toBe(1); // Select input 3
    });

    test('throws error for mismatched inputs', () => {
      expect(() => mux([0, 1], [0, 0])).toThrow('MUX with 2 select lines requires 4 inputs, got 2');
    });

    test('throws error for empty inputs', () => {
      // 0 select lines implies 2^0=1 expected inputs; 0 provided
      expect(() => mux([], [])).toThrow('MUX with 0 select lines requires 1 inputs, got 0');
    });

    test('throws error for non-array inputs', () => {
      expect(() => mux(null as any, [])).toThrow('MUX requires arrays for inputs and select lines');
      expect(() => mux([], null as any)).toThrow('MUX requires arrays for inputs and select lines');
    });
  });

  describe('demux', () => {
    test('routes input to correct output (1-to-2 DEMUX)', () => {
      expect(demux(1, [0])).toEqual([1, 0]);
      expect(demux(1, [1])).toEqual([0, 1]);
      expect(demux(0, [0])).toEqual([0, 0]);
    });

    test('routes input to correct output (1-to-4 DEMUX)', () => {
      expect(demux(1, [0, 0])).toEqual([1, 0, 0, 0]);
      expect(demux(1, [1, 0])).toEqual([0, 1, 0, 0]);
      expect(demux(1, [0, 1])).toEqual([0, 0, 1, 0]);
      expect(demux(1, [1, 1])).toEqual([0, 0, 0, 1]);
    });

    test('throws error for empty select lines', () => {
      expect(() => demux(1, [])).toThrow('DEMUX requires at least one select line');
    });

    test('throws error for non-array select', () => {
      expect(() => demux(1, null as any)).toThrow('DEMUX requires array for select lines');
    });
  });
});

describe('Encoding/Decoding Circuits', () => {
  describe('decoder', () => {
    test('decodes 2-bit input', () => {
      expect(decoder([0, 0])).toEqual([1, 0, 0, 0]);
      expect(decoder([1, 0])).toEqual([0, 1, 0, 0]);
      expect(decoder([0, 1])).toEqual([0, 0, 1, 0]);
      expect(decoder([1, 1])).toEqual([0, 0, 0, 1]);
    });

    test('handles enable input', () => {
      expect(decoder([1, 1], 0)).toEqual([0, 0, 0, 0]); // Disabled
      expect(decoder([1, 1], 1)).toEqual([0, 0, 0, 1]); // Enabled
    });

    test('throws error for empty inputs', () => {
      expect(() => decoder([])).toThrow('Decoder requires at least one input');
    });

    test('throws error for non-array inputs', () => {
      expect(() => decoder(null as any)).toThrow('Decoder requires array for inputs');
    });
  });

  describe('encoder', () => {
    test('encodes one-hot input', () => {
      expect(encoder([1, 0, 0, 0])).toEqual([0, 0]);
      expect(encoder([0, 1, 0, 0])).toEqual([1, 0]);
      expect(encoder([0, 0, 1, 0])).toEqual([0, 1]);
      expect(encoder([0, 0, 0, 1])).toEqual([1, 1]);
    });

    test('handles no active inputs', () => {
      expect(encoder([0, 0, 0, 0])).toEqual([0, 0]);
    });

    test('throws error for multiple active inputs', () => {
      expect(() => encoder([1, 1, 0, 0])).toThrow('Encoder requires exactly one active input');
    });

    test('throws error for non-power-of-2 input count', () => {
      expect(() => encoder([0, 0, 0])).toThrow('Encoder requires a power-of-2 number of inputs');
    });

    test('throws error for non-array inputs', () => {
      expect(() => encoder(null as any)).toThrow('Encoder requires array for inputs');
    });
  });

  describe('priorityEncoder', () => {
    test('encodes highest priority input', () => {
      expect(priorityEncoder([1, 0, 1, 0])).toEqual({ output: [0, 1], valid: 1 }); // Input 2 has priority
      expect(priorityEncoder([1, 1, 0, 0])).toEqual({ output: [1, 0], valid: 1 }); // Input 1 has priority
      expect(priorityEncoder([0, 0, 0, 1])).toEqual({ output: [1, 1], valid: 1 }); // Input 3 has priority
    });

    test('handles no active inputs', () => {
      expect(priorityEncoder([0, 0, 0, 0])).toEqual({ output: [0, 0], valid: 0 });
    });

    test('throws error for non-power-of-2 input count', () => {
      expect(() => priorityEncoder([0, 0, 0])).toThrow(
        'Priority encoder requires a power-of-2 number of inputs',
      );
    });

    test('throws error for non-array inputs', () => {
      expect(() => priorityEncoder(null as any)).toThrow(
        'Priority encoder requires array for inputs',
      );
    });
  });
});

describe('Truth Table Generation', () => {
  describe('truthTable', () => {
    test('generates AND gate truth table', () => {
      const table = truthTable(2, (inputs: LogicInput[]) => and(inputs));
      expect(table).toEqual([
        { inputs: [0, 0], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 1], output: 1 },
      ]);
    });

    test('generates OR gate truth table', () => {
      const table = truthTable(2, (inputs: LogicInput[]) => or(inputs));
      expect(table).toEqual([
        { inputs: [0, 0], output: 0 },
        { inputs: [1, 0], output: 1 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 1], output: 1 },
      ]);
    });

    test('generates XOR gate truth table', () => {
      const table = truthTable(2, (inputs: LogicInput[]) => xor(inputs));
      expect(table).toEqual([
        { inputs: [0, 0], output: 0 },
        { inputs: [1, 0], output: 1 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 1], output: 0 },
      ]);
    });

    test('handles single input', () => {
      const table = truthTable(1, (inputs: LogicInput[]) => not(inputs[0]!));
      expect(table).toEqual([
        { inputs: [0], output: 1 },
        { inputs: [1], output: 0 },
      ]);
    });

    test('throws error for invalid input count', () => {
      expect(() => truthTable(0, (inputs: LogicInput[]) => and(inputs))).toThrow(
        'Number of inputs must be between 1 and 10',
      );
      expect(() => truthTable(11, (inputs: LogicInput[]) => and(inputs))).toThrow(
        'Number of inputs must be between 1 and 10',
      );
    });
  });
});

describe('Input validation', () => {
  test('handles invalid logic inputs', () => {
    expect(() => and(['invalid'])).toThrow('Invalid logic input');
    expect(() => or([NaN])).toThrow('Invalid logic input');
  });

  test('converts various inputs to logic values', () => {
    expect(and([0, '0', false])).toBe(0);
    expect(or([1, '1', true])).toBe(1);
    expect(and([2, '3', true])).toBe(1); // Non-zero numbers are 1
  });
});
