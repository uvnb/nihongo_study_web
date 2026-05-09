from sqlalchemy.orm import Session

from app.core.database import engine
from app.services.init_db import initialize_seed_data


def main() -> None:
    with Session(engine) as session:
        initialize_seed_data(session)
    print("Seed completed.")


if __name__ == "__main__":
    main()
