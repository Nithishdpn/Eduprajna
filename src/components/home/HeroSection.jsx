import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const stats = [
  { value: '5000+', label: 'Students Placed' },
  { value: '98%', label: 'Placement Rate' },
  { value: '4.9★', label: 'Average Rating' },
];

const floatingBadges = [
  { icon: '🤖', text: 'AI & ML', color: 'bg-blue-50 border-blue-200 text-blue-700', pos: 'top-8 right-8' },
  { icon: '☁️', text: 'AWS Certified', color: 'bg-cyan-50 border-cyan-200 text-cyan-700', pos: 'top-32 -left-4' },
  { icon: '💼', text: 'Placement Support', color: 'bg-green-50 border-green-200 text-green-700', pos: 'bottom-28 right-4' },
  { icon: '🏆', text: '5000+ Students', color: 'bg-amber-50 border-amber-200 text-amber-700', pos: 'bottom-12 left-2' },
];

export default function HeroSection({ onEnrollClick }) {
  return (
    <section className="min-h-screen bg-white pt-24 pb-16 flex items-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(to right, #2563EB 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-700 mb-6"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Now Enrolling — July 2025 Batch
            </motion.div>

            <h1 className="font-['Sora'] font-extrabold text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-slate-900 mb-6">
              Learn{' '}
              <span className="relative">
                <span className="text-blue-600">Future Ready</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 9 C60 3, 140 3, 298 9" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Skills.{' '}
              <span className="text-slate-700">Build Real</span>{' '}
              <span className="text-emerald-600">Careers.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              Industry-focused programs, hands-on projects, expert mentorship, and career support designed for tomorrow's professionals.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEnrollClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-4 rounded-2xl text-base shadow-lg shadow-blue-200 transition-all"
              >
                Enroll Now
                <FiArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/courses"
                  className="flex items-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-7 py-4 rounded-2xl text-base bg-white hover:bg-slate-50 transition-all"
                >
                  Explore Courses
                </Link>
              </motion.div>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-6">
              {stats.map((s, i) => (
                <div key={i} className={`${i < stats.length - 1 ? 'pr-6 border-r border-slate-200' : ''}`}>
                  <p className="font-bold text-xl text-slate-900 font-['Sora']">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — illustrated card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main visual card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 aspect-[4/3.5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students learning"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-white/30"
                >
                  <FiPlay className="w-6 h-6 text-white ml-1" />
                </motion.div>
              </div>

              {/* Bottom card overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['#2563EB', '#059669', '#7C3AED', '#DC2626'].map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: c }}
                        >
                          {['R', 'P', 'K', 'A'][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Join 15,000+ learners</p>
                      <p className="text-white/60 text-xs">Building their future with EduPrajna</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`absolute ${badge.pos} flex items-center gap-2 ${badge.color} border rounded-xl px-3 py-2 text-xs font-semibold shadow-lg`}
              >
                <span>{badge.icon}</span>
                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
