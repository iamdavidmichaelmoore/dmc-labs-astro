import { useEffect } from 'react';

export function ExperienceLayer() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('scroll-ready');

    const updateProgress = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maximum > 0 ? Math.round((window.scrollY / maximum) * 100) : 0;
      root.style.setProperty('--scroll-illumination', `${0.025 + (nextProgress / 100) * 0.1}`);
    };

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
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      root.classList.remove('scroll-ready');
      root.style.removeProperty('--scroll-illumination');
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return null;
}
