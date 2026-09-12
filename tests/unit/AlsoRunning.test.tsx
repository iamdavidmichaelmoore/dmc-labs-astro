import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlsoRunning } from '../../src/components/home/AlsoRunning';
import { getActiveExperiments, works } from '../../src/data/site';

describe('AlsoRunning', () => {
  it('renders a quiet strip of experiments linking to /experiments', () => {
    render(
      <AlsoRunning
        experiments={[
          {
            id: 'contextual-query-engine',
            category: 'NLP Research',
            title: 'Contextual Query Engine',
            description: 'Query system',
            status: 'Active',
          },
        ]}
      />,
    );

    expect(screen.getByText(/also running/i)).toBeInTheDocument();
    expect(screen.getByText('Contextual Query Engine')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /experiments/i })).toHaveAttribute('href', '/experiments');
  });

  it('getActiveExperiments returns only Active items without padding', () => {
    const active = getActiveExperiments(works, 3);
    expect(active.length).toBe(2);
    expect(active.every(work => work.status === 'Active')).toBe(true);
    expect(active.map(work => work.id)).toEqual([
      'contextual-query-engine',
      'multimodal-annotation-studio',
    ]);
  });
});
