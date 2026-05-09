from sqlalchemy import select
from sqlalchemy.orm import Session

from app.data.seed_content import KANJI, LESSONS, VOCABULARY
from app.models.content import Kanji, Lesson, Vocabulary


def seed_content(db: Session) -> None:
    lesson_map: dict[str, Lesson] = {}
    for lesson_data in LESSONS:
        lesson = db.scalar(select(Lesson).where(Lesson.slug == lesson_data["slug"]))
        if lesson is None:
            lesson = Lesson(**lesson_data)
            db.add(lesson)
            db.flush()
        lesson_map[lesson.slug] = lesson

    for vocab_data in VOCABULARY:
        lesson = lesson_map[vocab_data["lesson_slug"]]
        existing_vocab = db.scalar(
            select(Vocabulary).where(
                Vocabulary.lesson_id == lesson.id,
                Vocabulary.word == vocab_data["word"],
            )
        )
        if existing_vocab is None:
            db.add(
                Vocabulary(
                    lesson_id=lesson.id,
                    word=vocab_data["word"],
                    reading=vocab_data["reading"],
                    meaning_vi=vocab_data["meaning_vi"],
                    meaning_en=vocab_data["meaning_en"],
                    part_of_speech=vocab_data["part_of_speech"],
                    topic=vocab_data["topic"],
                    example=vocab_data["example"],
                )
            )

    for kanji_data in KANJI:
        existing_kanji = db.scalar(select(Kanji).where(Kanji.character == kanji_data["character"]))
        if existing_kanji is None:
            db.add(Kanji(**kanji_data))

    db.commit()
