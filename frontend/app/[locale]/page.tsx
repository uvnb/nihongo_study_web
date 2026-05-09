import { HomeOverviewPanel } from "@/components/home/home-overview-panel";
import Link from "next/link";

import { SectionCard } from "@/components/section-card";
import { getKanji, getLessons, getVocabulary } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const [lessons, vocabulary, kanji] = await Promise.all([
    getLessons(),
    getVocabulary(),
    getKanji()
  ]);
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-10">
      <section className="paper-panel relative overflow-hidden rounded-[2.75rem] border border-amber-950/10 p-8 shadow-card md:grid-cols-[1.2fr_0.8fr]">
        <div className="absolute -right-12 top-10 hidden h-48 w-48 rounded-full border border-torii/10 bg-gradient-to-br from-torii/10 to-transparent lg:block" />
        <div className="absolute bottom-0 left-0 hidden h-56 w-56 -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-br from-gold/20 to-transparent lg:block" />
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-torii">{t.hero.eyebrow}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-torii/15 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.38em] text-torii">
              {t.home.accent}
            </span>
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.08] text-ink md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/70">{t.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${params.locale}/lessons`}
              className="rounded-full bg-torii px-6 py-3 text-sm font-medium text-white shadow-[0_14px_24px_rgba(179,58,47,0.22)]"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href={`/${params.locale}/kanji`}
              className="rounded-full border border-amber-950/10 bg-white px-6 py-3 text-sm font-medium"
            >
              {t.hero.secondaryCta}
            </Link>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-amber-950/10 bg-white/75 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-torii">{t.sections.lessons}</div>
              <div className="mt-3 text-sm leading-7 text-ink/70">
                {lessons[0]?.summary ?? t.labels.noData}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-amber-950/10 bg-[#201a16] p-5 text-white">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Kana + Kanji</div>
              <div className="mt-3 font-serif text-3xl">日本語</div>
              <div className="mt-2 text-sm leading-7 text-white/70">
                Grammar, vocabulary, quizzes, and spaced review in one study loop.
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="pattern-seigaiha rounded-[2rem] bg-ink p-8 text-white shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">{t.home.catalog}</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-serif">{lessons.length}</div>
                <div className="text-sm text-white/70">{t.home.catalogLabels.lessons}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-serif">{vocabulary.length}</div>
                <div className="text-sm text-white/70">{t.home.catalogLabels.vocabulary}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-3xl font-serif">{kanji.length}</div>
                <div className="text-sm text-white/70">{t.home.catalogLabels.kanji}</div>
              </div>
            </div>
          </div>
          <HomeOverviewPanel locale={params.locale} />
        </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title={t.sections.lessons} href={`/${params.locale}/lessons`}>
          <div className="space-y-3">
            {lessons.slice(0, 2).map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/${params.locale}/lessons/${lesson.slug}`}
                className="block rounded-2xl bg-[#f8f3ea] p-4 hover:bg-[#f1e8d9]"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-torii">
                  {t.labels.unit} {lesson.unit_number} • {lesson.level}
                </div>
                <div className="mt-2 font-serif text-xl">{lesson.title_ja}</div>
                <p className="mt-2 text-sm text-ink/70">{lesson.summary}</p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={t.sections.vocabulary} href={`/${params.locale}/vocabulary`}>
          <div className="space-y-3">
            {vocabulary.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#f8f3ea] p-4">
                <div className="font-serif text-2xl">{item.word}</div>
                <div className="text-sm text-ink/70">{item.reading}</div>
                <div className="mt-3 text-sm text-torii">{item.meaning_vi}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={t.sections.kanji} href={`/${params.locale}/kanji`}>
          <div className="grid grid-cols-3 gap-3">
            {kanji.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#f8f3ea] p-4 text-center hover:bg-[#f1e8d9]"
              >
                <div className="font-serif text-4xl">{item.character}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/60">
                  {item.meaning_en}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title={t.sections.quiz} href={`/${params.locale}/quiz`}>
          <p className="text-sm leading-7 text-ink/70">{t.home.quizBlurb}</p>
        </SectionCard>
        <SectionCard title={t.sections.dashboard} href={`/${params.locale}/dashboard`}>
          <p className="text-sm leading-7 text-ink/70">{t.home.dashboardBlurb}</p>
        </SectionCard>
      </div>
    </div>
  );
}
