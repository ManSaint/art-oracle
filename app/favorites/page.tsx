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
    <main>
      <div className="py-16 px-10 max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl font-light mb-10">Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 mb-4">No saved artworks yet.</p>
            <Link
              href="/search"
              className="text-sm underline"
            >
              Start exploring →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-stone-500 text-sm mb-8">
              {favorites.length} saved artwork{favorites.length !== 1 ? "s" : ""}
            </p>
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
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-stone-300 text-stone-500 hover:text-red-500 text-xs px-2 py-1"
                    aria-label="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
