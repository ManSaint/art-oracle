"use client";

import { useState, useEffect } from "react";
import type { ArtworkSummary } from "@/lib/met-api/types";

type Props = {
  artwork: ArtworkSummary;
};

const STORAGE_KEY = "art-oracle:favorites";

export default function FavoriteButton({ artwork }: Props) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites: ArtworkSummary[] = stored ? JSON.parse(stored) : [];
    setIsFavorited(favorites.some((a) => a.objectID === artwork.objectID));
  }, [artwork.objectID]);

  function handleToggle() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites: ArtworkSummary[] = stored ? JSON.parse(stored) : [];

    if (isFavorited) {
      const updated = favorites.filter((a) => a.objectID !== artwork.objectID);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      favorites.push(artwork);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      setIsFavorited(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`text-xl transition-colors ${
        isFavorited
          ? "text-stone-700"
          : "text-transparent [-webkit-text-stroke:1.5px_#a8a29e]  hover:[-webkit-text-stroke:1.5px_#57534e]"
      }`}
    >
      ♥
    </button>
  );
}
