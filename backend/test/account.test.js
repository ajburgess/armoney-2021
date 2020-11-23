const setupMongoose = require('./setup-mongoose');
const expect = require('expect');
const {Account, Transaction} = require('../src/models/model');

describe('Account', function() {
  setupMongoose();

  it('creates opening balance transaction and sets account balance',
      async function() {
        const account = await Account.create({
          name: 'Account 1',
          balance: 123.45,
          date: '2020-07-15',
        });
        expect(account).toMatchObject({
          name: 'Account 1',
          balance: 123.45,
        });
        const transactions = await Transaction.find();
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toMatchObject({
          date: new Date('2020-07-15'),
          amount: 123.45,
          description: 'Opening balance',
          account: account._id,
        });
      });

  it('creates opening balance transaction and sets account balance',
      async function() {
        const account = await Account.create({
          name: 'Account 1',
          balance: 123.45,
          date: '2020-07-15',
        });
        expect(account).toMatchObject({
          name: 'Account 1',
          balance: 123.45,
        });
        const transactions = await Transaction.find();
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toMatchObject({
          date: new Date('2020-07-15'),
          amount: 123.45,
          description: 'Opening balance',
          account: account._id,
        });
      });
});
