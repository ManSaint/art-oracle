import Link from "next/link";
import Container from "@/components/ui/container";

interface Props {
  currentPage: number;
  totalPages: number;
  query: string;
}

export default function PaginationControls({ currentPage, totalPages, query }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="border-t border-(--color-border) bg-(--color-surface-dark)">
      <Container>
        <div className="flex items-center justify-between py-8">
          {currentPage > 1 ? (
            <Link
              href={`/search?q=${query}&page=${currentPage - 1}`}
              className="px-6 py-2 text-[9px] tracking-widest uppercase border border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent)/10 transition-colors"
            >
              ← Previous
            </Link>
          ) : (
            <div />
          )}

          <span className="text-xs text-(--color-canvas) opacity-60">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/search?q=${query}&page=${currentPage + 1}`}
              className="px-6 py-2 text-[9px] tracking-widest uppercase border border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent)/10 transition-colors"
            >
              Next →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </div>
  );
}
