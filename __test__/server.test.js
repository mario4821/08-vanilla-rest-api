'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('POST request to /api/dragon', () => {
  test('should respond with creation of new dragon', () => superagent.post(`:${testPort}/api/dragon`)
    .send(mockResource)
    .then((res) => {
      mockId = res.body.id;
      expect(res.status).toEqual(201);
    }));
});

describe('GET /api/v1/track', () => {
  it('should respond with a previously created track', () => superagent.get(`:${testPort}/api/v1/track?id=${mockId}`)
    .then((res) => {
      expect(res.body.title).toEqual(mockResource.title);
      expect(res.body.content).toEqual(mockResource.content);
      expect(res.status).toEqual(200);
    }));
});

describe('VALID request to the API', () => {
  describe('POST /api/v1/track', () => {
    it('should respond with status 201 and create a new track', () => superagent.post(`:${testPort}/api/v1/track`)
      .send(mockResource)
      .then((res) => {
        mockID = res.body.id;
        expect(res.body.title).toEqual(mockResource.title);
        expect(res.body.content).toEqual(mockResource.content);
        expect(res.status).toEqual(201);
      }));
  });
});
describe('INVALID request to the API', () => {
  describe('GET /api/v1/track', () => {
    it('should err out with 404 status code for not sending anything', () => superagent.get(':5000/track')
      .query({})
      .then(() => {})
      .catch((err) => {
        expect(err.status).toEqual(404);
        expect(err).toBeTruthy();
      }));
  });
  it('should err out with 400 status code for not sending anything', () => superagent.get(':5000/track')
    .query({})
    .then(() => {})
    .catch((err) => {
      expect(err.status).toEqual(400);
      expect(err).toBeTruthy();
    }));
}); it('should err out with 404 status code for not sending anything', () => superagent.get(':5000/track')
  .query({})
  .then(() => {})
  .catch((err) => {
    expect(err.status).toEqual(404);
    expect(err).toBeTruthy();
  }));

