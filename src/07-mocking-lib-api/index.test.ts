import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relPath = '/posts';
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const response = {
    data: [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident ',
        body: 'quia et suscipit\nsuscipit recusandae',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae',
      },
    ],
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.mocked(axios.create).mockReturnValue(axios);
    jest.mocked(axios.get).mockResolvedValue(response);
    jest.runOnlyPendingTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relPath);
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relPath);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(relPath);
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi(relPath);
    expect(res).toEqual(response.data);
  });
});
