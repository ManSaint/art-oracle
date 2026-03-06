import { ArtworkSummary } from "@/lib/met-api";
import Link from "next/link";
import Image from "next/image";

export default function ArtworkCard({ artwork }: { artwork: ArtworkSummary }) {
  return (
    <Link
      href={`/artwork/${artwork.objectID}`}
      className="block"
    >
      <div className="relative aspect-[4/5] bg-[var(--color-border)] overflow-hidden border border-(--color-border)">
        {artwork.primaryImageSmall && artwork.isPublicDomain ? (
          <Image
            src={artwork.primaryImageSmall}
            alt={artwork.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image available</div>
        )}
      </div>
      <div className="py-3">
        <h2 className="font-serif text-sm font-medium">{artwork.title}</h2>
        <p className="text-[8px] text-muted italic">
          {artwork.artistDisplayName} · {artwork.objectDate}
        </p>
      </div>
    </Link>
  );
}
