import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiAward } from 'react-icons/fi';

const points = [
  'Industry mentors with 10+ years of real-world experience',
  'Hands-on projects from Day 1 — portfolio-ready on graduation',
  'Dedicated placement cell with 1000+ company network',
  'Flexible batches — weekday, weekend, online & offline',
  'Career support until you land your first job',
];

const highlights = [
  { value: '5000+', label: 'Placed',  color: 'text-brand-600' },
  { value: '98%',   label: 'Rate',    color: 'text-emerald-600' },
  { value: '50+',   label: 'Mentors', color: 'text-brand-600' },
];

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl ring-1 ring-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="EduPrajna training center"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Award float card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="absolute -bottom-6 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiAward className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm font-['Sora']">#1 Rated EdTech</p>
                <p className="text-slate-500 text-xs">Bangalore 2024</p>
              </div>
            </motion.div>

            {/* Stats float row */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              className="absolute -top-5 left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-5"
            >
              {highlights.map((h, i) => (
                <div key={i} className={`text-center ${i < highlights.length - 1 ? 'pr-5 border-r border-slate-100' : ''}`}>
                  <p className={`font-['Sora'] font-bold text-lg ${h.color}`}>{h.value}</p>
                  <p className="text-xs text-slate-500">{h.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >

            <h2 className="section-title mb-5">
              We Don't Just Teach Technology.{' '}
              <span className="text-brand-600">We Build Careers.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-7 leading-relaxed">
              Founded with a mission to bridge the gap between education and industry, EduPrajna has trained over 5,000 professionals in cutting-edge technologies. Our curriculum is designed with hiring managers — not just educators.
            </p>
 
            <ul className="space-y-3 mb-8">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                  <span className="text-slate-600 text-sm">{point}</span>
                </motion.li>
              ))}
            </ul>
 
            <Link
              to="/about-us"
              className="btn-ghost"
            >
              Learn more about us{' '}
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
