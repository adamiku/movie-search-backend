import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';

dotenv.config({ path: __dirname + '/.env.local' });

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/movies', async (req: Request, res: Response) => {
  return res.json({ message: 'ok' });
});

app.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
