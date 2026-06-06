import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiCpu, FiCode, FiCloud, FiShield, FiSliders, FiBarChart2, FiPhone, FiArrowRight } from 'react-icons/fi';
import courses from '../../data/courses.json';
import { getCourseIconData } from '../../utils/courseIcons';

const courseCategories = [
  {
    id: 'ai-data',
    label: 'AI & Data Science',
    icon: FiCpu,
    color: 'blue',
    courses: courses.filter(c => c.category === 'ai-data'),
  },
  {
    id: 'programming',
    label: 'Software Development',
    icon: FiCode,
    color: 'indigo',
    courses: courses.filter(c => c.category === 'programming'),
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: FiCloud,
    color: 'cyan',
    courses: courses.filter(c => c.category === 'cloud'),
  },
  {
    id: 'cybersecurity',
    label: 'Cyber Security',
    icon: FiShield,
    color: 'red',
    courses: courses.filter(c => c.category === 'cybersecurity'),
  },
  {
    id: 'embedded',
    label: 'Hardware & Embedded',
    icon: FiSliders,
    color: 'orange',
    courses: courses.filter(c => c.category === 'embedded'),
  },
  {
    id: 'business',
    label: 'Business Skills',
    icon: FiBarChart2,
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
    { label: 'Gallery', to: '/gallery' },
    { label: 'Hire From Us', to: '/hire' },
    { label: 'Blog', to: '/blog' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'nav-glass'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src="/logo.png" alt="EduPrajna" className="h-14 lg:h-16 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1" ref={megaRef}>
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname.startsWith('/courses')
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                      }`}
                    >
                      {link.label}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+918197719297"
                className="text-sm text-neutral-600 hover:text-neutral-900 font-medium transition-colors flex items-center gap-1.5"
              >
                <FiPhone className="w-3.5 h-3.5 text-brand-500" /> +91 81977 19297
              </a>
              <button
                onClick={onEnrollClick}
                className="btn-primary"
              >
                Free Counseling
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
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
              className="absolute top-full left-0 right-0 bg-white border-t border-neutral-100 shadow-2xl z-50"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
                {/* Category list */}
                <div className="w-64 flex-shrink-0 space-y-1">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">
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
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                  <Link
                    to="/courses"
                    onClick={() => setMegaOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 mt-2 text-sm font-semibold text-brand-600 hover:underline"
                  >
                    View All Courses <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Course cards for active category */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    {activeCategory.label}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {activeCategory.courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-neutral-800 group-hover:text-brand-600 transition-colors">
                            {course.title}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">{course.duration} • {course.level}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA card */}
                <div className="w-56 flex-shrink-0">
                  <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-5 text-white h-full flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-lg font-display leading-tight">Start Your Tech Career Today</p>
                      <p className="text-brand-100 text-xs mt-2">Free counseling session with our experts</p>
                    </div>
                    <button
                      onClick={() => { setMegaOpen(false); onEnrollClick(); }}
                      className="mt-4 bg-white text-brand-600 text-sm font-bold py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors"
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
                  className="block px-4 py-3 rounded-xl text-base font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => { setMobileOpen(false); onEnrollClick(); }}
                  className="w-full btn-primary text-base py-3.5"
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
