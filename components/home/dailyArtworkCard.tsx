"use client";

import { useState } from "react";
import { splitTitle } from "@/lib/utils";
import { MetObject } from "@/lib/met-api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  artwork: MetObject;
}

export default function DailyArtworkCard({ artwork }: Props) {
  const { line1, line2 } = splitTitle(artwork.title);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  async function handleListen() {
    if (audioUrl) return;
    setAudioLoading(true);
    setAudioError(null);

    const text = [
      `Today's artwork is ${artwork.title}`,
      artwork.artistDisplayName ? `by ${artwork.artistDisplayName}` : "",
      artwork.objectDate ? `, ${artwork.objectDate}.` : ".",
      artwork.medium ? `${artwork.medium}.` : "",
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("TTS failed");
      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch {
      setAudioError("Could not load audio.");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] border-b border-[var(--color-border)]">
      <div className="relative h-[350px] md:h-full bg-[var(--color-hero-img-bg)] p-4">
        {artwork.primaryImage ? (
          <Image
            src={artwork.primaryImage}
            alt={artwork.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image available</div>
        )}
      </div>

      <div className="flex flex-col justify-center px-6 py-10 md:px-12 md:py-16 gap-5">
        <span className="text-[10px] tracking-[0.4em] uppercase text-accent">✦ Today's Artwork</span>

        <h1 className="font-serif text-[42px] font-light leading-tight">
          {line1}
          {line2 && (
            <>
              <br />
              <span className="italic">{line2}</span>
            </>
          )}
        </h1>

        <ul className="text-[12px] leading-relaxed text-muted list-none">
          <li>
            {artwork.artistDisplayName} · {artwork.objectDate}
          </li>
          <li>{artwork.medium}</li>
          <li>{artwork.repository}</li>
        </ul>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-4">
            <Link
              href={`/artwork/${artwork.objectID}`}
              className="px-[22px] py-[10px] text-[10px] tracking-[0.2em] uppercase bg-[var(--color-foreground)] text-[var(--color-background)] border border-[var(--color-foreground)] hover:bg-transparent hover:text-[var(--color-foreground)] transition-colors"
            >
              Explore Artwork
            </Link>
            <button
              type="button"
              onClick={handleListen}
              disabled={audioLoading}
              className="px-[22px] py-[10px] text-[10px] tracking-[0.2em] uppercase border border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-colors disabled:opacity-40 cursor-pointer"
            >
              {audioLoading ? "Loading…" : "▶ Listen"}
            </button>
          </div>

          {audioError && <p className="text-red-500 text-xs">{audioError}</p>}

          {audioUrl && (
            <div className="border border-[var(--color-border)]">
              <audio
                src={audioUrl}
                controls
                autoPlay
                className="w-full h-8 opacity-70"
              >
                <track kind="captions" />
              </audio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
