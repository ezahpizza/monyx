const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Parses a natural language transaction string using the Gemini API.
 * @param {string} input - The natural language transaction input.
 * @returns {Promise<object>} The parsed transaction data.
 */
async function parseTransaction(input) {
    try {
        const prompt = `Parse the following transaction input and return a JSON object with "amount", "category", "description", and "type" (either "income" or "expense"). Ensure the amount is a number. Category should be one of: Food, Transport, Shopping, Bills, Entertainment, Health, Groceries, Other. Description should be a concise summary. Input: "${input}"`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = '';
        if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            text = result.candidates[0].content.parts[0].text || '';
        }

        if (!text) {
            throw new Error('Empty or invalid response from Gemini API');
        }

        // Extract JSON string from the response
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        let jsonString = '';
        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1].trim();
        } else {
            // Fallback if no ```json block is found, try to parse the whole text
            jsonString = text.trim();
        }

        let parsedData;
        try {
            parsedData = JSON.parse(jsonString);
        } catch (e) {
            throw new Error('Failed to parse Gemini response as JSON: ' + jsonString);
        }

        // Add a confidence score
        parsedData.confidence = 0.95; // Placeholder confidence

        return parsedData;
    } catch (error) {
        console.error('Error parsing transaction with Gemini API:', error);
        return { error: 'Unable to parse transaction' };
    }
}


/**
 * Parses a transaction string with system date and optional ocrDate using Gemini API.
 * @param {string} inputText
 * @param {string} systemDate - ISO string
 * @param {string} [ocrDate] - ISO string (optional)
 * @returns {Promise<object>} The parsed transaction data.
 */
async function parseTransactionWithDate(inputText, systemDate, ocrDate) {
    try {
        const payload = {
            inputText,
            systemDate,
        };
        if (ocrDate) payload.ocrDate = ocrDate;
        const prompt = `Given the following receipt or transaction text, system date, and (if available) detected receipt date, extract a JSON object with keys: amount (number), category (Food, Transport, Shopping, Bills, Entertainment, Health, Groceries, Gas, Other), description (concise summary), date (ISO 8601), and confidence (0-1). Use systemDate to resolve ambiguous dates (e.g., 'yesterday', 'last Monday'). If ocrDate is provided, prefer it for the transaction date.\n\nIMPORTANT: If the transaction is an income (e.g., salary, received, deposit, refund, payment received, etc.), set the type to 'income' and ensure the amount is positive, even if the original amount is negative. If the transaction is an expense (e.g., purchase, payment, withdrawal, bill, etc.), set the type to 'expense' and ensure the amount is positive. Always infer the correct type from the description and category, not just the sign of the amount.\n\nInput: ${JSON.stringify(payload, null, 2)}`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = '';
        if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            text = result.candidates[0].content.parts[0].text || '';
        }
        if (!text) throw new Error('Empty or invalid response from Gemini API');
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        let jsonString = '';
        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1].trim();
        } else {
            jsonString = text.trim();
        }
        let parsedData;
        try {
            parsedData = JSON.parse(jsonString);
        } catch (e) {
            throw new Error('Failed to parse Gemini response as JSON: ' + jsonString);
        }
        if (!('confidence' in parsedData)) parsedData.confidence = 0.93;

        // --- Post-processing: fix type/amount for income/expense based on description/category ---
        if (parsedData && typeof parsedData === 'object') {
            const desc = (parsedData.description || '').toLowerCase();
            const cat = (parsedData.category || '').toLowerCase();
            // Keywords for income (prioritize salary/bonus/received)
            const incomeKeywords = ['salary', 'received', 'deposit', 'refund', 'bonus', 'interest', 'reimbursement', 'income'];
            // Keywords for expense
            const expenseKeywords = ['purchase', 'withdrawal', 'bill', 'spent', 'expense', 'shopping', 'food', 'transport', 'groceries', 'entertainment', 'health', 'gas'];

            // If salary/bonus/received/other income keywords present, always set to income
            if (incomeKeywords.some(k => desc.includes(k) || cat.includes(k))) {
                parsedData.type = 'income';
                if (parsedData.amount && parsedData.amount < 0) parsedData.amount = Math.abs(parsedData.amount);
            } else if (expenseKeywords.some(k => desc.includes(k) || cat.includes(k))) {
                // Only set to expense if no income keyword present
                parsedData.type = 'expense';
                if (parsedData.amount && parsedData.amount < 0) parsedData.amount = Math.abs(parsedData.amount);
            } else if (desc.includes('payment') && desc.includes('salary')) {
                // Special case: 'salary payment' should be income
                parsedData.type = 'income';
                if (parsedData.amount && parsedData.amount < 0) parsedData.amount = Math.abs(parsedData.amount);
            }
        }
        return parsedData;
    } catch (error) {
        console.error('Error parsing transaction with Gemini API:', error);
        return { error: 'Unable to parse transaction' };
    }
}

/**
 * Analyzes spending habits from transaction data using Gemini API.
 * @param {Array} transactions - Array of transaction objects.
 * @param {string} systemDate - Current system date in ISO string.
 * @returns {Promise<object>} The spending habits analysis.
 */
async function analyzeSpending(transactions, systemDate) {
    try {
        const payload = {
            systemDate,
            transactions: transactions.map(t => ({
                amount: t.amount,
                category: t.category,
                description: t.description,
                date: t.date.toISOString(),
                type: t.type
            }))
        };

        const prompt = `Analyze the user's spending habits based on the provided transaction data. Focus on the last 60 days of data. Provide insights in the following JSON format:

{
  "patterns": "A brief summary of key spending categories and patterns.",
  "recurringExpenses": "List of recurring expenses, e.g., 'Netflix $15 monthly, Gym $40 monthly'.",
  "spikes": "Any unusual spending spikes or high one-time purchases.",
  "suggestions": "Personalized suggestions for budgeting or savings."
}

Ensure the response is a valid JSON object. Keep each field concise but informative.

Transaction Data: ${JSON.stringify(payload, null, 2)}`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let text = '';
        if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            text = result.candidates[0].content.parts[0].text || '';
        }

        if (!text) {
            throw new Error('Empty or invalid response from Gemini API');
        }

        // Extract JSON string from the response
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        let jsonString = '';
        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1].trim();
        } else {
            // Fallback if no ```json block is found, try to parse the whole text
            jsonString = text.trim();
        }

        let analysis;
        try {
            analysis = JSON.parse(jsonString);
        } catch (e) {
            throw new Error('Failed to parse Gemini response as JSON: ' + jsonString);
        }

        return { analysis };
    } catch (error) {
        console.error('Error analyzing spending with Gemini API:', error);
        return {
            analysis: {
                patterns: "Unable to analyze spending at this time.",
                recurringExpenses: "",
                spikes: "",
                suggestions: ""
            }
        };
    }
}


module.exports = { parseTransaction, parseTransactionWithDate, analyzeSpending };
