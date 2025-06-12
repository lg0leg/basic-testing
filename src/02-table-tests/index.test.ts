import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: -1, action: Action.Add, expected: 1 },
  { a: 3, b: -4, action: Action.Add, expected: -1 },
  { a: 'a', b: 2, action: Action.Add, expected: null },

  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 5, b: -2, action: Action.Subtract, expected: 7 },
  { a: 5, b: 0, action: Action.Subtract, expected: 5 },
  { a: 'a', b: 2, action: Action.Subtract, expected: null },

  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 5, b: -2, action: Action.Multiply, expected: -10 },
  { a: -5, b: -5, action: Action.Multiply, expected: 25 },
  { a: 'a', b: 2, action: Action.Multiply, expected: null },

  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: -2, action: Action.Divide, expected: -3 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 'a', b: 2, action: Action.Divide, expected: null },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  { a: 4, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 'a', b: 2, action: Action.Exponentiate, expected: null },

  { a: 1, b: 1, action: '55', expected: null },
  { a: 5, b: -2, action: null, expected: null },
  { a: -5, b: 2, action: 'err', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$action($a, $b) should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
