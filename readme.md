# Nihongo

Monorepo MVP cho web hoc tieng Nhat gom `frontend` (Next.js 14) va `backend` (FastAPI).

## Lenh nhanh

```bash
make help
make install
make migrate
make seed
make dev-backend
make dev-frontend
```

## Chay nhanh

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

### Docker Compose

```bash
docker compose up --build
```

Frontend mac dinh chay tai `http://localhost:3000`, backend tai `http://localhost:8000`.

## Tinh nang hien co

- Trang da ngon ngu `vi/en/ja`
- API va UI cho lessons, vocabulary, kanji, flashcards
- Auth voi `register`, `login`, `me`, va `Google OAuth` khi da cau hinh client id
- CRUD lesson co bao ve bang bearer token

## Database va migration

- Backend da duoc chuyen sang luong `Alembic` thay vi `create_all`.
- Khi chay Docker, backend se doi PostgreSQL san sang, sau do tu dong `alembic upgrade head` truoc khi start API.
- Khi chay local, hay tao PostgreSQL roi chay:

```bash
cd backend
source .venv/bin/activate
alembic upgrade head
```

Neu dang con file SQLite cu tu giai doan truoc Alembic, hay xoa file DB cu roi chay lai migration.

## Google OAuth

- Backend can `GOOGLE_CLIENT_ID`
- Frontend can `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- Khi hai bien env nay duoc cau hinh, trang account se hien nut dang nhap Google
