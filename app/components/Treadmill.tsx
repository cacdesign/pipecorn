"use client";

import { useEffect, useRef, useState } from "react";

export default function Treadmill() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll progress through the pin track (0 → 1 while the section is pinned).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Distance we can scroll while the sticky child stays pinned.
      const total = el.offsetHeight - vh;
      // How far the track top has moved above the viewport top.
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? scrolled / total : 0);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
  // Title crossfade window: old title fades out, new one fades in between 30%–70%.
  const t = clamp((progress - 0.3) / 0.4);
  // Belt reveals left → right over the first part of the scroll.
  const beltP = clamp(progress / 0.5);
  // Bucket reveals bottom → top once the belt is (almost) done.
  const bucketP = clamp((progress - 0.5) / 0.4);

  return (
    <div className="treadmill-pin-track" ref={trackRef}>
      <div className="treadmill-sticky">
        {/* POPCORN CLOUD TRANSITION */}
        <div className="popcorn-cloud-transition">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,80 L0,55 Q35,12 75,48 Q110,8 155,52 Q185,18 230,46 Q272,2 320,50 Q355,15 395,44 Q438,5 485,52 Q518,20 555,46 Q595,6 640,50 Q672,18 710,44 Q755,2 800,52 Q835,14 875,48 Q915,4 960,50 Q998,16 1035,44 Q1075,6 1120,52 Q1155,12 1195,46 Q1235,2 1280,50 Q1318,18 1355,48 Q1395,8 1440,52 L1440,80 Z"
              fill="#251E00"
            />
          </svg>
        </div>

        <section className="anywhere">
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
            style={{ maxWidth: 1280, marginRight: "auto", textAlign: "left" }}
          >
            <div className="anywhere-title">
              <h2
                className="title-swap"
                style={{ opacity: 1 - t, transform: `translateY(${-t * 18}px)` }}
              >
                You&apos;re missing out
                <br />
                50% of your pipeline.
              </h2>
              <h2
                className="title-swap title-swap--alt"
                style={{ opacity: t, transform: `translateY(${(1 - t) * 18}px)` }}
              >
                Unlock 50%
                <br />
                of your pipeline.
              </h2>
            </div>
            <p>
              Push verified emails, phones and qualified contacts straight into
              your CRM, sales engagement and outreach stack. One click, every
              platform.
            </p>
            <button className="btn-pill btn-watch">Enrich my bucket</button>
          </div>

          <div className="treadmill" id="treadmill">
            <div className="treadmill-bracket left"></div>
            <div className="treadmill-bracket right"></div>
            {/* Sketch belt (before) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="treadmill-belt" src="/assets/treadmill.png" alt="" />
            {/* Realistic belt (after) — wiped in from left to right */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="treadmill-belt treadmill-belt--real"
              src="/assets/treadmill-real.png"
              alt=""
              style={{ clipPath: `inset(0 ${(1 - beltP) * 100}% 0 0)` }}
            />

            <div className="bucket-runner">
              {/* Sketch bucket (before) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="bucket-img full" src="/assets/bucket-full.png" alt="" />
              {/* Realistic bucket (after) — revealed from bottom to top */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="bucket-img real"
                src="/assets/bucket-real.png"
                alt=""
                style={{ clipPath: `inset(${(1 - bucketP) * 100}% 0 0 0)` }}
              />
            </div>

            <div className="bucket-tags" aria-hidden="true">
              <div className="bucket-tag"><span className="check">✓</span> 25% more leads.</div>
              <div className="bucket-tag"><span className="check">✓</span> 25% more phones.</div>
              <div className="bucket-tag"><span className="check">✓</span> Perfect timing.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
