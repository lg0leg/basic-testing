// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toEqual(2);
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Add })).toEqual(3);
    expect(simpleCalculator({ a: -5, b: 2, action: Action.Add })).toEqual(-3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Subtract })).toEqual(
      -1,
    );
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Subtract })).toEqual(
      7,
    );
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Subtract })).toEqual(
      5,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toEqual(
      6,
    );
    expect(simpleCalculator({ a: 5, b: -2, action: Action.Multiply })).toEqual(
      -10,
    );
    expect(simpleCalculator({ a: -5, b: -5, action: Action.Multiply })).toEqual(
      25,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toEqual(3);
    expect(simpleCalculator({ a: 6, b: -2, action: Action.Divide })).toEqual(
      -3,
    );
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Divide })).toEqual(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate }),
    ).toEqual(8);
    expect(
      simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate }),
    ).toEqual(0.5);
    expect(
      simpleCalculator({ a: 4, b: 0, action: Action.Exponentiate }),
    ).toEqual(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: '55' })).toBeNull;
    expect(simpleCalculator({ a: 5, b: -2, action: null })).toBeNull;
    expect(simpleCalculator({ a: -5, b: 2, action: 'err' })).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Add })).toBeNull;
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Subtract }))
      .toBeNull;
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Multiply }))
      .toBeNull;
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Divide })).toBeNull;
    expect(simpleCalculator({ a: 'a', b: 2, action: Action.Exponentiate }))
      .toBeNull;
  });
});
