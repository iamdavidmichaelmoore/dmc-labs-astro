export function WireframeFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-cta">LET'S BUILD</div>
        <div className="footer-links">
          <a href="mailto:hello@dmc-labs.ai">EMAIL</a>
          <a href="https://github.com/dmc-labs" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href="https://twitter.com/dmc_labs" target="_blank" rel="noopener noreferrer">TWITTER</a>
        </div>
        <p className="fine-print">
          No templates. No frameworks. Just research and build.
        </p>
        <p className="fine-print">
          © {new Date().getFullYear()} DMC Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
