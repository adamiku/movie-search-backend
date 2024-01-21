import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const TMDBMovieApi = axios.create({
  baseURL: process.env.TMDB_API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
  }
});
