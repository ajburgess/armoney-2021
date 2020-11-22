const AccountSchema = require("./account-schema");
const TransactionSchema = require("./transaction-schema");

module.exports = function (connection) {
    return {
        Account: connection.model('Account', AccountSchema),
        Transaction: connection.model('Transaction', TransactionSchema)
    };
}

