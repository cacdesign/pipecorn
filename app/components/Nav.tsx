import Link from "next/link";

function Chev() {
  return (
    <svg
      className="nav-chev"
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="2.5 4.5 6 8 9.5 4.5" />
    </svg>
  );
}

export default function Nav() {
  return (
    <nav>
      <div className="logo">
        <span>PIPE</span>CORN
      </div>
      <ul className="nav-links">
        {/* PRODUCT — mega menu */}
        <li className="has-dropdown has-mega">
          <span className="nav-trigger">
            Product
            <Chev />
          </span>
          <div className="nav-mega">
            <div className="nav-mega-surfaces">
              <Link href="/live-data" className="nav-surface">
                <div className="nav-surface-copy">
                  <div className="nav-surface-title">Workspace</div>
                  <div className="nav-surface-desc">
                    Build lists, enrich and send to your outreach tools
                  </div>
                </div>
                <div className="nav-surface-illu" aria-hidden="true">
                  <span className="ill-row">
                    <span className="ill-avatar" />
                    <span className="ill-bar" />
                  </span>
                  <span className="ill-row">
                    <span className="ill-avatar" />
                    <span className="ill-bar" />
                  </span>
                  <span className="ill-row">
                    <span className="ill-avatar" />
                    <span className="ill-bar" />
                  </span>
                </div>
              </Link>
              <Link href="/integrations" className="nav-surface">
                <div className="nav-surface-copy">
                  <div className="nav-surface-title">API &amp; MCP</div>
                  <div className="nav-surface-desc">
                    Run workflows and plays with accurate data
                  </div>
                </div>
                <div
                  className="nav-surface-illu nav-surface-illu--code"
                  aria-hidden="true"
                >
                  <span className="ill-code-line">
                    $ curl api.pipecorn.com
                  </span>
                  <span className="ill-code-line ok">
                    ✓ Verified email
                  </span>
                  <span className="ill-code-line ok">✓ Mobile found</span>
                </div>
              </Link>
              <span className="nav-surface nav-surface--static">
                <div className="nav-surface-copy">
                  <div className="nav-surface-title">Extension</div>
                  <div className="nav-surface-desc">
                    Reveal contacts on LinkedIn &amp; sites
                  </div>
                </div>
                <div
                  className="nav-surface-illu nav-surface-illu--chrome"
                  aria-hidden="true"
                >
                  <span className="ill-chrome-bar">
                    <span /><span /><span />
                  </span>
                  <span className="ill-chrome-body">
                    <span className="ill-chrome-card" />
                    <span className="ill-chrome-panel" />
                  </span>
                </div>
              </span>
            </div>
            <div className="nav-mega-features">
              <div className="nav-mega-features-title">Features</div>
              <Link href="/track-job-changes" className="nav-feature">
                <div className="nav-feature-title">Track job changes</div>
                <div className="nav-feature-desc">
                  Catch champions the second they move
                </div>
              </Link>
              <Link href="/waterfall-enrichment" className="nav-feature">
                <div className="nav-feature-title">Waterfall enrichment</div>
                <div className="nav-feature-desc">
                  80% enrichment via 100+ providers
                </div>
              </Link>
              <span className="nav-feature nav-feature--static">
                <div className="nav-feature-title">Business signals</div>
                <div className="nav-feature-desc">
                  Hiring, lookalikes, posts, competitor follows
                </div>
              </span>
            </div>
          </div>
        </li>

        {/* PRICING — simple link */}
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>

        {/* RESOURCES — simple dropdown */}
        <li className="has-dropdown">
          <span className="nav-trigger">
            Resources
            <Chev />
          </span>
          <div className="nav-dropdown">
            <Link href="/case-studies" className="nav-drop-item">
              <strong>Case studies</strong>
              <span>customer wins</span>
            </Link>
            <Link href="/blog" className="nav-drop-item">
              <strong>Blog</strong>
              <span>playbooks &amp; news</span>
            </Link>
            <Link href="/free-tools" className="nav-drop-item">
              <strong>Free tools</strong>
              <span>try us before you buy</span>
            </Link>
          </div>
        </li>

        {/* LOGIN */}
        <li>
          <a href="https://app.pipecorn.com/login">Login</a>
        </li>

        {/* CTA */}
        <li>
          <a className="btn-pill btn-nav btn-primary" href="#demo">
            Book a demo
          </a>
        </li>
      </ul>
    </nav>
  );
}
