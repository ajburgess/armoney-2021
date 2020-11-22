/* globals describe, it */

const expect = require('expect');
const setup = require('./mongoose-setup');

describe("Account", function () {
    let Account, Transaction;

    setup(model => ({ Account, Transaction } = model));

    it("creates opening balance transaction and sets account balance", async function () {
        const account = await Account.create({
            name: 'Account 1',
            balance: 123.45,
            date: '2020-07-15'
        });
        expect(account).toMatchObject({
            name: 'Account 1',
            balance: 123.45
        });
        const transactions = await Transaction.find();
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toMatchObject({
            date: new Date('2020-07-15'),
            amount: 123.45,
            description: 'Opening balance',
            account: account._id
        });
    });
});