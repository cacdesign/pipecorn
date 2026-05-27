"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * Step 3 — "Export qualified leads"
 *
 * Animation: a stream of raw leads scrolls through a filter pipeline.
 * Each lead is evaluated against the persona — matches stay (green check),
 * non-matches get a red cross + line-through.
 */
type Lead = {
  name: string;
  role: string;
  company: string;
  domain: string;
  photo: string;
  match: boolean;
};
const RAW_LEADS: Lead[] = [
  { name: "Léa Bernard",   role: "VP Sales",           company: "Notion",   domain: "notion.so",    photo: "https://i.pravatar.cc/64?img=47", match: true  },
  { name: "Mark Olson",    role: "Marketing Intern",   company: "Linear",   domain: "linear.app",   photo: "https://i.pravatar.cc/64?img=12", match: false },
  { name: "Sarah Chen",    role: "Head of Marketing",  company: "Stripe",   domain: "stripe.com",   photo: "https://i.pravatar.cc/64?img=44", match: true  },
  { name: "Marcus Patel",  role: "CMO",                company: "Vercel",   domain: "vercel.com",   photo: "https://i.pravatar.cc/64?img=33", match: true  },
];

export default function ExportLeadsAnimation() {
  const matched = RAW_LEADS.filter((l) => l.match).length;
  const total = RAW_LEADS.length;

  return (
    <div className="p-live__export">
      <div className="p-live__exportHead">
        <span className="p-live__exportHeadIcon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M6 12h12M10 18h4" />
          </svg>
        </span>
        <span>
          <strong>Filtering against your persona</strong>
          <span className="p-live__exportHeadSub">{total} leads found · keeping only matches</span>
        </span>
      </div>

      <ul className="p-live__exportList">
        {RAW_LEADS.map((l, i) => (
          <li
            key={l.name}
            className={
              "p-live__exportRow" + (l.match ? " is-keep" : " is-drop")
            }
            style={{ animationDelay: `${0.3 + i * 0.4}s` }}
          >
            <span className="p-live__exportAvatar">
              <img src={l.photo} alt="" />
            </span>
            <span className="p-live__exportInfo">
              <span className="p-live__exportName">{l.name}</span>
              <span className="p-live__exportRole">
                {l.role}
                <span className="p-live__exportSep" aria-hidden="true">·</span>
                <span className="p-live__exportCompany">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${l.domain}&sz=64`}
                    alt=""
                  />
                  {l.company}
                </span>
              </span>
            </span>
            <span
              className="p-live__exportVerdict"
              style={{ animationDelay: `${0.3 + i * 0.4 + 0.25}s` }}
            >
              {l.match ? "✓" : "✕"}
            </span>
          </li>
        ))}
      </ul>

      <div className="p-live__exportProgress">
        <div className="p-live__exportProgressBar" />
        <div className="p-live__exportProgressMeta">
          <span><strong>{matched}</strong> qualified · <span className="p-live__exportProgressDrop">{total - matched} dropped</span></span>
          <span className="p-live__exportProgressPct">100%</span>
        </div>
      </div>

      <div className="p-live__exportCta">
        <span className="p-live__exportCtaIcon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </span>
        Export to CSV · HubSpot · Salesforce
      </div>
    </div>
  );
}
