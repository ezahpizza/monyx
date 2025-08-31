const Joi = require('joi');

const transactionSchema = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('income', 'expense').required(),
    date: Joi.date(),
});

const parseTransactionSchema = Joi.object({
    text: Joi.string().required(),
});

const ocrTransactionSchema = Joi.object({}); // No body fields, file is in multipart

module.exports = {
    transactionSchema,
    parseTransactionSchema,
    ocrTransactionSchema,
};
