from sqlalchemy import inspect
from sqlalchemy.orm import Session

from app.core.database import engine
from app.services.seed import seed_content


def initialize_seed_data(db: Session) -> None:
    inspector = inspect(engine)
    if "lessons" not in inspector.get_table_names():
        return
    seed_content(db)
