"use client";

import { useEffect, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { completeLesson, getLessonProgress, uncompleteLesson } from "@/lib/api";

type LessonProgressPanelProps = {
  lessonSlug: string;
};

export function LessonProgressPanel({ lessonSlug }: LessonProgressPanelProps) {
  const [completed, setCompleted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      return;
    }
    getLessonProgress(token)
      .then((items) => setCompleted(items.some((item) => item.lesson_slug === lessonSlug)))
      .catch(() => {});
  }, [lessonSlug]);

  async function toggleCompletion() {
    const token = readStoredToken();
    if (!token) {
      setMessage("Please sign in to save lesson progress.");
      return;
    }

    setBusy(true);
    setMessage(null);
    try {
      if (completed) {
        await uncompleteLesson(lessonSlug, token);
        setCompleted(false);
        setMessage("Lesson marked as not completed.");
      } else {
        await completeLesson(lessonSlug, token);
        setCompleted(true);
        setMessage("Lesson marked complete.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update lesson progress");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 rounded-[2rem] border border-amber-950/10 bg-[#f8f3ea] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Lesson progress</div>
          <div className="mt-2 text-sm text-ink/70">
            {completed ? "This lesson is completed." : "Mark this lesson complete when you finish it."}
          </div>
        </div>
        <button
          type="button"
          onClick={toggleCompletion}
          disabled={busy}
          className={`rounded-full px-5 py-3 text-sm text-white disabled:opacity-60 ${
            completed ? "bg-tea" : "bg-ink"
          }`}
        >
          {completed ? "Completed" : "Mark complete"}
        </button>
      </div>
      {message ? <p className="mt-3 text-sm text-ink/60">{message}</p> : null}
    </div>
  );
}

