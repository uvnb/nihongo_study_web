export type LessonSummary = {
  slug: string;
  title: string;
  title_ja: string;
  level: string;
  unit_number: number;
  textbook: string;
  summary: string;
  vocabulary_count: number;
};

export type LessonDetail = LessonSummary & {
  content: string;
};

export type VocabularyItem = {
  id: number;
  lesson_slug: string;
  word: string;
  reading: string;
  meaning_vi: string;
  meaning_en: string;
  part_of_speech: string;
  topic: string;
  example: string;
  audio_url?: string | null;
};

export type VocabularyInput = {
  lesson_slug: string;
  word: string;
  reading: string;
  meaning_vi: string;
  meaning_en: string;
  part_of_speech: string;
  topic: string;
  example: string;
  audio_url?: string | null;
};

export type KanjiItem = {
  id: number;
  character: string;
  meaning_vi: string;
  meaning_en: string;
  onyomi: string;
  kunyomi: string;
  jlpt_level: string;
  radical: string;
  strokes: number;
  examples: string;
};

export type KanjiInput = {
  character: string;
  meaning_vi: string;
  meaning_en: string;
  onyomi: string;
  kunyomi: string;
  jlpt_level: string;
  radical: string;
  strokes: number;
  examples: string;
};

export type User = {
  id: number;
  email: string;
  display_name: string;
  auth_provider: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export type GoogleCredentialResponse = {
  credential: string;
};

export type LessonInput = {
  slug: string;
  title: string;
  title_ja: string;
  level: string;
  unit_number: number;
  textbook: string;
  summary: string;
  content: string;
};

export type QuizAnswer = {
  prompt: string;
  user_answer: string;
  correct_answer: string;
  question_type: string;
  is_correct: boolean;
};

export type QuizSession = {
  id: number;
  quiz_type: string;
  score: number;
  total_questions: number;
  answers: QuizAnswer[];
  created_at: string;
};

export type QuizStats = {
  total_sessions: number;
  total_questions: number;
  total_correct: number;
  average_score: number;
};

export type ProgressRecord = {
  item_type: string;
  item_id: number;
  srs_level: number;
  next_review: string;
  last_reviewed: string;
};

export type DueReviewItem = {
  item_type: string;
  item_id: number;
  prompt: string;
  secondary: string;
  srs_level: number;
  next_review: string;
};

export type LessonCompletion = {
  lesson_slug: string;
  completed_at: string;
};

export type DashboardOverview = {
  lessons_completed: number;
  current_streak: number;
};
