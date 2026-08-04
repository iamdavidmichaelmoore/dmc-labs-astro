import { useEffect, useState } from 'react';

interface ArticleTocProps {
  items: { id: string; label: string }[];
}

export function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const current = entries.find(entry => entry.isIntersecting);
        if (current) setActiveId(current.target.id);
      },
      { rootMargin: '-20% 0px -65%', threshold: 0 },
    );

    items.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="article-toc" aria-label="Article sections">
      <span className="toc-label">ARTICLE INDEX</span>
      {items.map(item => (
        <a key={item.id} href={`#${item.id}`} className={item.id === activeId ? 'active' : ''}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
