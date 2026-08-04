import { BrandMark } from './BrandMark';

export function WireframeFooter() {
  return (
    <footer id="contact" className="footer mt-15 px-5 py-20 text-center" data-reveal data-section="CONTACT">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-lockup font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            <BrandMark className="footer-brand-mark" />
            <span>DMC LABS</span>
          </div>
          <p>Independent systems research for useful, transparent AI.</p>
        </div>
        <div className="footer-column">
          <h2>Navigate</h2>
          <a href="/">Home</a>
          <a href="/about">The Lab</a>
          <a href="/work">Work</a>
        </div>
        <div className="footer-column">
          <h2>Research</h2>
          <a href="/blog">Research log</a>
          <a href="/work">Selected systems</a>
          <a href="/blog/self-correction-in-llms">Latest note</a>
        </div>
        <div className="footer-column">
          <h2>Connect</h2>
          <a href="mailto:hello@dmc-labs.io">Email the lab</a>
          <a href="#contact">Start a conversation</a>
        </div>
        <p className="footer-fine-print">
          © {new Date().getFullYear()} DMC Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
