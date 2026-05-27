"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

/**
 * Step 4 — "Signal detection / Call before your competitors"
 *
 * A live phone discussion between a happy cold-caller and a freshly-hired lead.
 * The rep calls right when the signal fires: the lead just got promoted to VP
 * Sales, has budget, and was literally about to look for a tool like this.
 * Floating orange "signal" pills (hand-drawn marks, like the reference) pop in
 * as the conversation reveals each buying signal.
 */

type Who = "rep" | "lead";
type Bubble = { at: number; who: Who; text: string };
type Pill = { at: number; label: string; x: string; y: string; rot: number };

const BUBBLES: Bubble[] = [
  { at: 500, who: "rep", text: "Hi Colin, congrats on the new VP Sales role! 👋" },
  { at: 1900, who: "lead", text: "Oh thanks! Just started last week 😄" },
  { at: 3300, who: "rep", text: "We help new VPs build pipeline fast. Worth 15 min?" },
  { at: 5000, who: "lead", text: "Ha, perfect timing!" },
  { at: 6100, who: "lead", text: "I'm mapping out my 6-month plan to beat my targets as we speak 🎉" },
];

const PILLS: Pill[] = [
  { at: 1300, label: "New hire", x: "6%", y: "8%", rot: -4 },
  { at: 4100, label: "Has budget", x: "46%", y: "3%", rot: 5 },
  { at: 5600, label: "Perfect timing", x: "30%", y: "22%", rot: -3 },
];

const LOOP_MS = 11500;

export default function SignalCallFlow() {
  const [tick, setTick] = useState(0);
  const [shownBubbles, setShownBubbles] = useState(0);
  const [shownPills, setShownPills] = useState(0);
  const [typing, setTyping] = useState<Who | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShownBubbles(0);
      setShownPills(0);
      setTyping(null);
      setTick((t) => t + 1);
    }, LOOP_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    BUBBLES.forEach((b, i) => {
      // show a "typing…" indicator ~600ms before the bubble lands
      timers.push(
        window.setTimeout(() => setTyping(b.who), Math.max(0, b.at - 600))
      );
      timers.push(
        window.setTimeout(() => {
          setShownBubbles(i + 1);
          setTyping(null);
        }, b.at)
      );
    });
    PILLS.forEach((p, i) => {
      timers.push(window.setTimeout(() => setShownPills(i + 1), p.at));
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tick]);

  return (
    <div className="scf">
      <img className="scf__bg" src="/assets/coldcaller.jpg" alt="" />
      <div className="scf__overlay" />

      {/* Floating signal pills with a hand-drawn underline */}
      <div className="scf__pills" key={`p-${tick}`}>
        {PILLS.map((p, i) => (
          <span
            key={p.label}
            className={"scf__pill" + (i < shownPills ? " is-on" : "")}
            style={{ left: p.x, top: p.y, "--rot": `${p.rot}deg` } as React.CSSProperties}
          >
            {p.label}
            <svg className="scf__pillMark" viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 C 30 13, 80 3, 117 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        ))}
      </div>

      {/* Live-call chat card */}
      <div className="scf__card">
        <div className="scf__cardHead">
          <span className="scf__live" aria-hidden="true">
            <span className="scf__liveDot" />LIVE
          </span>
          <span className="scf__callee">Colin Paul · VP Sales</span>
        </div>

        <ul className="scf__thread" key={`t-${tick}`}>
          {BUBBLES.slice(0, shownBubbles).map((b, i) => (
            <li key={i} className={"scf__bubble is-" + b.who + " is-on"}>
              {b.text}
            </li>
          ))}
          {typing && (
            <li className={"scf__bubble is-" + typing + " is-on scf__typing"}>
              <span className="scf__dot" />
              <span className="scf__dot" />
              <span className="scf__dot" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
