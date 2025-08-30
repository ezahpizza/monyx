const express = require('express');
const router = express.Router();
const {
    parseTransactionFromText,
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transaction.controller');
const { validate } = require('../middlewares/validation.middleware');
const { transactionSchema, parseTransactionSchema } = require('../utils/validationSchemas');


router.post('/parse', validate(parseTransactionSchema), parseTransactionFromText);
router.route('/').post(validate(transactionSchema), createTransaction).get(getTransactions);
router.route('/:id').put(validate(transactionSchema), updateTransaction).delete(deleteTransaction);

module.exports = router;
