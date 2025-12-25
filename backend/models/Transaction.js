const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text description']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    type: {
        type: String,
        required: [true, 'Please add a transaction type (income/expense)'],
        enum: ['income', 'expense']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
