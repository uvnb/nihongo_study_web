import json
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.core.database import get_db
from app.models.content import (
    Kanji,
    Lesson,
    QuizSession,
    User,
    UserLessonCompletion,
    UserProgress,
    Vocabulary,
)
from app.schemas.content import (
    DashboardOverview,
    DueReviewItem,
    GoogleAuthRequest,
    KanjiCreate,
    KanjiItem,
    KanjiUpdate,
    LessonCompletionRead,
    LessonCompletionToggle,
    ProgressRead,
    QuizSessionCreate,
    QuizSessionRead,
    QuizStats,
    ReviewSubmission,
    LessonCreate,
    LessonDetail,
    LessonSummary,
    LessonUpdate,
    TokenResponse,
    UserLogin,
    UserRead,
    UserRegister,
    VocabularyCreate,
    VocabularyItem,
    VocabularyUpdate,
)
from app.services.google_auth import verify_google_credential
from app.services.srs import compute_srs
from app.services.streaks import compute_current_streak

router = APIRouter(prefix="/api")


def to_user_read(user: User) -> UserRead:
    return UserRead(
        id=user.id,
        email=user.email,
        display_name=user.display_name,
        auth_provider=user.auth_provider,
    )


@router.get("/health")
def healthcheck():
    return {"status": "ok"}


@router.post("/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if existing_user is not None:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
        display_name=payload.display_name,
        auth_provider="email",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, user=to_user_read(user))


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, user=to_user_read(user))


@router.post("/auth/google", response_model=TokenResponse)
def google_login(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    try:
        token_info = verify_google_credential(payload.credential)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    email = token_info["email"].lower()
    user = db.scalar(select(User).where(User.email == email))
    if user is None:
        display_name = token_info.get("name") or email.split("@", 1)[0]
        user = User(
            email=email,
            hashed_password=hash_password(f"google-oauth:{token_info.get('sub', email)}"),
            display_name=display_name,
            auth_provider="google",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, user=to_user_read(user))


@router.get("/auth/me", response_model=UserRead)
def me(current_user: User = Depends(get_current_user)):
    return to_user_read(current_user)


@router.get("/dashboard/quiz-history", response_model=list[QuizSessionRead])
def list_quiz_history(
    limit: int = Query(default=10, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sessions = db.scalars(
        select(QuizSession)
        .where(QuizSession.user_id == current_user.id)
        .order_by(QuizSession.created_at.desc())
        .limit(limit)
    )
    return [
        QuizSessionRead(
            id=session.id,
            quiz_type=session.quiz_type,
            score=session.score,
            total_questions=session.total_questions,
            answers=json.loads(session.answers_json),
            created_at=session.created_at.isoformat(),
        )
        for session in sessions
    ]


@router.get("/dashboard/quiz-stats", response_model=QuizStats)
def get_quiz_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    sessions = list(
        db.scalars(select(QuizSession).where(QuizSession.user_id == current_user.id))
    )
    total_sessions = len(sessions)
    total_questions = sum(session.total_questions for session in sessions)
    total_correct = sum(session.score for session in sessions)
    average_score = (total_correct / total_questions) if total_questions else 0.0
    return QuizStats(
        total_sessions=total_sessions,
        total_questions=total_questions,
        total_correct=total_correct,
        average_score=average_score,
    )


@router.get("/dashboard/reviews-due", response_model=list[DueReviewItem])
def get_reviews_due(
    limit: int = Query(default=20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    progress_rows = list(
        db.scalars(
            select(UserProgress)
            .where(
                UserProgress.user_id == current_user.id,
                UserProgress.next_review <= func.now(),
            )
            .order_by(UserProgress.next_review.asc())
            .limit(limit)
        )
    )
    vocab_map = {
        vocab.id: vocab
        for vocab in db.scalars(
            select(Vocabulary).where(
                Vocabulary.id.in_([row.item_id for row in progress_rows if row.item_type == "vocabulary"])
            )
        )
    }
    return [
        DueReviewItem(
            item_type=row.item_type,
            item_id=row.item_id,
            prompt=vocab_map[row.item_id].word,
            secondary=vocab_map[row.item_id].meaning_vi,
            srs_level=row.srs_level,
            next_review=row.next_review.isoformat(),
        )
        for row in progress_rows
        if row.item_type == "vocabulary" and row.item_id in vocab_map
    ]


@router.get("/dashboard/overview", response_model=DashboardOverview)
def get_dashboard_overview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    completions = list(
        db.scalars(
            select(UserLessonCompletion).where(UserLessonCompletion.user_id == current_user.id)
        )
    )
    progress_rows = list(
        db.scalars(select(UserProgress).where(UserProgress.user_id == current_user.id))
    )
    quiz_rows = list(
        db.scalars(select(QuizSession).where(QuizSession.user_id == current_user.id))
    )
    activity_dates = [row.completed_at.date() for row in completions]
    activity_dates.extend(row.last_reviewed.date() for row in progress_rows)
    activity_dates.extend(row.created_at.date() for row in quiz_rows)

    return DashboardOverview(
        lessons_completed=len(completions),
        current_streak=compute_current_streak(activity_dates),
    )


@router.get("/lesson-progress", response_model=list[LessonCompletionRead])
def list_lesson_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    completion_rows = db.execute(
        select(UserLessonCompletion, Lesson.slug.label("lesson_slug"))
        .join(Lesson, Lesson.id == UserLessonCompletion.lesson_id)
        .where(UserLessonCompletion.user_id == current_user.id)
        .order_by(UserLessonCompletion.completed_at.desc())
    )
    return [
        LessonCompletionRead(
            lesson_slug=lesson_slug,
            completed_at=completion.completed_at.isoformat(),
        )
        for completion, lesson_slug in completion_rows
    ]


@router.post("/lesson-progress/complete", response_model=LessonCompletionRead)
def complete_lesson(
    payload: LessonCompletionToggle,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == payload.lesson_slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    completion = db.scalar(
        select(UserLessonCompletion).where(
            UserLessonCompletion.user_id == current_user.id,
            UserLessonCompletion.lesson_id == lesson.id,
        )
    )
    if completion is None:
        completion = UserLessonCompletion(user_id=current_user.id, lesson_id=lesson.id)
        db.add(completion)
        db.commit()
        db.refresh(completion)

    return LessonCompletionRead(
        lesson_slug=lesson.slug,
        completed_at=completion.completed_at.isoformat(),
    )


@router.delete("/lesson-progress/{lesson_slug}", status_code=status.HTTP_204_NO_CONTENT)
def uncomplete_lesson(
    lesson_slug: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == lesson_slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    completion = db.scalar(
        select(UserLessonCompletion).where(
            UserLessonCompletion.user_id == current_user.id,
            UserLessonCompletion.lesson_id == lesson.id,
        )
    )
    if completion is None:
        raise HTTPException(status_code=404, detail="Lesson completion not found")
    db.delete(completion)
    db.commit()


@router.post("/progress/review", response_model=ProgressRead)
def review_progress(
    payload: ReviewSubmission,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if payload.item_type != "vocabulary":
        raise HTTPException(status_code=400, detail="Only vocabulary progress is supported in MVP")

    vocab = db.scalar(select(Vocabulary).where(Vocabulary.id == payload.item_id))
    if vocab is None:
        raise HTTPException(status_code=404, detail="Vocabulary not found")

    progress = db.scalar(
        select(UserProgress).where(
            UserProgress.user_id == current_user.id,
            UserProgress.item_type == payload.item_type,
            UserProgress.item_id == payload.item_id,
        )
    )
    current_level = progress.srs_level if progress is not None else 0

    try:
        next_level, next_review = compute_srs(current_level, payload.rating)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    reviewed_at = datetime.utcnow()
    if progress is None:
        progress = UserProgress(
            user_id=current_user.id,
            item_type=payload.item_type,
            item_id=payload.item_id,
            srs_level=next_level,
            next_review=next_review,
            last_reviewed=reviewed_at,
        )
    else:
        progress.srs_level = next_level
        progress.next_review = next_review
        progress.last_reviewed = reviewed_at
    db.add(progress)
    db.commit()
    db.refresh(progress)
    return ProgressRead(
        item_type=progress.item_type,
        item_id=progress.item_id,
        srs_level=progress.srs_level,
        next_review=progress.next_review.isoformat(),
        last_reviewed=progress.last_reviewed.isoformat(),
    )


@router.get("/progress", response_model=list[ProgressRead])
def list_progress(
    item_type: str | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = select(UserProgress).where(UserProgress.user_id == current_user.id)
    if item_type:
        query = query.where(UserProgress.item_type == item_type)
    rows = db.scalars(query.order_by(UserProgress.next_review.asc()))
    return [
        ProgressRead(
            item_type=row.item_type,
            item_id=row.item_id,
            srs_level=row.srs_level,
            next_review=row.next_review.isoformat(),
            last_reviewed=row.last_reviewed.isoformat(),
        )
        for row in rows
    ]


@router.post("/quiz-sessions", response_model=QuizSessionRead, status_code=status.HTTP_201_CREATED)
def create_quiz_session(
    payload: QuizSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    session = QuizSession(
        user_id=current_user.id,
        quiz_type=payload.quiz_type,
        score=payload.score,
        total_questions=payload.total_questions,
        answers_json=json.dumps([answer.model_dump() for answer in payload.answers]),
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return QuizSessionRead(
        id=session.id,
        quiz_type=session.quiz_type,
        score=session.score,
        total_questions=session.total_questions,
        answers=payload.answers,
        created_at=session.created_at.isoformat(),
    )


@router.get("/lessons", response_model=list[LessonSummary])
def list_lessons(level: str | None = None, db: Session = Depends(get_db)):
    vocab_count = func.count(Vocabulary.id).label("vocabulary_count")
    query = (
        select(
            Lesson.slug,
            Lesson.title,
            Lesson.title_ja,
            Lesson.level,
            Lesson.unit_number,
            Lesson.textbook,
            Lesson.summary,
            vocab_count,
        )
        .outerjoin(Vocabulary, Vocabulary.lesson_id == Lesson.id)
        .group_by(Lesson.id)
        .order_by(Lesson.unit_number.asc())
    )
    if level:
        query = query.where(Lesson.level == level)
    return [LessonSummary.model_validate(row._mapping) for row in db.execute(query)]


@router.get("/lessons/{slug}", response_model=LessonDetail)
def get_lesson(slug: str, db: Session = Depends(get_db)):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    vocabulary_count = db.scalar(
        select(func.count(Vocabulary.id)).where(Vocabulary.lesson_id == lesson.id)
    )
    payload = {
        "slug": lesson.slug,
        "title": lesson.title,
        "title_ja": lesson.title_ja,
        "level": lesson.level,
        "unit_number": lesson.unit_number,
        "textbook": lesson.textbook,
        "summary": lesson.summary,
        "content": lesson.content,
        "vocabulary_count": vocabulary_count or 0,
    }
    return LessonDetail.model_validate(payload)


@router.post("/lessons", response_model=LessonDetail, status_code=status.HTTP_201_CREATED)
def create_lesson(
    payload: LessonCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    existing_lesson = db.scalar(select(Lesson).where(Lesson.slug == payload.slug))
    if existing_lesson is not None:
        raise HTTPException(status_code=400, detail="Lesson slug already exists")

    lesson = Lesson(**payload.model_dump())
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return get_lesson(lesson.slug, db)


@router.put("/lessons/{slug}", response_model=LessonDetail)
def update_lesson(
    slug: str,
    payload: LessonUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    for field, value in payload.model_dump().items():
        setattr(lesson, field, value)
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return get_lesson(lesson.slug, db)


@router.delete("/lessons/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lesson(
    slug: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    for vocab in db.scalars(select(Vocabulary).where(Vocabulary.lesson_id == lesson.id)):
        db.delete(vocab)
    db.delete(lesson)
    db.commit()


@router.get("/vocabulary", response_model=list[VocabularyItem])
def list_vocabulary(
    lesson_slug: str | None = None,
    topic: str | None = None,
    q: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = (
        select(Vocabulary, Lesson.slug.label("lesson_slug"))
        .join(Lesson, Vocabulary.lesson_id == Lesson.id)
        .order_by(Lesson.unit_number.asc(), Vocabulary.word.asc())
    )
    if lesson_slug:
        query = query.where(Lesson.slug == lesson_slug)
    if topic:
        query = query.where(Vocabulary.topic == topic)
    if q:
        pattern = f"%{q}%"
        query = query.where(
            or_(
                Vocabulary.word.ilike(pattern),
                Vocabulary.reading.ilike(pattern),
                Vocabulary.meaning_vi.ilike(pattern),
                Vocabulary.meaning_en.ilike(pattern),
            )
        )
    rows = db.execute(query)
    return [
        VocabularyItem(
            id=vocab.id,
            lesson_slug=lesson_slug_value,
            word=vocab.word,
            reading=vocab.reading,
            meaning_vi=vocab.meaning_vi,
            meaning_en=vocab.meaning_en,
            part_of_speech=vocab.part_of_speech,
            topic=vocab.topic,
            example=vocab.example,
            audio_url=vocab.audio_url,
        )
        for vocab, lesson_slug_value in rows
    ]


@router.post("/vocabulary", response_model=VocabularyItem, status_code=status.HTTP_201_CREATED)
def create_vocabulary(
    payload: VocabularyCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == payload.lesson_slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    vocab = Vocabulary(
        lesson_id=lesson.id,
        word=payload.word,
        reading=payload.reading,
        meaning_vi=payload.meaning_vi,
        meaning_en=payload.meaning_en,
        part_of_speech=payload.part_of_speech,
        topic=payload.topic,
        example=payload.example,
        audio_url=payload.audio_url,
    )
    db.add(vocab)
    db.commit()
    db.refresh(vocab)
    return VocabularyItem(
        id=vocab.id,
        lesson_slug=lesson.slug,
        word=vocab.word,
        reading=vocab.reading,
        meaning_vi=vocab.meaning_vi,
        meaning_en=vocab.meaning_en,
        part_of_speech=vocab.part_of_speech,
        topic=vocab.topic,
        example=vocab.example,
        audio_url=vocab.audio_url,
    )


@router.put("/vocabulary/{vocabulary_id}", response_model=VocabularyItem)
def update_vocabulary(
    vocabulary_id: int,
    payload: VocabularyUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    vocab = db.scalar(select(Vocabulary).where(Vocabulary.id == vocabulary_id))
    if vocab is None:
        raise HTTPException(status_code=404, detail="Vocabulary not found")

    lesson = db.scalar(select(Lesson).where(Lesson.slug == payload.lesson_slug))
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    vocab.lesson_id = lesson.id
    vocab.word = payload.word
    vocab.reading = payload.reading
    vocab.meaning_vi = payload.meaning_vi
    vocab.meaning_en = payload.meaning_en
    vocab.part_of_speech = payload.part_of_speech
    vocab.topic = payload.topic
    vocab.example = payload.example
    vocab.audio_url = payload.audio_url
    db.add(vocab)
    db.commit()
    db.refresh(vocab)

    return VocabularyItem(
        id=vocab.id,
        lesson_slug=lesson.slug,
        word=vocab.word,
        reading=vocab.reading,
        meaning_vi=vocab.meaning_vi,
        meaning_en=vocab.meaning_en,
        part_of_speech=vocab.part_of_speech,
        topic=vocab.topic,
        example=vocab.example,
        audio_url=vocab.audio_url,
    )


@router.delete("/vocabulary/{vocabulary_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vocabulary(
    vocabulary_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    vocab = db.scalar(select(Vocabulary).where(Vocabulary.id == vocabulary_id))
    if vocab is None:
        raise HTTPException(status_code=404, detail="Vocabulary not found")
    db.delete(vocab)
    db.commit()


@router.get("/kanji", response_model=list[KanjiItem])
def list_kanji(level: str | None = None, q: str | None = None, db: Session = Depends(get_db)):
    query = select(Kanji).order_by(Kanji.strokes.asc(), Kanji.character.asc())
    if level:
        query = query.where(Kanji.jlpt_level == level)
    if q:
        pattern = f"%{q}%"
        query = query.where(
            or_(
                Kanji.character.ilike(pattern),
                Kanji.meaning_vi.ilike(pattern),
                Kanji.meaning_en.ilike(pattern),
                Kanji.onyomi.ilike(pattern),
                Kanji.kunyomi.ilike(pattern),
            )
        )
    return [KanjiItem.model_validate(item) for item in db.scalars(query)]


@router.post("/kanji", response_model=KanjiItem, status_code=status.HTTP_201_CREATED)
def create_kanji(
    payload: KanjiCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    existing = db.scalar(select(Kanji).where(Kanji.character == payload.character))
    if existing is not None:
        raise HTTPException(status_code=400, detail="Kanji already exists")

    kanji = Kanji(**payload.model_dump())
    db.add(kanji)
    db.commit()
    db.refresh(kanji)
    return KanjiItem.model_validate(kanji)


@router.put("/kanji/{kanji_id}", response_model=KanjiItem)
def update_kanji(
    kanji_id: int,
    payload: KanjiUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    kanji = db.scalar(select(Kanji).where(Kanji.id == kanji_id))
    if kanji is None:
        raise HTTPException(status_code=404, detail="Kanji not found")

    duplicate = db.scalar(
        select(Kanji).where(Kanji.character == payload.character, Kanji.id != kanji_id)
    )
    if duplicate is not None:
        raise HTTPException(status_code=400, detail="Kanji character already exists")

    for field, value in payload.model_dump().items():
        setattr(kanji, field, value)
    db.add(kanji)
    db.commit()
    db.refresh(kanji)
    return KanjiItem.model_validate(kanji)


@router.delete("/kanji/{kanji_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_kanji(
    kanji_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    kanji = db.scalar(select(Kanji).where(Kanji.id == kanji_id))
    if kanji is None:
        raise HTTPException(status_code=404, detail="Kanji not found")
    db.delete(kanji)
    db.commit()
