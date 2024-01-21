import { Router } from 'express';
import * as moviesController from '../controllers/movies';

const router = Router();

router.get('/', moviesController.getMovies);

router.delete('/', moviesController.deleteMoviesCache);

export default router;
