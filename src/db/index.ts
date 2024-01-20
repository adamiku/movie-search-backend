import { differenceInSeconds } from 'date-fns';

export const cache = new Map();

export async function getOrSetCache<T>(key: object, cb: Function): Promise<T> {
  const moviesData = cache.get(JSON.stringify(key));
  if (
    moviesData &&
    differenceInSeconds(new Date(), new Date(moviesData.expiration)) < 121
  ) {
    return { ...moviesData.movies, cached: true };
  }
  const freshData = await cb();
  cache.set(JSON.stringify(key), {
    movies: freshData,
    expiration: new Date()
  });
  return { ...freshData, cached: false };
}
