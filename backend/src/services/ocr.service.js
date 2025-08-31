// OCRService: Handles OCR using Gemini LLM native image understanding
const { GoogleGenAI } = require('@google/genai');
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

class OCRService {
  /**
   * Extracts text from an image buffer using Gemini LLM native OCR.
   * @param {Buffer} imageBuffer
   * @param {string} [mimeType] - e.g. 'image/jpeg'
   * @returns {Promise<string>} Extracted text
   */
  async extractText(imageBuffer, mimeType = 'image/jpeg') {
    const base64Image = imageBuffer.toString('base64');
    const contents = [
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      { text: 'Extract all text from this receipt or bill image. Return only the raw text, no explanations.' },
    ];
    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    });
    // Try to extract text from result
    let text = '';
    if (result && result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
      text = result.candidates[0].content.parts[0].text || '';
    }
    return text.trim();
  }
}

module.exports = new OCRService();
