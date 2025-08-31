const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { validate } = require('../middlewares/validation.middleware');
const { ocrTransactionSchema } = require('../utils/validationSchemas');


const { ocrAndParseTransaction } = require('../controllers/ocr.controller');
// POST /api/transactions/ocr
router.post('/ocr', upload.single('file'), validate(ocrTransactionSchema), ocrAndParseTransaction);

module.exports = router;
