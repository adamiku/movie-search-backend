import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log('the token: ', process.env.TMDB_API_TOKEN);

export const TMDBMovieApi = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
  }
});
