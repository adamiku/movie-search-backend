import { TMDBMovieApi } from '../src/lib/axios-instances';
import { fetchMovies } from '../src/lib/index';
import { API_ROUTES } from '../src/lib/routes';

jest.mock('../src/lib/axios-instances.ts', () => ({
  TMDBMovieApi: { get: jest.fn() }
}));

describe('fetchMovies', () => {
  it('should fetch movies from TMDB API with the correct parameters', async () => {
    const query = 'example';
    const page = 2;

    const responseData = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' }
      ],
      total_pages: 5
    };

    (TMDBMovieApi.get as jest.Mock).mockResolvedValueOnce({
      data: responseData
    });

    const result = await fetchMovies(query, page);

    expect(TMDBMovieApi.get).toHaveBeenCalledWith(API_ROUTES.MOVIE_SEARCH, {
      params: {
        query: query,
        page: `${page ?? 1}`
      }
    });

    expect(result).toEqual(responseData);
  });
});
