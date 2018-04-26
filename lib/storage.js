'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const memory = {};

storage.create = function create(schema, item) {
  logger.log(logger.INFO, 'STORAGE: Created a new resource');
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create a new item, schema required'));
    if (!item) return reject(new Error('Cannot create a new item, item required'));

    if (!memory[schema]) memory[schema] = {};
    memory[schema][item.id] = item;
    return resolve(item);
  });
};
