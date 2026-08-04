export interface TerminalLine {
  text: string;
  className?: string;
  delay?: number;
}

interface TerminalHeroProps {
  title?: string;
  subtitle?: string;
}

export function TerminalHero({ title = "Building systems, not apps", subtitle }: TerminalHeroProps) {
  const terminalLines: TerminalLine[] = [
    { text: `dmc-labs@ai:~$ ./init_research.sh`, delay: 0 },
    { text: `[SYSTEM] Initializing neural pathways...`, delay: 600 },
    { text: `[SUCCESS] 12 models loaded`, className: 'success', delay: 1200 },
    { text: `[CPU] 34% util — optimizing`, className: 'status', delay: 1800 },
    { text: `[PATH] /home/dmc/research/nlp`, delay: 2400 },
    { text: `[READY] dmc-labs@ai:~$`, className: 'time', delay: 3000 },
  ];

  return (
    <section className="hero flex min-h-[70vh] flex-col items-center justify-center px-5 pb-16 pt-35 text-center max-md:min-h-0 max-md:pb-15 max-md:pt-25" data-section="HOME">
      <div className="terminal mb-10 w-full max-w-150 border border-[var(--surface-border)] bg-[var(--surface-elevated)] p-5 font-utility text-[0.8rem] leading-relaxed">
        <div className="terminal-header mb-4 flex gap-2 border-b border-[var(--surface-border)] pb-3">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <div className="terminal-body min-h-20 text-left">
          {terminalLines.map((line, index) => (
            <div
              key={index}
              className={`terminal-line visible ${line.className || ''}`}
              style={{ animationDelay: `${line.delay ?? 0}ms` }}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>

      <h1 className="display font-display text-[clamp(2rem,7vw,4rem)] font-bold tracking-[-2px] text-[var(--text-primary)]">{title}</h1>
      {subtitle && <p className="mt-5 max-w-140 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[var(--text-secondary)]">{subtitle}</p>}

      <div className="cta-row reveal active mt-8 flex flex-wrap justify-center gap-4">
        <a href="/work" className="btn btn-primary inline-flex border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-utility text-[0.8rem] font-semibold text-[var(--bg-color)] no-underline transition-colors hover:bg-[var(--accent-dim)]">VIEW WORK</a>
        <a href="/about" className="btn btn-secondary inline-flex border border-[var(--accent)] bg-[var(--surface)] px-6 py-3 font-utility text-[0.8rem] font-semibold text-[var(--text-primary)] no-underline transition-colors hover:border-[var(--text-primary)] hover:bg-[var(--surface-elevated)]">EXPLORE THE LAB</a>
      </div>
    </section>
  );
}
