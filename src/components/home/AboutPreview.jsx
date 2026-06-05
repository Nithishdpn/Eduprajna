import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const points = [
  'Industry mentors with 10+ years of real experience',
  'Hands-on projects from Day 1, not just theory',
  'Dedicated placement cell with 1000+ company network',
  'Flexible batches — weekday, weekend, online & offline',
  'Career support until you land your first job',
];

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="EduPrajna training center"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
                🏆
              </div>
              <div>
                <p className="font-bold text-slate-900 text-base font-['Sora']">#1 Rated</p>
                <p className="text-slate-500 text-xs">EdTech in Bangalore 2024</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              About EduPrajna
            </span>
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-5 leading-tight">
              We Don't Just Teach Technology.{' '}
              <span className="text-blue-600">We Build Careers.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-7 leading-relaxed">
              Founded with a mission to bridge the gap between education and industry, EduPrajna has trained over 5,000 professionals in cutting-edge technologies. Our curriculum is designed with hiring managers — not just educators.
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <FiCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{point}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn more about us <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
