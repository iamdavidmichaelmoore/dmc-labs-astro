import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LatestNoteHero } from '../../src/components/home/LatestNoteHero';

describe('LatestNoteHero', () => {
  it('renders the latest note as the editorial hero', () => {
    render(
      <LatestNoteHero
        note={{
          slug: 'self-correction-in-llms',
          date: '2024-07-15',
          title: 'Self-Correction in LLMs',
          description: 'What held up in practice.',
        }}
      />,
    );

    expect(screen.getByText(/latest note/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Self-Correction in LLMs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the note/i })).toHaveAttribute(
      'href',
      '/notes/self-correction-in-llms',
    );
  });
});
