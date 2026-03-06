// app/search/page.tsx
import { searchArtworks, fetchPage } from "@/lib/met-api";
import SearchBar from "@/components/search/searchBar";
import SearchResultsClient from "@/components/search/searchResultsClient";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <main>
        <SearchBar />
        <div className="py-16 text-center text-sm text-muted">Enter a search term to find artworks.</div>
      </main>
    );
  }

  const search = await searchArtworks({ query: q, hasImages: true });
  const results = await fetchPage(search.objectIDs ?? [], 1, 20);
  const artworks = results.items.filter((a) => a.primaryImageSmall !== "");

  return (
    <main>
      <SearchBar defaultValue={q} />
      <SearchResultsClient
        artworks={artworks}
        query={q}
      />
    </main>
  );
}
