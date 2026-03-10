import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkSummary, getObject } from "@/lib/met-api";
import ArtworkDetailImage from "@/components/artwork/artworkDetailImage";
import ArtworkMetadata from "@/components/artwork/artworkMetadata";
import ArtworkGuide from "./artworkGuide";
import FavoriteButton from "@/components/artwork/favoriteButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return { title: "Artwork not found" };

  const artwork = await getObject(numericId);
  if (!artwork) return { title: "Artwork not found" };

  return {
    title: `${artwork.title} — Art Oracle`,
    description: `${artwork.artistDisplayName || "Unknown artist"} · ${artwork.objectDate}`,
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) notFound();

  const artwork = await getObject(numericId);
  if (!artwork) notFound();

  const artworkSummary: ArtworkSummary = {
    objectID: artwork.objectID,
    title: artwork.title,
    artistDisplayName: artwork.artistDisplayName,
    primaryImageSmall: artwork.primaryImageSmall,
    objectDate: artwork.objectDate,
    department: artwork.department,
    medium: artwork.medium,
    isHighlight: artwork.isHighlight,
    isPublicDomain: artwork.isPublicDomain,
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-stone-900 flex flex-col justify-between p-8">
        <Link
          href="/"
          className="text-stone-400 text-sm hover:text-white transition-colors"
        >
          ← Back
        </Link>
        <ArtworkDetailImage artwork={artwork} />
        <div />
      </div>

      <div className="bg-stone-100 p-10 overflow-y-auto relative">
        <div className="absolute top-10 right-10">
          <FavoriteButton artwork={artworkSummary} />
        </div>
        <ArtworkMetadata artwork={artwork} />
        <div className="border-t border-stone-200 mt-8">
          <ArtworkGuide
            title={artwork.title}
            artistDisplayName={artwork.artistDisplayName}
            objectDate={artwork.objectDate}
            medium={artwork.medium}
            department={artwork.department}
          />
        </div>
      </div>
    </main>
  );
}
