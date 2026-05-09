import Link from "next/link";
import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  children: ReactNode;
};

export function SectionCard({ title, subtitle, href, children }: SectionCardProps) {
  return (
    <section className="paper-panel rounded-[2rem] border border-amber-950/10 p-6 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-ink">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-ink/65">{subtitle}</p> : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="rounded-full border border-amber-950/10 px-4 py-2 text-sm font-medium text-torii hover:border-torii hover:text-ink"
          >
            Open
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
