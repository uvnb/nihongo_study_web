import Link from "next/link";
import { ReactNode } from "react";

import { Locale, dictionaries, locales } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const t = dictionaries[locale];
  const nav = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/lessons`, label: t.nav.lessons },
    { href: `/${locale}/vocabulary`, label: t.nav.vocabulary },
    { href: `/${locale}/kanji`, label: t.nav.kanji },
    { href: `/${locale}/flashcards`, label: t.nav.flashcards },
    { href: `/${locale}/quiz`, label: t.nav.quiz },
    { href: `/${locale}/dashboard`, label: t.nav.dashboard },
    { href: `/${locale}/auth`, label: t.nav.auth }
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-amber-950/10 bg-white/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-torii text-sm font-semibold uppercase tracking-[0.32em] text-white brush-ring">
              日
            </span>
            <span>
              <span className="block font-serif text-2xl text-torii">Nihongo</span>
              <span className="block text-[10px] uppercase tracking-[0.38em] text-ink/45">
                Study Atelier
              </span>
            </span>
          </Link>
          <nav className="hidden gap-5 text-sm text-ink/80 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 hover:bg-white hover:text-torii"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em] ${
                  item === locale
                    ? "border-torii bg-torii text-white"
                    : "border-amber-950/10 bg-white text-ink/60"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
