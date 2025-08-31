const express = require('express');
const router = express.Router();


const transactionRoutes = require('./transaction.routes');
const analyticsRoutes = require('./analytics.routes');
const ocrRoutes = require('./ocr.routes');

router.use('/api/transactions', transactionRoutes);
router.use('/api/transactions', ocrRoutes); 
router.use('/api/analytics', analyticsRoutes);

module.exports = router;
