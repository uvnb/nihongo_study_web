"use client";

import { FormEvent, useMemo, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { createVocabulary, deleteVocabulary, updateVocabulary } from "@/lib/api";
import { LessonSummary, VocabularyInput, VocabularyItem } from "@/types/content";

type VocabularyManagerProps = {
  initialItems: VocabularyItem[];
  lessons: LessonSummary[];
};

const emptyForm: VocabularyInput = {
  lesson_slug: "",
  word: "",
  reading: "",
  meaning_vi: "",
  meaning_en: "",
  part_of_speech: "noun",
  topic: "",
  example: "",
  audio_url: ""
};

export function VocabularyManager({ initialItems, lessons }: VocabularyManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<VocabularyInput>({
    ...emptyForm,
    lesson_slug: lessons[0]?.slug ?? ""
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [lessonFilter, setLessonFilter] = useState("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topics = useMemo(
    () => Array.from(new Set(items.map((item) => item.topic))).sort((a, b) => a.localeCompare(b)),
    [items]
  );

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (topicFilter !== "all" && item.topic !== topicFilter) {
        return false;
      }
      if (lessonFilter !== "all" && item.lesson_slug !== lessonFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      return [item.word, item.reading, item.meaning_vi, item.meaning_en, item.example]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, lessonFilter, search, topicFilter]);

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
      const created = await createVocabulary(form, token);
      setItems((current) => [...current, created]);
      setForm({ ...emptyForm, lesson_slug: lessons[0]?.slug ?? "" });
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleUpdate() {
    if (selectedId === null) {
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
      const updated = await updateVocabulary(selectedId, form, token);
      setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (selectedId === null) {
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
      await deleteVocabulary(selectedId, token);
      setItems((current) => current.filter((item) => item.id !== selectedId));
      setSelectedId(null);
      setForm({ ...emptyForm, lesson_slug: lessons[0]?.slug ?? "" });
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <div className="grid gap-3 rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-card md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search word or meaning"
            className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 text-sm outline-none"
          />
          <select
            value={lessonFilter}
            onChange={(event) => setLessonFilter(event.target.value)}
            className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 text-sm outline-none"
          >
            <option value="all">All lessons</option>
            {lessons.map((lesson) => (
              <option key={lesson.slug} value={lesson.slug}>
                {lesson.title}
              </option>
            ))}
          </select>
          <select
            value={topicFilter}
            onChange={(event) => setTopicFilter(event.target.value)}
            className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 text-sm outline-none"
          >
            <option value="all">All topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setError(null);
                setForm({
                  lesson_slug: item.lesson_slug,
                  word: item.word,
                  reading: item.reading,
                  meaning_vi: item.meaning_vi,
                  meaning_en: item.meaning_en,
                  part_of_speech: item.part_of_speech,
                  topic: item.topic,
                  example: item.example,
                  audio_url: item.audio_url ?? ""
                });
              }}
              className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 text-left shadow-card"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs uppercase tracking-[0.25em] text-torii">{item.topic}</div>
                <div className="text-xs text-ink/50">{item.lesson_slug}</div>
              </div>
              <div className="mt-3 font-serif text-4xl">{item.word}</div>
              <div className="mt-2 text-sm text-ink/65">{item.reading}</div>
              <div className="mt-4 text-base text-ink">{item.meaning_vi}</div>
              <div className="mt-1 text-sm text-ink/60">{item.meaning_en}</div>
              <div className="mt-4 rounded-2xl bg-[#f8f3ea] p-4 text-sm leading-6 text-ink/75">
                {item.example}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <div className="mb-5">
          <div className="font-serif text-2xl">{selectedId ? "Edit vocabulary" : "Create vocabulary"}</div>
          <p className="mt-2 text-sm text-ink/65">Đăng nhập ở trang Account để lưu thay đổi.</p>
        </div>
        <form onSubmit={handleCreate} className="grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Lesson</span>
            <select
              value={form.lesson_slug}
              onChange={(event) => setForm((current) => ({ ...current, lesson_slug: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            >
              {lessons.map((lesson) => (
                <option key={lesson.slug} value={lesson.slug}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span>Word</span>
            <input
              value={form.word}
              onChange={(event) => setForm((current) => ({ ...current, word: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Reading</span>
            <input
              value={form.reading}
              onChange={(event) => setForm((current) => ({ ...current, reading: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Meaning VI</span>
              <input
                value={form.meaning_vi}
                onChange={(event) => setForm((current) => ({ ...current, meaning_vi: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Meaning EN</span>
              <input
                value={form.meaning_en}
                onChange={(event) => setForm((current) => ({ ...current, meaning_en: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Part of speech</span>
              <input
                value={form.part_of_speech}
                onChange={(event) => setForm((current) => ({ ...current, part_of_speech: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Topic</span>
              <input
                value={form.topic}
                onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm">
            <span>Example</span>
            <textarea
              value={form.example}
              onChange={(event) => setForm((current) => ({ ...current, example: event.target.value }))}
              className="min-h-24 rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Audio URL</span>
            <input
              value={form.audio_url ?? ""}
              onChange={(event) => setForm((current) => ({ ...current, audio_url: event.target.value }))}
              className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
            />
          </label>
          {error ? <p className="text-sm text-torii">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            {selectedId ? (
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
                    setSelectedId(null);
                    setError(null);
                    setForm({ ...emptyForm, lesson_slug: lessons[0]?.slug ?? "" });
                  }}
                  className="rounded-full border border-amber-950/10 px-5 py-3 text-sm"
                >
                  New word
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60"
              >
                Create word
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
