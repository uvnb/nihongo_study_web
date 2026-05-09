import { MixedQuiz } from "@/components/quiz/mixed-quiz";
import { getKanji, getVocabulary } from "@/lib/api";
import { dictionaries, isLocale } from "@/lib/i18n";

export default async function QuizPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    return null;
  }

  const [vocabulary, kanji] = await Promise.all([getVocabulary(), getKanji()]);
  const t = dictionaries[params.locale];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-torii">{t.nav.quiz}</p>
        <h1 className="mt-3 font-serif text-4xl">Mixed vocabulary and Kanji quiz</h1>
      </div>
      <MixedQuiz vocabulary={vocabulary} kanji={kanji} />
    </div>
  );
}

