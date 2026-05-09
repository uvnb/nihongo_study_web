SHELL := /bin/bash

.PHONY: help install install-frontend install-backend dev dev-frontend dev-backend migrate seed lint build compose-up compose-down backend-check frontend-check

help:
	@printf "\nNihongo commands:\n"
	@printf "  make install            Install frontend and backend dependencies\n"
	@printf "  make install-frontend   Install frontend dependencies\n"
	@printf "  make install-backend    Create backend venv and install dependencies\n"
	@printf "  make dev-frontend       Run Next.js dev server\n"
	@printf "  make dev-backend        Run FastAPI dev server\n"
	@printf "  make dev                Show how to run both app servers\n"
	@printf "  make migrate            Run Alembic migrations\n"
	@printf "  make seed               Seed initial content\n"
	@printf "  make lint               Run frontend lint and backend compile check\n"
	@printf "  make build              Build frontend and compile backend\n"
	@printf "  make compose-up         Start Docker Compose stack\n"
	@printf "  make compose-down       Stop Docker Compose stack\n"
	@printf "  make frontend-check     Run frontend lint and build\n"
	@printf "  make backend-check      Run backend compile check\n\n"

install: install-frontend install-backend

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt

dev:
	@printf "Run these in separate terminals:\n"
	@printf "  make dev-backend\n"
	@printf "  make dev-frontend\n"

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && source .venv/bin/activate && uvicorn app.main:app --reload

migrate:
	cd backend && source .venv/bin/activate && python -m scripts.migrate_db

seed:
	cd backend && source .venv/bin/activate && python -m scripts.seed_db

lint:
	cd frontend && npm run lint
	cd backend && source .venv/bin/activate && python -m compileall app scripts

build:
	cd frontend && npm run build
	cd backend && source .venv/bin/activate && python -m compileall app scripts

frontend-check:
	cd frontend && npm run lint && npm run build

backend-check:
	cd backend && source .venv/bin/activate && python -m compileall app scripts

compose-up:
	docker compose up --build

compose-down:
	docker compose down
