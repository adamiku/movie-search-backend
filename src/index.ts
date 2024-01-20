import cors from 'cors';
import { differenceInSeconds } from 'date-fns';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { fetchMovies } from './lib';
import { TMDBMovieResponse } from './models';
dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Success' });
});

app.get('/movies', async (req: Request, res: Response) => {
  const { query, page } = req.query;
  const normalizedPage = Number(page) || 1;
  const normalizedQuery = String(page);

  const data = await getOrSetCache<TMDBMovieResponse & { cached: boolean }>(
    { query, page: normalizedPage },
    () => fetchMovies(normalizedQuery, normalizedPage)
  );
  return res.json(data);
});

const server = app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});

const cache = new Map();

async function getOrSetCache<T>(key: object, cb: Function): Promise<T> {
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

export { app, server };
