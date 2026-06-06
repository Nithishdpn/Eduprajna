import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '5000+',  label: 'Active Students' },
  { value: '10500+', label: 'Classes Completed' },
  { value: '1000+',  label: 'Hiring Partners' },
  { value: '50+',    label: 'Expert Instructors' },
];

function AnimatedCounter({ target, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const duration = 1500;
    const step = Math.max(1, Math.ceil(numeric / (duration / 16)));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, numeric);
      setCount(current);
      if (current >= numeric) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const numeric = parseInt(target.replace(/\D/g, ''), 10);
  const plus = target.includes('+');

  return (
    <span>
      {count >= numeric ? target : count.toLocaleString() + (plus ? '+' : '')}
    </span>
  );
}

export default function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-10 bg-transparent border-t border-slate-100/80 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 text-center"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-4 border-slate-200 ${i < stats.length - 1 ? 'md:border-r' : ''}`}
            >
              <p className="text-3xl sm:text-4xl font-extrabold font-['Sora'] text-slate-900 mb-1">
                <AnimatedCounter target={stat.value} inView={inView} />
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

