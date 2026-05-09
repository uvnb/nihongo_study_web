"use client";

import { useMemo, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { createQuizSession } from "@/lib/api";
import { KanjiItem, QuizAnswer, VocabularyItem } from "@/types/content";

type MixedQuizProps = {
  vocabulary: VocabularyItem[];
  kanji: KanjiItem[];
};

type Question = {
  prompt: string;
  question_type: string;
  correct_answer: string;
  options: string[];
  instruction: string;
  input_placeholder?: string;
};

function shuffle<T>(values: T[]) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function MixedQuiz({ vocabulary, kanji }: MixedQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions = useMemo<Question[]>(() => {
    const vocabChoiceQuestions = shuffle(vocabulary)
      .slice(0, Math.min(3, vocabulary.length))
      .map((item) => ({
        prompt: item.word,
        question_type: "vocabulary_choice",
        correct_answer: item.meaning_vi,
        instruction: "Chon nghia dung nhat.",
        options: shuffle([
          item.meaning_vi,
          ...shuffle(vocabulary.filter((entry) => entry.id !== item.id).map((entry) => entry.meaning_vi)).slice(0, 3)
        ])
      }));

    const vocabReadingQuestions = shuffle(vocabulary)
      .slice(0, Math.min(2, vocabulary.length))
      .map((item) => ({
        prompt: `${item.word} (${item.meaning_vi})`,
        question_type: "reading_input",
        correct_answer: item.reading,
        instruction: "Go reading bang romaji.",
        input_placeholder: "vd: watashi",
        options: []
      }));

    const kanjiChoiceQuestions = shuffle(kanji)
      .slice(0, Math.min(3, kanji.length))
      .map((item) => ({
        prompt: item.character,
        question_type: "kanji_choice",
        correct_answer: item.meaning_vi,
        instruction: "Chon nghia dung nhat.",
        options: shuffle([
          item.meaning_vi,
          ...shuffle(kanji.filter((entry) => entry.id !== item.id).map((entry) => entry.meaning_vi)).slice(0, 3)
        ])
      }));

    return shuffle([...vocabChoiceQuestions, ...vocabReadingQuestions, ...kanjiChoiceQuestions]).slice(0, 7);
  }, [kanji, vocabulary]);

  const complete = currentIndex >= questions.length;
  const score = answers.filter((answer) => answer.is_correct).length;

  async function handleSave() {
    const token = readStoredToken();
    if (!token) {
      setError("Please sign in to save quiz history.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createQuizSession(
        {
          quiz_type: "mixed",
          score,
          total_questions: answers.length,
          answers
        },
        token
      );
      setSaved(true);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!questions.length) {
    return null;
  }

  if (complete) {
    return (
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.35em] text-torii">Result</p>
          <div className="mt-4 font-serif text-4xl">
            {score}/{answers.length}
          </div>
          <p className="mt-2 text-sm text-ink/65">Bạn có thể lưu lịch sử nếu đã đăng nhập.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || saved}
              className="rounded-full bg-torii px-5 py-3 text-sm text-white disabled:opacity-60"
            >
              {saved ? "Saved" : saving ? "Saving..." : "Save result"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setTypedAnswer("");
                setAnswers([]);
                setSaved(false);
                setError(null);
              }}
              className="rounded-full border border-amber-950/10 px-5 py-3 text-sm"
            >
              Restart quiz
            </button>
          </div>
          {error ? <p className="mt-4 text-sm text-torii">{error}</p> : null}
        </div>
        <div className="grid gap-4">
          {answers.map((answer, index) => (
            <div key={`${answer.prompt}-${index}`} className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div className="font-serif text-3xl">{answer.prompt}</div>
                <div className={`rounded-full px-3 py-1 text-xs ${answer.is_correct ? "bg-tea text-white" : "bg-torii text-white"}`}>
                  {answer.question_type}
                </div>
              </div>
              <div className="mt-3 text-sm text-ink/70">Your answer: {answer.user_answer}</div>
              <div className="mt-1 text-sm text-ink/70">Correct answer: {answer.correct_answer}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">Mixed quiz</p>
        <p className="text-sm text-ink/60">
          {currentIndex + 1}/{questions.length}
        </p>
      </div>
      <div className="mt-6 font-serif text-6xl">{current.prompt}</div>
      <p className="mt-3 text-sm text-ink/65">{current.instruction}</p>
      {current.question_type === "reading_input" ? (
        <div className="mt-6 space-y-4">
          <input
            value={typedAnswer}
            onChange={(event) => setTypedAnswer(event.target.value)}
            placeholder={current.input_placeholder}
            className="w-full rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-4 text-lg outline-none"
          />
          <p className="text-sm text-ink/55">Chap nhan so sanh khong phan biet hoa thuong.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {current.options.map((option) => {
            const chosen = selectedAnswer === option;
            const correct = selectedAnswer !== null && option === current.correct_answer;
            const wrong = chosen && option !== current.correct_answer;
            return (
              <button
                key={option}
                type="button"
                disabled={selectedAnswer !== null}
                onClick={() => setSelectedAnswer(option)}
                className={`rounded-2xl px-4 py-3 text-left text-sm ${
                  correct
                    ? "bg-tea text-white"
                    : wrong
                      ? "bg-torii text-white"
                      : "border border-amber-950/10 bg-[#fcfaf5]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
      <button
        type="button"
        disabled={current.question_type === "reading_input" ? typedAnswer.trim() === "" : selectedAnswer === null}
        onClick={() => {
          const userAnswer =
            current.question_type === "reading_input" ? typedAnswer.trim() : selectedAnswer;

          if (userAnswer === null || userAnswer === "") {
            return;
          }
          const isCorrect =
            current.question_type === "reading_input"
              ? userAnswer.toLowerCase() === current.correct_answer.toLowerCase()
              : userAnswer === current.correct_answer;

          setAnswers((currentAnswers) => [
            ...currentAnswers,
            {
              prompt: current.prompt,
              user_answer: userAnswer,
              correct_answer: current.correct_answer,
              question_type: current.question_type,
              is_correct: isCorrect
            }
          ]);
          setSelectedAnswer(null);
          setTypedAnswer("");
          setCurrentIndex((value) => value + 1);
        }}
        className="mt-6 rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60"
      >
        Next question
      </button>
    </div>
  );
}
