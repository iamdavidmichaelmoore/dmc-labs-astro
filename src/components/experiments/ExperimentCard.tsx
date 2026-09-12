import type { Work } from '../../data/site';

interface ExperimentCardProps {
  work: Work;
}

export function ExperimentCard({ work }: ExperimentCardProps) {
  return (
    <article className="experiment-card rounded-sm border border-[var(--surface-border)] bg-[var(--surface)] p-8 transition duration-200 hover:border-[var(--accent)] hover:bg-[var(--surface-elevated)]">
      <span className="font-utility text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--text-faint)]">
        {work.category}
      </span>
      <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
        {work.title}
      </h2>
      <p className="mt-3 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
        {work.description}
      </p>
      <span className="mt-5 inline-block rounded-sm border border-[var(--surface-border)] bg-[var(--surface-elevated)] px-2.5 py-1 font-utility text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
        {work.status}
      </span>
    </article>
  );
}
