import type { Work } from '../../data/site';

interface AlsoRunningProps {
  experiments: Work[];
}

export function AlsoRunning({ experiments }: AlsoRunningProps) {
  return (
    <section
      className="also-running mx-auto max-w-300 border-t border-[var(--surface-border)] px-6 py-14 max-md:px-4 max-md:py-10"
      data-section="ALSO RUNNING"
      aria-labelledby="also-running-heading"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2
          id="also-running-heading"
          className="font-utility text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]"
        >
          Also running
        </h2>
        <a
          href="/experiments"
          className="font-body text-sm font-semibold text-[var(--accent)] no-underline transition-colors hover:text-[var(--accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          All experiments →
        </a>
      </div>

      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6 p-0">
        {experiments.map(experiment => (
          <li
            key={experiment.id}
            className="rounded-sm border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-4"
          >
            <p className="mb-2 font-utility text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-faint)]">
              {experiment.status}
            </p>
            <p className="font-display text-lg font-semibold leading-snug tracking-tight text-[var(--text-primary)]">
              {experiment.title}
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              {experiment.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
