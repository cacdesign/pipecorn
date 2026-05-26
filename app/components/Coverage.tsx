import CoverageMap from "./CoverageMap";

export default function Coverage() {
  return (
    <section className="coverage">
      <h2 className="section-title">
        The best coverage,{" "}
        <span className="hl">everywhere in the world.</span>
      </h2>
      <p
        className="coverage-sub"
        style={{ maxWidth: 720, margin: "0 auto 60px", textAlign: "center" }}
      >
        Some providers dominate in North America but miss in Europe or Asia.
        Pipecorn automatically switches vendors per country to give you the
        highest possible find rate, no matter where your prospects are.
      </p>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <CoverageMap />
      </div>
    </section>
  );
}
