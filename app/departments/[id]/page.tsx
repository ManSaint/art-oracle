import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDepartment, searchArtworks, fetchPage } from "@/lib/met-api";
import ArtworkCard from "@/components/artwork/artworkCard";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return { title: "Department not found" };
  const department = await getDepartment(numericId);
  if (!department) return { title: "Department not found" };
  return {
    title: `${department.displayName} — Art Oracle`,
    description: `Explore artworks from ${department.displayName} at the Metropolitan Museum of Art.`,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) notFound();

  const department = await getDepartment(numericId);
  if (!department) notFound();

  const search = await searchArtworks({ query: "", departmentId: numericId, hasImages: true });
  const results = await fetchPage(search.objectIDs ?? [], 1, 12);

  return (
    <main>
      <div className="py-16 px-10 max-w-7xl mx-auto">
        <Link
          href="/departments"
          className="text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          ← All departments
        </Link>
        <h1 className="font-serif text-4xl font-light mt-6 mb-10">{department.displayName}</h1>
        {results.items.length === 0 ? (
          <p className="opacity-60">No artworks found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.items.map((artwork) => (
              <ArtworkCard
                key={artwork.objectID}
                artwork={artwork}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
