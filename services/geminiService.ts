import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FeedbackData, IeltsPart } from "../types";

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    scoreEstimate: {
      type: Type.STRING,
      description: "Estimated IELTS band score for this specific response (e.g. '6.5', '7.0').",
    },
    transcription: {
      type: Type.STRING,
      description: "Transcription of what the user said.",
    },
    betterVersion: {
      type: Type.STRING,
      description: "A polished, Band 8.0+ version of the user's answer using idiomatic English.",
    },
    keyVocabulary: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 high-level vocabulary words or collocations used in the better version.",
    },
    pronunciationTips: {
      type: Type.STRING,
      description: "Brief feedback on flow, intonation, or hesitation.",
    },
    superordinateTerms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "For Part 3, suggest superordinate/abstract concepts (e.g., 'transportation' instead of 'cars'). Empty for Part 1/2.",
    },
  },
  required: ["scoreEstimate", "transcription", "betterVersion", "keyVocabulary", "pronunciationTips"],
};

export const analyzeSpeaking = async (
  audioBase64: string,
  question: string,
  part: IeltsPart
): Promise<FeedbackData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Customizing system instructions based on the IELTS Part
  let specificInstruction = "";
  if (part === IeltsPart.Part3) {
    specificInstruction = `
      CRITICAL FOR PART 3: 
      1. You MUST identify opportunities to use "superordinate terms" (abstract nouns or broader categories). 
      2. If the user lists examples (e.g., "apples and oranges"), teach them to use the category (e.g., "agricultural produce" or "fruit varieties").
      3. Populate the 'superordinateTerms' field in the JSON with these suggestions.
    `;
  } else {
    specificInstruction = `
      For Part 1 and Part 2, focus on natural collocation, idiomatic phrasal verbs, and connecting words.
    `;
  }

  const prompt = `
    You are a strict IELTS Senior Examiner. 
    The user is answering the following question: "${question}".
    The user is targeting a Band 7.5 or higher.
    
    Task:
    1. Transcribe the user's audio.
    2. Estimate the band score for this specific response.
    3. Rewrite the response to be a perfect Band 8.5+ native-level answer. Keep the core meaning but upgrade the vocabulary and grammar.
    4. Provide specific pronunciation/fluency feedback.
    
    ${specificInstruction}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "audio/wav", // Assuming we send WAV/WEBM that Gemini accepts
              data: audioBase64,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.4, // Lower temperature for more consistent educational feedback
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    return JSON.parse(jsonText) as FeedbackData;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};