import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const metrics = [
  { value: '5000+', label: 'Students Trained', icon: '🎓', color: 'blue' },
  { value: '10500+', label: 'Classes Completed', icon: '📚', color: 'indigo' },
  { value: '1000+', label: 'Hiring Partners', icon: '🤝', color: 'emerald' },
  { value: '50+', label: 'Expert Trainers', icon: '👨‍🏫', color: 'violet' },
  { value: '15000+', label: 'Learners Community', icon: '🌐', color: 'cyan' },
];

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  violet: 'bg-violet-50 text-violet-600',
  cyan: 'bg-cyan-50 text-cyan-600',
};

export default function MetricsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-['Sora'] font-bold text-4xl text-slate-900 mb-4"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Thousands of students have transformed their careers through EduPrajna's industry-aligned programs.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-blue-100"
            >
              <div className={`w-12 h-12 ${colorMap[m.color]} rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                {m.icon}
              </div>
              <p className="font-['Sora'] font-extrabold text-3xl text-slate-900 mb-1">{m.value}</p>
              <p className="text-sm text-slate-500 leading-tight">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
