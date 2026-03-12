"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/departments", label: "Departments" },
  { href: "/favorites", label: "Favorites" },
];

export default function Header() {
  // usePathname() returns the current URL path, e.g. "/departments"
  // Re-runs automatically whenever the user navigates to a new page
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between px-10 py-[18px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[25px] font-semibold tracking-[0.1em]"
        >
          <span>Art </span>
          <span className="italic font-light text-(--color-accent)">Oracle</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] tracking-[0.25em] uppercase ${isActive ? "text-[var(--color-foreground)] border-b border-[var(--color-foreground)] pb-0.5" : "text-muted hover:text-[var(--color-foreground)]"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search */}
        <form
          method="GET"
          action="/search"
          className="flex items-center bg-(--color-surface-dark) border border-(--color-surface-dark) px-3 py-1.5 gap-2 w-[160px]"
        >
          <span className="text-(--color-canvas)">⌕</span>
          <input
            type="text"
            name="q"
            placeholder="Search artworks..."
            className="bg-transparent outline-none w-full text-[10px] font-bold text-(--color-canvas) placeholder:text-(--color-canvas)"
          />
        </form>
      </div>
    </header>
  );
}
