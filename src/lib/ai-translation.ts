import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_VISION_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  if (!apiKey || !text || targetLanguage === 'en') {
    return text;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are a professional agricultural translator. 
      Translate the following agricultural advice into ${targetLanguage}.
      - Target audience: Rural Indian farmers.
      - Style: Simple, clear, and actionable.
      - Instructions: Keep technical terms in English in brackets where helpful. 
      - Output: Provide ONLY the translated text.
      
      TEXT TO TRANSLATE:
      "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim() || text;
  } catch (error) {
    console.error("AI Translation Error:", error);
    return text; // Fallback to original text
  }
};

/**
 * Specifically for disease analysis results which are often complex objects
 */
export const translateAnalysisResults = async (results: any, targetLanguage: string): Promise<any> => {
  if (targetLanguage === 'en') return results;

  try {
    const stringified = JSON.stringify(results);
    const prompt = `
      You are a professional agricultural data localization expert.
      Translate the following JSON object containing agricultural analysis entirely into ${targetLanguage}.
      - Target audience: Rural Indian farmers.
      - CRITICAL: You MUST translate ALL deeply nested string values (like recommendations, advice, names, or risk levels) into ${targetLanguage}. Do not leave any English text in the values!
      - CRITICAL: Keep all JSON keys exactly as they are in English. ONLY translate the values.
      - Return ONLY the exact structure as valid translated JSON.
      
      JSON TO TRANSLATE:
      ${stringified}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const res = await model.generateContent(prompt);
    const text = await res.response.text();
    
    // Clean potential markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Analysis Translation Error:", error);
    return results;
  }
};
