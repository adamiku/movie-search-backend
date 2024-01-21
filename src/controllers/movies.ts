import { NextFunction, Request, Response } from 'express';
import { cache, getOrSetCache } from '../db';
import { logger } from '../logger';

import { fetchMovies } from '../lib';
import { TMDBMovieResponse } from '../models';

export async function getMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query, page } = req.query;
  const normalizedPage = Number(page) || 1;
  const normalizedQuery = String(query);

  try {
    const data = await getOrSetCache<TMDBMovieResponse & { cached: boolean }>(
      { query: normalizedQuery, page: normalizedPage },
      () => fetchMovies(normalizedQuery, normalizedPage)
    );
    logger.info('Success', { req, res });
    return res.json(data);
  } catch (error) {
    return next(error);
  }
}

export async function deleteMoviesCache(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    cache.clear();
    logger.info('Success', { req, res });
    return res.json({ message: 'DB is cleared' });
  } catch (error) {
    next(error);
  }
}
