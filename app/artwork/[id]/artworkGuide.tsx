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
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

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

  async function handleListen() {
    if (!description || audioUrl) return;
    setAudioLoading(true);
    setAudioError(null);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: description }),
      });
      if (!response.ok) throw new Error("TTS misslyckades");
      const blob = await response.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch {
      setAudioError("Kunde inte spela upp beskrivningen. Försök igen.");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="border border-stone-200">
        {/* Header row */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-accent text-xs tracking-widest uppercase">✦ AI Curator's Notes</span>

          {!description && !loading && (
            <button
              type="button"
              onClick={handleFetch}
              className="text-xs tracking-wider text-stone-500 hover:text-accent transition-colors cursor-pointer"
            >
              Generate →
            </button>
          )}

          {loading && <span className="text-xs tracking-wider text-stone-400">Generating…</span>}

          {description && !audioUrl && (
            <button
              type="button"
              onClick={handleListen}
              disabled={audioLoading}
              className="text-xs tracking-widest uppercase text-stone-500 hover:text-accent transition-colors disabled:opacity-40 cursor-pointer"
            >
              {audioLoading ? "Loading…" : "▶ Listen"}
            </button>
          )}

          {audioError && <span className="text-xs text-red-500">Failed. Try again.</span>}
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="border-t border-stone-200 px-5 py-4 space-y-2 animate-pulse">
            <div className="h-3 bg-stone-200 rounded w-full" />
            <div className="h-3 bg-stone-200 rounded w-5/6" />
            <div className="h-3 bg-stone-200 rounded w-4/6" />
            <div className="h-3 bg-stone-200 rounded w-3/4" />
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="border-t border-stone-200 px-5 py-4">
            <p className="text-stone-600 leading-relaxed text-sm">{description}</p>
          </div>
        )}

        {/* Audio player */}
        {audioUrl && (
          <div className="border-t border-stone-200 px-5 py-3">
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
  );
}
