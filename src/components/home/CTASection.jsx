import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

export default function CTASection({ onEnrollClick, onCallbackClick }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Limited Seats — July 2025 Batch
          </span>

          <h2 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl text-slate-900 leading-tight mb-6">
            Ready To Start Your{' '}
            <span className="text-blue-600">Tech Career?</span>
          </h2>

          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 5,000+ professionals who transformed their careers with EduPrajna. 
            Free counseling session — no commitment required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnrollClick}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-blue-200 transition-all"
            >
              Enroll Now <FiArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCallbackClick}
              className="flex items-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-2xl text-base bg-white hover:bg-slate-50 transition-all"
            >
              <FiPhone className="w-4 h-4" /> Request Callback
            </motion.button>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            ✓ Free counseling &nbsp; ✓ No spam &nbsp; ✓ Response within 30 mins
          </p>
        </motion.div>
      </div>
    </section>
  );
}
