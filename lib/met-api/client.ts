import { MET_API_BASE } from "./config";

// Custom error class that includes the HTTP status code (e.g. 404, 500).
// "extends Error" means it behaves like a normal error but carries extra info.
export class MetApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "MetApiError";
  }
}

export class MetApiNotFoundError extends MetApiError {
  constructor() {
    super(404, "Not found");
    this.name = "MetApiNotFoundError";
  }
}

export async function metFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${MET_API_BASE}${path}`);

  if (!res.ok) {
    throw new MetApiError(res.status, res.statusText);
  }

  return res.json() as Promise<T>;
}

// Like metFetch, but returns null instead of crashing when something isn't found.
// Use this when "not found" is a normal situation, not an error.
export async function metFetchOptional<T>(path: string): Promise<T | null> {
  const res = await fetch(`${MET_API_BASE}${path}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new MetApiError(res.status, res.statusText);
  }

  return res.json() as Promise<T>;
}

// Sends all API requests at the same time instead of one by one.
// This is fine because we never request more than 10 items at once.
export async function batchFetch<T>(ids: number[], fetcher: (id: number) => Promise<T | null>): Promise<(T | null)[]> {
  return Promise.all(ids.map((id) => fetcher(id)));
}
