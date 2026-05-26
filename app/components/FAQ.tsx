"use client";

import { useState } from "react";

const QA = [
  {
    q: "We're a small sales team. Is Pipecorn worth it?",
    a: "Yes. Pipecorn saves one SDR 3–5 hours a week the moment your ICP is defined. You get verified pipeline on day one — no analyst, no agency, no workflow building.",
  },
  {
    q: "We already use Apollo or Lusha. Why switch?",
    a: "Apollo and Lusha are single sources. Pipecorn aggregates 100+ data providers and waterfalls between them in real time, reaching ~30% more of your market with cleaner data.",
  },
  {
    q: "How does Pipecorn compare to Clay?",
    a: "Clay is a workflow builder — you have to design everything. Pipecorn is a pre-configured engine that delivers verified pipeline into your sequences every morning. No table-building required.",
  },
  {
    q: "How long does setup take?",
    a: "Under 30 minutes. Connect your CRM, define your ICP, and your first list is ready before standup.",
  },
  {
    q: "Do we pay for bad data?",
    a: "Never. You only pay for verified contacts. Bounces, invalid phones, dead emails — they're on us.",
  },
  {
    q: "Is Pipecorn GDPR compliant?",
    a: "Yes. GDPR-compliant by default — EU data processing, DPAs available on request, and we only source from GDPR-legitimate providers.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq">
      <h2 className="section-title">
        Got questions? Pipecorn has <span className="hl">answers.</span>
      </h2>
      <p className="faq-sub">
        The most-asked questions from sales leaders evaluating Pipecorn. Ask us
        anything else — we reply within 24h.
      </p>
      <div className="faq-inner">
        <div className="faq-list">
          {QA.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? null : i)}
                type="button"
              >
                {item.q}
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
        <div className="faq-foot">
          <a href="#">Ask Pipecorn anything… →</a>
        </div>
      </div>
    </section>
  );
}
