import { VocabularyManager } from "@/components/vocabulary/vocabulary-manager";
import { getLessons, getVocabulary } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function VocabularyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const [items, lessons] = await Promise.all([getVocabulary(), getLessons()]);
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.vocabulary}</p>
        <h1 className="mt-3 font-serif text-4xl">Core N5 words</h1>
      </div>
      <VocabularyManager initialItems={items} lessons={lessons} />
    </div>
  );
}
