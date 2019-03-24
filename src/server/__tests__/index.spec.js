import request from 'supertest';
import app from '../app.js';


describe('Node server', () => {
  it('should return 200 status code', () => {
    return request(app).get('/').expect(200);
  })
});
