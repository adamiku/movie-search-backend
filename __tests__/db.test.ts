import { differenceInSeconds } from 'date-fns';
import { cache, getOrSetCache } from '../src/db';

jest.mock('date-fns', () => ({
  differenceInSeconds: jest.fn()
}));

describe('getOrSetCache', () => {
  it('should return cached data if present and not expired', async () => {
    const key = { query: 'example', page: 1 };
    const cb = jest.fn();

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 60);

    const cachedEntry = {
      data: { example: 'cachedData' },
      expiration: expirationDate,
      cacheHitCount: 0
    };

    cache.set(JSON.stringify(key), cachedEntry);

    (differenceInSeconds as jest.Mock).mockReturnValueOnce(30); // less than 120 seconds

    const result = await getOrSetCache(key, cb);

    expect(result).toEqual({
      ...cachedEntry.data,
      cached: true,
      cacheHitCount: 1
    });
    expect(cb).not.toHaveBeenCalled();
  });

  it('should call the provided callback and cache fresh data when not in cache', async () => {
    const key = { query: 'example', page: 1 };
    const cb = jest.fn().mockResolvedValue({ example: 'freshData' });

    const result = await getOrSetCache(key, cb);

    expect(result).toEqual({
      example: 'freshData',
      cached: false,
      cacheHitCount: 0
    });
    expect(cb).toHaveBeenCalled();

    const cachedEntry = cache.get(JSON.stringify(key));
    expect(cachedEntry).toBeDefined();
    expect(cachedEntry.data).toEqual({ example: 'freshData' });
  });

  it('should increase cacheHitCount for cached data on subsequent calls when in cache and not expired', async () => {
    const key = { query: 'example', page: 1 };
    const cb = jest.fn().mockResolvedValue({ example: 'freshData' });

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 60);

    const cachedEntry = {
      data: { example: 'cachedData' },
      expiration: expirationDate,
      cacheHitCount: 0
    };

    cache.set(JSON.stringify(key), cachedEntry); // first call set it in the db

    (differenceInSeconds as jest.Mock).mockReturnValueOnce(30); // less than 120 seconds

    await getOrSetCache(key, cb); // second call

    const updatedCachedEntry = cache.get(JSON.stringify(key));
    expect(updatedCachedEntry!.cacheHitCount).toBe(1);
  });

  it('should reset cacheHitCount when fresh data is fetched', async () => {
    const key = { query: 'example', page: 1 };
    const cb = jest.fn();

    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 60);

    const cachedEntry = {
      data: { example: 'cachedData' },
      expiration: expirationDate,
      cacheHitCount: 0
    };

    cache.set(JSON.stringify(key), cachedEntry); // first call set it in the db

    (differenceInSeconds as jest.Mock).mockReturnValueOnce(300); // more than 120 seconds

    await getOrSetCache(key, cb); // second call

    const updatedCachedEntry = cache.get(JSON.stringify(key));
    expect(updatedCachedEntry!.cacheHitCount).toBe(0);
  });
  afterEach(() => {
    cache.clear();
    jest.clearAllMocks();
  });
});
