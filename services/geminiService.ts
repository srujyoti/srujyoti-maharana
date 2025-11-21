import { GoogleGenAI } from "@google/genai";

// Initialize client securely
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this client-side demo, we use the env variable directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (
  query: string,
  context: string = ""
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are "Nexus AI", an elite gaming hardware expert and sales assistant for the Nexus Gaming Gear store.
      Your goal is to help gamers choose the best equipment based on their playstyle, budget, and preferences.
      
      Tone: Enthusiastic, knowledgeable, slightly futuristic/cyberpunk, but professional.
      
      Context provided about current store view: ${context}
      
      Keep responses concise (under 100 words unless detailed technical specs are asked).
      If the user asks for recommendations, suggest types of products (e.g., "high-DPI mice for FPS", "mechanical keyboards with red switches").
    `;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble connecting to the Nexus mainframe. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted. My neural link is offline temporarily.";
  }
};