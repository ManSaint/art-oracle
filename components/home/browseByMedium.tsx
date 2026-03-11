import Link from "next/link";

const MEDIA = [
  { label: "Oil Painting", href: "/search?q=oil+painting" },
  { label: "Sculpture", href: "/search?q=sculpture" },
  { label: "Photography", href: "/search?q=photograph" },
  { label: "Watercolor", href: "/search?q=watercolor" },
  { label: "Prints & Drawing", href: "/search?q=etching+prints" },
  { label: "Textile", href: "/search?q=textile" },
];

export default function BrowseByMedium() {
  return (
    <section className="bg-(--color-surface-dark)">
      <div className="px-10 max-w-7xl mx-auto">
        <div className="py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-3xl font-light text-(--color-canvas)">Explore by Medium</h2>
            <Link
              href="/search"
              className="text-[12px] tracking-widest uppercase text-(--color-accent) hover:text-(--color-canvas) transition-colors"
            >
              All works →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MEDIA.map((medium) => (
              <Link
                key={medium.label}
                href={medium.href}
                className="border border-(--color-canvas)/30 px-4 py-5 text-center text-[18px] font-serif text-(--color-canvas) hover:bg-(--color-canvas)/10 transition-colors"
              >
                {medium.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
