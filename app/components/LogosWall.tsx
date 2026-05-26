import { CaseStudy, LOGOS_ROW_1, LOGOS_ROW_2 } from "./logos-data";

function LogoItem({ item }: { item: CaseStudy }) {
  return (
    <div className="logo-item">
      <span className="logo-name">{item.brand}</span>
      {item.pill ? (
        <a href="#" className="case-pill">
          {item.pill}
        </a>
      ) : (
        <span className="case-pill invisible">.</span>
      )}
      {item.popup && (
        <div className="case-popup">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="portrait" src={item.popup.img} alt="" />
          <div className="body">
            <div className="name">{item.popup.name}</div>
            <div className="role">{item.popup.role}</div>
            <div
              className="quote"
              dangerouslySetInnerHTML={{ __html: item.popup.quote }}
            />
            <a href="#" className="read">
              {item.popup.readLabel}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LogosWall() {
  return (
    <div className="logo-rows">
      <div className="logo-rows-header">
        <div className="logo-rows-label">
          The top 1% of GTM teams close on crunchy data.
        </div>
        <div className="g2-pill">
          <span className="star">★</span>
          <span>4.8</span>
          <span className="on">on G2</span>
          <span className="g2-mark">g2</span>
        </div>
      </div>
      <div className="logo-row">
        {LOGOS_ROW_1.map((item) => (
          <LogoItem key={item.brand} item={item} />
        ))}
      </div>
      <div className="logo-row">
        {LOGOS_ROW_2.map((item) => (
          <LogoItem key={item.brand} item={item} />
        ))}
      </div>
    </div>
  );
}
