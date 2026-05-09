#!/usr/bin/env sh
set -eu

python -m scripts.wait_for_db
python -m scripts.migrate_db
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
