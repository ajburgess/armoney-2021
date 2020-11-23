const mongoose = require('mongoose');

const AccountSchema = require('./account-schema');
const TransactionSchema = require('./transaction-schema');

module.exports = {
  Account: mongoose.model('Account', AccountSchema),
  Transaction: mongoose.model('Transaction', TransactionSchema),
};
