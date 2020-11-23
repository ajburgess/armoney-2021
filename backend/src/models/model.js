const mongoose = require('mongoose');
const AccountSchema = require('./account-schema');
const TenantSchema = require('./tenant-schema');
const TransactionSchema = require('./transaction-schema');
const UserSchema = require('./user-schema');

module.exports = {
  Tenant: mongoose.model('Tenant', TenantSchema),
  User: mongoose.model('User', UserSchema),
  Account: mongoose.model('Account', AccountSchema),
  Transaction: mongoose.model('Transaction', TransactionSchema),
};
