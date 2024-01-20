import { NextFunction, Router, type Request, type Response } from 'express';
import { cache, getOrSetCache } from '../db';
import { fetchMovies } from '../lib';
import { logger } from '../logger';
import { TMDBMovieResponse } from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const { query, page } = req.query;
  const normalizedPage = Number(page) || 1;
  const normalizedQuery = String(page);

  try {
    const data = await getOrSetCache<TMDBMovieResponse & { cached: boolean }>(
      { query, page: normalizedPage },
      () => fetchMovies(normalizedQuery, normalizedPage)
    );
    logger.info('Success', { req, res });
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    cache.clear();
    logger.info('Success', { req, res });
    return res.json({ message: 'DB is cleared' });
  } catch (error) {
    next(error);
  }
});

export default router;
