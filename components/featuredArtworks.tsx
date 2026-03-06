import { ArtworkSummary } from "@/lib/met-api";
import ArtworkCard from "./artworkCard";

interface Props {
  artworks: ArtworkSummary[];
}

export default function FeaturedArtworks({ artworks }: Props) {
  return (
    <section className="py-16 px-10 max-w-7xl mx-auto">
      <h2 className="font-serif text-2xl font-light mb-8">Featured Artworks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.objectID}
            artwork={artwork}
          />
        ))}
      </div>
    </section>
  );
}
