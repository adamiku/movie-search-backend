import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import routes from './controllers';
import { logger } from './logger';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();

logger.info('Logger init');

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Success' });
});

app.get('/healthcheck', (req: Request, res: Response) => {
  return res.json({ message: 'Success' });
});

app.use('/', routes);

app.use(errorHandlerMiddleware);

const server = app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});

export { app, server };
