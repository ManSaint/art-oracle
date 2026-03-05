import { splitTitle } from "@/lib/utils";
import { MetObject } from "@/lib/met-api";
import Image from "next/image";

interface Props {
  artwork: MetObject;
}

export default function DailyArtworkCard({ artwork }: Props) {
  const { line1, line2 } = splitTitle(artwork.title);

  return (
    <section className="grid grid-cols-2 min-h-[500px]">
      <div className="relative h-full bg-[var(--color-border)]">
        {artwork.primaryImage ? (
          <Image
            src={artwork.primaryImage}
            alt={artwork.title}
            fill
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image available</div>
        )}
      </div>

      <div className="flex flex-col justify-center px-12 py-16 gap-5">
        <span className="text-[8px] tracking-[0.4em] uppercase text-accent">✦ Today's Artwork</span>

        <h1 className="font-serif text-[42px] font-light leading-tight">
          {line1}
          {line2 && (
            <>
              <br />
              <span className="italic">{line2}</span>
            </>
          )}
        </h1>

        <ul className="text-[9px] leading-relaxed text-muted list-none">
          <li>
            {artwork.artistDisplayName} · {artwork.objectDate}
          </li>
          <li>{artwork.medium}</li>
          <li>{artwork.repository}</li>
        </ul>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            className="px-[22px] py-[10px] text-[8px] tracking-[0.2em] uppercase bg-[var(--color-foreground)] text-[var(--color-background)]"
          >
            Explore Artwork
          </button>
          <button
            type="button"
            className="px-[22px] py-[10px] text-[8px] tracking-[0.2em] uppercase border border-[var(--color-foreground)]"
          >
            ▶ Listen
          </button>
        </div>
      </div>
    </section>
  );
}
