"use client";

import { useEffect, useRef } from "react";
import LiveDataFlow from "./livedata/LiveDataFlow";

export default function Pillars() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = root.querySelectorAll<HTMLElement>(".work-step");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="works" id="works" ref={ref}>
      <div className="works-intro">
        <h2 className="works-title">
          We fix the data.
          <br />
          <span className="hl">Your reps feast.</span>
        </h2>
        <p className="works-sub">
          Live market, instant signals, verified contacts, pushed straight to
          your CRM. Four steps and your team stops prospecting.
        </p>
      </div>

      <div className="works-timeline">
        {/* STEP 01 */}
        <article className="work-step">
          <div className="step-num">01</div>
          <div className="step-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="step-pill-sketch" src="/assets/pill-uniform-real-time-sourcing.jpeg" alt="Real time sourcing" />
            <h3 className="step-headline">
              100% qualified leads.
              <br />
              AI backed.
            </h3>
            <p className="step-body">
              Apollo, ZoomInfo and other databases miss 30% of the people you
              should be calling. Pipecorn pulls live data straight from the
              source for 100% of your TAM, then AI-cleans every record against
              your ICP — so your reps only see leads worth dialing.
            </p>
            <div className="step-cta-wrap">
              <a href="#" className="step-cta">Discover our list builder →</a>
              <div className="step-tags">
                <span className="step-tag"><strong>+30%</strong><span className="tag-rest">people</span></span>
                <span className="step-tag"><strong>5 min</strong><span className="tag-rest">to build a list</span></span>
              </div>
            </div>
          </div>
          <div className="step-mock-wrap">
            <LiveDataFlow />
          </div>
        </article>

        {/* STEP 02 */}
        <article className="work-step">
          <div className="step-num">02</div>
          <div className="step-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="step-pill-sketch" src="/assets/pill-uniform-enrichment.jpeg" alt="Enrichment" />
            <h3 className="step-headline">
              100% phone numbers.
              <br />
              Community backed.
            </h3>
            <p className="step-body">
              One provider misses half the numbers. Pipecorn runs waterfall
              enrichment across 100+ providers simultaneously. Every contact
              comes out verified. No gaps. No bounces.
            </p>
            <div className="step-cta-wrap">
              <a href="#" className="step-cta">Discover our waterfall →</a>
              <div className="step-tags">
                <span className="step-tag"><strong>100+</strong><span className="tag-rest">providers</span></span>
                <span className="step-tag"><strong>10×</strong><span className="tag-rest">verified phones</span></span>
                <span className="step-tag"><strong>0</strong><span className="tag-rest">bounces</span></span>
              </div>
            </div>
          </div>
          <div className="step-mock-wrap">
            <div className="step-mock">
              <div className="mock-contact">
                <div className="dots"><span></span><span></span><span></span></div>
                <div className="avatar"></div>
                <div className="info">
                  <div className="nm">Brian Balfour</div>
                  <div className="meta">
                    <span>✉ brian@reforge.com</span>
                    <span>📞 +1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div className="mock-providers">
                <div className="row"><div className="icon" style={{ background: "#8B5CF6" }}>W</div><div className="nm">Wiza</div><div className="status status-na">✕ Not found</div></div>
                <div className="row"><div className="icon" style={{ background: "#3B82F6" }}>d</div><div className="nm">Datagma</div><div className="status status-na">✕ Not found</div></div>
                <div className="row"><div className="icon" style={{ background: "#F97316" }}>H</div><div className="nm">Hunter</div><div className="status status-err">✕ Invalid email</div></div>
                <div className="more">··· 15 more data providers ···</div>
                <div className="row"><div className="icon" style={{ background: "#22C55E" }}>C</div><div className="nm">ContactOut</div><div className="status status-ok">✓ Verified phone found</div></div>
              </div>
            </div>
          </div>
        </article>

        {/* STEP 03 */}
        <article className="work-step">
          <div className="step-num">03</div>
          <div className="step-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="step-pill-sketch" src="/assets/pill-uniform-signal-detection.jpeg" alt="Signal detection" />
            <h3 className="step-headline">
              Call before
              <br />
              your competitors.
            </h3>
            <p className="step-body">
              New hire. Job change. ICP match. The moment a buying signal fires,
              your rep is first, before the contact updates their LinkedIn,
              before your competitor picks up the phone.
            </p>
            <div className="step-cta-wrap">
              <a href="#" className="step-cta">Detect new hires →</a>
              <div className="step-tags">
                <span className="step-tag"><strong>Real-time</strong><span className="tag-rest">signal alerts</span></span>
                <span className="step-tag"><strong>Champion</strong><span className="tag-rest">move tracking</span></span>
              </div>
            </div>
          </div>
          <div className="step-mock-wrap">
            <div className="step-mock mock-step3">
              <div className="mock-center">
                <div className="mock-radar"><div className="ph"></div></div>
                <div className="mock-live">LIVE signals</div>
                <div className="mock-signal-row">
                  <span className="sig-btn red">👤 New hire</span>
                  <span className="sig-btn yel">📈 Promoted</span>
                </div>
                <div className="mock-signal-row">
                  <span className="sig-btn blue">⚙ Follow competitor</span>
                </div>
                <div className="mock-foot-yel">+247 THIS WEEK</div>
              </div>
            </div>
          </div>
        </article>

        {/* STEP 04 */}
        <article className="work-step">
          <div className="step-num">04</div>
          <div className="step-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="step-pill-sketch" src="/assets/pill-uniform-delivery.jpeg" alt="Delivery" />
            <h3 className="step-headline">
              Full pipeline
              <br />
              every morning.
            </h3>
            <p className="step-body">
              Leads verified, prioritized, pushed to HubSpot & Salesforce before
              the first coffee. Auto-enrolled in sequence. Your reps open their
              CRM. The work is done. They just call.
            </p>
            <div className="step-cta-wrap">
              <a href="#" className="step-cta">Discover our integrations →</a>
              <div className="step-tags">
                <span className="step-tag"><strong>HubSpot</strong><span className="tag-rest">& Salesforce sync</span></span>
                <span className="step-tag"><strong>Auto</strong><span className="tag-rest">sequence enrollment</span></span>
              </div>
            </div>
          </div>
          <div className="step-mock-wrap">
            <div className="step-mock">
              <div className="mock-center">
                <div className="mock-pronto">
                  <span className="wave"><i></i><i></i><i></i><i></i><i></i></span> Pipecorn
                </div>
                <div className="mock-tree">
                  <svg viewBox="0 0 280 60" preserveAspectRatio="none">
                    <path d="M140 0 Q140 30 60 60" stroke="rgba(255,209,102,0.7)" strokeWidth="2" fill="none" />
                    <path d="M140 0 Q140 30 220 60" stroke="rgba(255,209,102,0.7)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="mock-apps">
                  <div className="mock-app"><div className="ico" style={{ background: "#FF7A59" }}>H</div><div className="nm">HubSpot</div></div>
                  <div className="mock-app"><div className="ico" style={{ background: "#00A1E0" }}>☁</div><div className="nm">Salesforce</div></div>
                </div>
                <div className="mock-synced">SYNCED · 08:03 AM</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
