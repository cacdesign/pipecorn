export default function FinalCTA() {
  return (
    <>
      <div className="popcorn-cloud-transition">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 L0,55 Q35,12 75,48 Q110,8 155,52 Q185,18 230,46 Q272,2 320,50 Q355,15 395,44 Q438,5 485,52 Q518,20 555,46 Q595,6 640,50 Q672,18 710,44 Q755,2 800,52 Q835,14 875,48 Q915,4 960,50 Q998,16 1035,44 Q1075,6 1120,52 Q1155,12 1195,46 Q1235,2 1280,50 Q1318,18 1355,48 Q1395,8 1440,52 L1440,80 Z"
            fill="#251E00"
          />
        </svg>
      </div>
      <section className="final-cta">
      <h2>
        Ready to win <span className="hl">your market?</span>
      </h2>
      <p>
        Stop searching for data. Start <em>closing</em> deals.
      </p>
      <div className="support">
        30-minute setup · No credit card · GDPR-compliant
      </div>
      <div className="cta-group">
        <a className="btn-pill btn-primary btn-lg" href="#">
          Book a demo <span className="arrow-icon">→</span>
        </a>
        <a className="btn-pill btn-outline" href="#">
          See pricing
        </a>
      </div>
    </section>
    </>
  );
}
