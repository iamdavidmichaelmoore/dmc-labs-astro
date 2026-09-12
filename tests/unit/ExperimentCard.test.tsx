import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExperimentCard } from '../../src/components/experiments/ExperimentCard';

describe('ExperimentCard', () => {
  it('shows title, description, and status chip', () => {
    render(
      <ExperimentCard
        work={{
          id: 'contextual-query-engine',
          category: 'NLP Research',
          title: 'Contextual Query Engine',
          description: 'Open-source query system.',
          status: 'Active',
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Contextual Query Engine' })).toBeInTheDocument();
    expect(screen.getByText('Open-source query system.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
