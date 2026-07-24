import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { number: 3, suffix: '', label: 'AI-Powered Products', prefix: '' },
  { number: 500, suffix: '+', label: 'Businesses Served', prefix: '' },
  { number: 99.9, suffix: '%', label: 'Platform Uptime', prefix: '' },
];

function AnimatedNumber({ target, suffix, prefix, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const isFloat = !Number.isInteger(target);

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setCount(isFloat ? current : Math.floor(current));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const isFloat = !Number.isInteger(target);
  const display = isFloat ? count.toFixed(1) : count.toLocaleString();

  return (
    <span ref={ref} className="stats-bar__number" aria-live="polite">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="stats-bar" aria-label="Global Top Group statistics">
      <div className="stats-bar__inner" role="list">
        {STATS.map((stat, i) => (
          <div className="stats-bar__item" key={i} role="listitem">
            <AnimatedNumber
              target={stat.number}
              suffix={stat.suffix}
              prefix={stat.prefix}
            />
            <p className="stats-bar__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
