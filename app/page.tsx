import { getDailyArtwork, searchArtworks, fetchPage } from "@/lib/met-api";
import DailyArtworkCard from "@/components/dailyArtworkCard";
import FeaturedArtworks from "@/components/featuredArtworks";

export default async function Home() {
  const dailyArtwork = await getDailyArtwork();
  const search = await searchArtworks({ query: "", hasImages: true, isHighlight: true });
  const featured = await fetchPage(search.objectIDs ?? [], 1, 6);

  return (
    <main>
      <DailyArtworkCard artwork={dailyArtwork} />
      <FeaturedArtworks artworks={featured.items} />
    </main>
  );
}
