import { BrandMark } from './BrandMark';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface SiteNavProps {
  items?: NavItem[];
}

export function SiteNav({ items = [] }: SiteNavProps) {
  return (
    <nav
      className="site-nav fixed top-5 left-1/2 z-1000 flex h-15 w-[calc(100%-2rem)] max-w-300 -translate-x-1/2 items-center px-6 max-md:top-3 max-md:min-h-13 max-md:h-auto max-md:w-[calc(100%-1.5rem)] max-md:px-4"
      aria-label="Primary"
    >
      <a
        href="/"
        className="brand-lockup shrink-0 font-display text-sm font-bold tracking-tight text-[var(--text-primary)] no-underline"
      >
        <BrandMark />
        <span>DMC Labs</span>
      </a>

      {items.length > 0 && (
        <div className="ml-auto flex min-w-0 items-center gap-7 max-md:gap-3 max-md:overflow-x-auto">
          {items.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`font-body text-sm no-underline transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] max-md:whitespace-nowrap max-md:text-[0.8rem] ${
                item.active
                  ? 'border-b border-[var(--accent)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
