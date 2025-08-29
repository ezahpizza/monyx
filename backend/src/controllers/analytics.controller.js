const Transaction = require('../models/transaction.model');

/**
 * @desc    Get financial summary (income, expenses, savings)
 * @route   GET /api/analytics/summary
 * @access  Private
 */
const getSummary = async (req, res) => {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user._id };

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
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Get category-wise spending
 * @route   GET /api/analytics/categories
 * @access  Private
 */
const getCategorySpending = async (req, res) => {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user._id, type: 'expense' };

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
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @desc    Get time-series spending trends
 * @route   GET /api/analytics/trends
 * @access  Private
 */
const getSpendingTrends = async (req, res) => {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user._id, type: 'expense' };

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
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getSummary, getCategorySpending, getSpendingTrends };
