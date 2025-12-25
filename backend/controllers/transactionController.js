const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Get Analytics
// @route   GET /api/transactions/analytics
// @access  Private
const getAnalytics = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Category breakdown
    const categories = {};
    transactions.forEach(t => {
        if (t.type === 'expense') {
            categories[t.category] = (categories[t.category] || 0) + t.amount;
        }
    });

    res.status(200).json({
        totalIncome,
        totalExpense,
        balance,
        categories
    });
});

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json(transactions);
});

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
    if (!req.body.text || !req.body.amount || !req.body.category || !req.body.type) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const transaction = await Transaction.create({
        text: req.body.text,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type,
        user: req.user.id
    });

    res.status(200).json(transaction);
});

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(400);
        throw new Error('Transaction not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTransaction);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(400);
        throw new Error('Transaction not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await transaction.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
    getAnalytics
};
