"use client";

/**
 * Step 4 — "Clean data"
 *
 * Animation: AI normalizes a batch of fields in parallel. Each row
 * shows the messy input → cleaned output with a gold sparkle and a
 * green check.
 */
type Row = { field: string; icon: string; before: string; after: string; note: string };
const ROWS: Row[] = [
  { field: "First name", icon: "👤", before: "TOM 🚀",       after: "Tom",              note: "Emoji + caps" },
  { field: "Last name",  icon: "👤", before: "j. smith",     after: "John Smith",       note: "Initials → full" },
  { field: "Job title",  icon: "💼", before: "Sr. Eng.",     after: "Senior Engineer",  note: "Abbreviation" },
  { field: "Company",    icon: "🏢", before: "google llc",   after: "Google",           note: "Legal suffix" },
  { field: "Email",      icon: "📧", before: "TOM@GOOGLE.COM", after: "tom@google.com", note: "Lowercased" },
];

export default function CleanDataAnimation() {
  return (
    <div className="p-live__clean">
      <div className="p-live__cleanHead">
        <span className="p-live__cleanHeadIcon" aria-hidden="true">✨</span>
        <span>
          <strong>AI cleaning your records</strong>
          <span className="p-live__cleanHeadSub">{ROWS.length} fields normalized in parallel</span>
        </span>
      </div>

      <ul className="p-live__cleanList">
        {ROWS.map((r, i) => {
          const rowDelay = 0.3 + i * 0.35;
          return (
            <li
              key={r.field}
              className="p-live__cleanRow"
              style={{ animationDelay: `${rowDelay}s` }}
            >
              <span className="p-live__cleanField">
                <span className="p-live__cleanFieldIcon" aria-hidden="true">{r.icon}</span>
                {r.field}
              </span>

              <span className="p-live__cleanBefore">{r.before}</span>

              <span className="p-live__cleanArrow" aria-hidden="true">→</span>

              <span
                className="p-live__cleanAfter"
                style={{ animationDelay: `${rowDelay + 0.5}s` }}
              >
                <span className="p-live__cleanAfterValue">{r.after}</span>
                <span className="p-live__cleanShine" aria-hidden="true" />
              </span>

              <span
                className="p-live__cleanCheck"
                style={{ animationDelay: `${rowDelay + 0.85}s` }}
              >
                ✓
              </span>
            </li>
          );
        })}
      </ul>

      <div className="p-live__cleanProgress">
        <div className="p-live__cleanProgressBar" />
        <div className="p-live__cleanProgressMeta">
          <span><strong>{ROWS.length}</strong> fields cleaned · zero ops work</span>
          <span className="p-live__cleanProgressPct">100%</span>
        </div>
      </div>

      <div className="p-live__cleanCta">
        <span className="p-live__cleanCtaIcon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        Ready to push to HubSpot · Salesforce · CSV
      </div>
    </div>
  );
}
