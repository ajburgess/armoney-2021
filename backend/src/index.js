const express = require('express');
const cors = require('cors');
const accountRoutes = require('./routes/account-routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/account', accountRoutes);

const port = process.env.PORT || 8100;
express.listen(port, () => {
  console.log('Listening...');
});
