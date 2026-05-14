import { Locale, dictionaries } from "@/lib/i18n";

type LessonOneGrammarGuideProps = {
  locale: Locale;
};

type GrammarExample = {
  label: string;
  text: string;
};

type GrammarPoint = {
  no: string;
  title: string;
  pattern: string;
  summary: string;
  explain: string;
  highlight: string;
  callout: string;
  examples: GrammarExample[];
};

const grammarPoints: GrammarPoint[] = [
  {
    no: "1",
    title: "A là B",
    pattern: "N1 は N2 です",
    summary: "Dùng để giới thiệu, xác định hoặc khẳng định danh tính.",
    explain:
      "は là trợ từ đánh dấu chủ đề của câu. Trong mẫu này, N1 là chủ đề, còn N2 là phần nói về chủ đề đó.",
    highlight: "は đọc là wa",
    callout: "Tự giới thiệu",
    examples: [
      { label: "Mẫu khẳng định", text: "わたしは リン・タイです。" },
      { label: "Nhân vật", text: "キムさんは がくせいです。" }
    ]
  },
  {
    no: "2",
    title: "Hỏi có phải không?",
    pattern: "N1 は N2 ですか",
    summary: "Thêm ですか ở cuối để biến câu khẳng định thành câu hỏi.",
    explain:
      "Khi trả lời, có thể dùng はい để đồng ý hoặc いいえ để phủ định. Nếu cần lịch sự và tự nhiên hơn, hãy dùng そうです.",
    highlight: "Câu hỏi yes/no",
    callout: "Hỏi đáp",
    examples: [
      { label: "Câu hỏi", text: "ポンさんは がくせいですか。" },
      { label: "Trả lời gọn", text: "はい、がくせいです。 / はい、そうです。" }
    ]
  },
  {
    no: "3",
    title: "Cũng là",
    pattern: "N1 も N2 です",
    summary: "も thay cho は khi muốn nói 'cũng'.",
    explain:
      "Dùng để thêm một người hoặc một vật cùng chung đặc điểm với đối tượng trước đó. Đây là cách nối thông tin rất tự nhiên trong hội thoại.",
    highlight: "も = cũng",
    callout: "Mở rộng thông tin",
    examples: [
      { label: "Cũng là học sinh", text: "キムさんも がくせいです。" },
      { label: "Cũng là người Nhật", text: "たなかさんも にほんじんです。" }
    ]
  },
  {
    no: "4",
    title: "Phủ định lịch sự",
    pattern: "N1 は N2 じゃありません",
    summary: "Dùng khi muốn nói 'không phải là...'.",
    explain:
      "じゃありません là dạng phủ định lịch sự của です. Trong giao tiếp hằng ngày, ではありません cũng đúng nhưng dài hơn.",
    highlight: "Không phải",
    callout: "Nói không",
    examples: [
      { label: "Phủ định trực tiếp", text: "アンさんは がくせいじゃありません。" },
      { label: "Từ chối lịch sự", text: "いいえ、カナダじんじゃありません。" }
    ]
  },
  {
    no: "5",
    title: "Thuộc về / của",
    pattern: "N1 の N2",
    summary: "N1 bổ nghĩa cho N2, nói N2 thuộc về hoặc liên quan đến N1.",
    explain:
      "の nối hai danh từ với nhau. Trong bài này, nó xuất hiện trong các cụm như trường học của ai đó hoặc sinh viên của một trường nào đó.",
    highlight: "Nối danh từ",
    callout: "Quan hệ sở hữu",
    examples: [
      { label: "Sinh viên của trường Nhật ngữ", text: "リンさんは にほんごがっこうの がくせいです。" },
      { label: "Bạn cùng trường", text: "がっこうの ともだちです。" }
    ]
  }
];

const quickPills = ["は = chủ đề", "も = cũng", "の = của/thuộc", "ですか = hỏi", "じゃありません = phủ định"];

const politeNotes = [
  {
    title: "さん",
    text: "Đặt sau họ tên của người nghe hoặc người thứ ba để thể hiện sự tôn trọng. Không dùng cho tên của chính mình."
  },
  {
    title: "お- / ご-",
    text: "Đây là tiền tố lịch sự, thường gặp trong お名前, お国, ごはん... Không dùng khi nói về tên hay quốc gia của mình."
  },
  {
    title: "Câu chào",
    text: "はじめまして / どうぞよろしく / こちらこそ よろしくお願いします là bộ ba rất quan trọng trong lần đầu gặp mặt."
  }
] as const;

const toneStyles = [
  {
    badge: "bg-[linear-gradient(180deg,rgba(255,129,92,0.22),rgba(255,129,92,0.08))] text-torii",
    panel: "bg-[radial-gradient(circle_at_top_left,rgba(255,236,230,0.95),rgba(255,255,255,0.98))]",
    ring: "border-rose-100/80"
  },
  {
    badge: "bg-[linear-gradient(180deg,rgba(98,176,147,0.18),rgba(98,176,147,0.08))] text-secondary",
    panel: "bg-[radial-gradient(circle_at_top_left,rgba(235,249,241,0.98),rgba(255,255,255,0.98))]",
    ring: "border-emerald-100/80"
  },
  {
    badge: "bg-[linear-gradient(180deg,rgba(117,154,235,0.18),rgba(117,154,235,0.08))] text-sky-700",
    panel: "bg-[radial-gradient(circle_at_top_left,rgba(236,243,255,0.98),rgba(255,255,255,0.98))]",
    ring: "border-sky-100/80"
  },
  {
    badge: "bg-[linear-gradient(180deg,rgba(237,196,80,0.22),rgba(237,196,80,0.08))] text-amber-700",
    panel: "bg-[radial-gradient(circle_at_top_left,rgba(255,250,229,0.98),rgba(255,255,255,0.98))]",
    ring: "border-amber-100/80"
  },
  {
    badge: "bg-[linear-gradient(180deg,rgba(168,132,228,0.18),rgba(168,132,228,0.08))] text-violet-700",
    panel: "bg-[radial-gradient(circle_at_top_left,rgba(246,241,255,0.98),rgba(255,255,255,0.98))]",
    ring: "border-violet-100/80"
  }
];

function GrammarExampleCallout({
  example,
  toneClass
}: {
  example: GrammarExample;
  toneClass: string;
}) {
  return (
    <div className={`rounded-[1.15rem] border ${toneClass} bg-white/85 p-3 shadow-[0_8px_20px_rgba(104,144,98,0.05)]`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-secondary/15 bg-white text-[10px] font-black text-secondary">
          {example.label.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.22em] text-secondary">{example.label}</div>
          <div className="mt-1 text-sm leading-7 text-ink/85">{example.text}</div>
        </div>
      </div>
    </div>
  );
}

export function LessonOneGrammarGuide({ locale }: LessonOneGrammarGuideProps) {
  const t = dictionaries[locale];

  return (
    <section className="mt-8 overflow-hidden rounded-[2.75rem] border border-amber-950/10 bg-[radial-gradient(circle_at_top_left,rgba(255,214,197,0.28),transparent_28%),linear-gradient(180deg,rgba(255,253,249,0.98),rgba(245,249,244,0.95))] p-4 shadow-card md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-secondary shadow-sm">
            Giải thích ngữ pháp
          </div>
          <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">Bài 1: giới thiệu bản thân, hỏi đáp và nói lịch sự</h2>
          <p className="mt-3 text-sm leading-7 text-ink/72 md:text-base">
            {t.labels.unit} {1} đi từ nền tảng rất cơ bản: tự giới thiệu, hỏi người khác là ai, phủ định, nói &ldquo;cũng là&rdquo;, và nối danh từ bằng の.
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
          <div className="md:hidden">
            <div className="grid gap-3">
              {grammarPoints.map((point, index) => {
                const tone = toneStyles[index];

                return (
                  <details
                    key={point.no}
                    className={`group overflow-hidden rounded-[1.65rem] border ${tone.ring} ${tone.panel} shadow-[0_12px_28px_rgba(104,144,98,0.07)]`}
                  >
                    <summary className="list-none cursor-pointer p-4 outline-none">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${tone.badge}`}>
                          {point.no}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-secondary/12 bg-white/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                              {point.callout}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">{point.highlight}</span>
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
                      <div className="rounded-[1.2rem] border border-white/90 bg-white/82 p-4">
                        <p className="text-sm leading-7 text-ink/72">{point.summary}</p>
                        <p className="mt-3 text-sm leading-7 text-ink/68">{point.explain}</p>
                        <div className="mt-4 grid gap-3">
                          {point.examples.map((example) => (
                            <GrammarExampleCallout
                              key={example.text}
                              example={example}
                              toneClass={tone.ring}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          <div className="hidden space-y-4 md:block">
            {grammarPoints.map((point, index) => {
              const tone = toneStyles[index];

              return (
                <article
                  key={point.no}
                  className={`group overflow-hidden rounded-[2rem] border ${tone.ring} ${tone.panel} p-5 shadow-[0_14px_34px_rgba(104,144,98,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(104,144,98,0.12)]`}
                >
                  <div className="grid gap-5 lg:grid-cols-[0.9fr_1.35fr_1fr] lg:items-stretch">
                    <div className="flex flex-col justify-between rounded-[1.55rem] border border-white/80 bg-white/82 p-5">
                      <div>
                        <div className="flex items-start gap-4">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${tone.badge}`}>
                            {point.no}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-secondary/12 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                                {point.callout}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">{point.highlight}</span>
                            </div>
                            <h3 className="mt-2 font-serif text-2xl text-ink">{point.title}</h3>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-ink/72">{point.summary}</p>
                      </div>

                      <div className="mt-5 rounded-[1.3rem] border border-white/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,252,246,0.95))] p-4">
                        <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">Công thức</div>
                        <div className="mt-2 font-mono text-sm text-ink md:text-base">{point.pattern}</div>
                      </div>
                    </div>

                    <div className="rounded-[1.55rem] border border-white/80 bg-white/82 p-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-torii">Giải thích nhanh</div>
                      <p className="mt-3 text-sm leading-7 text-ink/72">{point.explain}</p>

                      <div className="mt-5 rounded-[1.2rem] border border-dashed border-secondary/18 bg-[linear-gradient(180deg,rgba(255,252,247,0.98),rgba(250,247,241,0.95))] p-4">
                        <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">Mẹo nhớ</div>
                        <p className="mt-2 text-sm leading-7 text-ink/78">
                          {point.no === "1"
                            ? "Dùng để chốt danh tính. Nghe thấy は trong câu giới thiệu là biết ngay chủ đề."
                            : point.no === "2"
                              ? "Chỉ cần thêm ですか ở cuối, cả câu khẳng định sẽ chuyển thành câu hỏi lịch sự."
                              : point.no === "3"
                                ? "も thường thay vị trí của は khi muốn thêm một đối tượng khác cùng tính chất."
                                : point.no === "4"
                                  ? "じゃありません là cách nói mềm, an toàn hơn khi phủ định trong giao tiếp."
                                  : "の giúp ghép hai danh từ thành một cụm rất tự nhiên: A của B."
                        }</p>
                      </div>
                    </div>

                    <div className="rounded-[1.55rem] border border-white/80 bg-white/82 p-5">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-torii">Ví dụ</div>
                      <div className="mt-4 grid gap-3">
                        {point.examples.map((example) => (
                          <GrammarExampleCallout key={example.text} example={example} toneClass={tone.ring} />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[1.9rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(255,251,247,0.98),rgba(247,250,244,0.95))] p-5 shadow-[0_14px_32px_rgba(104,144,98,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.32em] text-torii">Bản đồ nhanh</div>
            <h3 className="mt-2 font-serif text-2xl text-ink">Cách dùng trong hội thoại</h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(255,246,240,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">1. Giới thiệu</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">わたしは ... です để nói &ldquo;Tôi là...&rdquo;</div>
              </div>
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(243,249,239,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">2. Hỏi đáp</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">... ですか → はい / いいえ để trả lời ngắn gọn, tự nhiên.</div>
              </div>
              <div className="rounded-[1.25rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(247,244,255,0.96),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">3. Mở rộng</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">Dùng も, の, さん, お- để câu nói mềm và lịch sự hơn.</div>
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
              {politeNotes.map((note) => (
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
