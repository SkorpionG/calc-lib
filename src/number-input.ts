/**
 * Shared validation for numeric inputs
 */

const NUMERIC_STRING_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;

/**
 * Parses a finite number or a complete decimal numeric string
 *
 * @param value - Numeric input to parse
 * @returns Parsed number, or NaN when the complete input is not a finite decimal number
 *
 * @example
 * ```typescript
 * parseNumberInput('1.20e3') // 1200
 * parseNumberInput('12junk') // NaN
 * parseNumberInput(Infinity) // NaN
 * ```
 */
export function parseNumberInput(value: number | string): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN;
  }

  const trimmed = value.trim();
  if (!NUMERIC_STRING_PATTERN.test(trimmed)) {
    return NaN;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : NaN;
}
