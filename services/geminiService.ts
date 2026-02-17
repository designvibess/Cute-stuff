
import { GoogleGenAI } from "@google/genai";
import { PunchCardData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBestiePepTalk(cards: PunchCardData[]) {
  const activeHabits = cards.filter(c => c.status === 'Active').map(c => c.habitName).join(', ');
  
  const systemInstruction = `
    You are Elle, a witty, encouraging, and unapologetically feminine bestie (inspired by Legally Blonde). 
    Your job is to provide a short, 1-2 sentence pep talk for your friend who is tracking habits.
    If they have many habits, encourage them. If they have few, suggest they treat themselves.
    Use words like "fabulous", "iconic", "Harvard", "sparkle", and "What, like it's hard?".
    Keep it stylish and funny.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `My current active habits are: ${activeHabits || 'None yet, I am just starting!'}`,
      config: {
        systemInstruction,
        temperature: 0.9,
      },
    });

    return response.text || "You look gorgeous today! Now go stamp those cards, bestie!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "What, like it's hard? You've got this, gorgeous!";
  }
}
