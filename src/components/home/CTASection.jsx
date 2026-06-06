import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone, FiCheck } from 'react-icons/fi';

const perks = [
  'Free counseling session',
  'No commitment required',
  'Response within 30 mins',
  'Flexible batch timings',
];

export default function CTASection({ onEnrollClick, onCallbackClick }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-48 h-48 bg-emerald-50 rounded-full blur-2xl opacity-60" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >


          <h2 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
            Ready to Start Your{' '}
            <span className="relative">
              <span className="text-brand-600">Tech Career</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 340 12" fill="none">
                <path d="M2 9 C70 3, 180 3, 338 9" stroke="#c8e6be" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
            ?
          </h2>

          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 5,000+ professionals who transformed their careers with EduPrajna.
            Free counseling session — no commitment required.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnrollClick}
              className="btn-primary text-base px-8 py-4"
            >
              Customise Your Package <FiArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCallbackClick}
              className="btn-secondary text-base px-8 py-4"
            >
              <FiPhone className="w-4 h-4" /> Request Callback
            </motion.button>
          </div>

          {/* Perks grid */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {perks.map((perk) => (
              <span key={perk} className="flex items-center gap-1.5 text-sm text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                {perk}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
