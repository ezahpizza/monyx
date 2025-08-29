const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const transactionRoutes = require('./transaction.routes');
const analyticsRoutes = require('./analytics.routes');

router.use('/auth', authRoutes);
router.use('/api/transactions', transactionRoutes);
router.use('/api/analytics', analyticsRoutes);

module.exports = router;
