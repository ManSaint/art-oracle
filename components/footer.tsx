import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-10 py-6 border-t border-[var(--color-border)] bg-footer">
      <Link
        href="/"
        className="font-serif text-sm text-muted whitespace-nowrap"
      >
        Art Oracle
      </Link>
      <ul className="flex gap-5 list-none text-muted footer-links whitespace-nowrap">
        <li>© The Metropolitan Museum of Art</li>
        <li>API: collectionapi.metmuseum.org</li>
        <li>AI: Grok by xAI</li>
      </ul>
    </footer>
  );
}
