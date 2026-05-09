from __future__ import annotations

from datetime import date, timedelta


def compute_current_streak(activity_dates: list[date]) -> int:
    if not activity_dates:
        return 0

    unique_dates = sorted(set(activity_dates), reverse=True)
    today = unique_dates[0]
    streak = 0
    expected = today

    for value in unique_dates:
        if value == expected:
            streak += 1
            expected = expected - timedelta(days=1)
        elif value < expected:
            break

    return streak
