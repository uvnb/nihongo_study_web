export type LessonSummary = {
  slug: string;
  title: string;
  title_ja: string;
  level: string;
  unit_number: number;
  page_start: number;
  page_end: number;
  textbook: string;
  summary: string;
  vocabulary_count: number;
};

export type LessonDetail = LessonSummary & {
  content: string;
  sections: LessonSection[];
};

export type LessonSection = {
  key: string;
  title: string;
  title_ja: string;
  page_start: number;
  page_end: number;
  content: string;
};

export type VocabularyItem = {
  id: number;
  lesson_slug: string;
  source: string;
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
  source?: string;
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
  audio_url?: string | null;
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
  audio_url?: string | null;
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
  page_start: number;
  page_end: number;
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

export type WritingTrack = "sentence" | "paragraph";

export type WritingGenerateResponse = {
  level: string;
  track: WritingTrack;
  prompt: string;
  reference_answer: string;
  hint: string;
  rubric: string[];
  example_answer?: string | null;
  provider: string;
};

export type WritingGenerateRequest = {
  level: string;
  track: WritingTrack;
  variant?: number;
};

export type WritingGradeResponse = {
  level: string;
  track: WritingTrack;
  score: number;
  max_score: number;
  verdict: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
  suggested_answer: string;
  rubric_scores: Record<string, number>;
  provider: string;
};

export type AudioResponse = {
  audio_url: string;
};
