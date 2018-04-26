'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const urlParser = require('.url-parser');

const Router = module.exports = function router() {
  this.routes = {
    GET: {
//examples
//'/api/v1/note': (req, res) => {},
//'/api/v1/note: id': (req, res) => {},
    },
    POST: {},
    PUT: {},
    DELETE: {}.
  };
};

Router.prototype.get = function get(endpoint, callback) {
  //debug(`Router: GET ${endpoint} mounted`)
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function put(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.delete = function delete(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route() {
  return (req, res) => {
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
    .then(() => {
      if (typeof this.routes[req.method][req.url].pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Route Not Foun FROM HERE');
      res.end();
    })
    .catch((err) => {
      if(err instanceof SyntaxError) {
        res.writeHead(404, {'Content-Type': 'text/plain' });
        res.write('Route Not Found');
        res.end();
        return undefined;
      }
      logger.log(logger.ERROR, JSON.stringify(err));
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return undefined;
    });
  };
};