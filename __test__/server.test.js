'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
const mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/note', () => {
    it('should respond with status 201 and create a new note', () => superagent.post(`:${testPort}/api/v1/note`)
      .send(mockResource)
      .then((res) => {
        mockID = res.body.id;
        expect(res.body.title).toEqual(mockResource.title);
        expect(res.body.content).toEqual(mockResource.content);
        expect(res.status).toEqual(201);
      }));
  });
});

describe('GET /api/v1/note', () => {
  it('should respond with a previously created note', () => superagent.get(`:${testPort}/api/v1/note?id=${mockId}`)
    .then((res) => {
      expect(res.body.title).toEqual(mockResource.title);
      expect(res.body.content).toEqual(mockResource.content);
      expect(res.status).toEqual(200);
    }));
});
