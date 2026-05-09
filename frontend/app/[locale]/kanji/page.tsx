import { KanjiManager } from "@/components/kanji/kanji-manager";
import { KanjiQuiz } from "@/components/kanji/kanji-quiz";
import { getKanji } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function KanjiPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const items = await getKanji();
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.kanji}</p>
        <h1 className="mt-3 font-serif text-4xl">Starter Kanji</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <KanjiManager initialItems={items} />
        <KanjiQuiz items={items} />
      </div>
    </div>
  );
}
