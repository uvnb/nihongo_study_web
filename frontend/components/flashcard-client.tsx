"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { getProgress, submitReview } from "@/lib/api";
import { VocabularyItem } from "@/types/content";

type FlashcardClientProps = {
  cards: VocabularyItem[];
};

export function FlashcardClient({ cards }: FlashcardClientProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      return;
    }
    getProgress(token)
      .then((items) => {
        setProgressMap(
          Object.fromEntries(items.map((item) => [item.item_id, item.srs_level]))
        );
      })
      .catch(() => {});
  }, []);

  const card = cards[index];
  const currentLevel = useMemo(
    () => (card ? progressMap[card.id] ?? 0 : 0),
    [card, progressMap]
  );

  if (!card) {
    return <div className="rounded-3xl bg-white p-8">No flashcards</div>;
  }

  async function handleReview(rating: "again" | "hard" | "easy") {
    const token = readStoredToken();
    setFlipped(false);
    setStatus(null);
    if (!token) {
      setIndex((value) => (value + 1) % cards.length);
      return;
    }
    setSaving(true);
    try {
      const progress = await submitReview(
        { item_type: "vocabulary", item_id: card.id, rating },
        token
      );
      setProgressMap((current) => ({ ...current, [card.id]: progress.srs_level }));
      setStatus(`Saved SRS level ${progress.srs_level}`);
      setIndex((value) => (value + 1) % cards.length);
    } catch {
      setStatus("Could not save progress");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className="block w-full text-left"
      >
        <motion.div
          key={`${card.id}-${flipped ? "back" : "front"}`}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-[2rem] border border-amber-950/10 bg-white p-10 shadow-card"
        >
          <div className="text-xs uppercase tracking-[0.35em] text-torii">{card.topic}</div>
          <div className="mt-3 text-xs uppercase tracking-[0.25em] text-ink/45">SRS level {currentLevel}</div>
          <div className="mt-8 font-serif text-5xl text-ink">{flipped ? card.meaning_vi : card.word}</div>
          <div className="mt-3 text-lg text-ink/70">{flipped ? card.example : card.reading}</div>
        </motion.div>
      </button>
      {status ? <p className="text-sm text-ink/60">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setFlipped(false);
            setIndex((value) => (value === 0 ? cards.length - 1 : value - 1));
          }}
          className="rounded-full border border-amber-950/10 bg-white px-5 py-2 text-sm"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            setFlipped(false);
            setIndex((value) => (value + 1) % cards.length);
          }}
          className="rounded-full bg-torii px-5 py-2 text-sm text-white"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => handleReview("again")}
          disabled={saving}
          className="rounded-full border border-amber-950/10 bg-white px-5 py-2 text-sm disabled:opacity-60"
        >
          Again
        </button>
        <button
          type="button"
          onClick={() => handleReview("hard")}
          disabled={saving}
          className="rounded-full border border-amber-950/10 bg-[#e6d4aa] px-5 py-2 text-sm text-ink disabled:opacity-60"
        >
          Hard
        </button>
        <button
          type="button"
          onClick={() => handleReview("easy")}
          disabled={saving}
          className="rounded-full border border-amber-950/10 bg-tea px-5 py-2 text-sm text-white disabled:opacity-60"
        >
          Easy
        </button>
      </div>
    </div>
  );
}
