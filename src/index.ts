import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, type Request, type Response } from 'express';
import { cache, getOrSetCache } from './db';
import { fetchMovies } from './lib';
import { logger } from './logger';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import { TMDBMovieResponse } from './models';

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();

logger.info('Logger init');

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Success' });
});

app.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
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

app.delete('/movies', (req: Request, res: Response, next: NextFunction) => {
  try {
    cache.clear();
    logger.info('Success', { req, res });
    return res.json({ message: 'DB is cleared' });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandlerMiddleware);

const server = app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});

export { app, server };
