import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { works } from '../../src/data/site';
import { WorkFilter } from '../../src/components/work/WorkFilter';

describe('WorkFilter', () => {
  it('filters work items by their category', async () => {
    const user = userEvent.setup();

    render(<WorkFilter works={works} />);

    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByText('06 SYSTEMS INDEXED')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Experiment' }));

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByText('02 SYSTEMS INDEXED')).toBeInTheDocument();
    expect(screen.getByText('Self-Reflecting Language Model')).toBeInTheDocument();
    expect(screen.queryByText('Contextual Query Engine')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Experiment' })).toHaveAttribute('aria-pressed', 'true');
  });
});
