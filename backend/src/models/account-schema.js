const {Schema} = require('mongoose');
const TransactionSchema = require('./transaction-schema');

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.00,
    validate: {
      validator: function(v) {
        return this.isNew ? v == 0.00 : true;
      },
      message: 'Accounts must have a zero balance initially.',
    },
  },
});

// When an account is created, create an opening balance transaction if needed
AccountSchema.static('create', async function(account) {
  const Account = this.model('Account');
  const Transaction = this.model('Transaction');
  // Initially create the account with zero balance,
  // as when we add the opening balance transaction, the balance will be updated
  const dbAccount = new Account({...account, balance: 0.00});
  await dbAccount.save();
  if (account.balance && account.balance != 0.00) {
    await Transaction.create({
      date: account.date,
      amount: account.balance,
      description: 'Opening balance',
      account: dbAccount._id,
    });
  }
  dbAccount.balance = account.balance || 0.00;
  return dbAccount;
});

// When a transaction is added, update the account's balance
TransactionSchema.pre('save', async function() {
  const Account = this.model('Account');
  if (this.isNew) {
    const account = await Account.findById(this.account);
    account.balance += this.amount;
    await account.save();
  }
});

module.exports = AccountSchema;
