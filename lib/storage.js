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

storage.fetchOne = function fetchOne(schema, id) {
  return new Promise ((resolve, reject) => {
    if (!schema) return reject(new Error('Expected schema name'));
    if (!id) return reject(new Error('ID expected'));
    if (!memory[schema]) return reject(new Error('Schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('Item not found'));
    }
    return resolve(item);
  });
};

storage.fetchAll = function fetchAll(schema) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Expeceted schema name'));
    if (!memory[schema]) return reject(new Error('Schema not found'));

    const allItems = Object.values(memory[schema]);
    const notes = allItems.map(note => note.id);

    if (!notes) {
      return reject(new Error('Object not found'));
    }
    return resolve(notes);
  });
};

storage.delete = function del(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Expected schema name'));
    if (!id) return reject(new Error('Expected ID'));
    if (!memory[schema]) return reject(new Error('Schema not found'));

    const item = memory[schema][id];
    delete memory[schema][id];
      
    return resolve(item);
  });
};
