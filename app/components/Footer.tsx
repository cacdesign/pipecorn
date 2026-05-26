export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <span>PIPE</span>CORN
          </div>
          <div className="footer-tag">Enrich your life.</div>
          <div className="partners">
            <span className="partner-badge">Business France</span>
            <span className="partner-badge">Future40 · StationF</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Free tools</a></li>
            <li><a href="#">Case studies</a></li>
            <li><a href="#">Docs</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">DPA</a></li>
            <li><a href="#">Do Not Sell My Info</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Pipecorn</div>
        <div>Made with 🍿 in Paris</div>
      </div>
    </footer>
  );
}
