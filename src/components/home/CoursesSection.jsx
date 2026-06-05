import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import courses from '../../data/courses.json';

const featured = courses.slice(0, 9);

const badgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
  red: 'bg-red-100 text-red-700',
};

export default function CoursesSection({ onEnrollClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              Programs
            </span>
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 leading-tight">
              Most Popular Courses
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-xl">
              Industry-aligned curriculum built with hiring managers. Real projects, real skills.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm border border-blue-200 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              View All Courses <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
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
                <span className="absolute top-3 right-3 text-2xl">{course.icon}</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-slate-400 font-medium">{course.categoryLabel}</span>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mt-1 mb-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {course.overview}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" />{course.duration}</span>
                  <span className="flex items-center gap-1"><FiUsers className="w-3.5 h-3.5" />{course.enrolled}+ enrolled</span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <FiStar className="w-3.5 h-3.5 fill-current" />{course.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="font-bold text-slate-900 text-lg font-['Sora']">
                      ₹{course.price.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm line-through ml-2">
                      ₹{course.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Details <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
