export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface FlyoutContent {
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

const flyouts: Record<string, FlyoutContent> = {
  '/': {
    title: 'DMC Labs',
    excerpt: 'Experimental AI systems for practical research and creative work.',
    image: '/flyouts/home.svg',
    imageAlt: 'Abstract terminal and system diagram',
  },
  '/about': {
    title: 'The Lab',
    excerpt: 'Independent research focused on transparent, useful AI.',
    image: '/flyouts/lab.svg',
    imageAlt: 'Abstract research network diagram',
  },
  '/work': {
    title: 'Selected systems',
    excerpt: 'Query engines, annotation tools, and efficient model research.',
    image: '/flyouts/work.svg',
    imageAlt: 'Abstract model pipeline diagram',
  },
  '/blog': {
    title: 'Research log',
    excerpt: 'Notes from experiments in language, reasoning, and systems.',
    image: '/flyouts/log.svg',
    imageAlt: 'Abstract research note diagram',
  },
  '#contact': {
    title: 'Start a conversation',
    excerpt: 'Reach the lab for research collaborations and systems work.',
    image: '/flyouts/contact.svg',
    imageAlt: 'Abstract signal diagram',
  },
};

interface WireframeNavProps {
  items?: NavItem[];
}

export function WireframeNav({ items = [] }: WireframeNavProps) {
  if (items.length === 0) {
    return (
      <nav className="site-nav fixed top-5 left-1/2 z-1000 flex h-15 w-[calc(100%-2rem)] max-w-300 -translate-x-1/2 items-center px-5 max-md:top-3 max-md:min-h-13 max-md:h-auto max-md:w-[calc(100%-1.5rem)] max-md:px-4">
        <a href="/" className="brand-lockup font-display text-sm font-bold tracking-tight text-[var(--text-primary)] no-underline">
          <BrandMark />
          <span>DMC LABS</span>
        </a>
      </nav>
    );
  }

  return (
    <nav className="site-nav fixed top-5 left-1/2 z-1000 flex h-15 w-[calc(100%-2rem)] max-w-300 -translate-x-1/2 items-center max-md:top-3 max-md:min-h-13 max-md:h-auto max-md:w-[calc(100%-1.5rem)]" style={{ paddingInline: '24px' }}>
      <a href="/" className="brand-lockup shrink-0 font-display text-sm font-bold tracking-tight text-[var(--text-primary)] no-underline">
        <BrandMark />
        <span>DMC LABS</span>
      </a>
      <div className="flex min-w-0 items-center gap-7 max-md:gap-3 max-md:overflow-x-auto" style={{ marginLeft: 'auto' }}>
        {items.map(item => {
          const flyout = flyouts[item.href];
          const flyoutName = item.href === '/' ? 'home' : item.href.replace(/[^a-z]/g, '');
          const flyoutPosition = item.href === '/' || item.href === '/about' ? 'left-0' : 'right-0';

          return (
            <div key={item.href} className="group relative">
              <a
                href={item.href}
                className={`font-utility text-[0.75rem] tracking-[0.5px] no-underline transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)] max-md:whitespace-nowrap max-md:text-[0.65rem] ${item.active ? 'border-b border-[var(--accent)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
              >
                {item.label.toUpperCase()}
              </a>
              {flyout && (
                <div className={`nav-flyout nav-flyout-${flyoutName} invisible absolute ${flyoutPosition} top-[calc(100%+14px)] w-[min(21rem,calc(100vw-2rem))] translate-y-[-4px] opacity-0 shadow-2xl transition duration-180 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:hidden`}>
                  <img src={flyout.image} alt={flyout.imageAlt} className="h-24 w-full object-cover" loading="lazy" />
                  <div style={{ padding: '18px' }}>
                    <p className="font-utility text-[0.6rem] tracking-[1px] text-[var(--accent)]">NAVIGATE</p>
                    <h2 className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]">{flyout.title}</h2>
                    <p className="mt-2 text-sm leading-5 text-[var(--text-secondary)]">{flyout.excerpt}</p>
                    <span className="mt-3 inline-block font-utility text-[0.65rem] font-bold tracking-[0.7px] text-[var(--accent)]">OPEN →</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
import { BrandMark } from './BrandMark';
