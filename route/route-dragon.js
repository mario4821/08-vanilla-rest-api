'use strict';

const logger = require('../lib/logger');
const Dragon = require('../model/dragon');
const storage = require('../lib/storage');

module.exports = function routeDragon(router) {
  router.post('/api/v1/dragon', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-DRAGON: POST /api/v1/dragon');

    try {
      const newDragon = new Dragon(req.body.title, req.body.content);
      storage.create('Dragon', newDragon)
        .then((dragon) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(dragon));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-DRAGON: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.post('/api/dragon/all', (req, res) => {
    logger.log(logger.INFO, 'DRAGON-ROUTE - POST /api/dragon/all');

    try {
      const newDragon = new Dragon(req.body.title, req.body.content);
      storage.create('Dragon', newDragon)
        .then((dragon) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(dragon));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `DRAGON-ROUTE - Bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request for POST');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/dragon', (req, res) => {
    if (!req.url.query.id) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }
    storage.fetchOne('Dragon', req.url.query.id)
      .then((item) => {
        logger.log(logger.INFO, `in get: ${JSON.stringify(item)}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });

  router.omit('/api/dragon', (req, res) => {
    logger.log('delete');
    if (!req.url.query.id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('No id - request requires an id');
      res.end();
      return undefined;
    }
    logger.log(logger.INFO, 'DRAGON-ROUTE - DELETE /api/dragon');

    try {
      storage.delete('Dragon', req.url.query.id)
        .then((message) => {
          res.writeHead(204, { 'Content-Type': 'text/plain'});
          res.write(message);
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERRO, `DRAGON-ROUTE - Bad Request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain'});
      res.write('Bad delete request');
      res.end();
      return undefined;
    }
    return undefined;
  });
  router.get('/api/dragons/all', (req, res) => {
    storage.fetchAll('Dragon')
      .then((items) => {
        logger.log(logger.INFO, `in get: ${JSON.stringify(items)}`);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(items));
        res.end();
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.write('Resource not found');
        res.end();
      });
    return undefined;
  });
  return undefined;
};

