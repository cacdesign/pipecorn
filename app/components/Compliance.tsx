export default function Compliance() {
  return (
    <section className="compliance">
      <h2 className="section-title">
        <span className="hl">Data protection</span> you can trust.
      </h2>
      <p className="comp-sub">
        Every contact we surface is sourced from certified providers and
        handled under the strictest global privacy frameworks.
      </p>
      <div className="comp-grid">
        <div className="comp-card">
          <div className="comp-badge soc">SOC 2</div>
          <h3>SOC 2 Type II</h3>
          <p>
            Pipecorn is SOC 2 Type II compliant, ensuring the highest standards
            in data security and privacy for your cold-calling operations.
          </p>
        </div>
        <div className="comp-card">
          <div className="comp-badge gdpr">GDPR</div>
          <h3>GDPR</h3>
          <p>
            Fully compliant with the EU&apos;s General Data Protection
            Regulation. We handle your prospect data with strict respect for
            European privacy laws.
          </p>
        </div>
        <div className="comp-card">
          <div className="comp-badge ccpa">CCPA</div>
          <h3>CCPA</h3>
          <p>
            We comply with the California Consumer Privacy Act, protecting the
            privacy rights of your California-based prospects.
          </p>
        </div>
      </div>
    </section>
  );
}
