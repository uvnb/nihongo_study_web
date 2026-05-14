import { Locale, dictionaries } from "@/lib/i18n";

type LessonOneGrammarGuideProps = {
  locale: Locale;
};

type GrammarPoint = {
  no: string;
  title: string;
  pattern: string;
  summary: string;
  explain: string;
  example: string;
  accent: string;
  fill: string;
  ring: string;
};

const grammarPoints: GrammarPoint[] = [
  {
    no: "1",
    title: "A là B",
    pattern: "N1 は N2 です",
    summary: "Giới thiệu hoặc khẳng định danh tính.",
    explain: "は = chủ đề, です = khẳng định.",
    example: "わたしは リン・タイです。",
    accent: "text-torii",
    fill: "bg-[linear-gradient(180deg,rgba(255,129,92,0.18),rgba(255,129,92,0.06))]",
    ring: "border-rose-100/80"
  },
  {
    no: "2",
    title: "Hỏi yes/no",
    pattern: "N1 は N2 ですか",
    summary: "Thêm ですか để hỏi.",
    explain: "Trả lời ngắn: はい / いいえ.",
    example: "ポンさんは がくせいですか。",
    accent: "text-secondary",
    fill: "bg-[linear-gradient(180deg,rgba(98,176,147,0.18),rgba(98,176,147,0.06))]",
    ring: "border-emerald-100/80"
  },
  {
    no: "3",
    title: "Cũng là",
    pattern: "N1 も N2 です",
    summary: "も = cũng.",
    explain: "Dùng khi muốn thêm một ý giống nhau.",
    example: "キムさんも がくせいです。",
    accent: "text-sky-700",
    fill: "bg-[linear-gradient(180deg,rgba(117,154,235,0.18),rgba(117,154,235,0.06))]",
    ring: "border-sky-100/80"
  },
  {
    no: "4",
    title: "Phủ định",
    pattern: "N1 は N2 じゃありません",
    summary: "Nói 'không phải là...'.",
    explain: "じゃありません = phủ định lịch sự của です.",
    example: "アンさんは がくせいじゃありません。",
    accent: "text-amber-700",
    fill: "bg-[linear-gradient(180deg,rgba(237,196,80,0.22),rgba(237,196,80,0.06))]",
    ring: "border-amber-100/80"
  },
  {
    no: "5",
    title: "Nối danh từ",
    pattern: "N1 の N2",
    summary: "の = của / thuộc.",
    explain: "Dùng để nối hai danh từ.",
    example: "がっこうの ともだちです。",
    accent: "text-violet-700",
    fill: "bg-[linear-gradient(180deg,rgba(168,132,228,0.18),rgba(168,132,228,0.06))]",
    ring: "border-violet-100/80"
  }
];

const quickPills = ["は = chủ đề", "も = cũng", "の = của/thuộc", "ですか = hỏi", "じゃありません = phủ định"];

const tinyNotes = [
  {
    title: "さん",
    text: "Lịch sự khi gọi người khác."
  },
  {
    title: "お- / ご-",
    text: "Tiền tố lịch sự trong お名前, お国."
  },
  {
    title: "Câu chào",
    text: "はじめまして / どうぞよろしく / こちらこそ."
  }
] as const;

function ExampleChip({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/90 bg-white/90 px-3 py-2 text-sm leading-6 text-ink/85 shadow-[0_6px_16px_rgba(104,144,98,0.05)]">
      {text}
    </div>
  );
}

function GrammarRow({ point, index }: { point: GrammarPoint; index: number }) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.75rem] border ${point.ring} ${point.fill} shadow-[0_12px_30px_rgba(104,144,98,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(104,144,98,0.12)]`}
    >
      <div className="md:hidden">
        <details className="group">
          <summary className="list-none cursor-pointer p-4 outline-none">
            <div className="flex items-start gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${point.fill} ${point.accent}`}>
                {point.no}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-secondary/12 bg-white/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                    {point.summary}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-xl text-ink">{point.title}</h3>
                <div className="mt-3 inline-flex rounded-full border border-secondary/12 bg-white/82 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-ink/80">
                  {point.pattern}
                </div>
              </div>
              <div className="mt-1 text-secondary transition group-open:rotate-180">⌄</div>
            </div>
          </summary>

          <div className="px-4 pb-4">
            <div className="rounded-[1.35rem] border border-white/90 bg-white/86 p-4">
              <p className="text-sm leading-7 text-ink/72">{point.explain}</p>
              <div className="mt-3">
                <ExampleChip text={point.example} />
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="hidden md:block">
        <div className="grid gap-0 lg:grid-cols-[4.5rem_minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="flex items-center justify-center border-b border-white/70 p-5 lg:border-b-0 lg:border-r">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-black ${point.fill} ${point.accent}`}>
              {point.no}
            </div>
          </div>

          <div className="border-b border-white/70 p-5 lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-secondary/12 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                {point.summary}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.24em] ${point.accent}`}>{point.title}</span>
            </div>
            <div className="mt-3 font-serif text-2xl text-ink">{point.title}</div>
            <p className="mt-3 text-sm leading-7 text-ink/72">{point.explain}</p>
          </div>

          <div className="p-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-torii">Công thức</div>
            <div className="mt-2 inline-flex rounded-full border border-secondary/12 bg-white/85 px-3 py-2 font-mono text-sm text-ink/82">
              {point.pattern}
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.28em] text-secondary">Ví dụ</div>
            <div className="mt-2">
              <ExampleChip text={point.example} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function LessonOneGrammarGuide({ locale }: LessonOneGrammarGuideProps) {
  const t = dictionaries[locale];

  return (
    <section className="mt-8 overflow-hidden rounded-[2.75rem] border border-amber-950/10 bg-[radial-gradient(circle_at_top_left,rgba(255,214,197,0.28),transparent_28%),linear-gradient(180deg,rgba(255,253,249,0.98),rgba(245,249,244,0.95))] p-4 shadow-card md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-secondary shadow-sm">
            Tóm tắt ngữ pháp chính
          </div>
          <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">Bài 1: 5 mẫu cần nhớ</h2>
          <p className="mt-3 text-sm leading-7 text-ink/72 md:text-base">
            {t.labels.unit} {1} chỉ cần nhớ: giới thiệu, hỏi, phủ định, nói cũng, và nối danh từ.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPills.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-secondary/15 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.85fr)]">
        <div className="space-y-4">
          {grammarPoints.map((point, index) => (
            <GrammarRow key={point.no} point={point} index={index} />
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-[1.9rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(255,251,247,0.98),rgba(247,250,244,0.95))] p-5 shadow-[0_14px_32px_rgba(104,144,98,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.32em] text-torii">Bản đồ nhanh</div>
            <h3 className="mt-2 font-serif text-2xl text-ink">3 ý then chốt</h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(255,246,240,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">1. は</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">Đánh dấu chủ đề.</div>
              </div>
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(243,249,239,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">2. ですか</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">Biến câu thành câu hỏi.</div>
              </div>
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(247,244,255,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">3. も / の</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">Thêm ý “cũng” hoặc nối danh từ.</div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-dashed border-secondary/25 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(251,246,240,0.92))] p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-secondary">Mẫu trả lời</div>
              <div className="mt-3 space-y-2 text-sm leading-7 text-ink/80">
                <div>はい、そうです。</div>
                <div>いいえ、がくせいじゃありません。</div>
                <div>こちらこそ どうぞよろしく。</div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-secondary/12 bg-white/88 p-5 shadow-[0_14px_32px_rgba(104,144,98,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.32em] text-torii">Lưu ý tinh tế</div>
            <div className="mt-4 space-y-3">
              {tinyNotes.map((note) => (
                <div key={note.title} className="rounded-[1.25rem] border border-white/90 bg-paper/80 p-4">
                  <div className="font-serif text-lg text-ink">{note.title}</div>
                  <p className="mt-2 text-sm leading-7 text-ink/72">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
