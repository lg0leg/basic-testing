import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(500);
    expect(acc.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(500);
    expect(() => acc.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(500);
    const acc2 = getBankAccount(0);
    expect(() => acc1.transfer(1000, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(500);
    expect(() => acc.transfer(300, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(500);
    acc.deposit(300);
    expect(acc.getBalance()).toBe(800);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(500);
    acc.withdraw(300);
    expect(acc.getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(500);
    const acc2 = getBankAccount(0);
    acc1.transfer(100, acc2);
    expect(acc1.getBalance()).toBe(400);
    expect(acc2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(500);

    for (let i = 0; i < 10; i++) {
      const result = await acc.fetchBalance();
      if (result !== null) {
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(100);
        return;
      } else {
        expect(result).toBeNull;
      }
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(50);
    acc.fetchBalance = jest.fn().mockResolvedValue(50);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(50);
    acc.fetchBalance = jest.fn().mockResolvedValue(null);
    expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
