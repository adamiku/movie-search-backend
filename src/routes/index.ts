import { Router } from 'express';
import movies from './movies';

const router = Router();

router.use('/movies', movies);

export default router;
