import request from 'supertest';
import { app, server } from '../src';

describe('Index.ts tests', () => {
  test('Basic test', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ message: 'Success' });
  });
});

afterAll((done) => {
  server.close();
  done();
});
