import { pipeline } from "@xenova/transformers";
import ipcMap from "./ipc_label_map.json";

let extractor;
let descriptionEmbeddings;
const descriptions = Object.keys(ipcMap);

export async function loadEmbedder() {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-mpnet-base-v2"
    );

    descriptionEmbeddings = await extractor(descriptions, {
      pooling: "mean",
      normalize: true,
    });
  }
}

export function cosineSimilarity(vecA, vecB) {
  return vecA.reduce((sum, v, i) => sum + v * vecB[i], 0);
}

export async function classifyText(text) {
  const embedding = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return descriptions.map((desc, i) => ({
    desc,
    score: cosineSimilarity(
      embedding.data,
      descriptionEmbeddings[i].data
    ),
  }));
}
