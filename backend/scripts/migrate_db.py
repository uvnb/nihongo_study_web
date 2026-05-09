from __future__ import annotations

import subprocess

from sqlalchemy import text
from sqlalchemy import inspect

from app.core.database import engine

INITIAL_REVISION = "20250509_000001"


def run_alembic(*args: str) -> None:
    subprocess.run(["alembic", *args], check=True)


def main() -> None:
    inspector = inspect(engine)
    table_names = set(inspector.get_table_names())
    has_alembic_table = "alembic_version" in table_names
    has_legacy_schema = {"users", "lessons", "vocabulary", "kanji"}.issubset(table_names)
    current_revision = None

    if has_alembic_table:
        with engine.connect() as connection:
            current_revision = connection.execute(
                text("SELECT version_num FROM alembic_version LIMIT 1")
            ).scalar()

    if has_legacy_schema and (not has_alembic_table or current_revision is None):
        print(f"Legacy schema detected. Stamping {INITIAL_REVISION} before upgrade.")
        run_alembic("stamp", INITIAL_REVISION)

    run_alembic("upgrade", "head")
    print("Migration completed.")


if __name__ == "__main__":
    main()
