"use client";
/* eslint-disable @next/next/no-img-element */

import { Fragment, useEffect, useState } from "react";

/**
 * Step 2 — "Waterfall enrichment"
 *
 * A contact is checked across providers, each tag walking through live states:
 * Searching → (Found) → Verifying → final verdict. Some providers surface a
 * value that then fails verification (Invalid email / Invalid phone), until
 * providers return a verified email and a verified phone. The contact card's
 * email / phone stay hidden (spinner) until their provider confirms them.
 */
const fav = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

type Tone = "raw" | "no" | "ok";
type Chip =
  | { kind: "searching"; label: string }
  | { kind: "badge"; tone: Tone; mark: string; label: string };
type Provider = {
  name: string;
  domain: string;
  glow: string;
  dim?: boolean;
  // Each stage is the FULL set of chips shown at that moment, so a "found"
  // badge can stay on screen while "Verifying" appears next to it.
  stages: { at: number; chips: Chip[] }[];
};

const SEARCH = (label = "Searching"): Chip => ({ kind: "searching", label });
const FOUND = (label: string): Chip => ({ kind: "badge", tone: "ok", mark: "✓", label });
const VERIFIED = (label: string): Chip => ({ kind: "badge", tone: "ok", mark: "✓", label });

// Stage timings below are RELATIVE to each provider's own start (first stage
// at 0). The providers are then chained sequentially by buildSequential():
// a provider only starts searching once the previous one has fully resolved.
const PROVIDERS_REL: Provider[] = [
  {
    name: "Wiza",
    domain: "wiza.co",
    glow: "#8B5CF6",
    dim: true,
    stages: [
      { at: 0, chips: [SEARCH()] },
      { at: 700, chips: [{ kind: "badge", tone: "raw", mark: "✕", label: "Not found" }] },
    ],
  },
  {
    name: "Datagma",
    domain: "datagma.com",
    glow: "#3B82F6",
    stages: [
      { at: 0, chips: [SEARCH()] },
      { at: 700, chips: [FOUND("Email found")] },
      { at: 1300, chips: [FOUND("Email found"), SEARCH("Bounce Verifying")] },
      { at: 2050, chips: [{ kind: "badge", tone: "no", mark: "✕", label: "Invalid email" }] },
    ],
  },
  {
    name: "Hunter",
    domain: "hunter.io",
    glow: "#F97316",
    stages: [
      { at: 0, chips: [SEARCH()] },
      { at: 700, chips: [{ kind: "badge", tone: "raw", mark: "✕", label: "Not found" }] },
    ],
  },
  {
    name: "Clearbit",
    domain: "clearbit.com",
    glow: "#4C6FFF",
    stages: [
      { at: 0, chips: [SEARCH()] },
      { at: 700, chips: [FOUND("Email found")] },
      { at: 1300, chips: [FOUND("Email found"), SEARCH("Bounce Verifying")] },
      { at: 2050, chips: [VERIFIED("Verified email found")] },
    ],
  },
  {
    name: "ContactOut",
    domain: "contactout.com",
    glow: "#FFD600",
    stages: [
      { at: 0, chips: [SEARCH()] },
      { at: 700, chips: [FOUND("Phone found")] },
      { at: 1300, chips: [FOUND("Phone found"), SEARCH("Community Verifying")] },
      { at: 2050, chips: [VERIFIED("Verified phone found")] },
    ],
  },
];

const GAP = 300; // pause between one provider finishing and the next starting

function buildSequential(list: Provider[]): Provider[] {
  let start = 0;
  return list.map((p) => {
    const stages = p.stages.map((s) => ({ ...s, at: start + s.at }));
    const last = p.stages[p.stages.length - 1].at;
    start = start + last + GAP;
    return { ...p, stages };
  });
}

const PROVIDERS = buildSequential(PROVIDERS_REL);
const lastAt = (p: Provider) => p.stages[p.stages.length - 1].at;

const SEP_AFTER = 3; // separator shown before this provider index (Clearbit)
const EMAIL_AT = lastAt(PROVIDERS[3]); // Clearbit confirms the email
const PHONE_AT = lastAt(PROVIDERS[4]); // ContactOut confirms the phone
const LOOP_MS = PHONE_AT + 1600;

export default function WaterfallFlow() {
  const [tick, setTick] = useState(0);
  const [stageIdx, setStageIdx] = useState<number[]>(() => PROVIDERS.map(() => 0));
  const [emailFound, setEmailFound] = useState(false);
  const [phoneFound, setPhoneFound] = useState(false);

  // Loop: reset every tag to "Searching", hide the values, then replay.
  useEffect(() => {
    const id = window.setInterval(() => {
      setStageIdx(PROVIDERS.map(() => 0));
      setEmailFound(false);
      setPhoneFound(false);
      setTick((t) => t + 1);
    }, LOOP_MS);
    return () => window.clearInterval(id);
  }, []);

  // Advance each tag through its stages, and reveal the values on confirmation.
  useEffect(() => {
    const timers: number[] = [];
    PROVIDERS.forEach((p, pi) => {
      p.stages.forEach((s, si) => {
        if (si === 0) return;
        timers.push(
          window.setTimeout(() => {
            setStageIdx((prev) => {
              const n = [...prev];
              n[pi] = si;
              return n;
            });
          }, s.at)
        );
      });
    });
    timers.push(window.setTimeout(() => setEmailFound(true), EMAIL_AT));
    timers.push(window.setTimeout(() => setPhoneFound(true), PHONE_AT));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tick]);

  const renderChip = (chip: Chip, key: string) => {
    if (chip.kind === "searching") {
      return (
        <span key={key} className="ldf__badge ldf__badgePop is-searching">
          <span className="ldf__spinner is-light is-sm" aria-hidden="true" />
          {chip.label}
        </span>
      );
    }
    return (
      <span key={key} className={"ldf__badge ldf__badgePop is-" + chip.tone}>
        <span className="ldf__badgeMark" aria-hidden="true">{chip.mark}</span>
        {chip.label}
      </span>
    );
  };

  return (
    <div className="wf">
      <div className="wf__inner" key={tick}>
        <div className="wf__contact">
          <div className="wf__contactRow">
            <img
              className="wf__contactAvatar"
              src="https://i.pravatar.cc/96?img=68"
              alt=""
            />
            <div className="wf__contactInfo">
              <div className="wf__contactName">Colin Paul</div>
              <div className="wf__contactMeta">
                <span className="wf__field">
                  <span className="wf__metaIcon" aria-hidden="true">✉</span>
                  {emailFound ? (
                    <span className="wf__fieldVal">colin@reforge.com</span>
                  ) : (
                    <span className="wf__searching">
                      searching…
                      <span className="ldf__spinner" aria-hidden="true" />
                    </span>
                  )}
                </span>
                <span className="wf__field">
                  <span className="wf__metaIcon" aria-hidden="true">📞</span>
                  {phoneFound ? (
                    <span className="wf__fieldVal">+1 (555) 123-4567</span>
                  ) : (
                    <span className="wf__searching">
                      searching…
                      <span className="ldf__spinner" aria-hidden="true" />
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ul className="wf__list">
          {PROVIDERS.map((p, pi) => {
            const chips = p.stages[stageIdx[pi]].chips;
            return (
              <Fragment key={pi}>
                {pi === SEP_AFTER && (
                  <li
                    className="wf__more"
                    style={{ animationDelay: `${lastAt(PROVIDERS[SEP_AFTER - 1]) / 1000}s` }}
                  >
                    15 more data providers
                  </li>
                )}
                <li
                  className={"wf__row" + (p.dim ? " is-dim" : "")}
                  style={{ animationDelay: `${p.stages[0].at / 1000}s` }}
                >
                  <span className="wf__icon">
                    <img src={fav(p.domain)} alt="" />
                  </span>
                  <span className="wf__name">{p.name}</span>
                  <span className="wf__chips">
                    {chips.map((chip) =>
                      renderChip(chip, `${chip.kind}-${chip.label}`)
                    )}
                  </span>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
