import { getDailyArtwork, searchArtworks, fetchPage } from "@/lib/met-api";
import DailyArtworkCard from "@/components/home/dailyArtworkCard";
import FeaturedArtworks from "@/components/home/featuredArtworks";
import BrowseByMedium from "@/components/home/browseByMedium";

export default async function Home() {
  const dailyArtwork = await getDailyArtwork();
  const search = await searchArtworks({ query: "", hasImages: true, isHighlight: true });
  const totalIds = search.objectIDs ?? [];
  const totalPages = Math.ceil(totalIds.length / 8);
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  const featured = await fetchPage(totalIds, randomPage, 8);
  const artworks = featured.items.filter((a) => a.primaryImageSmall !== "");

  return (
    <main>
      <DailyArtworkCard artwork={dailyArtwork} />
      <FeaturedArtworks artworks={artworks} />
      <BrowseByMedium />
    </main>
  );
}
