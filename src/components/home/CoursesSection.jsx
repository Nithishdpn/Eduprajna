import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiUsers, FiStar, FiCalendar } from 'react-icons/fi';
import courses from '../../data/courses.json';
import { getCourseIconData } from '../../utils/courseIcons';

const featured = courses.slice(0, 4);

const badgeColors = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
  red:    'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-800',
};

export default function CoursesSection({ onEnrollClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >

            <h2 className="section-title mb-4">
              Most Popular Courses
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-xl">
              Industry-aligned curriculum built with hiring managers. Real projects, real skills, real placements.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold text-sm border border-brand-200 px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors"
            >
              View All Courses <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((course, i) => {
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  {course.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg ${badgeColors[course.badgeColor] || badgeColors.blue}`}>
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs text-slate-400 font-medium">{course.categoryLabel}</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0">
                    {course.mode}
                  </span>
                </div>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mt-1 mb-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                  {course.overview}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5" />{course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="w-3.5 h-3.5" />{course.enrolled.toLocaleString()}+
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <FiStar className="w-3.5 h-3.5 fill-current" />{course.rating}
                  </span>
                </div>

                {/* Batch info */}
                <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-xl px-3 py-2 mb-4">
                  <FiCalendar className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                  <span className="text-xs text-brand-700 font-semibold">
                    Next batch: Available Soon
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={onEnrollClick}
                    className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:shadow-lg active:scale-[0.98]"
                  >
                    Customize Your Package
                  </button>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 border border-brand-200 hover:bg-brand-50 w-full py-2.5 rounded-xl transition-all"
                  >
                    View Full Curriculum <FiArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ); })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg"
          >
            Explore All 12 Courses <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
