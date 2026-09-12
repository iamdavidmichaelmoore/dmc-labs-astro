import type { BlogPost } from '../../data/site';

interface LatestNoteHeroProps {
  note: BlogPost;
}

export function LatestNoteHero({ note }: LatestNoteHeroProps) {
  const href = note.slug ? `/notes/${note.slug}` : '/notes';

  return (
    <section
      className="latest-note-hero mx-auto flex max-w-300 flex-col px-6 pb-16 pt-35 max-md:px-4 max-md:pb-12 max-md:pt-28"
      data-section="HOME"
      aria-labelledby="latest-note-title"
    >
      <p className="mb-4 font-utility text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        Latest note
      </p>
      <h1
        id="latest-note-title"
        className="font-display text-[clamp(2.25rem,6.5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]"
      >
        {note.title}
      </h1>
      <p className="mt-5 max-w-2xl font-body text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-[var(--text-secondary)]">
        {note.description}
      </p>
      <a
        href={href}
        className="mt-8 inline-flex w-fit items-center gap-2 font-body text-base font-semibold text-[var(--accent)] no-underline transition-colors hover:text-[var(--accent-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        Read the note <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
