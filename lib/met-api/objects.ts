import { metFetch, metFetchOptional, MetApiError } from "./client";
import { searchArtworks } from "./search";
import { MetObject, MetObjectsResponse } from "./types";

export async function getObject(id: number): Promise<MetObject | null> {
  return metFetchOptional<MetObject>(`/objects/${id}`);
}

export async function getAllObjectIds(): Promise<MetObjectsResponse> {
  return metFetch<MetObjectsResponse>("/objects");
}

function fnv1a(str: string): number {
  let hash = 2166136261;
  for (const char of str) {
    hash ^= char.charCodeAt(0);
    hash = (hash * 16777619) >>> 0;
  }
  return hash;
}

export async function getDailyArtwork(): Promise<MetObject> {
  const dateStr = new Date().toISOString().slice(0, 10);
  const results = await searchArtworks({
    query: "art",
    isHighlight: true,
    hasImages: true,
  });

  const ids = results.objectIDs ?? [];
  const index = fnv1a(dateStr) % ids.length;

  for (let i = 0; i < 5; i++) {
    const artwork = await getObject(ids[(index + i) % ids.length]);
    if (artwork) return artwork;
  }

  throw new MetApiError(404, "No daily artwork found");
}
