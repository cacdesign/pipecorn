"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Tone = "ok" | "no" | "raw";
type Row = {
  avatar?: string; // pravatar url → round photo (persona)
  favicon?: string; // domain → favicon as the left icon (company)
  emoji?: string; // fallback glyph/letter
  primary: string;
  secondary: string; // plain leading text
  coDomain?: string; // optional company favicon shown inside the secondary line
  coName?: string;
  enrichDomain?: string; // company step: domain that fills in live
  enrichIndustry?: string; // company step: industry that fills in live
  tone: Tone;
  tag: string;
};
type Step = {
  key: string;
  label: string;
  title: string;
  sub: string;
  reveal?: boolean; // rows enter in a staggered cascade when the step opens
  loading?: boolean; // show a spinner left of the title
  rows: Row[]; // always exactly 4
};

const fav = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const MARK: Record<Tone, string> = { ok: "✓", no: "✕", raw: "•" };

const STEPS: Step[] = [
  {
    key: "company",
    label: "Company list",
    title: "Building your company list",
    sub: "SaaS B2B",
    reveal: true,
    loading: true,
    rows: [
      { favicon: "notion.so", primary: "Notion", secondary: "", enrichDomain: "notion.so", enrichIndustry: "Productivity", tone: "ok", tag: "Enriched" },
      { favicon: "linear.app", primary: "Linear", secondary: "", enrichDomain: "linear.app", enrichIndustry: "Project mgmt", tone: "ok", tag: "Enriched" },
      { favicon: "stripe.com", primary: "Stripe", secondary: "", enrichDomain: "stripe.com", enrichIndustry: "Fintech", tone: "ok", tag: "Enriched" },
      { favicon: "vercel.com", primary: "Vercel", secondary: "", enrichDomain: "vercel.com", enrichIndustry: "DevTools", tone: "ok", tag: "Enriched" },
    ],
  },
  {
    key: "persona",
    label: "100% persona",
    title: "100% of your persona",
    sub: "Marketing Director → CMO, VP Marketing, + ...",
    reveal: true,
    loading: true,
    rows: [
      { avatar: "https://i.pravatar.cc/64?img=47", primary: "léa bernard", secondary: "vp sales", coDomain: "notion.so", coName: "Notion", tone: "raw", tag: "In persona" },
      { avatar: "https://i.pravatar.cc/64?img=12", primary: "MARK OLSON", secondary: "mktg intern", coDomain: "linear.app", coName: "Linear", tone: "raw", tag: "In persona" },
      { avatar: "https://i.pravatar.cc/64?img=44", primary: "sarah CHEN", secondary: "head of mktg", coDomain: "stripe.com", coName: "Stripe", tone: "raw", tag: "In persona" },
      { avatar: "https://i.pravatar.cc/64?img=33", primary: "marcus patel", secondary: "c.m.o.", coDomain: "vercel.com", coName: "Vercel", tone: "raw", tag: "In persona" },
    ],
  },
  {
    key: "filterclean",
    label: "AI cleaning",
    title: "Filtering & cleaning your leads",
    sub: "Matches kept, records cleaned",
    rows: [
      { avatar: "https://i.pravatar.cc/64?img=47", primary: "Léa Bernard", secondary: "VP Sales", coDomain: "notion.so", coName: "Notion", tone: "ok", tag: "Kept" },
      { avatar: "https://i.pravatar.cc/64?img=12", primary: "Mark Olson", secondary: "Marketing Intern", coDomain: "linear.app", coName: "Linear", tone: "no", tag: "Dropped" },
      { avatar: "https://i.pravatar.cc/64?img=44", primary: "Sarah Chen", secondary: "Head of Marketing", coDomain: "stripe.com", coName: "Stripe", tone: "ok", tag: "Kept" },
      { avatar: "https://i.pravatar.cc/64?img=33", primary: "Marcus Patel", secondary: "CMO", coDomain: "vercel.com", coName: "Vercel", tone: "ok", tag: "Kept" },
    ],
  },
];

const PHASE_MS = 3600;
const FADE_MS = 240;
const FLIP_MS = 560;

export default function LiveDataFlow() {
  const [phase, setPhase] = useState(0); // target step (drives the stepper)
  const [shown, setShown] = useState(0); // step whose content is rendered
  const [swapping, setSwapping] = useState(false);
  const [cleaning, setCleaning] = useState(false); // persona → AI cleaning
  const [rowsKey, setRowsKey] = useState(0); // bumped only when entering a reveal step

  const rootRef = useRef<HTMLDivElement>(null);
  const flipFirst = useRef<Map<string, DOMRect> | null>(null);
  const firstRun = useRef(true);

  // Remount the rows (replaying the cascade) ONLY when we enter a reveal step.
  // Non-reveal steps (AI cleaning) keep the existing rows mounted, so the
  // people don't disappear — only their badges animate.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (STEPS[shown].reveal) setRowsKey((k) => k + 1);
  }, [shown]);

  // Auto-advance the target step.
  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % STEPS.length);
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, []);

  // When the target changes: between Company (0) and Persona (1) we FLIP the
  // shared company favicon + name from their old spot to the new one (they
  // translate & shrink into the persona rows). Any other change is a plain
  // text crossfade.
  useEffect(() => {
    if (phase === shown) return;
    const isFlip =
      (shown === 0 && phase === 1) || (shown === 1 && phase === 0);

    if (isFlip && rootRef.current) {
      const map = new Map<string, DOMRect>();
      rootRef.current.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
        map.set(el.dataset.flip as string, el.getBoundingClientRect());
      });
      flipFirst.current = map;
    }

    // Persona (1) → AI cleaning (2): keep the people in place. Only the header
    // crossfades; the rows stay mounted and their badges pop in to "clean".
    const isClean = shown === 1 && phase === 2;
    if (isClean) {
      setCleaning(true);
      const id = window.setTimeout(() => {
        setShown(phase);
        setCleaning(false);
      }, FADE_MS);
      return () => window.clearTimeout(id);
    }

    setSwapping(true);
    const id = window.setTimeout(() => {
      setShown(phase);
      setSwapping(false);
    }, FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase, shown]);

  // After the content swapped, play the FLIP for any element whose key existed
  // before the swap (Notion / Linear / Stripe / Vercel favicon + name).
  useLayoutEffect(() => {
    const first = flipFirst.current;
    flipFirst.current = null;
    if (!first || first.size === 0 || !rootRef.current) return;

    rootRef.current.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const key = el.dataset.flip as string;
      const from = first.get(key);
      if (!from) return;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      const sx = to.width ? from.width / to.width : 1;
      const sy = to.height ? from.height / to.height : 1;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.02) return;

      el.style.transformOrigin = "top left";
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      el.style.zIndex = "2";

      requestAnimationFrame(() => {
        el.style.transition = `transform ${FLIP_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = "";
      });
      window.setTimeout(() => {
        el.style.transition = "";
        el.style.transformOrigin = "";
        el.style.zIndex = "";
      }, FLIP_MS + 60);
    });
  }, [shown]);

  const step = STEPS[shown];
  const cleanStep = step.key === "filterclean";

  return (
    <div
      className={
        "ldf" +
        (swapping ? " is-swapping" : "") +
        (cleaning ? " is-cleaning" : "") +
        (step.reveal ? " is-reveal" : "")
      }
      ref={rootRef}
    >
      <div className="ldf__steps">
        {STEPS.map((s, idx) => (
          <button
            type="button"
            key={s.key}
            className={"ldf__step" + (idx === phase ? " is-active" : "")}
            onClick={() => setPhase(idx)}
            aria-pressed={idx === phase}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="ldf__stage">
        {/* Yellow header box stays put — only its text swaps */}
        <div className="ldf__head">
          <span className="ldf__headSpark" aria-hidden="true">
            {step.loading ? <span className="ldf__spinner" /> : "✨"}
          </span>
          <span className="ldf__headText ldf__swap">
            <strong>{step.title}</strong>
            <span>{step.sub}</span>
          </span>
        </div>

        {/* Four persistent row boxes — only their contents fade in/out */}
        <ul className="ldf__rows" key={rowsKey}>
          {step.rows.map((r, ri) => (
            <li
              className={
                "ldf__row" +
                (cleanStep && r.tone === "no" ? " is-dropped" : "")
              }
              key={ri}
              style={step.reveal ? { animationDelay: `${ri * 0.32}s` } : undefined}
            >
              <span className="ldf__rowLeft ldf__swap" aria-hidden="true">
                {r.avatar ? (
                  <img className="ldf__rowAvatar" src={r.avatar} alt="" />
                ) : (
                  <span className="ldf__rowIcon">
                    {r.favicon ? (
                      <img
                        className="ldf__rowFav"
                        src={fav(r.favicon)}
                        alt=""
                        data-flip={`fav-${r.favicon}`}
                      />
                    ) : (
                      r.emoji
                    )}
                  </span>
                )}
              </span>

              <span className="ldf__rowMain ldf__swap">
                <span
                  className="ldf__rowPrimary"
                  {...(r.favicon ? { "data-flip": `name-${r.favicon}` } : {})}
                >
                  {r.primary}
                </span>
                <span className="ldf__rowSecondary">
                  {r.enrichDomain ? (
                    <>
                      <span
                        className="ldf__enrich"
                        style={{ animationDelay: `${0.25 + ri * 0.32}s` }}
                      >
                        <span className="ldf__enrichValue">{r.enrichDomain}</span>
                      </span>
                      <span className="ldf__rowSep" aria-hidden="true">·</span>
                      <span
                        className="ldf__enrich"
                        style={{ animationDelay: `${0.55 + ri * 0.32}s` }}
                      >
                        <span className="ldf__enrichValue">{r.enrichIndustry}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="ldf__rowSecText">{r.secondary}</span>
                      {r.coDomain && (
                        <>
                          <span className="ldf__rowSep" aria-hidden="true">·</span>
                          <img
                            className="ldf__rowSecFav"
                            src={fav(r.coDomain)}
                            alt=""
                            data-flip={`fav-${r.coDomain}`}
                          />
                          <span className="ldf__rowSecCo" data-flip={`name-${r.coDomain}`}>
                            {r.coName}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </span>

              <span
                key={cleanStep ? `b-${rowsKey}-${shown}-${ri}` : undefined}
                className={
                  "ldf__badge is-" +
                  r.tone +
                  (r.enrichDomain || cleanStep ? " ldf__badgePop" : " ldf__swap")
                }
                style={
                  r.enrichDomain
                    ? { animationDelay: `${0.95 + ri * 0.32}s` }
                    : cleanStep
                    ? { animationDelay: `${0.2 + ri * 0.22}s` }
                    : undefined
                }
              >
                <span className="ldf__badgeMark" aria-hidden="true">{MARK[r.tone]}</span>
                {r.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
