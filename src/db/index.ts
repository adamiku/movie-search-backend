import { differenceInSeconds } from 'date-fns';

export const cache = new Map();

export async function getOrSetCache<T>(
  key: { [index: string]: string | number },
  cb: Function
): Promise<T> {
  const queriedEntry = cache.get(JSON.stringify(key));
  if (
    queriedEntry &&
    differenceInSeconds(new Date(), new Date(queriedEntry.expiration)) < 120
  ) {
    queriedEntry.cacheHitCount += 1;
    return {
      ...queriedEntry.data,
      cacheHitCount: queriedEntry.cacheHitCount,
      cached: true
    };
  }
  const freshData = await cb();
  cache.set(JSON.stringify(key), {
    data: freshData,
    expiration: new Date(),
    cacheHitCount: 0
  });
  return { ...freshData, cached: false, cacheHitCount: 0 };
}
