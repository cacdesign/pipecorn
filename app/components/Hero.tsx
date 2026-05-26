import LogosWall from "./LogosWall";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="h1-wrapper">
          <h1>
            <span className="h1-static">Enrich your</span>
            <span className="h1-rotating">
              <span>
                leads <em className="yellow">at scale.</em>
              </span>
              <span>
                list <em className="yellow">10x faster.</em>
              </span>
              <span>
                life <em className="yellow">for good.</em>
              </span>
            </span>
          </h1>
          <div className="flying-bucket">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/popcorn-bucket.png" alt="Pixel art popcorn bucket" />
          </div>
        </div>

        <p className="subtitle">
          Aggregate 100+ data sources to find emails, phones and qualified
          contacts. One subscription, unlimited leads.
        </p>

        <div className="cta-group">
          <a className="btn-pill btn-primary btn-lg" href="#">
            Start enriching <span className="arrow-icon">→</span>
          </a>
          <a className="btn-pill btn-outline" href="#">
            See how it works
          </a>
        </div>
      </div>

      <LogosWall />
    </section>
  );
}
