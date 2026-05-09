import { LessonManager } from "@/components/lessons/lesson-manager";
import { getLessons } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function LessonsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const lessons = await getLessons();
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.lessons}</p>
        <h1 className="mt-3 font-serif text-4xl">N5 Foundations</h1>
      </div>
      <LessonManager locale={params.locale} initialLessons={lessons} />
    </div>
  );
}

