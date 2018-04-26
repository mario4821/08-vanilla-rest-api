'use strict';

const logger = require('./logger');
const url = require('url');
const queryString = require('querystring');

module.exports = functions urlParser(req) {

  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  return Promise.resolve(req);
};