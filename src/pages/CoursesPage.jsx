import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiUsers, FiStar, FiArrowRight } from 'react-icons/fi';
import courses from '../data/courses.json';

const categories = [
  { id: 'all', label: 'All Courses', icon: '📚' },
  { id: 'ai-data', label: 'AI & Data Science', icon: '🤖' },
  { id: 'programming', label: 'Software Dev', icon: '💻' },
  { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️' },
  { id: 'cybersecurity', label: 'Cyber Security', icon: '🔒' },
  { id: 'embedded', label: 'Hardware', icon: '🔧' },
  { id: 'business', label: 'Business Skills', icon: '📊' },
];

const badgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
};

export default function CoursesPage({ onEnrollClick }) {
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = active === 'all' ? courses : courses.filter(c => c.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.overview.toLowerCase().includes(q));
    }
    return list;
  }, [active, search]);

  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              All Programs
            </span>
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900 mb-3 leading-tight">
              Browse Our Courses
            </h1>
            <p className="text-slate-500 text-lg">
              Industry-aligned programs with placement support. Find your path.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 mb-10 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                {course.badge && (
                  <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-lg ${badgeColors[course.badgeColor] || badgeColors.blue}`}>
                    {course.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 text-xl">{course.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-['Sora'] font-bold text-slate-900 text-base mb-1 leading-tight">{course.title}</h3>
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">{course.overview}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold"><FiStar className="w-3 h-3 fill-current" />{course.rating}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="font-bold text-slate-900 text-sm font-['Sora']">₹{course.price.toLocaleString()}</span>
                  <Link to={`/courses/${course.slug}`} className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                    Details <FiArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-slate-500">No courses found. Try a different search.</p>
          </div>
        )}
      </section>
    </main>
  );
}
