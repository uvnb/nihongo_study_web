from pydantic import BaseModel, ConfigDict


class LessonSummary(BaseModel):
    slug: str
    title: str
    title_ja: str
    level: str
    unit_number: int
    textbook: str
    summary: str
    vocabulary_count: int

    model_config = ConfigDict(from_attributes=True)


class LessonDetail(LessonSummary):
    content: str


class LessonCreate(BaseModel):
    slug: str
    title: str
    title_ja: str
    level: str
    unit_number: int
    textbook: str
    summary: str
    content: str


class LessonUpdate(BaseModel):
    title: str
    title_ja: str
    level: str
    unit_number: int
    textbook: str
    summary: str
    content: str


class VocabularyItem(BaseModel):
    id: int
    lesson_slug: str
    word: str
    reading: str
    meaning_vi: str
    meaning_en: str
    part_of_speech: str
    topic: str
    example: str
    audio_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class VocabularyCreate(BaseModel):
    lesson_slug: str
    word: str
    reading: str
    meaning_vi: str
    meaning_en: str
    part_of_speech: str
    topic: str
    example: str
    audio_url: str | None = None


class VocabularyUpdate(BaseModel):
    lesson_slug: str
    word: str
    reading: str
    meaning_vi: str
    meaning_en: str
    part_of_speech: str
    topic: str
    example: str
    audio_url: str | None = None


class KanjiItem(BaseModel):
    id: int
    character: str
    meaning_vi: str
    meaning_en: str
    onyomi: str
    kunyomi: str
    jlpt_level: str
    radical: str
    strokes: int
    examples: str

    model_config = ConfigDict(from_attributes=True)


class KanjiCreate(BaseModel):
    character: str
    meaning_vi: str
    meaning_en: str
    onyomi: str
    kunyomi: str
    jlpt_level: str
    radical: str
    strokes: int
    examples: str


class KanjiUpdate(BaseModel):
    character: str
    meaning_vi: str
    meaning_en: str
    onyomi: str
    kunyomi: str
    jlpt_level: str
    radical: str
    strokes: int
    examples: str


class UserRead(BaseModel):
    id: int
    email: str
    display_name: str
    auth_provider: str

    model_config = ConfigDict(from_attributes=True)


class UserRegister(BaseModel):
    email: str
    password: str
    display_name: str


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead


class GoogleAuthRequest(BaseModel):
    credential: str


class QuizAnswer(BaseModel):
    prompt: str
    user_answer: str
    correct_answer: str
    question_type: str
    is_correct: bool


class QuizSessionCreate(BaseModel):
    quiz_type: str
    score: int
    total_questions: int
    answers: list[QuizAnswer]


class QuizSessionRead(BaseModel):
    id: int
    quiz_type: str
    score: int
    total_questions: int
    answers: list[QuizAnswer]
    created_at: str


class QuizStats(BaseModel):
    total_sessions: int
    total_questions: int
    total_correct: int
    average_score: float


class ReviewSubmission(BaseModel):
    item_type: str
    item_id: int
    rating: str


class ProgressRead(BaseModel):
    item_type: str
    item_id: int
    srs_level: int
    next_review: str
    last_reviewed: str


class DueReviewItem(BaseModel):
    item_type: str
    item_id: int
    prompt: str
    secondary: str
    srs_level: int
    next_review: str


class LessonCompletionRead(BaseModel):
    lesson_slug: str
    completed_at: str


class LessonCompletionToggle(BaseModel):
    lesson_slug: str


class DashboardOverview(BaseModel):
    lessons_completed: int
    current_streak: int
