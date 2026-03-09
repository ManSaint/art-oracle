"use client";

import { useState } from "react";

type Props = {
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  department: string;
};

export default function ArtworkGuide({ title, artistDisplayName, objectDate, medium, department }: Props) {
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, artistDisplayName, objectDate, medium, department }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();
      setDescription(data.description);
    } catch {
      setError("Could not fetch description. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 border-t border-stone-300 pt-6">
      <h2 className="font-serif text-lg mb-3">AI Guide</h2>

      {!description && (
        <button
          type="button"
          onClick={handleFetch}
          disabled={loading}
          className="px-4 py-2 bg-stone-800 text-white text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Generating…" : "Get AI description"}
        </button>
      )}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {description && <p className="text-stone-700 leading-relaxed text-sm">{description}</p>}
    </div>
  );
}
