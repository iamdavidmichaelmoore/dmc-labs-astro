import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TerminalHero } from '../../src/components/hero/TerminalHero';

describe('TerminalHero', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reveals each terminal line in sequence and applies custom copy', () => {
    vi.useFakeTimers();

    render(<TerminalHero title="Custom title" subtitle="Custom subtitle" />);

    expect(screen.getByRole('heading', { name: 'Custom title' })).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
    expect(screen.queryByText('[SUCCESS] 12 models loaded')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3_000);
    });

    expect(screen.getByText('dmc-labs@ai:~$ ./init_research.sh')).toBeVisible();
    expect(screen.getByText('[SUCCESS] 12 models loaded')).toHaveClass('success', 'visible');
    expect(screen.getByText(/\] dmc-labs@ai:~\$$/)).toHaveClass('time', 'visible');
  });
});
