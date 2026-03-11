"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ArtworkCard from "@/components/artwork/artworkCard";
import type { ArtworkSummary } from "@/lib/met-api/types";

const STORAGE_KEY = "art-oracle:favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<ArtworkSummary[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  function handleRemove(objectID: number) {
    const updated = favorites.filter((a) => a.objectID !== objectID);
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <main className="flex flex-col flex-1">
      <section className="bg-(--color-surface-dark) px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="label-overline mb-4">Your Collection</p>
          <h1 className="font-serif text-5xl font-light text-white mb-3">Favorites</h1>
          {favorites.length > 0 && (
            <p className="text-sm text-white/50">
              {favorites.length} saved artwork{favorites.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      <section className="px-10 py-16 flex-1">
        <div className="max-w-7xl mx-auto">
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-(--color-muted) mb-4">No saved artworks yet.</p>
              <Link
                href="/search"
                className="text-sm underline"
              >
                Start exploring →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((artwork) => (
                <div
                  key={artwork.objectID}
                  className="relative group"
                >
                  <ArtworkCard artwork={artwork} />
                  <button
                    type="button"
                    onClick={() => handleRemove(artwork.objectID)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-(--color-border) text-(--color-muted) hover:text-red-500 text-xs px-2 py-1"
                    aria-label="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-(--color-surface-dark) px-10 py-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-serif text-2xl text-(--color-canvas) mb-1">Discover more artworks</p>
            <p className="text-xs text-white/50">470,000+ artworks in the collection</p>
          </div>
          <Link
            href="/search"
            className="border border-(--color-accent) text-(--color-accent) text-sm px-5 py-2.5 hover:bg-(--color-accent)/10 transition-colors whitespace-nowrap"
          >
            Browse artworks →
          </Link>
        </div>
      </section>
    </main>
  );
}
