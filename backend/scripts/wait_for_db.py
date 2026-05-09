from __future__ import annotations

import time

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.core.config import get_settings
from app.core.database import engine


def main() -> None:
    settings = get_settings()
    deadline = time.time() + settings.db_startup_timeout_seconds
    last_error: Exception | None = None

    while time.time() < deadline:
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            print("Database is ready.")
            return
        except SQLAlchemyError as exc:
            last_error = exc
            time.sleep(2)

    if last_error is not None:
        raise SystemExit(f"Database did not become ready: {last_error}")
    raise SystemExit("Database did not become ready before timeout.")


if __name__ == "__main__":
    main()

