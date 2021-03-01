import mongoose from 'mongoose';
import request from 'supertest';

import app from '../src/app';
afterAll(() => {
  mongoose.connection.close();
});
describe('Server', () => {
  test('Has a /api endpoint', () => {
    return request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'all is well' });
  });
});
