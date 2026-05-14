import Link from "next/link";
import { notFound } from "next/navigation";

import { getLesson } from "@/lib/api";
import { getLessonDisplayLabels } from "@/lib/grammar-lessons";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function LessonDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const t = dictionaries[params.locale];

  try {
    const lesson = await getLesson(params.slug);
    const labels = getLessonDisplayLabels(lesson.unit_number);

    return (
      <div className="pt-28 md:pt-36">
        <article className="rounded-[2.5rem] border border-amber-950/10 bg-white/85 p-8 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.35em] text-torii">
                {t.labels.unit} {lesson.unit_number} • {lesson.level} • {t.labels.page} {lesson.page_start}-{lesson.page_end}
              </p>
              <h1 className="mt-3 font-serif text-4xl">{labels.title_ja}</h1>
              <p className="mt-2 text-lg text-ink/75">{labels.title_vi}</p>
            </div>
            <Link
              href={`/${params.locale}/lessons/${lesson.slug}/pdf`}
              className="relative z-20 inline-flex shrink-0 items-center rounded-full border border-amber-950/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink transition hover:border-torii hover:text-torii"
            >
              {t.labels.openPdf}
            </Link>
          </div>
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
