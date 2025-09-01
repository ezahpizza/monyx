const express = require('express');
const router = express.Router();

const {
    getSummary,
    getCategorySpending,
    getSpendingTrends,
    getSpendingHabits,
} = require('../controllers/analytics.controller');

router.get('/summary', getSummary);
router.get('/categories', getCategorySpending);
router.get('/trends', getSpendingTrends);
router.get('/habits', getSpendingHabits);

module.exports = router;
