'use strict';

const logger = require('../lib/logger');
const Track = require('../model/track');
const storage = require('../lib/storage');

module.exports = function routeTrack(router) {
  router.post('/api/v1/track', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-TRACK: POST /api/v1/trakc');

    try {
      const newTrack = new Track(req.body.title, req.body.content);
      storage.create('Track', newTrack)
        .then((track) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(track));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-NOTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/track', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }
    storage.fetchOne('Note', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
