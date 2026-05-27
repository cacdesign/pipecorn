"use client";

import LogosWall from "./LogosWall";
import { useEffect, useRef, useState } from "react";

/* ─── eraser cursor SVG (32×32, hotspot at bottom-left of eraser body) ─── */
const ERASER_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect x='5' y='9' width='22' height='15' rx='3' fill='%23FFB3C1' stroke='%23444' stroke-width='1.5'/%3E%3Crect x='5' y='9' width='8' height='15' rx='3' fill='%23F06292' stroke='%23444' stroke-width='1.5'/%3E%3Crect x='5' y='13' width='22' height='3' fill='%23444' opacity='0.15'/%3E%3Crect x='3' y='24' width='26' height='2.5' rx='1' fill='%23999'/%3E%3C/svg%3E") 5 26, cell`;

/* ─── eraser radius in CSS pixels ─── */
const ERASE_RADIUS = 18;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [aspectRatio, setAspectRatio] = useState<string | undefined>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/assets/phone-hero.png";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
      ctx.drawImage(img, 0, 0);
    };
  }, []);

  const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, ERASE_RADIUS * Math.max(scaleX, scaleY), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  return (
    <section className="hero">
      <div className="hero-phone" style={{ pointerEvents: "auto" }}>
        <canvas
          ref={canvasRef}
          className="hero-phone-canvas"
          style={{
            display: "block",
            width: "100%",
            aspectRatio,
            mixBlendMode: "multiply",
            cursor: ERASER_CURSOR,
          }}
          onMouseDown={(e) => { drawing.current = true; erase(e); }}
          onMouseMove={(e) => { if (drawing.current) erase(e); }}
          onMouseUp={() => { drawing.current = false; }}
          onMouseLeave={() => { drawing.current = false; }}
        />
      </div>

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
