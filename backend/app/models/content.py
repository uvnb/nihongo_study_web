from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    display_name: Mapped[str] = mapped_column(String(255))
    auth_provider: Mapped[str] = mapped_column(String(30), default="email")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    title_ja: Mapped[str] = mapped_column(String(255))
    level: Mapped[str] = mapped_column(String(10), index=True)
    unit_number: Mapped[int] = mapped_column(Integer)
    textbook: Mapped[str] = mapped_column(String(255))
    summary: Mapped[str] = mapped_column(Text)
    content: Mapped[str] = mapped_column(Text)

    vocabulary: Mapped[list["Vocabulary"]] = relationship(back_populates="lesson")


class Vocabulary(Base):
    __tablename__ = "vocabulary"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"), index=True)
    word: Mapped[str] = mapped_column(String(120), index=True)
    reading: Mapped[str] = mapped_column(String(120))
    meaning_vi: Mapped[str] = mapped_column(String(255))
    meaning_en: Mapped[str] = mapped_column(String(255))
    part_of_speech: Mapped[str] = mapped_column(String(120))
    topic: Mapped[str] = mapped_column(String(120), index=True)
    example: Mapped[str] = mapped_column(Text)
    audio_url: Mapped[str | None] = mapped_column(String(255), nullable=True)

    lesson: Mapped[Lesson] = relationship(back_populates="vocabulary")


class Kanji(Base):
    __tablename__ = "kanji"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    character: Mapped[str] = mapped_column(String(8), unique=True, index=True)
    meaning_vi: Mapped[str] = mapped_column(String(255))
    meaning_en: Mapped[str] = mapped_column(String(255))
    onyomi: Mapped[str] = mapped_column(String(255))
    kunyomi: Mapped[str] = mapped_column(String(255))
    jlpt_level: Mapped[str] = mapped_column(String(10), index=True)
    radical: Mapped[str] = mapped_column(String(120))
    strokes: Mapped[int] = mapped_column(Integer)
    examples: Mapped[str] = mapped_column(Text)


class QuizSession(Base):
    __tablename__ = "quiz_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    quiz_type: Mapped[str] = mapped_column(String(50), index=True)
    score: Mapped[int] = mapped_column(Integer)
    total_questions: Mapped[int] = mapped_column(Integer)
    answers_json: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)


class UserProgress(Base):
    __tablename__ = "user_progress"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    item_type: Mapped[str] = mapped_column(String(30), index=True)
    item_id: Mapped[int] = mapped_column(Integer, index=True)
    srs_level: Mapped[int] = mapped_column(Integer, default=0)
    next_review: Mapped[datetime] = mapped_column(DateTime, index=True)
    last_reviewed: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class UserLessonCompletion(Base):
    __tablename__ = "user_lesson_completions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"), index=True)
    completed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
