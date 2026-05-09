from __future__ import annotations

from datetime import datetime, timedelta


RATING_TO_DELTA = {
    "again": (0, timedelta(minutes=10)),
    "hard": (1, timedelta(days=1)),
    "easy": (2, timedelta(days=3)),
}


def compute_srs(level: int, rating: str) -> tuple[int, datetime]:
    now = datetime.utcnow()
    if rating not in RATING_TO_DELTA:
        raise ValueError("Invalid SRS rating")

    level_bump, delay = RATING_TO_DELTA[rating]
    if rating == "again":
        next_level = 0
    else:
        next_level = min(level + level_bump, 5)
    return next_level, now + delay
