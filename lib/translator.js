import { translate } from "@vitalets/google-translate-api";
import { franc } from "franc";

export function detectLanguage(text) {
  const lang = franc(text);
  return lang === "hin" ? "hi" : "en";
}

export async function toEnglish(text, isHindi) {
  if (!isHindi) return text;
  const res = await translate(text, { from: "hi", to: "en" });
  return res.text;
}

export async function toHindi(text) {
  const res = await translate(text, { from: "en", to: "hi" });
  return res.text;
}
