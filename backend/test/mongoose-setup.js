/* globals beforeEach, afterEach */

const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');

module.exports = function(callback) {
  let connection;
  let model;

  beforeEach(async function() {
    const url = global.mongoUrl;
    connection = await mongoose.createConnection(url,
        {useNewUrlParser: true, useUnifiedTopology: true});
    connection = connection.useDb(uuid());
    model = require('../src/models/model')(connection);
    callback(model);
  });

  afterEach(async function() {
    await connection.close();
  });
};
