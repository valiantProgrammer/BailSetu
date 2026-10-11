import { GoogleGenerativeAI } from "@google/generative-ai";
import ipcMap from "./ipc_label_map.json" assert { type: "json" };

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });

// Verify ipcMap import
console.log("✅ ipcMap imported successfully. Total categories:", Object.keys(ipcMap).length);
console.log("📋 Sample categories:", Object.keys(ipcMap).slice(0, 5));

export async function geminiFallback(message) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not set. Fallback skipped.");
      return [];
    }

    // Create a list of IPC categories for the prompt
    const categoryList = Object.entries(ipcMap)
      .map(([label, desc]) => `- "${desc}": ${label}`)
      .join("\n");

    const prompt = `You are an expert legal AI assistant for Indian law. Analyze the user's message and identify the most relevant IPC sections.

**Instructions:**
1. Read the message carefully.
2. Compare against the legal sections below.
3. Return ONLY a valid JSON array of objects with "category" and "score" keys.
4. If the message is irrelevant to any legal matter, return an empty array: []

**Legal Sections:**
${categoryList}

**User's Message:**
"${message}"

**Your JSON Output:**`;

    const response = await model.generateContent(prompt);
    const responseText = response.response.text();
    
    // Clean up the response
    const cleaned = responseText
      .trim()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);

    if (
      Array.isArray(result) &&
      result.every((item) => "category" in item && "score" in item)
    ) {
      return result;
    }

    return [];
  } catch (error) {
    console.error("Gemini fallback error:", error);
    return [];
  }
}
