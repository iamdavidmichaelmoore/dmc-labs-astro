import type { Work } from '../../data/site';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="card group relative overflow-hidden border border-[var(--surface-border)] bg-[var(--surface)] p-8 transition duration-200 hover:border-[var(--accent)] hover:bg-[var(--surface-elevated)]">
      <span className="card-tag font-utility text-[0.7rem] font-bold tracking-[0.5px] text-[var(--accent-dim)]">{work.category}</span>
      <h3 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">{work.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{work.description}</p>
      <span className="card-status mt-5 inline-block font-utility text-[0.7rem] font-bold tracking-[0.5px] text-[var(--accent-dim)]">{work.status}</span>
    </article>
  );
}
