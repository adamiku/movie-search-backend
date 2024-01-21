import request from 'supertest';
import { app, server } from '../src';

describe('Index.ts tests', () => {
  test('Basic test', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.body).toEqual({ message: 'Success' });
  });

  test('Test healthcheck endpoint', async () => {
    const res = await request(app).get('/healthcheck').expect(200);
    expect(res.body).toEqual({ message: 'Success' });
  });
});

afterAll((done) => {
  server.close();
  done();
});
