const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Parses a natural language transaction string using the Gemini API.
 * @param {string} input - The natural language transaction input.
 * @returns {Promise<object>} The parsed transaction data.
 */
async function parseTransaction(input) {
    try {
        console.log('Input to Gemini API:', input);
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

module.exports = { parseTransaction };
