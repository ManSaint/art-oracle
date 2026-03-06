"use client";

import { useState } from "react";
import type { ArtworkSummary } from "@/lib/met-api";
import ArtworkCard from "@/components/artwork/artworkCard";
import Container from "../ui/container";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Highlights", value: "highlight" },
  { label: "Oil Painting", value: "oil" },
  { label: "Watercolor", value: "watercolor" },
  { label: "Photography", value: "photograph" },
  { label: "Prints", value: "print" },
];

function matchesFilter(artwork: ArtworkSummary, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "highlight") return artwork.isHighlight;
  const m = artwork.medium.toLowerCase();
  if (filter === "oil") return m.includes("oil");
  if (filter === "watercolor") return m.includes("watercolor");
  if (filter === "photograph") return m.includes("photograph") || m.includes("gelatin");
  if (filter === "print") return m.includes("print") || m.includes("etching");
  return true;
}

interface Props {
  artworks: ArtworkSummary[];
  query: string;
}

export default function SearchResultsClient({ artworks, query }: Props) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleFilters = FILTERS.filter((f) => f.value === "all" || artworks.some((a) => matchesFilter(a, f.value)));

  const filtered = artworks.filter((a) => matchesFilter(a, activeFilter));

  return (
    <div>
      <div className="border-b border-(--color-border)">
        <Container>
          <div className="flex gap-2 py-4">
            {visibleFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-1.5 text-[9px] tracking-widest uppercase border border-(--color-border) transition-colors
                  ${
                    activeFilter === filter.value
                      ? "bg-(--color-foreground) text-(--color-background)"
                      : "hover:bg-(--color-border)"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <p className="text-xs text-muted py-6">
          <span className="font-semibold text-foreground">{filtered.length} results</span> for "{query}"
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-16">
            {filtered.map((artwork) => (
              <ArtworkCard
                key={artwork.objectID}
                artwork={artwork}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted pb-16">No results match this filter. Try a different one.</p>
        )}
      </Container>
    </div>
  );
}
