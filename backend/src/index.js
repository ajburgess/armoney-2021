const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const accountRoutes = require('./routes/account-routes');
const authRoutes = require('./routes/auth-routes');
const errorHandler = require('./middleware/error-handler');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api/account', accountRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

(async function() {
  await mongoose.connect('mongodb://root:example@localhost:27017/armoney',
      {useNewUrlParser: true, useUnifiedTopology: true, authSource: 'admin'});

  const port = process.env.PORT || 8100;
  app.listen(port, () => {
    console.log('Listening...');
  });
})();
