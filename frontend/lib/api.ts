import {
  AudioResponse,
  AuthResponse,
  KanjiInput,
  KanjiItem,
  LessonDetail,
  LessonInput,
  LessonSummary,
  DueReviewItem,
  DashboardOverview,
  GoogleCredentialResponse,
  LessonCompletion,
  ProgressRecord,
  QuizSession,
  QuizStats,
  WritingGenerateRequest,
  WritingGenerateResponse,
  WritingGradeResponse,
  WritingTrack,
  User,
  VocabularyInput,
  VocabularyItem
} from "@/types/content";
import { getLocalLesson, getLocalLessons } from "@/lib/grammar-lessons";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getLessons() {
  return Promise.resolve(getLocalLessons());
}

export function getLesson(slug: string) {
  return Promise.resolve(getLocalLesson(slug));
}

export function getVocabulary() {
  return getJson<VocabularyItem[]>("/api/vocabulary")
    .then((items) =>
      items.map((item) => ({
        ...item,
        source: item.source ?? "minna"
      }))
    )
    .catch(() => []);
}

export function getKanji(source?: string) {
  const query = source ? `?source=${encodeURIComponent(source)}` : "";
  return getJson<KanjiItem[]>(`/api/kanji${query}`).catch(() => []);
}

export function generateWritingExercise(payload: WritingGenerateRequest) {
  return postJson<WritingGenerateResponse>(`/api/writing/${payload.track}/generate`, payload);
}

export function gradeWritingExercise(payload: {
  level: string;
  track: WritingTrack;
  prompt: string;
  user_answer: string;
  reference_answer?: string | null;
}) {
  return postJson<WritingGradeResponse>(`/api/writing/${payload.track}/grade`, payload);
}

export function getVocabularyAudio(vocabularyId: number) {
  return getJson<AudioResponse>(`/api/vocabulary/${vocabularyId}/audio`);
}

export function getKanjiAudio(kanjiId: number) {
  return getJson<AudioResponse>(`/api/kanji/${kanjiId}/audio`);
}

export async function createKanji(payload: KanjiInput, token: string) {
  return postJson<KanjiItem>("/api/kanji", payload, token);
}

export async function updateKanji(kanjiId: number, payload: KanjiInput, token: string) {
  return putJson<KanjiItem>(`/api/kanji/${kanjiId}`, payload, token);
}

export async function deleteKanji(kanjiId: number, token: string) {
  const response = await fetch(`${API_BASE_URL}/api/kanji/${kanjiId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete kanji");
  }
}

export async function createQuizSession(
  payload: {
    quiz_type: string;
    score: number;
    total_questions: number;
    answers: {
      prompt: string;
      user_answer: string;
      correct_answer: string;
      question_type: string;
      is_correct: boolean;
    }[];
  },
  token: string
) {
  return postJson<QuizSession>("/api/quiz-sessions", payload, token);
}

export async function getQuizHistory(token: string) {
  return getJsonWithAuth<QuizSession[]>("/api/dashboard/quiz-history", token);
}

export async function getQuizStats(token: string) {
  return getJsonWithAuth<QuizStats>("/api/dashboard/quiz-stats", token);
}

export async function getDueReviews(token: string) {
  return getJsonWithAuth<DueReviewItem[]>("/api/dashboard/reviews-due", token);
}

export async function getDashboardOverview(token: string) {
  return getJsonWithAuth<DashboardOverview>("/api/dashboard/overview", token);
}

export async function getLessonProgress(token: string) {
  return getJsonWithAuth<LessonCompletion[]>("/api/lesson-progress", token);
}

export async function completeLesson(lessonSlug: string, token: string) {
  return postJson<LessonCompletion>("/api/lesson-progress/complete", { lesson_slug: lessonSlug }, token);
}

export async function uncompleteLesson(lessonSlug: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/api/lesson-progress/${lessonSlug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to update lesson progress");
  }
}

export async function getProgress(token: string, itemType?: string) {
  const query = itemType ? `?item_type=${encodeURIComponent(itemType)}` : "";
  return getJsonWithAuth<ProgressRecord[]>(`/api/progress${query}`, token);
}

export async function submitReview(
  payload: { item_type: string; item_id: number; rating: string },
  token: string
) {
  return postJson<ProgressRecord>("/api/progress/review", payload, token);
}

export async function register(payload: {
  email: string;
  password: string;
  display_name: string;
}) {
  return postJson<AuthResponse>("/api/auth/register", payload);
}

export async function login(payload: { email: string; password: string }) {
  return postJson<AuthResponse>("/api/auth/login", payload);
}

export async function loginWithGoogle(payload: GoogleCredentialResponse) {
  return postJson<AuthResponse>("/api/auth/google", payload);
}

export async function getCurrentUser(token: string) {
  return getJsonWithAuth<User>("/api/auth/me", token);
}

export async function createLesson(payload: LessonInput, token: string) {
  return postJson<LessonDetail>("/api/lessons", payload, token);
}

export async function updateLesson(slug: string, payload: Omit<LessonInput, "slug">, token: string) {
  return putJson<LessonDetail>(`/api/lessons/${slug}`, payload, token);
}

export async function deleteLesson(slug: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/api/lessons/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}

export async function createVocabulary(payload: VocabularyInput, token: string) {
  return postJson<VocabularyItem>("/api/vocabulary", payload, token);
}

export async function updateVocabulary(vocabularyId: number, payload: VocabularyInput, token: string) {
  return putJson<VocabularyItem>(`/api/vocabulary/${vocabularyId}`, payload, token);
}

export async function deleteVocabulary(vocabularyId: number, token: string) {
  const response = await fetch(`${API_BASE_URL}/api/vocabulary/${vocabularyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete vocabulary");
  }
}

async function postJson<T>(path: string, payload: unknown, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

async function putJson<T>(path: string, payload: unknown, token: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

async function getJsonWithAuth<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json() as Promise<T>;
}
