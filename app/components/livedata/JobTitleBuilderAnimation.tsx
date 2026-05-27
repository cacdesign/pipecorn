"use client";

/**
 * Step 2 — "Job title builder"
 *
 * Animation: a typed seed title ("Marketing Director") gets passed to
 * the AI which expands it into 100% of the persona's variations.
 */
const SEED = "Marketing Director";
const VARIATIONS: { label: string; kind: "ok" | "no" }[] = [
  { label: "CMO",                       kind: "ok" },
  { label: "Chief Marketing Officer",   kind: "ok" },
  { label: "VP Marketing",              kind: "ok" },
  { label: "Head of Marketing",         kind: "ok" },
  { label: "Director of Marketing",     kind: "ok" },
  { label: "Directeur Marketing",       kind: "ok" },
  { label: "Marketing Manager",         kind: "ok" },
  { label: "Responsable Marketing",     kind: "ok" },
  { label: "intern",                    kind: "no" },
  { label: "junior",                    kind: "no" },
  { label: "stagiaire",                 kind: "no" },
];

export default function JobTitleBuilderAnimation() {
  return (
    <div className="p-live__jt">
      <div className="p-live__jtInputBlock">
        <span className="p-live__jtInputLabel">Seed job title</span>
        <div className="p-live__jtInput">
          <span className="p-live__jtInputText">{SEED}</span>
          <span className="p-live__jtCaret" aria-hidden="true" />
          <button type="button" className="p-live__jtGo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            Generate
          </button>
        </div>
      </div>

      <div className="p-live__jtFlow" aria-hidden="true">
        <span className="p-live__jtFlowDot" />
        <span className="p-live__jtFlowDot" />
        <span className="p-live__jtFlowDot" />
      </div>

      <div className="p-live__jtAi">
        <span className="p-live__jtAiIcon" aria-hidden="true">✨</span>
        Pipecorn AI generates 100% of your persona
      </div>

      <ul className="p-live__jtOutputs">
        {VARIATIONS.map((v, i) => (
          <li
            key={v.label}
            className={"p-live__jtChip" + (v.kind === "ok" ? " is-ok" : " is-no")}
            style={{ animationDelay: `${1.0 + i * 0.10}s` }}
          >
            <span className="p-live__jtChipIcon" aria-hidden="true">
              {v.kind === "ok" ? "✓" : "✕"}
            </span>
            {v.label}
          </li>
        ))}
      </ul>

      <div className="p-live__jtFoot" style={{ animationDelay: "2.5s" }}>
        <span className="p-live__jtFootStat">100%</span>
        <span className="p-live__jtFootLabel">of your persona — 250,000 leads matched</span>
      </div>
    </div>
  );
}
