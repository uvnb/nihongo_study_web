"use client";

import { useMemo, useState } from "react";

import { KanjiItem } from "@/types/content";

type KanjiQuizProps = {
  items: KanjiItem[];
};

function shuffle<T>(values: T[]) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function KanjiQuiz({ items }: KanjiQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const rounds = useMemo(() => shuffle(items).slice(0, Math.min(items.length, 5)), [items]);
  const isComplete = currentIndex >= rounds.length;
  const current = rounds[currentIndex];
  const options = useMemo(() => {
    if (!current) {
      return [];
    }
    const distractors = shuffle(
      items
        .filter((item) => item.id !== current.id)
        .map((item) => item.meaning_vi)
    ).slice(0, 3);
    return shuffle([current.meaning_vi, ...distractors]);
  }, [current, items]);

  if (isComplete) {
    return (
      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">Quiz</p>
        <div className="mt-4 font-serif text-3xl">Score {score}/{rounds.length}</div>
        <button
          type="button"
          onClick={() => {
            setCurrentIndex(0);
            setSelectedAnswer(null);
            setScore(0);
          }}
          className="mt-5 rounded-full bg-ink px-5 py-3 text-sm text-white"
        >
          Restart quiz
        </button>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.35em] text-torii">Quiz</p>
        <p className="text-sm text-ink/60">
          Question {currentIndex + 1}/{rounds.length}
        </p>
      </div>
      <div className="mt-6 font-serif text-7xl">{current.character}</div>
      <p className="mt-3 text-sm text-ink/65">Chon nghia tieng Viet dung nhat.</p>
      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const chosen = selectedAnswer === option;
          const correct = selectedAnswer !== null && option === current.meaning_vi;
          const wrong = chosen && option !== current.meaning_vi;
          return (
            <button
              key={option}
              type="button"
              disabled={selectedAnswer !== null}
              onClick={() => {
                setSelectedAnswer(option);
                if (option === current.meaning_vi) {
                  setScore((value) => value + 1);
                }
              }}
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
      <button
        type="button"
        disabled={selectedAnswer === null}
        onClick={() => {
          setSelectedAnswer(null);
          setCurrentIndex((value) => value + 1);
        }}
        className="mt-6 rounded-full bg-torii px-5 py-3 text-sm text-white disabled:opacity-60"
      >
        Next question
      </button>
    </div>
  );
}
