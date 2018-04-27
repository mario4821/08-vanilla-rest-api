'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/dragon', () => {
    it('should respond with status 201 and create a new dragon', () => {
      return superagent.post(`:${testPort}/api/v1/dragon`)
        .send(mockResource)
        .then((res) => {
          mockID = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/dragon', () => {
    it('should respond with a previously created dragon', () => {
      return superagent.get(`:${testPort}/api/v1/dragon?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /api/v1/dragon', () => {
    it('should err out with 404 status code for not sending anything', () => {
      return superagent.get(':5000/dragon')
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
    it('should err out with 400 status code for not sending anything', () => {
      return superagent.get(':5000/dragon')
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    }); 
    it('should err out with 404 status code for not sending anything', () => {
      return superagent.get(`:${testPort}/api/v1/note?id=`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
  describe('POST /api/v1/note', () => {
    it('should err out with 400 when no route exists', () => {
      return superagent.get(':5000/cowsayPage')
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
