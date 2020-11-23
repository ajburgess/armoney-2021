const setupMongoose = require('./setup-mongoose');
const expect = require('expect');
const {Account, Transaction} = require('../src/models/model');

describe('Transaction', function() {
  setupMongoose();

  beforeEach(async function() {
    account1 = await Account.create({name: 'Account 1', balance: 500.00});
    await Account.create({name: 'Account 2', balance: -100});
  });

  it('can create transaction', async function() {
    const t1 = await Transaction.create({
      date: '2020-07-18',
      amount: 50.00,
      description: 'Birthday money',
      account: account1._id,
    });
    const t = await Transaction.findById(t1._id);
    expect(t).toMatchObject({
      date: new Date('2020-07-18'),
      amount: 50.00,
      description: 'Birthday money',
      account: account1._id,
    });
  });
});
