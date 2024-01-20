import axios from 'axios';
import { TMDBMovieResponse } from '../models';
import { TMDBMovieApi } from './axios-instances';
import { API_ROUTES } from './routes';

export async function fetchMovies(query: string, page: number) {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
