import { FlashcardClient } from "@/components/flashcard-client";
import { getVocabulary } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function FlashcardsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const cards = await getVocabulary();
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.flashcards}</p>
        <h1 className="mt-3 font-serif text-4xl">Review deck</h1>
      </div>
      <FlashcardClient cards={cards} />
    </div>
  );
}

