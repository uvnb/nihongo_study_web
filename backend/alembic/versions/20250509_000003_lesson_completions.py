"""add lesson completions

Revision ID: 20250509_000003
Revises: 20250509_000002
Create Date: 2025-05-09 00:00:03
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20250509_000003"
down_revision = "20250509_000002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_lesson_completions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("lesson_id", sa.Integer(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["lesson_id"], ["lessons.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_lesson_completions_completed_at"), "user_lesson_completions", ["completed_at"], unique=False)
    op.create_index(op.f("ix_user_lesson_completions_id"), "user_lesson_completions", ["id"], unique=False)
    op.create_index(op.f("ix_user_lesson_completions_lesson_id"), "user_lesson_completions", ["lesson_id"], unique=False)
    op.create_index(op.f("ix_user_lesson_completions_user_id"), "user_lesson_completions", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_user_lesson_completions_user_id"), table_name="user_lesson_completions")
    op.drop_index(op.f("ix_user_lesson_completions_lesson_id"), table_name="user_lesson_completions")
    op.drop_index(op.f("ix_user_lesson_completions_id"), table_name="user_lesson_completions")
    op.drop_index(op.f("ix_user_lesson_completions_completed_at"), table_name="user_lesson_completions")
    op.drop_table("user_lesson_completions")
