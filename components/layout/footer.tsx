import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-10 py-6 border-t border-[var(--color-border)]">
      <Link
        href="/"
        className="font-serif text-[20px] text-muted whitespace-nowrap"
      >
        Art Oracle
      </Link>
      <ul className="flex gap-5 list-none text-muted footer-links whitespace-nowrap">
        <li>
          <a
            href="https://www.metmuseum.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--color-foreground) transition-colors"
          >
            © The Metropolitan Museum of Art
          </a>
        </li>
        <li>
          <a
            href="https://metmuseum.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--color-foreground) transition-colors"
          >
            API: collectionapi.metmuseum.org
          </a>
        </li>
        <li>
          <a
            href="https://groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-(--color-foreground) transition-colors"
          >
            AI: GPT-OSS via Groq
          </a>
        </li>
      </ul>
    </footer>
  );
}
