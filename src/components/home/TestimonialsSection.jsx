import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import testimonials from '../../data/testimonials.json';
import { FiStar } from 'react-icons/fi';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const items = testimonials.slice(0, 6);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">
            Students Who Made It
          </h2>
          <p className="text-slate-500 text-lg">Real transformations, real careers.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.id || i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                "{t.review || t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm font-['Sora']">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : t.location ? ` · ${t.location}` : ''}</p>
                </div>
                {(t.courseName || t.course) && (
                  <span className="ml-auto text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-lg font-medium whitespace-nowrap">
                    {t.courseName || t.course}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
