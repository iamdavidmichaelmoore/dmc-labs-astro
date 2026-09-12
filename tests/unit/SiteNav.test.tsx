import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SiteNav } from '../../src/components/layout/SiteNav';

describe('SiteNav', () => {
  it('renders Experiments, Notes, and About without flyout chrome', () => {
    render(
      <SiteNav
        items={[
          { label: 'Experiments', href: '/experiments', active: true },
          { label: 'Notes', href: '/notes' },
          { label: 'About', href: '/about' },
        ]}
      />,
    );

    const experiments = screen.getByRole('link', { name: /experiments/i });
    expect(experiments).toHaveAttribute('href', '/experiments');
    expect(experiments).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /notes/i })).toHaveAttribute('href', '/notes');
    expect(screen.getByRole('link', { name: /notes/i })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(document.querySelector('.nav-flyout')).toBeNull();
  });
});
