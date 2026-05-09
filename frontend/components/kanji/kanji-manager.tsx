"use client";

import { FormEvent, useMemo, useState } from "react";

import { readStoredToken } from "@/components/auth/auth-panel";
import { KanjiStrokeDiagram } from "@/components/kanji/kanji-stroke-diagram";
import { createKanji, deleteKanji, updateKanji } from "@/lib/api";
import { KanjiInput, KanjiItem } from "@/types/content";

type KanjiManagerProps = {
  initialItems: KanjiItem[];
};

const emptyForm: KanjiInput = {
  character: "",
  meaning_vi: "",
  meaning_en: "",
  onyomi: "",
  kunyomi: "",
  jlpt_level: "N5",
  radical: "",
  strokes: 1,
  examples: ""
};

export function KanjiManager({ initialItems }: KanjiManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<KanjiInput>(emptyForm);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (levelFilter !== "all" && item.jlpt_level !== levelFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      return [item.character, item.meaning_vi, item.meaning_en, item.onyomi, item.kunyomi]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, levelFilter, search]);

  const previewItem =
    items.find((item) => item.id === selectedId) ??
    items.find((item) => item.character === form.character) ??
    visibleItems[0] ??
    null;

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
      const created = await createKanji(form, token);
      setItems((current) => [...current, created]);
      setForm(emptyForm);
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
      const updated = await updateKanji(selectedId, form, token);
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
      await deleteKanji(selectedId, token);
      setItems((current) => current.filter((item) => item.id !== selectedId));
      setSelectedId(null);
      setForm(emptyForm);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <div className="grid gap-3 rounded-[2rem] border border-amber-950/10 bg-white/80 p-5 shadow-card md:grid-cols-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search kanji or meaning"
            className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 text-sm outline-none"
          />
          <select
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value)}
            className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 text-sm outline-none"
          >
            <option value="all">All levels</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
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
                  character: item.character,
                  meaning_vi: item.meaning_vi,
                  meaning_en: item.meaning_en,
                  onyomi: item.onyomi,
                  kunyomi: item.kunyomi,
                  jlpt_level: item.jlpt_level,
                  radical: item.radical,
                  strokes: item.strokes,
                  examples: item.examples
                });
              }}
              className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 text-left shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-serif text-6xl">{item.character}</div>
                <div className="rounded-full bg-[#f8f3ea] px-3 py-2 text-xs uppercase tracking-[0.25em] text-torii">
                  {item.jlpt_level}
                </div>
              </div>
              <div className="mt-4 text-lg">{item.meaning_vi}</div>
              <div className="mt-1 text-sm text-ink/60">{item.meaning_en}</div>
              <div className="mt-4 text-sm text-ink/70">Onyomi: {item.onyomi}</div>
              <div className="mt-1 text-sm text-ink/70">Kunyomi: {item.kunyomi}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-amber-950/10 bg-white/80 p-6 shadow-card">
        <div className="mb-5">
          <div className="font-serif text-2xl">{selectedId ? "Edit kanji" : "Create kanji"}</div>
          <p className="mt-2 text-sm text-ink/65">Đăng nhập ở trang Account để lưu thay đổi.</p>
        </div>
        <div className="mb-5">
          <KanjiStrokeDiagram
            character={form.character || previewItem?.character || ""}
            meaningVi={previewItem?.meaning_vi}
            strokes={previewItem?.strokes ?? form.strokes}
          />
        </div>
        <form onSubmit={handleCreate} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Character</span>
              <input
                value={form.character}
                onChange={(event) => setForm((current) => ({ ...current, character: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>JLPT level</span>
              <select
                value={form.jlpt_level}
                onChange={(event) => setForm((current) => ({ ...current, jlpt_level: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              >
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
            </label>
          </div>
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
              <span>Onyomi</span>
              <input
                value={form.onyomi}
                onChange={(event) => setForm((current) => ({ ...current, onyomi: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Kunyomi</span>
              <input
                value={form.kunyomi}
                onChange={(event) => setForm((current) => ({ ...current, kunyomi: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>Radical</span>
              <input
                value={form.radical}
                onChange={(event) => setForm((current) => ({ ...current, radical: event.target.value }))}
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Strokes</span>
              <input
                type="number"
                min={1}
                value={form.strokes}
                onChange={(event) =>
                  setForm((current) => ({ ...current, strokes: Number(event.target.value) }))
                }
                className="rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
                required
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm">
            <span>Examples</span>
            <textarea
              value={form.examples}
              onChange={(event) => setForm((current) => ({ ...current, examples: event.target.value }))}
              className="min-h-24 rounded-2xl border border-amber-950/10 bg-[#fcfaf5] px-4 py-3 outline-none"
              required
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
                    setForm(emptyForm);
                  }}
                  className="rounded-full border border-amber-950/10 px-5 py-3 text-sm"
                >
                  New kanji
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-ink px-5 py-3 text-sm text-white disabled:opacity-60"
              >
                Create kanji
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
