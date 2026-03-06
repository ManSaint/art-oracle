import type { MetObject } from "@/lib/met-api";

type Props = {
  artwork: MetObject;
};

type MetadataField = {
  label: string;
  value: string | number | undefined | null;
};

export default function ArtworkMetadata({ artwork }: Props) {
  const fields: MetadataField[] = [
    { label: "Year", value: artwork.objectDate },
    { label: "Medium", value: artwork.medium },
    { label: "Culture", value: artwork.culture },
    { label: "Dimensions", value: artwork.dimensions },
    { label: "Department", value: artwork.department },
    { label: "Object ID", value: `#${artwork.objectID}` },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Category */}
      {(artwork.department || artwork.classification) && (
        <p className="text-xs tracking-widest uppercase text-amber-700">
          {[artwork.department, artwork.classification].filter(Boolean).join(" · ")}
        </p>
      )}

      {/* Title */}
      <h1 className="text-4xl font-serif text-stone-900 leading-tight">{artwork.title}</h1>

      {/* Artist */}
      {artwork.artistDisplayName && <p className="text-lg italic text-stone-500">{artwork.artistDisplayName}</p>}

      <hr className="border-stone-200" />

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {fields.map(({ label, value }) =>
          value ? (
            <div key={label}>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">{label}</p>
              <p className="text-sm text-stone-800">{value}</p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
