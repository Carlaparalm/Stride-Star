
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client using the environment variable directly as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIRouteSuggestion = async (userMood: string, fitnessLevel: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugiere una ruta creativa para caminar/correr basada en un ánimo ${userMood} y un nivel de fitness ${fitnessLevel}. Devuelve un objeto JSON con el nombre de la ruta, descripción inspiradora y 3 puntos de interés temáticos reales que existan en una ciudad.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            pois: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    // Directly access the .text property of GenerateContentResponse
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating AI route:", error);
    return null;
  }
};

export const searchPlacesWithMaps = async (query: string, lat?: number, lng?: number) => {
  try {
    // gemini-2.5-flash is the correct model for Google Maps grounding support
    const modelName = "gemini-2.5-flash";
    
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (lat !== undefined && lng !== undefined) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Busca lugares reales y puntos de interés específicos relacionados con "${query}". Explica por qué son buenos para una ruta de ejercicio y proporciona información útil para un corredor.`,
      config,
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text,
      groundingChunks
    };
  } catch (error: any) {
    console.error("Error searching with Google Maps tool:", error);
    
    // Graceful error handling for missing tool or entity not found errors
    if (error.message?.includes("404") || error.status === "NOT_FOUND") {
      console.warn("La herramienta Google Maps devolvió 404. Realizando fallback a búsqueda de texto.");
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Enumera algunos lugares reales interesantes para visitar en una ruta de ejercicio relacionados con "${query}".`,
        });
        return {
          text: fallbackResponse.text,
          groundingChunks: []
        };
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
