import Container from "@/components/ui/container";

interface Props {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue }: Props) {
  return (
    <div className="border-b border-(--color-border)">
      <Container>
        <div className="py-16">
          <h1 className="font-serif text-4xl font-light mb-8">Search 470,000+ artworks</h1>
          <form
            method="GET"
            action="/search"
            className="flex gap-0"
          >
            <input
              name="q"
              type="text"
              defaultValue={defaultValue}
              placeholder="Search by artist, title, period..."
              className="flex-1 border border-(--color-border) px-5 py-3 text-sm font-mono bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 text-[9px] tracking-widest uppercase bg-(--color-foreground) text-(--color-background)"
            >
              Search
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
