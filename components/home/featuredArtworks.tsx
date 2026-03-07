import { ArtworkSummary } from "@/lib/met-api";
import ArtworkCard from "../artwork/artworkCard";
import Container from "../ui/container";

interface Props {
  artworks: ArtworkSummary[];
}

export default function FeaturedArtworks({ artworks }: Props) {
  return (
    <section className="py-16">
      <Container>
        <h2 className="font-serif text-3xl font-light mb-8">Featured Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.objectID}
              artwork={artwork}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
