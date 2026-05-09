export type KanjiStrokeDiagram = {
  character: string;
  viewBox: string;
  strokes: string[];
  note: string;
};

export const kanjiStrokeLibrary: Record<string, KanjiStrokeDiagram> = {
  "\u65e5": {
    character: "\u65e5",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u65e5: top, left side, inner line, close bottom.",
    strokes: [
      "M22 18 L78 18",
      "M24 18 L24 82",
      "M24 48 L76 48",
      "M24 82 L78 82 L78 18"
    ]
  },
  "\u4eba": {
    character: "\u4eba",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u4eba: left-falling stroke, then right-falling stroke.",
    strokes: [
      "M48 18 L28 58",
      "M50 18 L76 82"
    ]
  },
  "\u672c": {
    character: "\u672c",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u672c: horizontal, vertical, left branch, right branch, base mark.",
    strokes: [
      "M24 30 L76 30",
      "M50 14 L50 84",
      "M50 44 L28 64",
      "M50 44 L74 62",
      "M34 72 L66 72"
    ]
  },
  "\u5b66": {
    character: "\u5b66",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u5b66: top accents, cover, then child component below.",
    strokes: [
      "M30 18 L40 28",
      "M70 18 L60 28",
      "M22 34 L78 34",
      "M28 34 L50 52 L72 34",
      "M36 56 L64 56",
      "M50 56 L50 82",
      "M38 70 L50 82",
      "M62 70 L50 82"
    ]
  },
  "\u751f": {
    character: "\u751f",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u751f: short top, vertical through, middle bar, left rise, long base.",
    strokes: [
      "M40 18 L60 18",
      "M50 14 L50 84",
      "M30 42 L68 42",
      "M36 42 L24 62",
      "M22 76 L78 76"
    ]
  },
  "\u5148": {
    character: "\u5148",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u5148: top mark, middle frame, then lower legs.",
    strokes: [
      "M36 18 L64 18",
      "M50 18 L50 38",
      "M28 38 L72 38",
      "M36 52 L64 52",
      "M44 52 L34 80",
      "M56 52 L72 80"
    ]
  },
  "\u6708": {
    character: "\u6708",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u6708: outer left, top-right, inner lines, then close lower right.",
    strokes: [
      "M28 16 L28 84",
      "M28 18 L72 18",
      "M44 38 L68 38",
      "M44 58 L68 58",
      "M72 18 L72 84",
      "M28 84 L68 84"
    ]
  },
  "\u706b": {
    character: "\u706b",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u706b: left dot, right dot, left-falling center, right-falling center.",
    strokes: [
      "M38 24 L30 40",
      "M62 24 L70 40",
      "M50 24 L36 72",
      "M50 32 L74 82"
    ]
  },
  "\u6c34": {
    character: "\u6c34",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u6c34: center vertical, left sweep, right short stroke, right long stroke.",
    strokes: [
      "M50 14 L48 82",
      "M48 40 L28 60",
      "M52 38 L64 50",
      "M52 46 L74 82"
    ]
  },
  "\u6728": {
    character: "\u6728",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u6728: horizontal, vertical, left-falling, right-falling.",
    strokes: [
      "M26 28 L74 28",
      "M50 14 L50 84",
      "M50 44 L30 66",
      "M50 44 L74 72"
    ]
  },
  "\u91d1": {
    character: "\u91d1",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u91d1: top dot, top slash, cover, center, then lower side strokes.",
    strokes: [
      "M50 12 L50 18",
      "M38 22 L28 34",
      "M50 18 L72 34",
      "M24 38 L76 38",
      "M50 38 L50 82",
      "M34 54 L22 74",
      "M66 54 L78 74",
      "M30 82 L70 82"
    ]
  },
  "\u571f": {
    character: "\u571f",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u571f: top horizontal, vertical, long base.",
    strokes: [
      "M34 26 L66 26",
      "M50 14 L50 84",
      "M24 72 L76 72"
    ]
  },
  "\u5c71": {
    character: "\u5c71",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u5c71: center vertical, left side, right side.",
    strokes: [
      "M50 14 L50 82",
      "M28 30 L28 82 L50 82",
      "M72 24 L72 82"
    ]
  },
  "\u5ddd": {
    character: "\u5ddd",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u5ddd: left line, center line, right line.",
    strokes: [
      "M28 18 L28 82",
      "M50 14 L50 86",
      "M72 18 L72 82"
    ]
  },
  "\u53e3": {
    character: "\u53e3",
    viewBox: "0 0 100 100",
    note: "Stroke order for \u53e3: left side, top and right, then close bottom.",
    strokes: [
      "M28 22 L28 78",
      "M28 22 L72 22 L72 78",
      "M28 78 L72 78"
    ]
  }
};

export function getKanjiStrokeDiagram(character: string) {
  return kanjiStrokeLibrary[character];
}
