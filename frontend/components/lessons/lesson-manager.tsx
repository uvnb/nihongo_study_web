"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { createLesson, deleteLesson, getLesson, updateLesson } from "@/lib/api";
import { readStoredToken } from "@/components/auth/auth-panel";
import { LessonInput, LessonSummary } from "@/types/content";

type LessonManagerProps = {
  locale: string;
  initialLessons: LessonSummary[];
};

const emptyForm: LessonInput = {
  slug: "",
  title: "",
  title_ja: "",
  level: "N5",
  unit_number: 1,
  textbook: "Minna no Nihongo",
  summary: "",
  content: ""
};

export function LessonManager({ locale, initialLessons }: LessonManagerProps) {
  const [lessons, setLessons] = useState(initialLessons);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<LessonInput>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const editingLesson = useMemo(
    () => lessons.find((lesson) => lesson.slug === selectedSlug) ?? null,
    [lessons, selectedSlug]
  );

  async function startEditing(slug: string) {
    setBusy(true);
    setError(null);
    try {
      const lesson = await getLesson(slug);
      setSelectedSlug(lesson.slug);
      setForm({
        slug: lesson.slug,
        title: lesson.title,
        title_ja: lesson.title_ja,
        level: lesson.level,
        unit_number: lesson.unit_number,
        textbook: lesson.textbook,
        summary: lesson.summary,
        content: lesson.content
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Load failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = readStoredToken();
    if (!token) {
      setError("Please sign in first.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const created = await createLesson(form, token);
      setLessons((current) => [
        ...current,
        {
          slug: created.slug,
          title: created.title,
          title_ja: created.title_ja,
          level: created.level,
          unit_number: created.unit_number,
          textbook: created.textbook,
          summary: created.summary,
          vocabulary_count: created.vocabulary_count
        }
      ]);
      setForm(emptyForm);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpdate() {
    if (!editingLesson) {
      return;
    }
    const token = readStoredToken();
    if (!token) {
      setError("Please sign in first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const updated = await updateLesson(editingLesson.slug, {
        title: form.title,
        title_ja: form.title_ja,
        level: form.level,
        unit_number: form.unit_number,
        textbook: form.textbook,
        summary: form.summary,
        content: form.content
      }, token);
      setLessons((current) =>
        current.map((lesson) =>
          lesson.slug === updated.slug
            ? {
                ...lesson,
                title: updated.title,
                title_ja: updated.title_ja,
                level: updated.level,
                unit_number: updated.unit_number,
                textbook: updated.textbook,
                summary: updated.summary
              }
            : lesson
        )
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!editingLesson) {
      return;
    }
    const token = readStoredToken();
    if (!token) {
      setError("Please sign in first.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await deleteLesson(editingLesson.slug, token);
      setLessons((current) => current.filter((lesson) => lesson.slug !== editingLesson.slug));
      setSelectedSlug(null);
      setForm(emptyForm);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-5">
        {lessons.map((lesson) => (
          <div
            key={lesson.slug}
            className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card"
          >
            <Link href={`/${locale}/lessons/${lesson.slug}`} className="block">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-torii">
                <span>Unit {lesson.unit_number}</span>
                <span>{lesson.level}</span>
                <span>{lesson.vocabulary_count} words</span>
              </div>
              <div className="mt-4 font-serif text-3xl">{lesson.title_ja}</div>
              <div className="mt-2 text-lg">{lesson.title}</div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/70">{lesson.summary}</p>
            </Link>
            <button
              type="button"
              onClick={() => startEditing(lesson.slug)}
              className="mt-4 rounded-full border border-amber-950/10 px-4 py-2 text-sm disabled:opacity-60"
              disabled={busy}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <div className="mb-5">
          <div className="font-serif text-2xl">{editingLesson ? "Edit lesson" : "Create lesson"}</div>
          <p className="mt-2 text-sm text-ink/65">Yêu cầu đăng nhập ở trang Account.</p>
        </div>
        <form onSubmit={handleCreate} className="grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Slug</span>
            <input
              value={form.slug}
              disabled={Boolean(editingLesson)}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none disabled:opacity-60"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Title</span>
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Title JA</span>
            <input
              value={form.title_ja}
              onChange={(event) => setForm((current) => ({ ...current, title_ja: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Summary</span>
            <textarea
              value={form.summary}
              onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
              className="min-h-24 rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Content</span>
            <textarea
              value={form.content}
              onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
              className="min-h-40 rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required={!editingLesson}
            />
          </label>
          {error ? <p className="text-sm text-torii">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            {editingLesson ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={busy}
                  className="rounded-full bg-torii px-5 py-3 text-sm text-white disabled:opacity-60"
                >
                  Save update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={busy}
                  className="rounded-full border border-amber-950/10 px-5 py-3 text-sm disabled:opacity-60"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSlug(null);
                    setForm(emptyForm);
                    setError(null);
                  }}
                  className="rounded-full border border-amber-950/10 px-5 py-3 text-sm"
                >
                  New lesson
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60"
              >
                Create lesson
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
