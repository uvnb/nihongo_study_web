"""add user auth provider

Revision ID: 20250509_000004
Revises: 20250509_000003
Create Date: 2026-05-09 21:45:00
"""

from alembic import op
import sqlalchemy as sa


revision = "20250509_000004"
down_revision = "20250509_000003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("auth_provider", sa.String(length=30), nullable=True))
    op.execute("UPDATE users SET auth_provider = 'email' WHERE auth_provider IS NULL")
    op.alter_column("users", "auth_provider", nullable=False)


def downgrade() -> None:
    op.drop_column("users", "auth_provider")
