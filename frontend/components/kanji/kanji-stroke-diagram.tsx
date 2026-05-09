"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getKanjiStrokeDiagram } from "@/lib/kanji-strokes";

type KanjiStrokeDiagramProps = {
  character: string;
  meaningVi?: string;
  strokes?: number;
};

export function KanjiStrokeDiagram({ character, meaningVi, strokes }: KanjiStrokeDiagramProps) {
  const diagram = getKanjiStrokeDiagram(character);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((current) => current + 1);
  }, [character]);

  if (!character) {
    return (
      <div className="rounded-[2rem] border border-dashed border-amber-950/15 bg-[#fcfaf5] p-5 text-sm text-ink/55">
        Chon mot kanji de xem thu tu net.
      </div>
    );
  }

  if (!diagram) {
    return (
      <div className="rounded-[2rem] border border-dashed border-amber-950/15 bg-[#fcfaf5] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-torii">Stroke Order</div>
            <div className="mt-3 font-serif text-5xl text-ink">{character}</div>
            {meaningVi ? <div className="mt-2 text-sm text-ink/60">{meaningVi}</div> : null}
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-ink/55">
            {strokes ?? "?"} strokes
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-ink/60">
          Chua co du lieu SVG cho kanji nay. Co the van hoc radical, onyomi, kunyomi va so net o the ben duoi.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-amber-950/10 bg-[#fcfaf5] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-torii">Stroke Order</div>
          <div className="mt-3 flex items-end gap-3">
            <div className="font-serif text-5xl text-ink">{character}</div>
            {meaningVi ? <div className="pb-1 text-sm text-ink/60">{meaningVi}</div> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAnimationKey((current) => current + 1)}
          className="rounded-full border border-amber-950/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink/70"
        >
          Replay
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-amber-950/10 bg-white p-4">
        <svg viewBox={diagram.viewBox} className="aspect-square w-full">
          <defs>
            <pattern id={`grid-${character}`} width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#eadfcd" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#grid-${character})`} />
          <path d="M50 0 L50 100" stroke="#efe4d0" strokeWidth="0.8" />
          <path d="M0 50 L100 50" stroke="#efe4d0" strokeWidth="0.8" />

          {diagram.strokes.map((stroke, index) => (
            <g key={`${character}-${index}-${animationKey}`}>
              <motion.path
                d={stroke}
                fill="none"
                stroke="#7e2f22"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: index * 0.45, ease: "easeInOut" }}
              />
              <motion.circle
                cx="0"
                cy="0"
                r="0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-ink/55">
        <span>{diagram.strokes.length} animated strokes</span>
        <span>{strokes ?? diagram.strokes.length} total strokes</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink/60">{diagram.note}</p>
    </div>
  );
}
