"""add user progress

Revision ID: 20250509_000002
Revises: 20250509_000001
Create Date: 2025-05-09 00:00:02
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20250509_000002"
down_revision = "20250509_000001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_progress",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("item_type", sa.String(length=30), nullable=False),
        sa.Column("item_id", sa.Integer(), nullable=False),
        sa.Column("srs_level", sa.Integer(), nullable=False),
        sa.Column("next_review", sa.DateTime(), nullable=False),
        sa.Column("last_reviewed", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_user_progress_id"), "user_progress", ["id"], unique=False)
    op.create_index(op.f("ix_user_progress_item_id"), "user_progress", ["item_id"], unique=False)
    op.create_index(op.f("ix_user_progress_item_type"), "user_progress", ["item_type"], unique=False)
    op.create_index(op.f("ix_user_progress_next_review"), "user_progress", ["next_review"], unique=False)
    op.create_index(op.f("ix_user_progress_user_id"), "user_progress", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_user_progress_user_id"), table_name="user_progress")
    op.drop_index(op.f("ix_user_progress_next_review"), table_name="user_progress")
    op.drop_index(op.f("ix_user_progress_item_type"), table_name="user_progress")
    op.drop_index(op.f("ix_user_progress_item_id"), table_name="user_progress")
    op.drop_index(op.f("ix_user_progress_id"), table_name="user_progress")
    op.drop_table("user_progress")
