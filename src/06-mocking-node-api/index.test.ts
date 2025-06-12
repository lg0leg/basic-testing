import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockPathToFile = 'test.txt';
    const mockFullPath = '/mock/path/to/file/test.txt';

    (join as jest.Mock).mockReturnValue(mockFullPath);
    await readFileAsynchronously(mockPathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, mockPathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockPathToFile = 'test.txt';

    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockPathToFile = 'test.txt';
    const mockContent = 'file content';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));
    const result = await readFileAsynchronously(mockPathToFile);
    expect(result).toBe('file content');
  });
});
