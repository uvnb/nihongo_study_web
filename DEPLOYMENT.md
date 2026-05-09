# Deployment Guide

## Target layout

- `Vercel project 1`: frontend, root directory `frontend`
- `Vercel project 2`: API, root directory `backend`
- `Railway`: PostgreSQL + Redis

## Google OAuth values

### Local

- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/auth/google/callback`

### Production

- Authorized JavaScript origin: `https://<frontend-project>.vercel.app`
- Authorized redirect URI: `https://<frontend-project>.vercel.app/auth/google/callback`

Replace `<frontend-project>` with the real Vercel frontend hostname.

## Frontend env vars on Vercel

- `NEXT_PUBLIC_SITE_URL=https://<frontend-project>.vercel.app`
- `NEXT_PUBLIC_API_BASE_URL=https://<api-project>.vercel.app`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google-client-id>`

## Backend env vars on Vercel

- `DATABASE_URL=<railway-postgres-url>`
- `REDIS_URL=<railway-redis-url>`
- `CORS_ORIGINS=http://localhost:3000,https://<frontend-project>.vercel.app`
- `JWT_SECRET=<strong-secret>`
- `GOOGLE_CLIENT_ID=<google-client-id>`
- `DB_STARTUP_TIMEOUT_SECONDS=60`

## Railway services

Create two managed services in one Railway project:

- PostgreSQL
- Redis

Use the generated connection strings as `DATABASE_URL` and `REDIS_URL` on the backend Vercel project.

## Backend deployment note

`backend/index.py` is the Vercel Python entrypoint and reuses the FastAPI app from `backend/app/main.py`.
