const Transaction = require('../models/transaction.model');
const { parseTransaction } = require('../services/gemini.service');

/**
 * @desc    Parse transaction from natural language
 * @route   POST /api/transactions/parse
 * @access  Private
 */
const parseTransactionFromText = async (req, res) => {
    console.log('parseTransactionFromText req.user:', req.user);
    const { text } = req.body;
    try {
        const parsedData = await parseTransaction(text);
        if (parsedData.error) {
            return res.status(400).json(parsedData);
        }
        res.json(parsedData);
    } catch (error) {
        console.error('Error in parseTransactionFromText:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Create a new transaction
 * @route   POST /api/transactions
 * @access  Private
 */
const mongoose = require('mongoose');
const createTransaction = async (req, res) => {
    const { amount, category, description, type, date, userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    try {
        const transaction = await Transaction.create({
            userId,
            amount,
            category,
            description,
            type,
            date,
        });
        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error in createTransaction:', error);
        res.status(400).json({ error: 'Invalid transaction data' });
    }
};

/**
 * @desc    Get all transactions for a user
 * @route   GET /api/transactions
 * @access  Private
 */
const getTransactions = async (req, res) => {
    const { category, startDate, endDate, search, userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const query = { userId };
    if (category) {
        query.category = category;
    }
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (search) {
        query.description = { $regex: search, $options: 'i' };
    }
    try {
        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Error in getTransactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Update a transaction
 * @route   PUT /api/transactions/:id
 * @access  Private
 */
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { amount, category, description, type, date, userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    try {
        const transaction = await Transaction.findOne({ _id: id, userId });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }
        transaction.amount = amount || transaction.amount;
        transaction.category = category || transaction.category;
        transaction.description = description || transaction.description;
        transaction.type = type || transaction.type;
        transaction.date = date || transaction.date;
        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        console.error('Error in updateTransaction:', error);
        res.status(400).json({ error: 'Invalid transaction data' });
    }
};

/**
 * @desc    Delete a transaction
 * @route   DELETE /api/transactions/:id
 * @access  Private
 */
const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    try {
        const transaction = await Transaction.findOne({ _id: id, userId });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }
        await transaction.remove();
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        console.error('Error in deleteTransaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    parseTransactionFromText,
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
};