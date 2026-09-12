import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlsoRunning } from '../../src/components/home/AlsoRunning';

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
});
