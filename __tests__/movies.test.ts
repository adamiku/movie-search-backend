import { NextFunction, Request, Response } from 'express';
import { deleteMoviesCache, getMovies } from '../src/controllers/movies';
import * as db from '../src/db';

describe('getMovies controller', () => {
  it('should return movies data', async () => {
    const req = {
      query: { query: 'example', page: '1' }
    } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(db, 'getOrSetCache').mockResolvedValueOnce({
      data: { movies: ['movie1', 'movie2'], cached: false }
    });

    await getMovies(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      data: {
        movies: ['movie1', 'movie2'],
        cached: false
      }
    });
  });

  it('should handle errors and call next', async () => {
    const req = { query: { page: '1' } } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest
      .spyOn(db, 'getOrSetCache')
      .mockRejectedValueOnce(new Error('Test error'));

    await getMovies(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('Test error'));
  });
});

describe('deleteMoviesCache controller', () => {
  it('should clear the cache and return success message', async () => {
    const req = {} as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(db.cache, 'clear').mockReturnValue();

    await deleteMoviesCache(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ message: 'DB is cleared' });
  });

  it('should handle errors and call next', async () => {
    const req = {} as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    jest.spyOn(db.cache, 'clear').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    await deleteMoviesCache(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('Test error'));
  });
});
