"use client";

import { useEffect, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { getDashboardOverview, getDueReviews, getQuizHistory, getQuizStats } from "@/lib/api";
import { DashboardOverview, DueReviewItem, QuizSession, QuizStats } from "@/types/content";

export function DashboardPanel() {
  const [history, setHistory] = useState<QuizSession[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [dueReviews, setDueReviews] = useState<DueReviewItem[]>([]);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      setError("Please sign in to view dashboard.");
      return;
    }

    Promise.all([getQuizHistory(token), getQuizStats(token), getDueReviews(token), getDashboardOverview(token)])
      .then(([sessions, statsPayload, dueReviewItems, overviewPayload]) => {
        setHistory(sessions);
        setStats(statsPayload);
        setDueReviews(dueReviewItems);
        setOverview(overviewPayload);
      })
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : "Failed to load dashboard")
      );
  }, []);

  if (error) {
    return (
      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <p className="text-sm text-torii">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-6">
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Lessons</div>
          <div className="mt-3 font-serif text-4xl">{overview?.lessons_completed ?? 0}</div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Streak</div>
          <div className="mt-3 font-serif text-4xl">{overview?.current_streak ?? 0}</div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Sessions</div>
          <div className="mt-3 font-serif text-4xl">{stats?.total_sessions ?? 0}</div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Questions</div>
          <div className="mt-3 font-serif text-4xl">{stats?.total_questions ?? 0}</div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Correct</div>
          <div className="mt-3 font-serif text-4xl">{stats?.total_correct ?? 0}</div>
        </div>
        <div className="rounded-[2rem] bg-white/80 p-5 shadow-card">
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Average</div>
          <div className="mt-3 font-serif text-4xl">{Math.round((stats?.average_score ?? 0) * 100)}%</div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-card">
          <div className="font-serif text-2xl">Reviews due</div>
          <div className="mt-4 grid gap-3">
            {dueReviews.length ? (
              dueReviews.map((item) => (
                <div key={`${item.item_type}-${item.item_id}`} className="rounded-2xl bg-[#f8f3ea] p-4">
                  <div className="font-serif text-2xl">{item.prompt}</div>
                  <div className="mt-1 text-sm text-ink/65">{item.secondary}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-torii">
                    SRS {item.srs_level}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink/60">No reviews due right now.</p>
            )}
          </div>
        </div>
        {history.map((session) => (
          <div key={session.id} className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div className="font-serif text-2xl">{session.quiz_type}</div>
              <div className="text-sm text-ink/60">{new Date(session.created_at).toLocaleString()}</div>
            </div>
            <div className="mt-3 text-sm text-ink/70">
              Score: {session.score}/{session.total_questions}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
