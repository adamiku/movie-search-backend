import axios from 'axios';
import { NextFunction, type Request, type Response } from 'express';
import { logger } from '../logger';

export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  // Handle the error
  logger.error('Error', { req, res });
  if (axios.isAxiosError(error)) {
    console.error(error.message);
    return res.status(error.response?.status ?? 400).json(error);
  } else {
    console.log('Executing error handling middleware');
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};
