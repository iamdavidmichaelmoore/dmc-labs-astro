import { useMemo, useState } from 'react';
import type { Work } from '../../data/site';
import { WorkCard } from './WorkCard';

interface WorkFilterProps {
  works: Work[];
}

export function WorkFilter({ works }: WorkFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(
    () => ['All', ...new Set(works.map(work => work.category))],
    [works],
  );
  const filteredWorks = activeCategory === 'All'
    ? works
    : works.filter(work => work.category === activeCategory);

  return (
    <>
      <div className="filter-bar" aria-label="Filter work by category">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">
        {String(filteredWorks.length).padStart(2, '0')} SYSTEMS INDEXED
      </p>
      <div className="grid work-grid" aria-live="polite">
        {filteredWorks.map(work => <WorkCard key={work.id} work={work} />)}
      </div>
    </>
  );
}
