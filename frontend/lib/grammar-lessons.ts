import grammarLessons from "@/data/grammar_lessons.json";

import { LessonDetail, LessonSection, LessonSummary } from "@/types/content";

type GrammarLessonRecord = Omit<LessonDetail, "sections"> & {
  sections_json: string;
};

function parseSections(rawSections: string): LessonSection[] {
  try {
    const parsed = JSON.parse(rawSections);
    return Array.isArray(parsed)
      ? (parsed as LessonSection[]).filter((section) => section.key !== "vocabulary")
      : [];
  } catch {
    return [];
  }
}

const LESSONS = (grammarLessons as GrammarLessonRecord[]).map((lesson) => ({
  ...lesson,
  sections: parseSections(lesson.sections_json)
}));

function toSummary(lesson: LessonDetail): LessonSummary {
  const { content: _content, sections: _sections, ...summary } = lesson;
  return summary;
}

export function getLessonDisplayLabels(unitNumber: number) {
  return {
    title_ja: `第${unitNumber}課`,
    title_vi: `Bài ${unitNumber}`
  };
}

export function getLocalLessons(): LessonSummary[] {
  return LESSONS.map(toSummary);
}

export function getLocalLesson(slug: string): LessonDetail {
  const lesson = LESSONS.find((item) => item.slug === slug);
  if (!lesson) {
    throw new Error("Lesson not found");
  }
  return lesson;
}
