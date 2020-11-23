const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');

module.exports = async function() {
  this.beforeEach(async function() {
    await mongoose.connect(global.mongoUrl + '/' + uuid(),
        {useNewUrlParser: true, useUnifiedTopology: true,
          authSource: 'admin'});
  });

  this.afterEach(async function() {
    await mongoose.connection.close();
  });
};

