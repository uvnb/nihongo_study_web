"use client";

import Link from "next/link";

import { dictionaries, Locale } from "@/lib/i18n";
import { getLessonDisplayLabels } from "@/lib/grammar-lessons";
import { LessonSummary } from "@/types/content";

type LessonManagerProps = {
  locale: Locale;
  initialLessons: LessonSummary[];
};

export function LessonManager({ locale, initialLessons }: LessonManagerProps) {
  const t = dictionaries[locale];

  return (
    <div className="grid gap-5">
      {initialLessons.map((lesson, index) => (
        <div
          key={lesson.slug}
          className={`ghibli-hover rounded-[32px] p-6 shadow-cloud ${
            index % 3 === 0 ? "ghibli-cloud" : index % 3 === 1 ? "ghibli-sky" : "ghibli-leaf"
          }`}
        >
          <Link href={`/${locale}/lessons/${lesson.slug}`} className="block">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-secondary">
              <span>
                {t.labels.unit} {lesson.unit_number}
              </span>
              <span>{lesson.level}</span>
              <span>
                {t.labels.page} {lesson.page_start}-{lesson.page_end}
              </span>
            </div>
            <div className="mt-4 font-serif text-3xl">{getLessonDisplayLabels(lesson.unit_number).title_ja}</div>
            <div className="mt-2 text-lg">{getLessonDisplayLabels(lesson.unit_number).title_vi}</div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/70">{lesson.summary}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
