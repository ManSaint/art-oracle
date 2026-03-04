import { batchFetch } from "./client";
import { DEV_LIMIT } from "./config";
import { getObject } from "./objects";
import { ArtworkSummary, MetObject, PaginatedResult } from "./types";

function toArtworkSummary(obj: MetObject): ArtworkSummary {
  return {
    objectID: obj.objectID,
    title: obj.title,
    artistDisplayName: obj.artistDisplayName,
    primaryImageSmall: obj.primaryImageSmall,
    objectDate: obj.objectDate,
    department: obj.department,
    medium: obj.medium,
    isHighlight: obj.isHighlight,
    isPublicDomain: obj.isPublicDomain,
  };
}

function paginateIds(ids: number[], page: number, pageSize: number) {
  const totalPages = Math.ceil(ids.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageIds = ids.slice(start, start + pageSize);
  return { pageIds, totalPages };
}

export async function fetchPage(ids: number[], page: number, pageSize = 10): Promise<PaginatedResult<ArtworkSummary>> {
  const safeIds = ids.slice(0, DEV_LIMIT);
  const { pageIds, totalPages } = paginateIds(safeIds, page, pageSize);
  const results = await batchFetch(pageIds, getObject);
  const items = results.filter((r): r is MetObject => r !== null).map(toArtworkSummary);

  return {
    items,
    totalItems: safeIds.length,
    totalPages,
    currentPage: page,
    pageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export async function fetchFullPage(ids: number[], page: number, pageSize = 10): Promise<PaginatedResult<MetObject>> {
  const safeIds = ids.slice(0, DEV_LIMIT);
  const { pageIds, totalPages } = paginateIds(safeIds, page, pageSize);
  const results = await batchFetch(pageIds, getObject);
  const items = results.filter((r): r is MetObject => r !== null);

  return {
    items,
    totalItems: safeIds.length,
    totalPages,
    currentPage: page,
    pageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
