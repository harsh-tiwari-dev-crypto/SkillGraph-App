
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectRequirements = async (description: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Extract the key technical and soft skills from the following project description. Focus on specific, actionable skills. Here is the description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skills: {
              type: Type.ARRAY,
              description: "A list of identified skills.",
              items: {
                type: Type.STRING,
                description: "A single skill."
              },
            },
          },
        },
      },
    });

    const jsonString = response.text;
    if (!jsonString) {
      throw new Error("Empty response from API");
    }

    const parsed = JSON.parse(jsonString);
    if (parsed && Array.isArray(parsed.skills)) {
      return parsed.skills;
    }

    return [];
  } catch (error) {
    console.error("Error analyzing project requirements:", error);
    throw new Error("Failed to analyze project requirements. Please check your API key and network connection.");
  }
};
