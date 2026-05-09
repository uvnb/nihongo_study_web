import { notFound } from "next/navigation";

import { LessonProgressPanel } from "@/components/lessons/lesson-progress-panel";
import { getLesson } from "@/lib/api";
import { renderSimpleMarkdown } from "@/lib/content";

export default async function LessonDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  try {
    const lesson = await getLesson(params.slug);
    return (
      <article className="rounded-[2.5rem] border border-amber-950/10 bg-white/85 p-8 shadow-card">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">
          Unit {lesson.unit_number} • {lesson.level}
        </p>
        <h1 className="mt-3 font-serif text-4xl">{lesson.title_ja}</h1>
        <p className="mt-2 text-lg text-ink/75">{lesson.title}</p>
        <LessonProgressPanel lessonSlug={lesson.slug} />
        <div className="mt-8 max-w-3xl text-base leading-8 text-ink/80">
          <div
            className="space-y-4 [&_h1]:mb-4 [&_h1]:font-serif [&_h1]:text-3xl [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_li]:ml-6 [&_li]:list-disc"
            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(lesson.content) }}
          />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
