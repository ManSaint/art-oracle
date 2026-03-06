import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <div>
      <div className="border-b border-(--color-border)">
        <Container>
          <div className="py-16">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-64 bg-(--color-border) rounded" />
              <div className="h-12 w-full bg-(--color-border) rounded" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="h-6 w-32 bg-(--color-border) rounded my-6 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-16">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-3"
            >
              <div className="aspect-[4/5] bg-(--color-border) rounded" />
              <div className="h-3 w-3/4 bg-(--color-border) rounded" />
              <div className="h-3 w-1/2 bg-(--color-border) rounded" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
