"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * Step 1 — "Import your list."
 *
 * Animation: drop a CSV with ONLY company names. Pipecorn enriches each
 * row live — the Domain and Industry columns fill in one by one with
 * a sparkle, then a green "Enriched" pill confirms.
 */
const COMPANIES = [
  { name: "Notion",  domain: "notion.so",  industry: "Productivity" },
  { name: "Linear",  domain: "linear.app", industry: "Project mgmt" },
  { name: "Stripe",  domain: "stripe.com", industry: "Fintech"       },
  { name: "Figma",   domain: "figma.com",  industry: "Design"        },
  { name: "Vercel",  domain: "vercel.com", industry: "DevTools"      },
];

export default function ImportCompaniesAnimation() {
  return (
    <div className="p-live__import">
      <div className="p-live__importDrop">
        <span className="p-live__importDropIcon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </span>
        <span className="p-live__importDropText">
          <strong>company-names.csv</strong>
          <span>5 names · just plain text — Pipecorn handles the rest</span>
        </span>
        <span className="p-live__importDropBadge">CSV</span>
      </div>

      <div className="p-live__importLegend">
        <span className="p-live__importLegendInput">You upload</span>
        <span className="p-live__importLegendArrow" aria-hidden="true">→</span>
        <span className="p-live__importLegendOutput">Pipecorn enriches</span>
      </div>

      <div className="p-live__importTable">
        <div className="p-live__importHeader">
          <span>Company</span>
          <span>Domain</span>
          <span>Industry</span>
          <span>&nbsp;</span>
        </div>
        <ul className="p-live__importRows">
          {COMPANIES.map((c, i) => {
            const rowDelay = 0.3 + i * 0.25;
            return (
              <li
                key={c.name}
                className="p-live__importRow"
                style={{ animationDelay: `${rowDelay}s` }}
              >
                {/* INPUT — the only thing the user provided */}
                <span className="p-live__importLogo">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`}
                    alt=""
                  />
                </span>
                <span className="p-live__importName p-live__importGiven">{c.name}</span>

                {/* OUTPUT — enriched live by Pipecorn */}
                <span
                  className="p-live__importEnrich p-live__importDomain"
                  style={{ animationDelay: `${rowDelay + 0.7}s` }}
                >
                  <span className="p-live__importEnrichDots" aria-hidden="true" />
                  <span className="p-live__importEnrichValue">{c.domain}</span>
                </span>
                <span
                  className="p-live__importEnrich p-live__importIndustry"
                  style={{ animationDelay: `${rowDelay + 1.1}s` }}
                >
                  <span className="p-live__importEnrichDots" aria-hidden="true" />
                  <span className="p-live__importEnrichValue">{c.industry}</span>
                </span>

                <span
                  className="p-live__importMatch"
                  style={{ animationDelay: `${rowDelay + 1.5}s` }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Enriched
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
