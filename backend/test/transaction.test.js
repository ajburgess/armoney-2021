const expect = require('expect');
const setup = require('./mongoose-setup');

describe('Transaction', function() {
  let Account; let Transaction;
  let account1;

  setup((model) => ({Account, Transaction} = model));

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
