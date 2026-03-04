export const MET_API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

// Without this cap, fetching a single page in development could trigger
// hundreds of API calls. This limits it to 20 so the app stays fast while building
export const DEV_LIMIT = process.env.NODE_ENV === "development" ? 20 : Infinity;
