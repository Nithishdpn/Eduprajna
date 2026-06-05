import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import courses from '../../data/courses.json';

const courseCategories = [
  {
    id: 'ai-data',
    label: 'AI & Data Science',
    icon: '🤖',
    color: 'blue',
    courses: courses.filter(c => c.category === 'ai-data'),
  },
  {
    id: 'programming',
    label: 'Software Development',
    icon: '💻',
    color: 'indigo',
    courses: courses.filter(c => c.category === 'programming'),
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: 'cyan',
    courses: courses.filter(c => c.category === 'cloud'),
  },
  {
    id: 'cybersecurity',
    label: 'Cyber Security',
    icon: '🔒',
    color: 'red',
    courses: courses.filter(c => c.category === 'cybersecurity'),
  },
  {
    id: 'embedded',
    label: 'Hardware & Embedded',
    icon: '🔧',
    color: 'orange',
    courses: courses.filter(c => c.category === 'embedded'),
  },
  {
    id: 'business',
    label: 'Business Skills',
    icon: '📊',
    color: 'green',
    courses: courses.filter(c => c.category === 'business'),
  },
];

export default function Navbar({ onEnrollClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(courseCategories[0]);
  const megaRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Courses', to: '/courses', hasMega: true },
    { label: 'Hire From Us', to: '/hire' },
    { label: 'Blog', to: '/blog' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm font-['Sora']">EP</span>
              </div>
              <span className="font-bold text-xl text-slate-900 font-['Sora'] tracking-tight">
                EduPrajna
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1" ref={megaRef}>
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setMegaOpen(!megaOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname.startsWith('/courses')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onEnrollClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl z-50"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
                {/* Category list */}
                <div className="w-64 flex-shrink-0 space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                    Categories
                  </p>
                  {courseCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setActiveCategory(cat)}
                      onClick={() => {
                        setMegaOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                        activeCategory.id === cat.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                  <Link
                    to="/courses"
                    className="flex items-center gap-2 px-3 py-2.5 mt-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    View All Courses →
                  </Link>
                </div>

                {/* Course cards for active category */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {activeCategory.label}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {activeCategory.courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 group transition-colors"
                      >
                        <span className="text-2xl">{course.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{course.duration} • {course.level}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA card */}
                <div className="w-56 flex-shrink-0">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white h-full flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-lg font-['Sora'] leading-tight">Start Your Tech Career Today</p>
                      <p className="text-blue-100 text-xs mt-2">Free counseling session with our experts</p>
                    </div>
                    <button
                      onClick={() => { setMegaOpen(false); onEnrollClick(); }}
                      className="mt-4 bg-white text-blue-600 text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Request Callback
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white pt-16 overflow-y-auto lg:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => { setMobileOpen(false); onEnrollClick(); }}
                  className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl text-base"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
