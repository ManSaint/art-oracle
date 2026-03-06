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
    <section className="border-t border-(--color-border)">
      <div className="py-16 px-10 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl font-light">Explore by Medium</h2>
          <Link
            href="/search"
            className="text-[9px] tracking-widest uppercase text-muted hover:text-foreground transition-colors"
          >
            All works →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MEDIA.map((medium) => (
            <Link
              key={medium.label}
              href={medium.href}
              className="border border-(--color-border) px-4 py-5 text-center text-base font-serif hover:bg-(--color-border) transition-colors"
            >
              {medium.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
