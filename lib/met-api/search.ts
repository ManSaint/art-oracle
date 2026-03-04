import { metFetch } from "./client";
import { MetSearchResponse } from "./types";

export interface SearchParams {
  query: string;
  isHighlight?: boolean;
  title?: boolean;
  tags?: boolean;
  departmentId?: number;
  isOnView?: boolean;
  artistOrCulture?: boolean;
  medium?: string;
  hasImages?: boolean;
  geoLocation?: string;
  dateBegin?: number;
  dateEnd?: number;
}

export async function searchArtworks(params: SearchParams): Promise<MetSearchResponse> {
  const query = new URLSearchParams();

  query.set("q", params.query);

  if (params.isHighlight !== undefined) query.set("isHighlight", String(params.isHighlight));
  if (params.title !== undefined) query.set("title", String(params.title));
  if (params.tags !== undefined) query.set("tags", String(params.tags));
  if (params.departmentId !== undefined) query.set("departmentId", String(params.departmentId));
  if (params.isOnView !== undefined) query.set("isOnView", String(params.isOnView));
  if (params.artistOrCulture !== undefined) query.set("artistOrCulture", String(params.artistOrCulture));
  if (params.medium !== undefined) query.set("medium", params.medium);
  if (params.hasImages !== undefined) query.set("hasImages", String(params.hasImages));
  if (params.geoLocation !== undefined) query.set("geoLocation", params.geoLocation);
  if (params.dateBegin !== undefined && params.dateEnd !== undefined) {
    query.set("dateBegin", String(params.dateBegin));
    query.set("dateEnd", String(params.dateEnd));
  }

  return metFetch<MetSearchResponse>(`/search?${query}`);
}
