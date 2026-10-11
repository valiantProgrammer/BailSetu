import { NextResponse } from "next/server";
import ipcMap from "@/lib/ipc_label_map.json";
import { loadEmbedder, classifyText } from "@/lib/embedder";
import { detectLanguage, toEnglish, toHindi } from "@/lib/translator";
import { geminiFallback } from "@/lib/gemini";
import { getCollection } from "@/lib/mongo";

export const runtime = "nodejs";

export async function POST(req) {
  const { message } = await req.json();
  if (!message || message.split(" ").length < 2) {
    return NextResponse.json(
      { error: "Message too short" },
      { status: 400 }
    );
  }

  await loadEmbedder();

  const lang = detectLanguage(message);
  const isHindi = lang === "hi";
  const translated = await toEnglish(message, isHindi);

  const similarities = await classifyText(translated);
  similarities.sort((a, b) => b.score - a.score);

  let top = similarities.slice(0, 7).map((x) => ({
    category: ipcMap[x.desc],
    score: Number(x.score.toFixed(4)),
  }));

  const CONFIDENCE = 0.45;
  const RELEVANCE = 0.3;
  let usedFallback = false;

  if (!top.length || top[0].score < CONFIDENCE) {
    usedFallback = true;
    const gemini = await geminiFallback(translated);
    if (gemini.length === 0) {
      return NextResponse.json({
        original_language: lang,
        used_fallback: true,
        matched_categories: [],
        sections: [],
        message: "Not a criminal offense",
      });
    }
    top = gemini;
  }

  const collection = await getCollection();
  const results = [];

  for (const cat of top) {
    const docs = await collection
      .find({ category: cat.category }, { projection: { _id: 0 } })
      .toArray();

    for (const doc of docs) {
      if (isHindi) {
        for (const key of [
          "title",
          "description",
          "punishment",
          "bail_type",
          "bail_time_limit",
        ]) {
          if (doc[key]) doc[key] = await toHindi(doc[key]);
        }
      }
      results.push(doc);
    }
  }

  return NextResponse.json({
    original_language: lang,
    used_fallback: usedFallback,
    matched_categories: top,
    sections: results.slice(0, 7),
  });
}
