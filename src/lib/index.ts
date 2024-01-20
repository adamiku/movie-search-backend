import { TMDBMovieResponse } from '../models';
import { TMDBMovieApi } from './axios-instances';
import { API_ROUTES } from './routes';

export async function fetchMovies(query: string, page: number) {
  const { data } = await TMDBMovieApi.get<TMDBMovieResponse>(
    API_ROUTES.MOVIE_SEARCH,
    {
      params: {
        query: `${query}`,
        page: `${page ?? 1}`
      }
    }
  );
  return data;
}
