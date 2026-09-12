import { BrandMark } from './BrandMark';

export function SiteFooter() {
  return (
    <footer id="contact" className="footer" data-reveal data-section="CONTACT">
      <div className="footer-content">
        <p className="footer-cta">Building in public. Reach out anytime.</p>
        <p className="mx-auto mb-2 max-w-xl text-[0.95rem] text-[var(--text-secondary)]">
          DMC Labs is an independent builder lab — experiments, notes, and what we learn along the way.
        </p>
        <div className="footer-links">
          <a href="mailto:hello@dmc-labs.io">Email the lab</a>
          <a href="https://github.com/iamdavidmichaelmoore" rel="noopener noreferrer" target="_blank">
            GitHub
          </a>
          <a href="/experiments">Experiments</a>
          <a href="/notes">Notes</a>
          <a href="/about">About</a>
        </div>
        <div className="brand-lockup mx-auto mt-7 justify-center font-display text-lg font-bold tracking-tight text-[var(--text-primary)]">
          <BrandMark />
          <span>DMC Labs</span>
        </div>
        <p className="fine-print mt-4">© {new Date().getFullYear()} DMC Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}
