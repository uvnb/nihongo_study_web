import { renderSimpleMarkdown } from "@/lib/content";
import { dictionaries, Locale } from "@/lib/i18n";
import { LessonSection } from "@/types/content";

type LessonSectionsProps = {
  sections: LessonSection[];
  locale: Locale;
};

export function LessonSections({ sections, locale }: LessonSectionsProps) {
  const visibleSections = sections.filter((section) => section.key !== "vocabulary");

  if (!visibleSections.length) {
    return null;
  }

  const t = dictionaries[locale];

  return (
    <div className="mt-8 grid gap-5">
      {visibleSections.map((section) => (
        <section
          key={section.key}
          className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">{section.title_ja}</p>
              <h2 className="mt-2 font-serif text-2xl text-ink">{section.title}</h2>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              {t.labels.page} {section.page_start}-{section.page_end}
            </p>
          </div>
          <div className="mt-5 max-w-3xl text-base leading-8 text-ink/80">
            <div
              className="space-y-4 [&_h1]:mb-4 [&_h1]:font-serif [&_h1]:text-3xl [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_li]:ml-6 [&_li]:list-disc"
              dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(section.content) }}
            />
          </div>
        </section>
      ))}
    </div>
  );
}
