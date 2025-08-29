const express = require('express');
const router = express.Router();
const {
    getSummary,
    getCategorySpending,
    getSpendingTrends,
} = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.get('/summary', getSummary);
router.get('/categories', getCategorySpending);
router.get('/trends', getSpendingTrends);

module.exports = router;
