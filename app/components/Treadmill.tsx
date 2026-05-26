"use client";

import { useEffect, useRef, useCallback } from "react";

export default function Treadmill() {
  const treadmillRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const startAnimation = useCallback(() => {
    const runner = runnerRef.current;
    const section = sectionRef.current;
    const tread = treadmillRef.current;
    if (!runner || !section) return;

    // Scroll treadmill into view so the user can watch
    tread?.scrollIntoView({ behavior: "smooth", block: "center" });

    // Clear any pending timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Strip classes and force reflow so CSS animations restart
    runner.classList.remove("go");
    section.classList.remove("bucket-arrived");
    void runner.offsetWidth; // reflow

    runner.classList.add("go");
    timerRef.current = setTimeout(() => section.classList.add("bucket-arrived"), 6200);
  }, []);

  // Attach button listener imperatively — more reliable than JSX onClick in Next.js
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.addEventListener("click", startAnimation);
    return () => btn.removeEventListener("click", startAnimation);
  }, [startAnimation]);

  useEffect(() => {
    const tread = treadmillRef.current;
    if (!tread) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            startAnimation();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(tread);
    return () => {
      io.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startAnimation]);

  return (
    <>
      {/* POPCORN CLOUD TRANSITION */}
      <div className="popcorn-cloud-transition">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 L0,55 Q35,12 75,48 Q110,8 155,52 Q185,18 230,46 Q272,2 320,50 Q355,15 395,44 Q438,5 485,52 Q518,20 555,46 Q595,6 640,50 Q672,18 710,44 Q755,2 800,52 Q835,14 875,48 Q915,4 960,50 Q998,16 1035,44 Q1075,6 1120,52 Q1155,12 1195,46 Q1235,2 1280,50 Q1318,18 1355,48 Q1395,8 1440,52 L1440,80 Z"
            fill="#251E00"
          />
        </svg>
      </div>

      <section className="anywhere" ref={sectionRef}>
        <div className="anywhere-pills">
          <span className="pill">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6 2 11c0 4 3 7 7 8l1 3 1-3c5-.5 9-3.5 9-8 0-5-4.5-9-8-9z" />
            </svg>
            Salesforce
          </span>
          <span className="pill">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3.5" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="4" cy="12" r="2" />
            </svg>
            HubSpot
          </span>
          <span className="pill">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="6" height="16" rx="1" />
              <rect x="14" y="4" width="6" height="10" rx="1" />
            </svg>
            Pipedrive
          </span>
          <span className="pill">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 7l9 6 9-6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
              <path d="M3 7l9 6 9-6V6a2 2 0 00-2-2H5a2 2 0 00-2 2v1z" />
            </svg>
            Outreach
          </span>
          <span className="pill">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1A1500" fontFamily="sans-serif">
                in
              </text>
            </svg>
            LinkedIn
          </span>
        </div>

        <div
          className="anywhere-copy"
          style={{ maxWidth: 1280, margin: "0 auto", textAlign: "left" }}
        >
          <h2>
            You&apos;re missing out
            <br />
            50% of your pipeline.
          </h2>
          <p>
            Push verified emails, phones and qualified contacts straight into
            your CRM, sales engagement and outreach stack. One click, every
            platform.
          </p>
          <button ref={btnRef} className="btn-pill btn-watch">
            Enrich my bucket
          </button>
        </div>

        <div className="treadmill" id="treadmill" ref={treadmillRef}>
          <div className="treadmill-bracket left"></div>
          <div className="treadmill-bracket right"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="treadmill-belt" src="/assets/treadmill.png" alt="" />

          <div className="bucket-runner" id="bucketRunner" ref={runnerRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bucket-img empty" src="/assets/bucket-empty.png" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bucket-img full" src="/assets/bucket-full.png" alt="" />

            <div className="bucket-tags" aria-hidden="true">
              <div className="bucket-tag"><span className="check">✓</span> 25% more leads.</div>
              <div className="bucket-tag"><span className="check">✓</span> 25% more phones.</div>
              <div className="bucket-tag"><span className="check">✓</span> Perfect timing.</div>
            </div>

            <div className="bucket-orbit" aria-hidden="true">
              <div className="orbit-icon" style={{ "--phase": 0, background: "#611F69" } as React.CSSProperties}>S</div>
              <div className="orbit-icon" style={{ "--phase": 0.125, background: "#0061FE" } as React.CSSProperties}>D</div>
              <div className="orbit-icon" style={{ "--phase": 0.25, background: "#FF7A59" } as React.CSSProperties}>H</div>
              <div className="orbit-icon" style={{ "--phase": 0.375, background: "#0A66C2" } as React.CSSProperties}>in</div>
              <div className="orbit-icon" style={{ "--phase": 0.5, background: "#000" } as React.CSSProperties}>N</div>
              <div className="orbit-icon" style={{ "--phase": 0.625, background: "#EA4335" } as React.CSSProperties}>M</div>
              <div className="orbit-icon" style={{ "--phase": 0.75, background: "#2D8CFF" } as React.CSSProperties}>Z</div>
              <div className="orbit-icon" style={{ "--phase": 0.875, background: "#7B68EE" } as React.CSSProperties}>A</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
