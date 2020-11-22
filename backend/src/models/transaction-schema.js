const { Schema } = require('mongoose');

const TransactionSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) { return v != 0.00 },
            message: "Transactions must be for a non-zero amount"
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
});

module.exports = TransactionSchema;