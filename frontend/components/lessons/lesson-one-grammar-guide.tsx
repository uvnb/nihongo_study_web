import { Locale, dictionaries } from "@/lib/i18n";

type LessonOneGrammarGuideProps = {
  locale: Locale;
};

const grammarPoints = [
  {
    no: "1",
    title: "A là B",
    pattern: "N1 は N2 です",
    summary: "Dùng để giới thiệu, xác định hoặc khẳng định danh tính.",
    explain:
      "は là trợ từ đánh dấu chủ đề của câu. Trong mẫu này, N1 là chủ đề, còn N2 là phần nói về chủ đề đó.",
    examples: ["わたしは リン・タイです。", "キムさんは がくせいです。"],
    highlight: "は đọc là wa"
  },
  {
    no: "2",
    title: "Hỏi có phải không?",
    pattern: "N1 は N2 ですか",
    summary: "Thêm ですか ở cuối để biến câu khẳng định thành câu hỏi.",
    explain:
      "Khi trả lời, có thể dùng はい để đồng ý hoặc いいえ để phủ định. Nếu cần lịch sự và tự nhiên hơn, hãy dùng そうです.",
    examples: ["ポンさんは がくせいですか。", "はい、がくせいです。 / はい、そうです。"],
    highlight: "Câu hỏi yes/no"
  },
  {
    no: "3",
    title: "Cũng là",
    pattern: "N1 も N2 です",
    summary: "も thay cho は khi muốn nói 'cũng'.",
    explain:
      "Dùng để thêm một người hoặc một vật cùng chung đặc điểm với đối tượng trước đó. Đây là cách nối thông tin rất tự nhiên trong hội thoại.",
    examples: ["キムさんも がくせいです。", "たなかさんも にほんじんです。"],
    highlight: "も = cũng"
  },
  {
    no: "4",
    title: "Phủ định lịch sự",
    pattern: "N1 は N2 じゃありません",
    summary: "Dùng khi muốn nói 'không phải là...'.",
    explain:
      "じゃありません là dạng phủ định lịch sự của です. Trong giao tiếp hằng ngày, ではありません cũng đúng nhưng dài hơn.",
    examples: ["アンさんは がくせいじゃありません。", "いいえ、カナダじんじゃありません。"],
    highlight: "Không phải"
  },
  {
    no: "5",
    title: "Thuộc về / của",
    pattern: "N1 の N2",
    summary: "N1 bổ nghĩa cho N2, nói N2 thuộc về hoặc liên quan đến N1.",
    explain:
      "の nối hai danh từ với nhau. Trong bài này, nó xuất hiện trong các cụm như trường học của ai đó hoặc sinh viên của một trường nào đó.",
    examples: ["リンさんは にほんごがっこうの がくせいです。", "がっこうの ともだちです。"],
    highlight: "Nối danh từ"
  }
] as const;

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

export function LessonOneGrammarGuide({ locale }: LessonOneGrammarGuideProps) {
  const t = dictionaries[locale];

  return (
    <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-amber-950/10 bg-[radial-gradient(circle_at_top_left,rgba(255,214,197,0.38),transparent_30%),linear-gradient(180deg,rgba(255,252,247,0.98),rgba(247,250,244,0.95))] p-5 shadow-card md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary shadow-sm">
            Giải thích ngữ pháp
          </div>
          <h2 className="mt-4 font-serif text-3xl text-ink md:text-4xl">Bài 1: giới thiệu bản thân, hỏi đáp và nói lịch sự</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72 md:text-base">
            {t.labels.unit} {1} đi từ nền tảng rất cơ bản: tự giới thiệu, hỏi người khác là ai, phủ định, nói &ldquo;cũng là&rdquo;, và nối danh từ bằng の.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["は = chủ đề", "も = cũng", "の = của/thuộc", "ですか = hỏi", "じゃありません = phủ định"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-secondary/15 bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {grammarPoints.map((point) => (
            <article
              key={point.no}
              className="group rounded-[1.8rem] border border-secondary/12 bg-white/86 p-5 shadow-[0_10px_30px_rgba(104,144,98,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(104,144,98,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(255,129,92,0.18),rgba(255,129,92,0.08))] text-sm font-black text-torii">
                    {point.no}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-secondary">{point.highlight}</div>
                    <h3 className="mt-1 font-serif text-xl text-ink">{point.title}</h3>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.35rem] border border-secondary/12 bg-[linear-gradient(180deg,rgba(243,249,239,0.9),rgba(255,255,255,0.96))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">Công thức</div>
                <div className="mt-2 font-mono text-sm text-ink md:text-base">{point.pattern}</div>
              </div>

              <p className="mt-4 text-sm leading-7 text-ink/72">{point.summary}</p>
              <p className="mt-3 text-sm leading-7 text-ink/68">{point.explain}</p>

              <div className="mt-4 space-y-2">
                {point.examples.map((example) => (
                  <div key={example} className="rounded-2xl border border-white/90 bg-paper/80 px-4 py-3 text-sm leading-7 text-ink/85">
                    {example}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="sticky top-6 rounded-[1.8rem] border border-secondary/12 bg-white/88 p-5 shadow-[0_14px_30px_rgba(104,144,98,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.28em] text-torii">Bản đồ nhanh</div>
            <h3 className="mt-2 font-serif text-2xl text-ink">Cách dùng trong hội thoại</h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-secondary/12 bg-[linear-gradient(180deg,rgba(255,246,240,0.95),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">1. Giới thiệu</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">わたしは ... です để nói &ldquo;Tôi là...&rdquo;</div>
              </div>
              <div className="rounded-2xl border border-secondary/12 bg-[linear-gradient(180deg,rgba(243,249,239,0.95),rgba(255,255,255,0.98))] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-secondary">2. Hỏi đáp</div>
                <div className="mt-2 text-sm leading-7 text-ink/80">... ですか → はい / いいえ để trả lời ngắn gọn, tự nhiên.</div>
              </div>
              <div className="rounded-2xl border border-secondary/12 bg-[linear-gradient(180deg,rgba(247,244,255,0.95),rgba(255,255,255,0.98))] p-4">
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

          <div className="rounded-[1.8rem] border border-secondary/12 bg-white/88 p-5 shadow-[0_14px_30px_rgba(104,144,98,0.08)]">
            <div className="text-[10px] uppercase tracking-[0.28em] text-torii">Lưu ý tinh tế</div>
            <div className="mt-4 space-y-3">
              {politeNotes.map((note) => (
                <div key={note.title} className="rounded-2xl border border-white/90 bg-paper/80 p-4">
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
