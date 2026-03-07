"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/departments", label: "Departments" },
  { href: "/favorites", label: "Favorites" },
];

export default function Header() {
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
          <span className="italic font-light text-accent">Oracle</span>
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
        <div className="flex items-center border border-[var(--color-border)] px-3 py-1.5 gap-2 w-[160px] text-[12px] text-muted">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search artworks..."
            className="bg-transparent outline-none w-full text-[10px]"
          />
        </div>
      </div>
    </header>
  );
}
