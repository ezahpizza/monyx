const Transaction = require('../models/transaction.model');
const { analyzeSpending } = require('../services/gemini.service');

/**
 * @desc    Get financial summary (income, expenses, savings)
 * @route   GET /api/analytics/summary
 * @access  Private
 */
const mongoose = require('mongoose');
const getSummary = async (req, res) => {
    let { startDate, endDate, userId, period } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const query = { userId };
    // Simplified period calculation
    if (!(startDate && endDate) && period) {
        const now = new Date();
        if (period === 'weekly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 6);
            startDate = start.toISOString().slice(0, 10);
        } else if (period === 'monthly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 29);
            startDate = start.toISOString().slice(0, 10);
        }
    }
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    try {
        const transactions = await Transaction.find(query);
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);
        const savings = income - expenses;
        res.json({ income, expenses, savings });
    } catch (error) {
        console.error('Error in getSummary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Get category-wise spending
 * @route   GET /api/analytics/categories
 * @access  Private
 */
const getCategorySpending = async (req, res) => {
    let { startDate, endDate, userId, period } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const query = { userId, type: 'expense' };
    // Simplified period calculation
    if (!(startDate && endDate) && period) {
        const now = new Date();
        if (period === 'weekly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 6);
            startDate = start.toISOString().slice(0, 10);
        } else if (period === 'monthly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 29);
            startDate = start.toISOString().slice(0, 10);
        }
    }
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    try {
        const categories = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$category', total: { $sum: '$amount' } } },
            { $project: { name: '$_id', total: 1, _id: 0 } },
        ]);
        res.json(categories);
    } catch (error) {
        console.error('Error in getCategorySpending:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Get time-series spending trends
 * @route   GET /api/analytics/trends
 * @access  Private
 */
const getSpendingTrends = async (req, res) => {
    let { startDate, endDate, userId, period } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    const query = { userId, type: 'expense' };
    // Simplified period calculation
    if (!(startDate && endDate) && period) {
        const now = new Date();
        if (period === 'weekly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 6);
            startDate = start.toISOString().slice(0, 10);
        } else if (period === 'monthly') {
            endDate = now.toISOString().slice(0, 10);
            const start = new Date(now);
            start.setDate(start.getDate() - 29);
            startDate = start.toISOString().slice(0, 10);
        }
    }
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    try {
        const trends = await Transaction.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { _id: 1 } },
            { $project: { date: '$_id', total: 1, _id: 0 } },
        ]);
        res.json(trends);
    } catch (error) {
        console.error('Error in getSpendingTrends:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Get spending habits analysis
 * @route   GET /api/analytics/habits
 * @access  Private
 */
const getSpendingHabits = async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });

    try {
        // Fetch last 60 days of transactions
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 60);

        const transactions = await Transaction.find({
            userId,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: -1 });

        if (transactions.length === 0) {
            return res.json({
                analysis: {
                    patterns: "No transactions found in the last 60 days.",
                    recurringExpenses: "",
                    spikes: "",
                    suggestions: ""
                }
            });
        }

        const systemDate = new Date().toISOString();
        const result = await analyzeSpending(transactions, systemDate);

        res.json(result);
    } catch (error) {
        console.error('Error in getSpendingHabits:', error);
        res.status(500).json({
            analysis: {
                patterns: "Unable to analyze spending at this time.",
                recurringExpenses: "",
                spikes: "",
                suggestions: ""
            }
        });
    }
};

module.exports = { getSummary, getCategorySpending, getSpendingTrends, getSpendingHabits };
