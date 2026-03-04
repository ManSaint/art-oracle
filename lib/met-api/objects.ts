import { metFetch, metFetchOptional, MetApiError } from "./client";
import { searchArtworks } from "./search";
import { MetObject, MetObjectsResponse } from "./types";

export async function getObject(id: number): Promise<MetObject | null> {
  return metFetchOptional<MetObject>(`/objects/${id}`);
}

export async function getAllObjectIds(): Promise<MetObjectsResponse> {
  return metFetch<MetObjectsResponse>("/objects");
}

export async function getDailyArtwork(): Promise<MetObject> {
  const today = new Date();
  const dateNumber = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const results = await searchArtworks({
    query: "art",
    isHighlight: true,
    hasImages: true,
  });

  const ids = results.objectIDs ?? [];
  const index = dateNumber % ids.length;

  for (let i = 0; i < 5; i++) {
    const artwork = await getObject(ids[(index + i) % ids.length]);
    if (artwork) return artwork;
  }

  throw new MetApiError(404, "No daily artwork found");
}
