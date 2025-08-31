const OCRService = require('../services/ocr.service');
const { parseTransactionWithDate } = require('../services/gemini.service');

/**
 * @desc    OCR + parse transaction from receipt image
 * @route   POST /api/transactions/ocr
 * @access  Private
 */
const ocrAndParseTransaction = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // OCR: extract text from image
        const rawText = await OCRService.extractText(req.file.buffer);
        // System date for context
        const systemDate = new Date().toISOString();
        // Pass to Gemini parser (with system date)
        const parsed = await parseTransactionWithDate(rawText, systemDate);
        res.json({ rawText, parsed });
    } catch (error) {
        console.error('Error in ocrAndParseTransaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { ocrAndParseTransaction };
