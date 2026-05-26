"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";

type Tool = { name: string; domain?: string };
type StatIcon = "email" | "phone" | "time" | "people" | "check" | "target" | "tools";
type Stat = { label: string; value: string; icon?: StatIcon };

function StatIconSvg({ icon }: { icon: StatIcon }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "email":
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
          <path d="M2.5 5.5L10 11l7.5-5.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M3 4.5c0-.83.67-1.5 1.5-1.5h2l1 4-2 1c.7 2 2.3 3.6 4.3 4.3l1-2 4 1v2c0 .83-.67 1.5-1.5 1.5C7.6 14.8 4.2 11.4 3 4.5z" />
        </svg>
      );
    case "time":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" />
          <path d="M10 6v4.2L13 12" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="10" cy="7.5" r="2.8" />
          <path d="M3.5 17a6.5 6.5 0 0113 0" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" />
          <path d="M7 10l2.2 2.2L13 8.5" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="3.2" />
          <circle cx="10" cy="10" r="0.6" fill="currentColor" />
        </svg>
      );
    case "tools":
      return (
        <svg {...common}>
          <path d="M14 4l2 2-3.5 3.5L10 7 14 4z" />
          <path d="M10 7l-6 6v3h3l6-6" />
        </svg>
      );
  }
}

type Slide = {
  photo: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  before: { tools: Tool[]; meta: string; cost: string; stats: Stat[] };
  after: { meta: string; cost: string; stats: Stat[] };
  savings: string;
};

const ALEXIS_PHOTO =
  "https://cdn.prod.website-files.com/66dabc4200023eea0636951e/682f68dedc783e731e9196dd_alexis.avif";

const SLIDES: Slide[] = [
  {
    photo: ALEXIS_PHOTO,
    name: "Alexis Gadrat",
    role: "Head of Sales",
    company: "WeYou Group",
    quote:
      "Half of our day was downloading CSVs, cleaning them, and re-uploading to the CRM. We were doing data ops, not sales.",
    before: {
      tools: [
        { name: "Evaboot", domain: "evaboot.com" },
        { name: "Manual CSV pipeline" },
      ],
      meta: "1 tool + manual CSV glue",
      cost: "Evaboot + hours of ops",
      stats: [
        { label: "Email enrichment", value: "~40%", icon: "email" },
        { label: "Phone data", value: "None", icon: "phone" },
      ],
    },
    after: {
      meta: "Pipecorn API · into the CRM",
      cost: "1 platform · 1 contract · 0 CSVs",
      stats: [
        { label: "Email enrichment", value: "~80%", icon: "email" },
        { label: "Cold calling", value: "Live", icon: "phone" },
      ],
    },
    savings: "+50% demos / SDR · 0 CSVs · 35 SDRs fully autonomous",
  },
  {
    photo: "/assets/alex-scalefast.webp",
    name: "Alex Jaglale",
    role: "Founder",
    company: "Scalefast",
    quote:
      "We had the phones. We didn't have the timing. Clay only flagged a job change 3 to 6 months in — by then the meeting was already on a competitor's calendar.",
    before: {
      tools: [
        { name: "Clay", domain: "clay.com" },
        { name: "Eficia", domain: "get-eficia.fr" },
        { name: "Kaspr", domain: "kaspr.io" },
        { name: "FullEnrich", domain: "fullenrich.com" },
      ],
      meta: "4 tools · 4 contracts",
      cost: "$1,200 / month",
      stats: [
        { label: "Verified mobiles", value: "~88%", icon: "phone" },
        { label: "Job detection", value: "3–6 months", icon: "time" },
      ],
    },
    after: {
      meta: "1 platform · 1 contract",
      cost: "$700 / month",
      stats: [
        { label: "Verified mobiles", value: "~96%", icon: "phone" },
        { label: "Job detection", value: "Day 1", icon: "time" },
      ],
    },
    savings: "−42% cost · Day 1 detection · ≈ $6,000 saved / year",
  },
  {
    photo: "/assets/malo-bonx.webp",
    name: "Malo",
    role: "GTM Engineer",
    company: "Bonx",
    quote:
      "Clay would return one contact for a target account — sometimes zero. And half the time, Zeliq couldn't find a phone for the contact we did get. Italy wasn't a market, it was a wall.",
    before: {
      tools: [
        { name: "Clay", domain: "clay.com" },
        { name: "Zeliq", domain: "zeliq.com" },
      ],
      meta: "Clay + Zeliq · thin coverage on Italy",
      cost: "Clay + Zeliq",
      stats: [
        { label: "Contacts / company", value: "0–1", icon: "people" },
        { label: "Phone hit rate", value: "~40%", icon: "phone" },
      ],
    },
    after: {
      meta: "Clay kept · Pipecorn bolted on",
      cost: "Clay + Pipecorn",
      stats: [
        { label: "Contacts / company", value: "3–5", icon: "people" },
        { label: "Phone hit rate", value: "~80%", icon: "phone" },
      ],
    },
    savings: "Italy unlocked · +6 meetings / sales rep",
  },
  {
    photo: "/assets/quentin-hyperline.webp",
    name: "Quentin Kozyra",
    role: "Head of Growth",
    company: "Hyperline",
    quote:
      "Sales would have an idea — 'let's try companies using this payment form' — and by the time we had the list ready, it was the next day. The intuition was dead.",
    before: {
      tools: [
        { name: "Apollo", domain: "apollo.io" },
        { name: "FullEnrich", domain: "fullenrich.com" },
        { name: "Custom Attio integration" },
      ],
      meta: "3 moving parts, glued by hand",
      cost: "~$500 / mo + eng time",
      stats: [
        { label: "Time per list", value: "Half a day", icon: "time" },
        { label: "Who scopes", value: "Growth only", icon: "people" },
      ],
    },
    after: {
      meta: "1 API · 1 contract",
      cost: "~$300 / month",
      stats: [
        { label: "Time per list", value: "≤ 1 hour", icon: "time" },
        { label: "Who scopes", value: "Sales (live)", icon: "people" },
      ],
    },
    savings: "−40% tool spend · same-day segment testing",
  },
  {
    photo: "/assets/alexis-garnier-qobra.webp",
    name: "Alexis Garnier",
    role: "Senior GTM",
    company: "Qobra",
    quote:
      "I evaluated Clay and LoneScale. Pipecorn won on two things: it was easier to set up end-to-end, and the data quality was better — more new hires detected, fresher data.",
    before: {
      tools: [
        { name: "Clay", domain: "clay.com" },
        { name: "LoneScale", domain: "lonescale.com" },
      ],
      meta: "Evaluated · two partial fits",
      cost: "2 contracts + glue",
      stats: [
        { label: "Signal freshness", value: "Stale", icon: "time" },
        { label: "Setup", value: "DIY glue", icon: "tools" },
      ],
    },
    after: {
      meta: "Won · end-to-end fit",
      cost: "1 platform · 1 contract",
      stats: [
        { label: "Phone hit rate", value: "80%", icon: "phone" },
        { label: "Hire → warm call", value: "5 days", icon: "time" },
      ],
    },
    savings: "100 fresh signals / week · 15% → meeting",
  },
  {
    photo: "/assets/juliette-recom.webp",
    name: "Juliette Binetruy",
    role: "Head of Operations",
    company: "Recom",
    quote:
      "We were spending more time cleaning data and arguing with tool quotas than actually prospecting for our clients.",
    before: {
      tools: [
        { name: "Compass", domain: "compass.com" },
        { name: "PhantomBuster", domain: "phantombuster.com" },
        { name: "DropContact", domain: "dropcontact.com" },
        { name: "Usebouncer", domain: "usebouncer.com" },
        { name: "Zeliq", domain: "zeliq.com" },
      ],
      meta: "5 tools · 5 contracts",
      cost: "€2,600 / month",
      stats: [
        { label: "Verified emails", value: "72%", icon: "email" },
        { label: "Verified phones", value: "51%", icon: "phone" },
      ],
    },
    after: {
      meta: "1 platform · 1 contract",
      cost: "€1,200 / month",
      stats: [
        { label: "Verified emails", value: "92%", icon: "email" },
        { label: "Verified phones", value: "84%", icon: "phone" },
      ],
    },
    savings: "−54% · ≈ €16,800 saved / year",
  },
];

export default function UseCaseCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = SLIDES.length;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);
  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => go(active + 1), 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, active, go]);

  return (
    <section className="p-ucCar">
      <div className="p-ucCar__head">
        <span className="p-ucCar__kicker">From our customers</span>
        <h2 className="p-ucCar__title">
          Real stacks.<br /><em>Real results.</em>
        </h2>
        <p className="p-ucCar__sub">
          Six sales teams that replaced multiple tools with Pipecorn — and the before/after to prove it.
        </p>
      </div>

      <div className="p-ucCar__bar">
        <span className="p-ucCar__barLabel">
          <strong>100+</strong> customer stories
        </span>
        <a href="#" className="p-ucCar__seeAll">
          See all
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <div
        className="p-ucCar__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          className="p-ucCar__navBtn p-ucCar__navBtn--prev"
          onClick={prev}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {SLIDES.map((s, i) => {
          let diff = i - active;
          if (diff > n / 2) diff -= n;
          else if (diff < -n / 2) diff += n;

          const isActive = diff === 0;
          const isAdjacent = Math.abs(diff) === 1;

          let cls = "p-ucCar__slide";
          if (isActive) cls += " is-active";
          else if (isAdjacent) cls += " is-adjacent";
          else cls += " is-far";

          const tx = diff * 85;
          const sc = isActive ? 1 : 0.86;

          return (
            <div
              key={i}
              className={cls}
              style={{ transform: `translateX(${tx}%) scale(${sc})` }}
              aria-hidden={!isActive}
              onClick={isAdjacent ? () => go(i) : undefined}
            >
              <div className="p-ucCar__card">
                <div className="p-ucCar__cardBody">
                  <aside className="p-ucCar__profile">
                    <div className="p-ucCar__photoWrap">
                      <img className="p-ucCar__photo" src={s.photo} alt={s.name} />
                    </div>
                    <div className="p-ucCar__who">
                      <p className="p-ucCar__name">{s.name}</p>
                      <p className="p-ucCar__role">{s.role}</p>
                    </div>
                    <span className="p-ucCar__co">{s.company}</span>
                  </aside>

                  <div className="p-ucCar__schema">
                    <div className="p-ucCar__col p-ucCar__col--before">
                      <div className="p-ucCar__colHead">
                        <span className="p-ucCar__colLabel">Before</span>
                        <span className="p-ucCar__colMeta">{s.before.meta}</span>
                      </div>
                      <ul className="p-ucCar__tools">
                        {s.before.tools.map((t) => (
                          <li key={t.name} className="p-ucCar__tool">
                            {t.domain ? (
                              <img
                                className="p-ucCar__toolFav"
                                src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`}
                                alt=""
                                width={16}
                                height={16}
                              />
                            ) : (
                              <span className="p-ucCar__toolFav p-ucCar__toolFav--code">⌗</span>
                            )}
                            <span className="p-ucCar__toolName">{t.name}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-ucCar__colFoot">
                        <div className="p-ucCar__statsRow">
                          {s.before.stats.map((st) => (
                            <div key={st.label} className="p-ucCar__stat">
                              {st.icon && (
                                <span className="p-ucCar__statIcon">
                                  <StatIconSvg icon={st.icon} />
                                </span>
                              )}
                              <span className="p-ucCar__statBody">
                                <span className="p-ucCar__statVal">{st.value}</span>
                                <span className="p-ucCar__statLabel">{st.label}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="p-ucCar__cost p-ucCar__cost--before">
                          <span className="p-ucCar__costLabel">Total cost</span>
                          <strong className="p-ucCar__costVal">{s.before.cost}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-ucCar__arrow" aria-hidden="true">→</div>

                    <div className="p-ucCar__col p-ucCar__col--after">
                      <div className="p-ucCar__colHead">
                        <span className="p-ucCar__colLabel">After</span>
                        <span className="p-ucCar__colMeta">{s.after.meta}</span>
                      </div>
                      <div className="p-ucCar__prontoBlock">
                        <span className="p-ucCar__prontoLogo">PIPECORN</span>
                      </div>
                      <div className="p-ucCar__colFoot">
                        <div className="p-ucCar__statsRow">
                          {s.after.stats.map((st) => (
                            <div key={st.label} className="p-ucCar__stat p-ucCar__stat--after">
                              {st.icon && (
                                <span className="p-ucCar__statIcon">
                                  <StatIconSvg icon={st.icon} />
                                </span>
                              )}
                              <span className="p-ucCar__statBody">
                                <span className="p-ucCar__statVal">{st.value}</span>
                                <span className="p-ucCar__statLabel">{st.label}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="p-ucCar__cost p-ucCar__cost--after">
                          <span className="p-ucCar__costLabel">Total cost</span>
                          <strong className="p-ucCar__costVal">{s.after.cost}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          className="p-ucCar__navBtn p-ucCar__navBtn--next"
          onClick={next}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="p-ucCar__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={"p-ucCar__dot" + (i === active ? " is-active" : "")}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
