import { dictionaries, Locale } from "@/lib/i18n";

type GrammarPoint = {
  no: string;
  pattern: string;
  label: string;
  accent: string;
  tint: string;
  bubble?: string;
  explanation: string;
  usage: string;
  example: string;
  translation: string;
};

const GRAMMAR_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "これ / それ / あれ",
    label: "Chỉ vật",
    accent: "from-orange-100 via-white to-amber-50",
    tint: "text-torii",
    explanation: "Dùng để gọi tên sự vật khi không kèm danh từ.",
    usage: "これ: gần người nói\nそれ: gần người nghe\nあれ: xa cả hai.",
    example: "これはノートです。",
    translation: "Đây là quyển vở."
  },
  {
    no: "2",
    pattern: "なん",
    label: "Hỏi gì",
    accent: "from-sky-100 via-white to-cyan-50",
    tint: "text-sky-600",
    explanation: "Hỏi tên hoặc nội dung của một đồ vật.",
    usage: "Giữ nguyên trật tự câu hỏi cơ bản.",
    example: "これはなんですか。",
    translation: "Đây là cái gì?"
  },
  {
    no: "3",
    pattern: "なんの N",
    label: "Loại nào",
    accent: "from-emerald-100 via-white to-lime-50",
    tint: "text-secondary",
    explanation: "Hỏi một vật thuộc loại hoặc nội dung nào.",
    usage: "Đặt trước danh từ N.",
    example: "これはなんのカタログですか。",
    translation: "Đây là catalogue của cái gì?"
  },
  {
    no: "4",
    pattern: "この / その / あの + N",
    label: "Chỉ định + danh từ",
    accent: "from-rose-100 via-white to-orange-50",
    tint: "text-rose-500",
    explanation: "Khi từ chỉ định đi trực tiếp với danh từ phía sau.",
    usage: "この/その/あの luôn đứng trước danh từ.",
    example: "このくるまはにほんせいです。",
    translation: "Chiếc xe này sản xuất tại Nhật Bản."
  },
  {
    no: "5",
    pattern: "だれ",
    label: "Hỏi người",
    accent: "from-violet-100 via-white to-fuchsia-50",
    tint: "text-violet-600",
    explanation: "Dùng để hỏi một người nào đó là ai.",
    usage: "Thường đi với は / の / です.",
    example: "あのひとはだれですか。",
    translation: "Người kia là ai?"
  },
  {
    no: "6",
    pattern: "N1 の N2",
    label: "Sở hữu",
    accent: "from-amber-100 via-white to-yellow-50",
    tint: "text-amber-700",
    explanation: "Nối hai danh từ để chỉ sở hữu hoặc quan hệ.",
    usage: "Có thể hiểu là 'của', 'thuộc', hoặc 'liên quan đến'.",
    example: "それはわたしのほんです。",
    translation: "Đó là quyển sách của tôi."
  },
  {
    no: "7",
    pattern: "S1 か S2 か",
    label: "Chọn một",
    accent: "from-teal-100 via-white to-sky-50",
    tint: "text-teal-600",
    explanation: "Dùng khi hỏi hoặc nêu lựa chọn giữa hai khả năng.",
    usage: "Mẫu này thường xuất hiện trong câu hỏi lựa chọn.",
    example: "これはノートですか、ほんですか。",
    translation: "Đây là quyển vở hay là quyển sách?"
  }
];

function FlowStep({
  no,
  title,
  description,
  className
}: {
  no: string;
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div className={`rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_12px_28px_rgba(108,141,96,0.08)] ${className}`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">#{no}</div>
      <div className="mt-2 font-serif text-xl text-ink">{title}</div>
      <p className="mt-2 text-sm leading-7 text-ink/70">{description}</p>
    </div>
  );
}

function CompactGrammarCard({ point }: { point: GrammarPoint }) {
  return (
    <article
      className={`group relative min-w-[220px] flex-1 overflow-hidden rounded-[1.55rem] border border-amber-950/10 bg-gradient-to-br ${point.accent} p-4 shadow-[0_12px_28px_rgba(104,144,98,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(104,144,98,0.12)]`}
    >
      <div className="absolute right-[-22px] top-[-18px] h-24 w-24 rounded-full bg-white/45 blur-2xl transition group-hover:scale-110" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-torii">#{point.no}</div>
        <div className={`rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${point.tint}`}>
          {point.label}
        </div>
      </div>

      <h3 className="relative mt-3 font-serif text-[1.18rem] leading-tight text-ink">{point.pattern}</h3>
      <p className="relative mt-2 text-sm leading-6 text-ink/72">{point.explanation}</p>

      <div className="relative mt-3 rounded-[1.2rem] border border-white/80 bg-white/88 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary whitespace-pre-line">{point.usage}</p>
        <div className="mt-3 space-y-1">
          <p className="text-sm font-semibold text-ink">{point.example}</p>
          <p className="text-sm leading-6 text-ink/65">{point.translation}</p>
        </div>
      </div>
    </article>
  );
}

function StepPill({
  no,
  title,
  description,
  className
}: {
  no: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.4rem] border border-white/70 bg-white/88 p-4 shadow-[0_12px_28px_rgba(108,141,96,0.08)] ${className ?? ""}`}
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">#{no}</div>
      <div className="mt-2 font-serif text-xl text-ink">{title}</div>
      <p className="mt-2 text-sm leading-7 text-ink/70">{description}</p>
    </div>
  );
}

function GrammarBand({
  title,
  hint,
  tintClass,
  points
}: {
  title: string;
  hint: string;
  tintClass: string;
  points: GrammarPoint[];
}) {
  return (
    <section className={`rounded-[2rem] border border-white/75 ${tintClass} bg-white/85 p-4 shadow-[0_14px_32px_rgba(108,141,96,0.07)]`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">{title}</div>
          <p className="mt-1 text-sm leading-6 text-ink/65">{hint}</p>
        </div>
        <div className="rounded-full border border-secondary/15 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
          {points.length} mẫu
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {points.map((point) => (
          <GrammarCardCompact key={point.no} point={point} />
        ))}
      </div>
    </section>
  );
}

const LESSON_2_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "ここ / そこ / あそこ",
    label: "Chỉ địa điểm",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Địa điểm",
    explanation: "Dùng để chỉ nơi chốn gần - xa so với người nói và người nghe.",
    usage: "ここ: nơi này\nそこ: nơi đó\nあそこ: nơi kia",
    example: "ここはしょくどうです。",
    translation: "Đây là nhà ăn."
  },
  {
    no: "2",
    pattern: "N1 は N2(địa điểm) です",
    label: "Nói nơi chốn",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Nơi chốn",
    explanation: "Dùng để nói một người hay vật đang ở đâu hoặc một nơi là gì.",
    usage: "Cấu trúc cơ bản để giới thiệu địa điểm.",
    example: "トイレはここです。",
    translation: "Nhà vệ sinh ở đây."
  },
  {
    no: "3",
    pattern: "いくら",
    label: "Hỏi giá",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Giá tiền",
    explanation: "Dùng khi muốn hỏi giá của một vật.",
    usage: "Thường đi với です và đơn vị tiền tệ.",
    example: "このパソコンは89,000えんです。",
    translation: "Chiếc máy tính này 89.000 yên."
  },
  {
    no: "4",
    pattern: "どこの N",
    label: "Hỏi xuất xứ",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Xuất xứ",
    explanation: "Hỏi vật đó đến từ đâu hoặc được sản xuất ở đâu.",
    usage: "Đặt trước danh từ N để hỏi xuất xứ.",
    example: "それはどこのくるまですか。",
    translation: "Đó là ô tô xuất xứ từ đâu?"
  }
];

const LESSON_3_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "ここ / そこ / あそこ",
    label: "Chỉ địa điểm",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Địa điểm",
    explanation: "Dùng để chỉ nơi chốn gần - xa so với người nói và người nghe.",
    usage: "ここ: nơi này\nそこ: nơi đó\nあそこ: nơi kia",
    example: "ここはかいぎしつです。",
    translation: "Đây là phòng họp."
  },
  {
    no: "2",
    pattern: "N1 は N2(địa điểm) です",
    label: "Nói vị trí",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Vị trí",
    explanation: "Dùng để nói một người hay vật đang ở đâu.",
    usage: "Một mẫu cơ bản để trả lời 'ở đâu'.",
    example: "じむしつはここです。",
    translation: "Văn phòng ở đây."
  },
  {
    no: "3",
    pattern: "いくら",
    label: "Hỏi giá",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Giá tiền",
    explanation: "Dùng khi muốn hỏi giá của một vật.",
    usage: "Thường đi với です và đơn vị tiền tệ.",
    example: "このでんしレンジはいくらですか。",
    translation: "Cái lò vi sóng này bao nhiêu tiền?"
  },
  {
    no: "4",
    pattern: "どこの N",
    label: "Hỏi xuất xứ",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Xuất xứ",
    explanation: "Hỏi vật đó đến từ đâu hoặc được sản xuất ở đâu.",
    usage: "Đặt trước danh từ N để hỏi xuất xứ.",
    example: "それはどこのくるまですか。",
    translation: "Đó là xe xuất xứ từ đâu?"
  }
];

const LESSON_4_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N を Vます / Vません",
    label: "Hành động",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Tân ngữ",
    explanation: "Mẫu cơ bản để nói một hành động có đối tượng đi kèm.",
    usage: "Đặt trợ từ を trước động từ.\nDùng ません để phủ định.",
    example: "パンをたべます。",
    translation: "Ăn bánh mì."
  },
  {
    no: "2",
    pattern: "何も Vません",
    label: "Phủ định",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Không gì",
    explanation: "Dùng để nhấn mạnh là hoàn toàn không làm gì cả.",
    usage: "Nhìn giống なん nhưng đọc là なに.",
    example: "なにもたべません。",
    translation: "Tôi không ăn gì cả."
  },
  {
    no: "3",
    pattern: "N(địa điểm) で Vます",
    label: "Nơi chốn",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Tại đâu",
    explanation: "Nói nơi diễn ra hành động.",
    usage: "Dùng với địa điểm thực hiện hành động.",
    example: "コンビニでパンをかいます。",
    translation: "Tôi mua bánh mì ở cửa hàng tiện lợi."
  },
  {
    no: "4",
    pattern: "それから",
    label: "Sau đó",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Tiếp nối",
    explanation: "Từ nối để nói trình tự các việc xảy ra.",
    usage: "Đặt trước mệnh đề tiếp theo.",
    example: "テニスをします。それから、しゅくだいをします。",
    translation: "Tôi chơi tennis. Sau đó tôi làm bài tập."
  },
  {
    no: "5",
    pattern: "Vたり Vたり します",
    label: "Liệt kê",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Nhiều việc",
    explanation: "Dùng để liệt kê nhiều hành động thay đổi luân phiên.",
    usage: "Nêu hai hoặc nhiều hoạt động tiêu biểu.",
    example: "パンや野菜を食べたりします。",
    translation: "Tôi có lúc ăn bánh mì, có lúc ăn rau."
  },
  {
    no: "6",
    pattern: "なに / なん",
    label: "Hỏi gì",
    accent: "from-teal-100 via-sky-50 to-white",
    tint: "text-teal-600",
    bubble: "Dạng đọc",
    explanation: "Cùng nghĩa là 'cái gì', nhưng cách đọc thay đổi theo từ đi sau.",
    usage: "なに: dùng riêng hoặc trước nhiều từ.\nなん: trước từ đếm, số, hoặc từ bắt đầu bằng âm phù hợp.",
    example: "なにをしますか。",
    translation: "Bạn làm gì?"
  }
];

const LESSON_5_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "何時 / 何分 / 〜時半",
    label: "Nói giờ",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Thời gian",
    explanation: "Dùng để hỏi và trả lời thời điểm cụ thể trong ngày.",
    usage: "Kết hợp với 〜時, 〜分, 〜時半.\nPhù hợp cho lịch sinh hoạt và giờ giấc.",
    example: "いまなんじですか。",
    translation: "Bây giờ là mấy giờ?"
  },
  {
    no: "2",
    pattern: "N(時 gian) に Vます",
    label: "Thời điểm",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Vào lúc",
    explanation: "Chỉ thời điểm hành động xảy ra.",
    usage: "Thường đi với giờ cụ thể, ngày cụ thể hoặc mốc thời gian.\nDùng để nói 'vào lúc...'.",
    example: "まいあさ7じにおきます。",
    translation: "Mỗi sáng tôi thức dậy vào lúc 7 giờ."
  },
  {
    no: "3",
    pattern: "N1 から N2 まで",
    label: "Từ - đến",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Khoảng",
    explanation: "Biểu thị điểm bắt đầu và kết thúc của thời gian hoặc địa điểm.",
    usage: "から là từ, まで là đến.\nDùng rất nhiều với thời gian biểu.",
    example: "がっこうは9じから12じ40ぷんまでです。",
    translation: "Trường học từ 9 giờ đến 12 giờ 40 phút."
  },
  {
    no: "4",
    pattern: "Vました / Vませんでした",
    label: "Quá khứ",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Đã / Chưa",
    explanation: "Dùng để kể việc đã làm hoặc chưa làm trong quá khứ.",
    usage: "ます → ました\nません → ませんでした",
    example: "きのうのよるおふろにはいりました。",
    translation: "Hôm qua buổi tối tôi đã vào bồn tắm."
  },
  {
    no: "5",
    pattern: "何も Vません",
    label: "Phủ định",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Không gì",
    explanation: "Nhấn mạnh là hoàn toàn không làm gì.",
    usage: "Đọc là なにも.\nDùng trong câu phủ định mạnh hơn.",
    example: "けさなにもたべませんでした。",
    translation: "Sáng nay tôi không ăn gì cả."
  },
  {
    no: "6",
    pattern: "Vても / Vで",
    label: "Liên kết",
    accent: "from-teal-100 via-sky-50 to-white",
    tint: "text-teal-600",
    bubble: "Nối ý",
    explanation: "Dùng khi nối các hành động hoặc nói về trạng thái tiếp diễn trong khung thời gian.",
    usage: "Trong bài này còn gặp で với nghĩa 'địa điểm diễn ra hành động'.",
    example: "おふろでなにをしますか。",
    translation: "Bạn làm gì trong bồn tắm?"
  }
];

const LESSON_6_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N へ Vます / Vません",
    label: "Đi đâu",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Hướng đi",
    explanation: "Dùng để nói nơi đến, nơi đi hoặc điểm đến của hành động.",
    usage: "へ được đọc là え.\nĐi với các động từ di chuyển như いきます, きます, かえります.",
    example: "わたしはロンドンへいきます。",
    translation: "Tôi đi tới Luân Đôn."
  },
  {
    no: "2",
    pattern: "N(thời gian) に Vます",
    label: "Vào lúc",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Thời gian",
    explanation: "Dùng với thời điểm cụ thể để chỉ khi nào hành động xảy ra.",
    usage: "に là trợ từ mốc thời gian.\nKhông dùng cho các trạng từ thời gian như きのう, まいにち.",
    example: "わたしは3月30日に日本へ来ました。",
    translation: "Tôi đến Nhật Bản vào ngày 30 tháng 3."
  },
  {
    no: "3",
    pattern: "N(phương tiện) で Vます",
    label: "Phương tiện",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Di chuyển",
    explanation: "Dùng để nói phương tiện đi lại hoặc cách thực hiện hành động.",
    usage: "で chỉ phương tiện di chuyển.\nKhông dùng với 自転車, バス, でんしゃ... để diễn đạt 'bằng...'.",
    example: "わたしはバスで大学へいきます。",
    translation: "Tôi đi tới đại học bằng xe buýt."
  },
  {
    no: "4",
    pattern: "N(người) と Vます",
    label: "Cùng với",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Người cùng đi",
    explanation: "Dùng để nói người cùng tham gia vào hành động.",
    usage: "と = với, cùng với.",
    example: "わたしは田中さんと病院へいきます。",
    translation: "Tôi đi tới bệnh viện cùng với anh Tanaka."
  },
  {
    no: "5",
    pattern: "Vませんか",
    label: "Rủ rê",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Mời",
    explanation: "Dùng để mời hoặc rủ ai đó cùng làm việc gì.",
    usage: "Mẫu mời lịch sự rất hay dùng trong giao tiếp.",
    example: "いっしょにごはんをたべませんか。",
    translation: "Bạn ăn cơm cùng tôi nhé?"
  },
  {
    no: "6",
    pattern: "Vません",
    label: "Không đi",
    accent: "from-teal-100 via-sky-50 to-white",
    tint: "text-teal-600",
    bubble: "Phủ định",
    explanation: "Dùng để phủ định động từ ở hiện tại / tương lai.",
    usage: "Tạo từ Vます bỏ ます rồi thêm ません.",
    example: "どこへもいきませんでした。",
    translation: "Tôi không đi đâu cả."
  },
  {
    no: "7",
    pattern: "Vませんでした",
    label: "Quá khứ",
    accent: "from-amber-100 via-yellow-50 to-white",
    tint: "text-amber-700",
    bubble: "Đã không",
    explanation: "Dùng để phủ định ở quá khứ.",
    usage: "Tạo từ Vます bỏ ます rồi thêm ませんでした.",
    example: "6がつ28日にきました。",
    translation: "Tôi đã đến vào ngày 28 tháng 6."
  }
];

const LESSON_7_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "い形容詞",
    label: "Tính từ い",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Mô tả",
    explanation: "Dùng để mô tả đặc điểm, trạng thái hoặc tính chất.",
    usage: "Đứng trực tiếp trước danh từ khi bổ nghĩa.\nĐổi về dạng phủ định và quá khứ theo bảng tính từ.",
    example: "うみはひろいです。",
    translation: "Biển rộng."
  },
  {
    no: "2",
    pattern: "な形容詞",
    label: "Tính từ な",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Định tính",
    explanation: "Dùng để nói trạng thái hoặc tính chất của danh từ.",
    usage: "Khi bổ nghĩa cho danh từ, thêm な trước danh từ.\nKhi đứng cuối câu, dùng です.",
    example: "ウィーンはゆうめいなまちです。",
    translation: "Vienna là thành phố nổi tiếng."
  },
  {
    no: "3",
    pattern: "どんな / どう / どれ",
    label: "Hỏi thế nào",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Hỏi",
    explanation: "Dùng để hỏi tính chất, trạng thái hoặc lựa chọn trong nhóm nhiều vật.",
    usage: "どんな: hỏi loại như thế nào.\nどう: hỏi như thế nào.\nどれ: hỏi cái nào.",
    example: "ウィーンはどんなまちですか。",
    translation: "Vienna là thành phố như thế nào?"
  },
  {
    no: "4",
    pattern: "あまり / とても / いちばん",
    label: "Mức độ",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Độ mạnh",
    explanation: "Dùng để diễn tả mức độ đánh giá của người nói.",
    usage: "あまり: không ~ lắm.\nとても: rất ~.\nいちばん: nhất.",
    example: "このチョコレートはとてもおいしいです。",
    translation: "Sô cô la này rất ngon."
  }
];

const LESSON_8_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N が あります / います",
    label: "Tồn tại",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Có / Ở",
    explanation: "Dùng để nói sự tồn tại của vật hoặc người.",
    usage: "あります: vật không có sự sống.\nいます: người hoặc vật có sự sống.",
    example: "あそこにじどうはんばいきがあります。",
    translation: "Ở đó có máy bán hàng tự động."
  },
  {
    no: "2",
    pattern: "N(địa điểm) に N が あります / います",
    label: "Nơi chốn",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Địa điểm",
    explanation: "Dùng để nói vật hoặc người tồn tại ở đâu.",
    usage: "Đặt địa điểm trước に.\nDùng để trả lời câu hỏi 'ở đâu'.",
    example: "トムさんのへやにテレビがあります。",
    translation: "Trong phòng của Tom có tivi."
  },
  {
    no: "3",
    pattern: "N は N の となり に あります",
    label: "Vị trí",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Ở bên",
    explanation: "Dùng để nói vật nằm ở vị trí gần một mốc khác.",
    usage: "Kết hợp với となり, あいだ, まえ, うしろ...",
    example: "ぎんこうはコンビニのとなりにあります。",
    translation: "Ngân hàng ở cạnh cửa hàng tiện lợi."
  },
  {
    no: "4",
    pattern: "N1 と N2 の あいだ に あります",
    label: "Giữa",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Ở giữa",
    explanation: "Dùng để nói một vật nằm giữa hai vật khác.",
    usage: "あいだ に = ở giữa.",
    example: "じどうはんばいきはパンやとほんやのあいだにあります。",
    translation: "Máy bán hàng tự động ở giữa tiệm bánh mì và hiệu sách."
  },
  {
    no: "5",
    pattern: "V ませんか / V ましょう",
    label: "Mời",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Rủ rê",
    explanation: "Dùng để mời, rủ hoặc đề nghị làm gì cùng nhau.",
    usage: "ませんか: rủ nhẹ nhàng.\nましょう: đồng ý, đề nghị mạnh hơn.",
    example: "あしたいっしょにえいがをみませんか。",
    translation: "Ngày mai cùng đi xem phim nhé?"
  },
  {
    no: "6",
    pattern: "だれ / なに / なんにん",
    label: "Hỏi ai / gì",
    accent: "from-teal-100 via-sky-50 to-white",
    tint: "text-teal-600",
    bubble: "Hỏi",
    explanation: "Dùng để hỏi người, vật hoặc số lượng người.",
    usage: "だれ: ai.\nなに: cái gì.\nなんにん: bao nhiêu người.",
    example: "きょうしつにがくせいがなんにんいますか。",
    translation: "Trong lớp có bao nhiêu học sinh?"
  }
];

const LESSON_9_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "あまり / だいたい / よく / 全然",
    label: "Mức độ",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Độ mạnh",
    explanation: "Dùng để diễn tả mức độ yêu thích, hiểu biết hoặc tần suất.",
    usage: "あまり / 全然 thường đi với câu phủ định.\nだいたい / よく dùng để mô tả mức độ khá thường xuyên.",
    example: "あまりじょうずじゃありません。",
    translation: "Tôi không giỏi lắm."
  },
  {
    no: "2",
    pattern: "どうして / ~から",
    label: "Lý do",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Vì sao",
    explanation: "Dùng để hỏi lý do và trả lời lý do.",
    usage: "どうして = tại sao.\nKhi trả lời lý do, thường thêm から vào cuối câu.",
    example: "どうしてテニスをしませんか。",
    translation: "Tại sao bạn không chơi tennis?"
  },
  {
    no: "3",
    pattern: "すき / きらい / じょうず / へた",
    label: "Cảm nhận",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Thích / dở",
    explanation: "Dùng để nói sở thích, khả năng và điều không thích.",
    usage: "Thường đi với N が.\nCũng có thể đi với động từ ở dạng ます khi nói về môn học, hoạt động.",
    example: "わたしはやまのぼりがすきです。",
    translation: "Tôi thích leo núi."
  },
  {
    no: "4",
    pattern: "N が わかります",
    label: "Hiểu",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Biết / hiểu",
    explanation: "Dùng để nói rằng hiểu một ngôn ngữ, vấn đề hoặc nội dung nào đó.",
    usage: "Bổ nghĩa của 'biết/hiểu' thường đi với が.",
    example: "わたしは韓国語がわかります。",
    translation: "Tôi biết tiếng Hàn Quốc."
  },
  {
    no: "5",
    pattern: "V が 好きです / 嫌いです",
    label: "Thích",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Sở thích",
    explanation: "Dùng để nói thích hoặc không thích một hoạt động / món ăn / chủ đề.",
    usage: "Có thể dùng với danh từ hoặc động từ chuyển thành danh từ.",
    example: "日本のりょうりがすきです。",
    translation: "Tôi thích món ăn Nhật."
  },
  {
    no: "6",
    pattern: "S1 から、S2",
    label: "Lý do",
    accent: "from-teal-100 via-sky-50 to-white",
    tint: "text-teal-600",
    bubble: "Vì",
    explanation: "Dùng để nối hai câu, câu trước nêu lý do của câu sau.",
    usage: "S1 là lý do, S2 là kết quả hoặc hành động tiếp theo.",
    example: "いいてんきですから、さんぽしましょう。",
    translation: "Vì thời tiết đẹp nên chúng ta đi dạo nhé."
  }
];

const LESSON_10_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N へ / N に",
    label: "Hướng đến",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Đi / gửi",
    explanation: "Dùng để chỉ đích đến, người nhận hoặc hướng của hành động.",
    usage: "へ: hướng tới.\nに: đến, vào, tới, hoặc người nhận.",
    example: "ともだちへでんわをかけます。",
    translation: "Tôi gọi điện cho bạn."
  },
  {
    no: "2",
    pattern: "N で V",
    label: "Phương tiện",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Bằng gì",
    explanation: "Dùng để chỉ công cụ, phương tiện hoặc nơi diễn ra hành động.",
    usage: "で: bằng, tại, ở.\n何で: bằng gì.",
    example: "はしで すしを たべます。",
    translation: "Tôi ăn sushi bằng đũa."
  },
  {
    no: "3",
    pattern: "N に N を V",
    label: "Người nhận",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Tặng / cho / mượn",
    explanation: "Dùng khi có người nhận một vật hoặc một hành động hướng đến ai đó.",
    usage: "に: người nhận.\nを: vật được chuyển.",
    example: "ともだちに cd を かしました。",
    translation: "Tôi cho bạn mượn CD."
  },
  {
    no: "4",
    pattern: "N を お願いします",
    label: "Đặt món",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Nhờ / gọi món",
    explanation: "Dùng khi nhờ ai đó làm gì hoặc khi gọi món, đặt hàng.",
    usage: "おねがいします: làm ơn / cho tôi ~.\nご注文は? dùng khi gọi món.",
    example: "コーヒーと ケーキを おねがいします。",
    translation: "Cho tôi cà phê và bánh ngọt."
  },
  {
    no: "5",
    pattern: "N に します",
    label: "Chọn",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Quyết định",
    explanation: "Dùng khi quyết định chọn một món trong nhiều lựa chọn.",
    usage: "にします: chọn / quyết định lấy cái đó.",
    example: "わたしは コーヒーと ケーキに します。",
    translation: "Tôi chọn cà phê và bánh ngọt."
  }
];

const LESSON_11_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N1 は N2 が A",
    label: "So sánh theo chủ đề",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Chủ đề",
    explanation: "Dùng để nói đặc điểm của một chủ đề, thường là khi muốn nhấn vào thuộc tính nổi bật của nó.",
    usage: "N1 là chủ đề chính.\nN2 là thứ có đặc điểm A.",
    example: "東京は人が多いです。",
    translation: "Tokyo thì đông người."
  },
  {
    no: "2",
    pattern: "N1 は N2 より A",
    label: "So sánh hơn",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Hơn",
    explanation: "Dùng để so sánh hai sự vật hoặc hai địa điểm với nhau.",
    usage: "より = hơn.\nA là tính chất được đem ra so sánh.",
    example: "ソウルは東京より寒いです。",
    translation: "Seoul lạnh hơn Tokyo."
  },
  {
    no: "3",
    pattern: "N1 と N2 と どちらが Aか / N1/N2 の ほうが A",
    label: "Chọn một",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Lựa chọn",
    explanation: "Dùng khi hỏi hoặc trả lời giữa hai lựa chọn, thường là thích cái nào hơn.",
    usage: "どちらが = bên nào / cái nào hơn.\nのほうが = cái / bên ... hơn.",
    example: "コーヒーと紅茶とどちらが好きですか。",
    translation: "Cà phê và trà thì bạn thích cái nào hơn?"
  },
  {
    no: "4",
    pattern: "N1 は N2 が いちばん A",
    label: "Nhất",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Số một",
    explanation: "Dùng để nói thứ được đánh giá cao nhất trong một nhóm.",
    usage: "いちばん = nhất.\nThường đi với danh từ chỉ nhóm hoặc phạm vi so sánh.",
    example: "スポーツでサッカーがいちばん好きです。",
    translation: "Trong các môn thể thao, tôi thích bóng đá nhất."
  },
  {
    no: "5",
    pattern: "いAくて / なAで / Nで",
    label: "Nối ý",
    accent: "from-violet-100 via-fuchsia-50 to-white",
    tint: "text-violet-600",
    bubble: "Liên kết",
    explanation: "Dùng để nối hai ý hoặc hai tính chất khi miêu tả cùng một sự vật.",
    usage: "いA: bỏ い, thêm くて.\nなA / N: thêm で.",
    example: "わたしのへやはあたらしくて、しずかです。",
    translation: "Phòng của tôi mới và yên tĩnh."
  }
];

const LESSON_12_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "いA かったです / なA でした / N でした",
    label: "Quá khứ khẳng định",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Đã là",
    explanation: "Dùng để nói một đặc điểm hay trạng thái ở thì quá khứ.",
    usage: "いA: đổi い thành かった.\nなA và N: thêm でした.",
    example: "ナルコさんは元気でした。",
    translation: "Naruko đã khỏe."
  },
  {
    no: "2",
    pattern: "いA くなかったです / なA じゃありませんでした / N じゃありませんでした",
    label: "Quá khứ phủ định",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Đã không",
    explanation: "Dùng để nói một đặc điểm hay trạng thái không xảy ra trong quá khứ.",
    usage: "いA: đổi い thành くなかったです.\nなA / N: thêm じゃありませんでした.",
    example: "キムさんは忙しくなかったです。",
    translation: "Kim đã không bận."
  },
  {
    no: "3",
    pattern: "どのぐらい / くらい",
    label: "Khoảng bao lâu",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Thời lượng",
    explanation: "Dùng để hỏi hoặc nói ước lượng về độ dài thời gian, khoảng cách hay mức độ.",
    usage: "どのぐらい: hỏi 'bao lâu / khoảng chừng nào'.\nくらい / ぐらい: dùng để ước lượng.",
    example: "2週間ぐらい勉強しました。",
    translation: "Tôi đã học khoảng 2 tuần."
  }
];

const LESSON_13_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "N が ほしいです",
    label: "Muốn có",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Mong muốn",
    explanation: "Dùng để nói mình muốn có một vật gì đó.",
    usage: "ほしい là tính từ thể hiện nguyện vọng.\nThường không dùng trực tiếp cho ý muốn của người thứ ba.",
    example: "わたしはお金がほしいです。",
    translation: "Tôi muốn tiền."
  },
  {
    no: "2",
    pattern: "V たいです",
    label: "Muốn làm",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Nguyện vọng",
    explanation: "Dùng để nói mình muốn thực hiện một hành động nào đó.",
    usage: "Bỏ ます của động từ rồi thêm たいです.\nCó thể chia quá khứ, phủ định như tính từ い.",
    example: "わたしは柔道を習いたいです。",
    translation: "Tôi muốn học Judo."
  },
  {
    no: "3",
    pattern: "N1(địa điểm) へ Vます に 行きます / 来ます / 帰ります",
    label: "Mục đích di chuyển",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Đi để",
    explanation: "Dùng khi nói mình đi đến đâu để làm gì.",
    usage: "Nếu là động từ thì bỏ ます.\nNếu là danh từ + する thì đổi thành danh từ + をしに.",
    example: "私は写真を撮りに行きます。",
    translation: "Tôi đi chụp ảnh."
  },
  {
    no: "4",
    pattern: "V ましょうか",
    label: "Đề nghị giúp",
    accent: "from-rose-100 via-orange-50 to-white",
    tint: "text-rose-500",
    bubble: "Có muốn?",
    explanation: "Dùng khi đề nghị giúp đỡ hoặc rủ người nghe làm gì.",
    usage: "Lịch sự hơn ましょう.\nCó thể hiểu là 'để tôi ~ nhé?'",
    example: "手伝いましょうか。",
    translation: "Để tôi giúp nhé?"
  }
];

const GENERIC_POINTS: GrammarPoint[] = [
  {
    no: "1",
    pattern: "Mẫu trọng tâm",
    label: "Tổng quan",
    accent: "from-orange-100 via-amber-50 to-white",
    tint: "text-torii",
    bubble: "Khung bài",
    explanation: "Bài này đang được chuẩn hóa theo một khối tóm tắt gọn.",
    usage: "Cấu trúc sẽ được bổ sung chi tiết sau.\nHiện giữ khung đọc nhanh để không lẫn raw PDF.",
    example: "Nội dung đang cập nhật.",
    translation: "Phần chi tiết sẽ được thêm sau."
  },
  {
    no: "2",
    pattern: "Câu mẫu",
    label: "Ví dụ",
    accent: "from-sky-100 via-cyan-50 to-white",
    tint: "text-sky-600",
    bubble: "Luyện nói",
    explanation: "Một số câu mẫu minh hoạ sẽ được gắn vào sau.",
    usage: "Giữ chỗ cho câu mẫu ngắn, dễ nhớ.",
    example: "Mẫu câu minh hoạ.",
    translation: "Dùng để thay nội dung cụ thể của từng bài."
  },
  {
    no: "3",
    pattern: "Ghi nhớ nhanh",
    label: "Tip",
    accent: "from-emerald-100 via-lime-50 to-white",
    tint: "text-secondary",
    bubble: "Nhớ nhanh",
    explanation: "Dùng như khung ghi chú cho bài từ 8 đến 22.",
    usage: "Khi bạn thêm nội dung, chỉ cần thay phần này bằng bộ thẻ riêng của bài.",
    example: "Nội dung trống chờ nhập.",
    translation: "Dành chỗ cho nội dung bài tiếp theo."
  }
];

function GrammarCardCompact({ point }: { point: GrammarPoint }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.5rem] border border-amber-950/10 bg-gradient-to-br ${point.accent} p-4 shadow-[0_12px_28px_rgba(104,144,98,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(104,144,98,0.14)]`}
    >
      <div className="absolute right-[-18px] top-[-14px] h-20 w-20 rounded-full bg-white/45 blur-2xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-torii">#{point.no}</div>
        <div className={`rounded-full border border-white/80 bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${point.tint}`}>
          {point.label}
        </div>
      </div>
      <h3 className="relative mt-3 font-serif text-[1.2rem] leading-tight text-ink">{point.pattern}</h3>
      <p className="relative mt-2 text-sm leading-6 text-ink/72">{point.explanation}</p>
      <div className="relative mt-3 rounded-[1.15rem] border border-white/80 bg-white/88 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary whitespace-pre-line">{point.usage}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm font-semibold text-ink">{point.example}</p>
          <p className="text-sm leading-6 text-ink/65">{point.translation}</p>
        </div>
      </div>
    </article>
  );
}

export function LessonGrammarSpotlight({ locale, unitNumber }: { locale: Locale; unitNumber: number }) {
  const t = dictionaries[locale];

  if (unitNumber === 4) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 4 xoay quanh hành động thường ngày, nơi chốn thực hiện, nối ý và các cách hỏi cơ bản.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 31-31
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Hành động cơ bản" description="N を Vます / Vません và 何も Vません." />
            <StepPill no="2" title="Nơi chốn và trình tự" description="N(địa điểm) で Vます và それから để nối việc." />
            <StepPill no="3" title="Liệt kê & hỏi gì" description="VたりVたりします cùng なに / なん." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu hành động"
              hint="Nói việc làm có tân ngữ và dạng phủ định."
              points={LESSON_4_POINTS.slice(0, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu nơi chốn và trình tự"
              hint="Dùng để nói nơi diễn ra hành động và nối các việc theo thứ tự."
              points={LESSON_4_POINTS.slice(2, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu liệt kê và hỏi"
              hint="Dùng để kể nhiều việc và hỏi 'cái gì' theo ngữ cảnh."
              points={LESSON_4_POINTS.slice(4, 6)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 3) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 3 tập trung vào chỉ địa điểm, hỏi vị trí, hỏi giá và hỏi xuất xứ.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 25-25
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Chỉ địa điểm" description="ここ / そこ / あそこ để chỉ nơi chốn gần xa." />
            <StepPill no="2" title="Nói vị trí" description="N1 は N2(địa điểm) です để nói vị trí." />
            <StepPill no="3" title="Hỏi giá và xuất xứ" description="いくら và どこの N để hỏi tiền và nơi sản xuất." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu chỉ địa điểm"
              hint="Dùng để chỉ nơi chốn theo khoảng cách."
              points={LESSON_3_POINTS.slice(0, 1)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu nói vị trí"
              hint="Dùng để nói một nơi là gì hoặc ở đâu."
              points={LESSON_3_POINTS.slice(1, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu hỏi giá và xuất xứ"
              hint="Dùng để hỏi giá tiền và nguồn gốc của món đồ."
              points={LESSON_3_POINTS.slice(2, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 2) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 2 xoay quanh chỉ địa điểm, hỏi vị trí, hỏi giá và hỏi xuất xứ.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 18-18
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Chỉ địa điểm" description="ここ / そこ / あそこ để chỉ nơi chốn gần xa." />
            <StepPill no="2" title="Nói ở đâu" description="N1 は N2(địa điểm) です để nói vị trí." />
            <StepPill no="3" title="Hỏi giá và xuất xứ" description="いくら và どこの N để hỏi tiền và nơi sản xuất." />
          </div>

          <div className="mt-6 space-y-4">
          <GrammarBand title="Mẫu chỉ địa điểm" hint="Dùng để chỉ nơi chốn theo khoảng cách." points={LESSON_2_POINTS.slice(0, 1)} tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]" />
          <GrammarBand title="Mẫu nói vị trí" hint="Dùng để nói một nơi là gì hoặc ở đâu." points={LESSON_2_POINTS.slice(1, 2)} tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]" />
          <GrammarBand title="Mẫu hỏi giá và xuất xứ" hint="Dùng để hỏi giá tiền và nguồn gốc của món đồ." points={LESSON_2_POINTS.slice(2, 4)} tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]" />
        </div>
      </div>
    </section>
    );
  }

  if (unitNumber === 5) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 5 tập trung vào cách nói thời gian, mốc bắt đầu - kết thúc, và quá khứ/phủ định.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 38-38
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Nói giờ" description="何時 / 何分 / 〜時半 để hỏi và trả lời giờ." />
            <StepPill no="2" title="Mốc thời gian" description="N(時 gian) に Vます và N1 から N2 まで." />
            <StepPill no="3" title="Quá khứ & phủ định" description="Vました / Vませんでした và 何も Vません." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu thời gian"
              hint="Nói giờ giấc, khoảng thời gian và thời điểm xảy ra."
              points={LESSON_5_POINTS.slice(0, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu quá khứ"
              hint="Dùng để kể việc đã làm hoặc chưa làm."
              points={LESSON_5_POINTS.slice(3, 5)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu liên kết"
              hint="Nối ý và chỉ nơi chốn thực hiện hành động."
              points={LESSON_5_POINTS.slice(5, 6)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 6) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 6 tập trung vào hướng đi, thời điểm, phương tiện, người cùng đi và phủ định.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 46-46
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Đi đâu" description="N へ Vます và N(thời gian) に Vます." />
            <StepPill no="2" title="Phương tiện & cùng đi" description="N(phương tiện) で Vます, N(người) と Vます." />
            <StepPill no="3" title="Rủ rê & phủ định" description="Vませんか, Vません, Vませんでした." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu đi và đến"
              hint="Nói hướng đi và mốc thời gian hành động."
              points={LESSON_6_POINTS.slice(0, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu phương tiện và người cùng đi"
              hint="Nói bằng gì, với ai khi thực hiện hành động."
              points={LESSON_6_POINTS.slice(2, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu mời và phủ định"
              hint="Dùng để rủ rê hoặc nói không làm / đã không làm."
              points={LESSON_6_POINTS.slice(4, 7)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 7) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 7 tập trung vào tính từ い, tính từ な và các cách hỏi, đánh giá mức độ.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 53-53
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Tính từ い" description="Mô tả tính chất và biến đổi theo mẫu." />
            <StepPill no="2" title="Tính từ な" description="Đứng trước danh từ với な, dùng です ở cuối câu." />
            <StepPill no="3" title="Hỏi & mức độ" description="どんな / どう / どれ và あまり / とても / いちばん." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu tính từ い"
              hint="Dùng để mô tả đặc điểm, trạng thái."
              points={LESSON_7_POINTS.slice(0, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu hỏi"
              hint="Hỏi tính chất, trạng thái hoặc lựa chọn."
              points={LESSON_7_POINTS.slice(2, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu mức độ"
              hint="Dùng để tăng / giảm mức độ nhận xét."
              points={LESSON_7_POINTS.slice(3, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 8) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 8 tập trung vào tồn tại, vị trí đồ vật, và cách mời/rủ làm gì cùng nhau.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 60-60
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Tồn tại" description="あります / います để nói có hoặc ở đâu." />
            <StepPill no="2" title="Vị trí" description="N は N の となり に あります và あいだ に." />
            <StepPill no="3" title="Mời & hỏi" description="V ませんか / V ましょう, だれ / なに / なんにん." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu tồn tại"
              hint="Dùng để nói có vật gì hoặc có ai ở đâu."
              points={LESSON_8_POINTS.slice(0, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu vị trí"
              hint="Nói vị trí tương đối của vật trong không gian."
              points={LESSON_8_POINTS.slice(2, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu mời và hỏi"
              hint="Dùng để rủ rê hoặc hỏi người / vật / số lượng."
              points={LESSON_8_POINTS.slice(4, 6)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 9) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 9 tập trung vào mức độ, sở thích, khả năng và cách hỏi lý do.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 67-67
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Mức độ" description="あまり / だいたい / よく / 全然." />
            <StepPill no="2" title="Lý do" description="どうして và ~から để hỏi / trả lời lý do." />
            <StepPill no="3" title="Thích & hiểu" description="すき / きらい / じょうず / へた / わかります." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu mức độ"
              hint="Dùng để nói mức độ và tần suất."
              points={LESSON_9_POINTS.slice(0, 1)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu lý do"
              hint="Dùng để hỏi vì sao và trả lời bằng lý do."
              points={LESSON_9_POINTS.slice(1, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu cảm nhận"
              hint="Nói thích, ghét, giỏi, dở hoặc hiểu."
              points={LESSON_9_POINTS.slice(2, 6)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 10) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 10 xoay quanh hướng đi, phương tiện, người nhận và cách chọn / đặt món.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 73-73
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Hướng đến" description="N へ / N に để chỉ đích đến hoặc người nhận." />
            <StepPill no="2" title="Phương tiện" description="N で để nói bằng gì, ở đâu hoặc tại đâu." />
            <StepPill no="3" title="Chọn / đặt" description="N にします / N をお願いします." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu đích đến"
              hint="Dùng để chỉ nơi đến hoặc người nhận."
              points={LESSON_10_POINTS.slice(0, 1)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu phương tiện"
              hint="Dùng để nói bằng gì hoặc thực hiện việc gì ở đâu."
              points={LESSON_10_POINTS.slice(1, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu chọn / gọi"
              hint="Dùng để gọi món, nhờ vả hoặc quyết định chọn."
              points={LESSON_10_POINTS.slice(3, 5)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 11) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 11 tập trung vào so sánh, lựa chọn trong hai phương án, xác định cái nhất và cách nối tính chất khi miêu tả.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 79-79
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="So sánh cơ bản" description="N1 は N2 が A và N1 は N2 より A." />
            <StepPill no="2" title="Chọn giữa hai" description="N1 と N2 と どちらが Aか / のほうが A." />
            <StepPill no="3" title="Nhất & nối ý" description="いちばん A và いAくて / なAで / Nで." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu so sánh"
              hint="Dùng để nói chủ đề, so sánh hơn và chọn giữa hai đối tượng."
              points={LESSON_11_POINTS.slice(0, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu nhấn mạnh"
              hint="Dùng để chỉ thứ đứng đầu trong một nhóm so sánh."
              points={LESSON_11_POINTS.slice(3, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu nối tính chất"
              hint="Dùng để nối hai đặc điểm hoặc hai mệnh đề miêu tả."
              points={LESSON_11_POINTS.slice(4, 5)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 12) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 12 tập trung vào cách đổi tính từ い, tính từ な và danh từ sang quá khứ, phủ định quá khứ, cùng cách nói khoảng chừng thời gian.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 86-86
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Quá khứ khẳng định" description="いA かったです / なA でした / N でした." />
            <StepPill no="2" title="Quá khứ phủ định" description="いA くなかったです / なA・N じゃありませんでした." />
            <StepPill no="3" title="Khoảng bao lâu" description="どのぐらい và くらい / ぐらい để ước lượng." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu quá khứ"
              hint="Dùng để nói trạng thái đã xảy ra trong quá khứ."
              points={LESSON_12_POINTS.slice(0, 1)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu phủ định quá khứ"
              hint="Dùng để nói điều gì đó đã không xảy ra."
              points={LESSON_12_POINTS.slice(1, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu ước lượng"
              hint="Dùng để hỏi và nói thời lượng hoặc mức độ xấp xỉ."
              points={LESSON_12_POINTS.slice(2, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber === 13) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài 13 tập trung vào nguyện vọng, mục đích di chuyển và cách đề nghị giúp đỡ hoặc rủ làm gì.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} 93-93
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Muốn có / muốn làm" description="N がほしいです và V たいです." />
            <StepPill no="2" title="Đi để làm gì" description="N1(địa điểm)へ Vますに 行きます / 来ます / 帰ります." />
            <StepPill no="3" title="Đề nghị giúp" description="V ましょうか để đề xuất hoặc hỗ trợ." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Mẫu nguyện vọng"
              hint="Dùng để nói muốn có gì hoặc muốn làm gì."
              points={LESSON_13_POINTS.slice(0, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Mẫu mục đích"
              hint="Dùng để nói nơi đến và mục đích của chuyến đi."
              points={LESSON_13_POINTS.slice(2, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Mẫu đề nghị"
              hint="Dùng để đề nghị giúp đỡ hoặc rủ làm gì."
              points={LESSON_13_POINTS.slice(3, 4)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (unitNumber >= 14 && unitNumber <= 22) {
    return (
      <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
        <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
                Bài {unitNumber} đang được chuẩn hóa theo cùng một bố cục. Nội dung chi tiết sẽ được bổ sung sau.
              </p>
            </div>
            <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
              {t.labels.page} {unitNumber}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <StepPill no="1" title="Mẫu trọng tâm" description="Khung nội dung chính của bài." />
            <StepPill no="2" title="Câu mẫu" description="Câu ngắn để vận dụng ngay." />
            <StepPill no="3" title="Ghi nhớ nhanh" description="Phần note tóm tắt để học lại sau." />
          </div>

          <div className="mt-6 space-y-4">
            <GrammarBand
              title="Khung bài"
              hint="Dùng để giữ bố cục thống nhất cho các bài 7-22."
              points={GENERIC_POINTS.slice(0, 1)}
              tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            />
            <GrammarBand
              title="Câu mẫu"
              hint="Chỗ dành cho câu mẫu và ví dụ ngắn."
              points={GENERIC_POINTS.slice(1, 2)}
              tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            />
            <GrammarBand
              title="Ghi nhớ"
              hint="Khung note ngắn để thay nội dung về sau."
              points={GENERIC_POINTS.slice(2, 3)}
              tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2.5rem] border border-amber-950/10 bg-white/90 p-6 shadow-card md:p-8">
      <div className="rounded-[2rem] border border-secondary/15 bg-[linear-gradient(180deg,rgba(255,247,238,0.96),rgba(247,252,247,0.92))] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-torii">Grammar spotlight</p>
            <h2 className="mt-2 font-serif text-3xl text-ink">Giải thích ngữ pháp</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/68">
              Bài 1 tập trung vào chỉ định vật, hỏi đáp cơ bản và nối danh từ.
            </p>
          </div>
          <div className="rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-sm">
            {t.labels.page} 14-15
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <GrammarBand
            title="Mẫu chỉ vật"
            hint="Nhóm mở đầu cho bài 1, dùng để chỉ sự vật và gọi tên đồ vật."
            tintClass="bg-[linear-gradient(90deg,rgba(255,247,238,0.95),rgba(247,252,247,0.92))]"
            points={GRAMMAR_POINTS.slice(0, 2)}
          />
          <GrammarBand
            title="Mẫu hỏi thông tin"
            hint="Dùng để hỏi loại vật, nội dung hoặc người."
            tintClass="bg-[linear-gradient(90deg,rgba(241,248,255,0.95),rgba(255,247,238,0.92))]"
            points={GRAMMAR_POINTS.slice(2, 5)}
          />
          <GrammarBand
            title="Mẫu nối danh từ"
            hint="Các mẫu nối quan hệ giữa danh từ và câu lựa chọn."
            tintClass="bg-[linear-gradient(90deg,rgba(247,252,247,0.95),rgba(241,248,255,0.92))]"
            points={GRAMMAR_POINTS.slice(5, 7)}
          />
        </div>
      </div>
    </section>
  );
}
