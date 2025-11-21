import { GoogleGenAI } from "@google/genai";
import { ArtStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePoemImage = async (poem: string, style: ArtStyle): Promise<string> => {
  try {
    // Construct a descriptive prompt for the model
    // We combine the user's poem with the selected style to guide the generation.
    const prompt = `
      Create a high-quality, artistic image based on the following Chinese poem:
      "${poem}"

      Art Style: ${style}
      
      Visual requirements:
      - Capture the mood and atmosphere of the poem.
      - High resolution, detailed, and aesthetically pleasing.
      - If the poem describes nature, focus on the landscape and lighting.
      - No text should be overlaid on the image itself.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        // We don't use imageConfig here for Flash Image as it's simpler,
        // but the model is capable of following the text prompt for style.
      }
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No content generated.");
    }

    const parts = candidates[0].content.parts;
    let base64Image = "";

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        // Found the image
        const mimeType = part.inlineData.mimeType || "image/png";
        base64Image = `data:${mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!base64Image) {
      // Fallback: sometimes the model might refuse or return only text if it triggers safety filters
      // or if the prompt was interpreted as a text request.
      // Check if there is text explaining why
      const textPart = parts.find(p => p.text);
      if (textPart) {
        throw new Error(`Generation failed: ${textPart.text}`);
      }
      throw new Error("No image data found in the response.");
    }

    return base64Image;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};