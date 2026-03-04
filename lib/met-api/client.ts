import { MET_API_BASE } from "./config";

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

export async function metFetchOptional<T>(path: string): Promise<T | null> {
  const res = await fetch(`${MET_API_BASE}${path}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new MetApiError(res.status, res.statusText);
  }

  return res.json() as Promise<T>;
}

export async function batchFetch<T>(
  ids: number[],
  fetcher: (id: number) => Promise<T | null>,
  concurrency = 10,
): Promise<(T | null)[]> {
  const results: (T | null)[] = new Array(ids.length);
  let cursor = 0;

  async function worker() {
    while (cursor < ids.length) {
      const index = cursor++;
      results[index] = await fetcher(ids[index]);
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  return results;
}
