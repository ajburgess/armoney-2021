const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const accountRoutes = require('./routes/account-routes');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api/account', accountRoutes);

(async function() {
  await mongoose.connect('mongodb://root:example@localhost:27017',
      {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.connection.useDb('armoney');

  const port = process.env.PORT || 8100;
  app.listen(port, () => {
    console.log('Listening...');
  });
})();
