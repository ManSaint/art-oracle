import { searchArtworks, fetchPage } from "@/lib/met-api";
import SearchBar from "@/components/search/searchBar";
import SearchResultsClient from "@/components/search/searchResultsClient";
import PaginationControls from "@/components/search/paginationControls";

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const currentPage = parseInt(page ?? "1", 10);

  if (!q) {
    return (
      <main>
        <SearchBar />
        <div className="py-16 text-center text-sm text-muted">Make a search to find artworks.</div>
      </main>
    );
  }

  const search = await searchArtworks({ query: q, hasImages: true });
  const results = await fetchPage(search.objectIDs ?? [], currentPage, 15);
  const artworks = results.items.filter((a) => a.primaryImageSmall !== "");

  return (
    <main>
      <SearchBar defaultValue={q} />
      <SearchResultsClient
        artworks={artworks}
        query={q}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={results.totalPages}
        query={q}
      />
    </main>
  );
}
