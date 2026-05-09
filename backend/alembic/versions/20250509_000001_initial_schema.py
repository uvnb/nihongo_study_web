"""initial schema

Revision ID: 20250509_000001
Revises:
Create Date: 2025-05-09 00:00:01
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20250509_000001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("display_name", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    op.create_table(
        "kanji",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("character", sa.String(length=8), nullable=False),
        sa.Column("meaning_vi", sa.String(length=255), nullable=False),
        sa.Column("meaning_en", sa.String(length=255), nullable=False),
        sa.Column("onyomi", sa.String(length=255), nullable=False),
        sa.Column("kunyomi", sa.String(length=255), nullable=False),
        sa.Column("jlpt_level", sa.String(length=10), nullable=False),
        sa.Column("radical", sa.String(length=120), nullable=False),
        sa.Column("strokes", sa.Integer(), nullable=False),
        sa.Column("examples", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_kanji_character"), "kanji", ["character"], unique=True)
    op.create_index(op.f("ix_kanji_id"), "kanji", ["id"], unique=False)
    op.create_index(op.f("ix_kanji_jlpt_level"), "kanji", ["jlpt_level"], unique=False)

    op.create_table(
        "lessons",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=120), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("title_ja", sa.String(length=255), nullable=False),
        sa.Column("level", sa.String(length=10), nullable=False),
        sa.Column("unit_number", sa.Integer(), nullable=False),
        sa.Column("textbook", sa.String(length=255), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_lessons_id"), "lessons", ["id"], unique=False)
    op.create_index(op.f("ix_lessons_level"), "lessons", ["level"], unique=False)
    op.create_index(op.f("ix_lessons_slug"), "lessons", ["slug"], unique=True)

    op.create_table(
        "quiz_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("quiz_type", sa.String(length=50), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("total_questions", sa.Integer(), nullable=False),
        sa.Column("answers_json", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_quiz_sessions_created_at"), "quiz_sessions", ["created_at"], unique=False)
    op.create_index(op.f("ix_quiz_sessions_id"), "quiz_sessions", ["id"], unique=False)
    op.create_index(op.f("ix_quiz_sessions_quiz_type"), "quiz_sessions", ["quiz_type"], unique=False)
    op.create_index(op.f("ix_quiz_sessions_user_id"), "quiz_sessions", ["user_id"], unique=False)

    op.create_table(
        "vocabulary",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lesson_id", sa.Integer(), nullable=False),
        sa.Column("word", sa.String(length=120), nullable=False),
        sa.Column("reading", sa.String(length=120), nullable=False),
        sa.Column("meaning_vi", sa.String(length=255), nullable=False),
        sa.Column("meaning_en", sa.String(length=255), nullable=False),
        sa.Column("part_of_speech", sa.String(length=120), nullable=False),
        sa.Column("topic", sa.String(length=120), nullable=False),
        sa.Column("example", sa.Text(), nullable=False),
        sa.Column("audio_url", sa.String(length=255), nullable=True),
        sa.ForeignKeyConstraint(["lesson_id"], ["lessons.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_vocabulary_id"), "vocabulary", ["id"], unique=False)
    op.create_index(op.f("ix_vocabulary_lesson_id"), "vocabulary", ["lesson_id"], unique=False)
    op.create_index(op.f("ix_vocabulary_topic"), "vocabulary", ["topic"], unique=False)
    op.create_index(op.f("ix_vocabulary_word"), "vocabulary", ["word"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_vocabulary_word"), table_name="vocabulary")
    op.drop_index(op.f("ix_vocabulary_topic"), table_name="vocabulary")
    op.drop_index(op.f("ix_vocabulary_lesson_id"), table_name="vocabulary")
    op.drop_index(op.f("ix_vocabulary_id"), table_name="vocabulary")
    op.drop_table("vocabulary")

    op.drop_index(op.f("ix_quiz_sessions_user_id"), table_name="quiz_sessions")
    op.drop_index(op.f("ix_quiz_sessions_quiz_type"), table_name="quiz_sessions")
    op.drop_index(op.f("ix_quiz_sessions_id"), table_name="quiz_sessions")
    op.drop_index(op.f("ix_quiz_sessions_created_at"), table_name="quiz_sessions")
    op.drop_table("quiz_sessions")

    op.drop_index(op.f("ix_lessons_slug"), table_name="lessons")
    op.drop_index(op.f("ix_lessons_level"), table_name="lessons")
    op.drop_index(op.f("ix_lessons_id"), table_name="lessons")
    op.drop_table("lessons")

    op.drop_index(op.f("ix_kanji_jlpt_level"), table_name="kanji")
    op.drop_index(op.f("ix_kanji_id"), table_name="kanji")
    op.drop_index(op.f("ix_kanji_character"), table_name="kanji")
    op.drop_table("kanji")

    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")

