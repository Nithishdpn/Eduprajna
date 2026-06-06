import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiUsers, FiStar, FiArrowRight, FiCalendar, FiFilter, FiBookOpen, FiCpu, FiCode, FiCloud, FiShield, FiSliders, FiBarChart2 } from 'react-icons/fi';
import SEOHead from '../components/common/SEOHead';
import { generatePageSEO } from '../utils/seo';
import courses from '../data/courses.json';
import { getCourseIconData } from '../utils/courseIcons';

const categories = [
  { id: 'all',          label: 'All Courses' },
  { id: 'ai-data',      label: 'AI & Data Science' },
  { id: 'programming',  label: 'Software Dev' },
  { id: 'cloud',        label: 'Cloud & DevOps' },
  { id: 'cybersecurity',label: 'Cyber Security' },
  { id: 'embedded',     label: 'Hardware' },
  { id: 'business',     label: 'Business Skills' },
];

const badgeColors = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
  red:    'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-800',
};

export default function CoursesPage({ onEnrollClick }) {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  
  const seoData = generatePageSEO('courses');

  const filtered = useMemo(() => {
    let list = active === 'all' ? courses : courses.filter((c) => c.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.overview.toLowerCase().includes(q) ||
          c.categoryLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, search]);

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <main className="pt-20 min-h-screen bg-white">

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-100 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900 leading-tight">
              Browse Our Courses
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Search + filter row ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses…"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-slate-50/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <FiFilter className="w-4 h-4" />
            <span>{filtered.length} course{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex gap-6 overflow-x-auto pb-3 mb-10 scrollbar-hide border-b border-slate-100">
          {categories.map((cat) => {
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex-shrink-0 px-2 py-1.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  active === cat.id
                    ? 'text-brand-500 font-extrabold scale-[1.03]'
                    : 'text-slate-500 hover:text-brand-500'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Course Grid ── */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
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
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs text-slate-400 font-medium">{course.categoryLabel}</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0">
                      {course.mode}
                    </span>
                  </div>
                  <h3 className="font-['Sora'] font-bold text-slate-900 text-base leading-tight mb-2">{course.title}</h3>
                  <p className="text-slate-500 text-xs mb-3 line-clamp-2 flex-1">{course.overview}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <FiStar className="w-3 h-3 fill-current" />{course.rating}
                    </span>
                    <span className="flex items-center gap-1"><FiUsers className="w-3 h-3" />{course.enrolled}+</span>
                  </div>

                  {/* Batch info */}
                  <div className="flex items-center gap-1.5 bg-brand-50 border border-brand-100 rounded-lg px-2.5 py-1.5 mb-3">
                    <FiCalendar className="w-3 h-3 text-brand-600 flex-shrink-0" />
                    <span className="text-xs text-brand-700 font-semibold">Next batch: Available Soon</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <button
                      onClick={onEnrollClick}
                      className="w-full text-xs font-bold bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white py-2 rounded-lg transition-all hover:shadow-md active:scale-[0.98]"
                    >
                      Customize Package
                    </button>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="text-xs font-semibold text-brand-700 border border-brand-200 hover:bg-brand-50 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1 w-full"
                    >
                      View Details <FiArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <FiSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No courses found.</p>
            <p className="text-slate-400 text-sm">Try a different search or category.</p>
          </motion.div>
        )}
      </section>
    </main>
    </>
  );
}
