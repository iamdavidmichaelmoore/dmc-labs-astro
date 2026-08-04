import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TerminalHero } from '../../src/components/hero/TerminalHero';

describe('TerminalHero', () => {
  it('renders each terminal line with a staged CSS reveal and custom copy', () => {
    render(<TerminalHero title="Custom title" subtitle="Custom subtitle" />);

    expect(screen.getByRole('heading', { name: 'Custom title' })).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
    expect(screen.getByText('dmc-labs@ai:~$ ./init_research.sh')).toBeVisible();
    expect(screen.getByText('[SUCCESS] 12 models loaded')).toHaveClass('success', 'visible');
    expect(screen.getByText('[SUCCESS] 12 models loaded')).toHaveStyle({ animationDelay: '1200ms' });
    expect(screen.getByText(/\] dmc-labs@ai:~\$$/)).toHaveClass('time', 'visible');
  });
});
