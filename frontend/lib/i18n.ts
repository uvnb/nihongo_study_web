export const locales = ["vi", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

type Dictionary = {
  nav: {
    home: string;
    lessons: string;
    vocabulary: string;
    kanji: string;
    flashcards: string;
    auth: string;
    quiz: string;
    dashboard: string;
  };
  home: {
    catalog: string;
    catalogLabels: {
      lessons: string;
      vocabulary: string;
      kanji: string;
    };
    today: string;
    todayLabels: {
      lessonsCompleted: string;
      streak: string;
    };
    quizBlurb: string;
    dashboardBlurb: string;
    accent: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    lessons: string;
    vocabulary: string;
    kanji: string;
      flashcards: string;
      auth: string;
      quiz: string;
      dashboard: string;
    };
  labels: {
    unit: string;
    level: string;
    page: string;
    textbook: string;
    search: string;
    topic: string;
    strokes: string;
    radical: string;
    examples: string;
    noData: string;
    openPdf: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    nav: {
      home: "Trang chủ",
      lessons: "Ngữ pháp",
      vocabulary: "Từ vựng",
      kanji: "Kanji",
      flashcards: "Flashcard",
      auth: "Tài khoản",
      quiz: "Quiz",
      dashboard: "Dashboard"
    },
    home: {
      catalog: "Mục lục học tập",
      catalogLabels: {
        lessons: "Bài học đã có",
        vocabulary: "Thẻ từ vựng",
        kanji: "Mục Kanji"
      },
      today: "Nhịp học hôm nay",
      todayLabels: {
        lessonsCompleted: "Bài đã hoàn thành",
        streak: "Chuỗi ngày học"
      },
      quizBlurb: "Làm quiz tổng hợp từ từ vựng và Kanji, lưu lại kết quả khi đã đăng nhập.",
      dashboardBlurb: "Xem lịch sử bài làm, tổng câu đã trả lời và tỷ lệ đúng trung bình.",
      accent: "Lộ trình học tập tinh gọn, có nhịp điệu và đậm chất Nhật Bản."
    },
    hero: {
      eyebrow: "N5 MVP",
      title: "Học tiếng Nhật có lộ trình, rõ nghĩa và dễ ôn lại mỗi ngày.",
      subtitle:
        "Nền tảng đầu tiên cho bài học, từ vựng, Kanji và flashcard với giao diện lấy cảm hứng từ nhịp sống Nhật Bản.",
      primaryCta: "Bắt đầu học",
      secondaryCta: "Xem Kanji"
    },
    sections: {
      lessons: "Ngữ pháp nổi bật",
      vocabulary: "Cụm từ đang học",
      kanji: "Kanji cơ bản",
      flashcards: "Ôn tập bằng thẻ",
      auth: "Đăng nhập và quản lý",
      quiz: "Kiểm tra tổng hợp",
      dashboard: "Tiến độ học tập"
    },
    labels: {
      unit: "Bài",
      level: "Cấp độ",
      page: "Trang",
      textbook: "Giáo trình",
      search: "Tìm kiếm",
      topic: "Chủ đề",
      strokes: "Số nét",
      radical: "Bộ thủ",
      examples: "Ví dụ",
      noData: "Chưa có dữ liệu",
      openPdf: "Mở PDF"
    }
  },
  en: {
    nav: {
      home: "Home",
      lessons: "Lessons",
      vocabulary: "Vocabulary",
      kanji: "Kanji",
      flashcards: "Flashcards",
      auth: "Account",
      quiz: "Quiz",
      dashboard: "Dashboard"
    },
    home: {
      catalog: "Study catalog",
      catalogLabels: {
        lessons: "Lessons seeded",
        vocabulary: "Vocabulary cards",
        kanji: "Kanji entries"
      },
      today: "Today's rhythm",
      todayLabels: {
        lessonsCompleted: "Lessons completed",
        streak: "Study streak"
      },
      quizBlurb: "Take a mixed quiz from vocabulary and kanji, and save results once signed in.",
      dashboardBlurb: "Review session history, answered questions, and your running accuracy.",
      accent: "A focused learning path with a stronger Japanese visual voice."
    },
    hero: {
      eyebrow: "N5 MVP",
      title: "Study Japanese with a clear path and review rhythm.",
      subtitle:
        "An initial learning hub for lessons, vocabulary, Kanji, and flashcards in a Japanese-inspired interface.",
      primaryCta: "Start learning",
      secondaryCta: "Browse Kanji"
    },
    sections: {
      lessons: "Featured lessons",
      vocabulary: "Current vocabulary",
      kanji: "Core Kanji",
      flashcards: "Card review",
      auth: "Sign in and manage",
      quiz: "Mixed quiz",
      dashboard: "Study progress"
    },
    labels: {
      unit: "Unit",
      level: "Level",
      page: "Pages",
      textbook: "Textbook",
      search: "Search",
      topic: "Topic",
      strokes: "Strokes",
      radical: "Radical",
      examples: "Examples",
      noData: "No data yet",
      openPdf: "Open PDF"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      lessons: "文法",
      vocabulary: "語彙",
      kanji: "漢字",
      flashcards: "カード",
      auth: "アカウント",
      quiz: "クイズ",
      dashboard: "ダッシュボード"
    },
    home: {
      catalog: "学習カタログ",
      catalogLabels: {
        lessons: "登録済みレッスン",
        vocabulary: "語彙カード",
        kanji: "漢字エントリー"
      },
      today: "今日の学習リズム",
      todayLabels: {
        lessonsCompleted: "完了したレッスン",
        streak: "連続学習日数"
      },
      quizBlurb: "語彙と漢字の総合クイズに挑戦し、ログイン済みなら結果を保存できます。",
      dashboardBlurb: "解答履歴、回答数、正答率の推移をまとめて確認できます。",
      accent: "日本らしい空気感を持った、集中しやすい学習導線です。"
    },
    hero: {
      eyebrow: "N5 MVP",
      title: "毎日復習しやすい日本語学習サイト。",
      subtitle:
        "レッスン、語彙、漢字、フラッシュカードを一つにまとめた最初の学習基盤です。",
      primaryCta: "学習を始める",
      secondaryCta: "漢字を見る"
    },
    sections: {
      lessons: "おすすめレッスン",
      vocabulary: "学習中の語彙",
      kanji: "基本漢字",
      flashcards: "カード復習",
      auth: "ログインと管理",
      quiz: "総合クイズ",
      dashboard: "学習進捗"
    },
    labels: {
      unit: "課",
      level: "レベル",
      page: "ページ",
      textbook: "教科書",
      search: "検索",
      topic: "テーマ",
      strokes: "画数",
      radical: "部首",
      examples: "例",
      noData: "データがありません",
      openPdf: "PDFを開く"
    }
  }
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
