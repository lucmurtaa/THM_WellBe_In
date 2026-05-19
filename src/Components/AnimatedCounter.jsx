import React, { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const targetValue = Number(value);
    const decimals = String(value).includes('.') ? String(value).split('.')[1].length : 0;
    const duration = 1400;

    const animate = () => {
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        const nextValue = (targetValue * eased).toFixed(decimals);
        setDisplayValue(`${prefix}${nextValue}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefix, suffix, value]);

  return (
    <span ref={ref} data-count={value} data-suffix={suffix}>
      {displayValue}
    </span>
  );
}