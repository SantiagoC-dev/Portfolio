import { useEffect } from 'react';
// Content remains visible without IntersectionObserver or when reduced motion is requested.
export function useReveal(route) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, {
      rootMargin: '0px 0px -32px 0px',
      threshold: 0.05
    });
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(el => {
      if (el.getBoundingClientRect().top >= window.innerHeight) {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach(el => el.classList.remove('will-reveal', 'is-visible'));
    };
  }, [route]);
}
