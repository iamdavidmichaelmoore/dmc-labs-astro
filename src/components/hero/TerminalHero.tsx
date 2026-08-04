import { useEffect, useState } from 'react';

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
  const [shownLines, setShownLines] = useState<number[]>([]);

  const terminalLines: TerminalLine[] = [
    { text: `dmc-labs@ai:~$ ./init_research.sh`, delay: 0 },
    { text: `[SYSTEM] Initializing neural pathways...`, delay: 600 },
    { text: `[SUCCESS] 12 models loaded`, className: 'success', delay: 1200 },
    { text: `[CPU] 34% util — optimizing`, className: 'status', delay: 1800 },
    { text: `[PATH] /home/dmc/research/nlp`, delay: 2400 },
    { text: `[${new Date().toLocaleTimeString()}] dmc-labs@ai:~$`, className: 'time', delay: 3000 },
  ];

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    terminalLines.forEach((line, index) => {
      if (line.delay) {
        const timeout = setTimeout(() => {
          setShownLines(prev => [...prev, index]);
        }, line.delay);
        timeouts.push(timeout);
      } else {
        setShownLines(prev => [...prev, index]);
      }
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <section className="hero">
      <div className="terminal">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <div className="terminal-body">
          {terminalLines.map((line, index) => (
            <div
              key={index}
              className={`terminal-line ${line.className || ''} ${
                shownLines.includes(index) ? 'visible' : ''
              }`}
            >
              {shownLines.includes(index) && line.text}
            </div>
          ))}
        </div>
      </div>

      <h1 className="display">{title}</h1>
      {subtitle && <p>{subtitle}</p>}

      <div className="cta-row reveal active">
        <a href="/work" className="btn btn-primary">VIEW WORK</a>
        <a href="/about" className="btn btn-secondary">EXPLORE THE LAB</a>
      </div>
    </section>
  );
}
