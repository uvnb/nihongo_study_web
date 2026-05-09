"use client";

import { useEffect, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { getDashboardOverview } from "@/lib/api";
import { dictionaries, Locale } from "@/lib/i18n";
import { DashboardOverview } from "@/types/content";

export function HomeOverviewPanel({ locale }: { locale: Locale }) {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const t = dictionaries[locale];

  useEffect(() => {
    const token = readStoredToken();
    if (!token) {
      return;
    }
    getDashboardOverview(token).then(setOverview).catch(() => {});
  }, []);

  return (
    <div className="pattern-seigaiha rounded-[2rem] bg-ink p-8 text-white shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-gold">{t.home.today}</p>
      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-3xl font-serif">{overview?.lessons_completed ?? 0}</div>
          <div className="text-sm text-white/70">{t.home.todayLabels.lessonsCompleted}</div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-3xl font-serif">{overview?.current_streak ?? 0}</div>
          <div className="text-sm text-white/70">{t.home.todayLabels.streak}</div>
        </div>
      </div>
    </div>
  );
}
