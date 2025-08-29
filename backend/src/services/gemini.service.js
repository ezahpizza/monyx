const { GoogleGenerativeAI } = require('@google/genai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Parses a natural language transaction string using the Gemini API.
 * @param {string} input - The natural language transaction input.
 * @returns {Promise<object>} The parsed transaction data.
 */
async function parseTransaction(input) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Parse the following transaction input and return a JSON object with "amount", "category", "description", and "type" (either "income" or "expense"). Ensure the amount is a number. Category should be one of: Food, Transport, Shopping, Bills, Entertainment, Health, Groceries, Other. Description should be a concise summary. Input: "${input}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        
        // Clean the response to get a valid JSON string
        const jsonString = text.replace(/```json|```/g, '').trim();
        const parsedData = JSON.parse(jsonString);

        // Add a confidence score
        parsedData.confidence = 0.95; // Placeholder confidence

        return parsedData;
    } catch (error) {
        console.error('Error parsing transaction with Gemini API:', error);
        return { error: 'Unable to parse transaction' };
    }
}

module.exports = { parseTransaction };
