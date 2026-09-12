import { useEffect } from 'react';

export function ExperienceLayer() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scroll-ready');

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8%' },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => revealObserver.observe(element));

    return () => {
      root.classList.remove('scroll-ready');
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
