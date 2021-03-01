import mongoose from 'mongoose';
import request from 'supertest';

import app from '../src/app';
afterAll(() => {
  mongoose.connection.dropDatabase().then(() => {
    mongoose.connection.close();
  });
});
describe('Server Presence', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'all is well' });
  });

  test('Has a /api/urlshortner endpoint 1', async () => {
    const req = await request(app).get('/api/urlshortner');
    expect(req.status).not.toBe(404);
  });
  test('Has a /api/urlshortner endpoint', async () => {
    const req = await request(app).post('/api/urlshortner');
    expect(req.status).not.toBe(404);
  });
});

describe('Wrong Request', () => {
  test('Returns bad request when no url is provided to be shortned', async () => {
    const req = await request(app).post('/api/urlshortner');
    expect(req.status).toBe(400);
  });

  test('Returns bad request when correct bad url is provided to be shortned ', async () => {
    const req = await request(app).post('/api/urlshortner').send({
      url: 'hdslkdslnknl',
    });
    expect(req.status).toBe(400);
  });

  test('Returns bad request when no short id is provided to be queried', async () => {
    const req = await request(app).get('/api/urlshortner');
    expect(req.status).toBe(400);
  });

  test('Returns Not found when non existent url is requested', async () => {
    const req = await request(app)
      .get('/api/urlshortner')
      .query({ shortId: 'ddsdfsfs' });
    expect(req.status).toBe(404);
  });
});

describe('Correct Request', () => {
  let reply: { shortId: string; url: string };
  test('Returns ok with 201 when correct data is supplied', async () => {
    const req = await request(app).post('/api/urlshortner').send({
      url: 'https://google.com',
    });
    reply = req.body;
    expect(req.status).toBe(201);
    expect(req.body).toHaveProperty('shortId');
  });

  test('Returns 200 when same data is supplied', async () => {
    const req = await request(app).post('/api/urlshortner').send({
      url: 'https://google.com',
    });
    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty('shortId');
  });

  test('Returns redirect when existent url is requested', async () => {
    const req = await request(app)
      .get('/api/urlshortner')
      .query({ shortId: reply.shortId });
    expect(req.status).toBe(302);
  });
});
