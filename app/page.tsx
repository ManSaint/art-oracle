import { getDailyArtwork, searchArtworks, fetchPage } from "@/lib/met-api";
import DailyArtworkCard from "@/components/dailyArtworkCard";

export default async function Home() {
  const dailyArtwork = await getDailyArtwork();
  const search = await searchArtworks({ query: "", hasImages: true, isHighlight: true });
  const featured = await fetchPage(search.objectIDs ?? [], 1, 6);

  return (
    <main>
      <DailyArtworkCard artwork={dailyArtwork} />
    </main>
  );
}
