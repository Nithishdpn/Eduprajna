import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock, FiUsers, FiStar, FiCheck, FiCalendar, FiArrowLeft,
  FiChevronDown, FiChevronUp, FiMonitor, FiAward, FiAlertCircle, FiTerminal
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { CourseSEOHead } from '../components/common/SEOHead';
import courses from '../data/courses.json';
import { curriculumTopics } from '../data/curriculumTopics';
import { openWhatsAppForCourse } from '../services/whatsapp';
import { getCourseIconData } from '../utils/courseIcons';

// Upcoming batch schedule data per course
const batchSchedule = {
  default: [
    { date: 'July 15, 2025',   time: '7:00 – 9:00 AM',  mode: 'Online',  seats: 12, label: 'Weekday Morning' },
    { date: 'July 20, 2025',   time: '6:30 – 8:30 PM',  mode: 'Online',  seats: 8,  label: 'Weekday Evening' },
    { date: 'July 26, 2025',   time: '9:00 AM – 1:00 PM',mode: 'Offline', seats: 15, label: 'Weekend Batch' },
  ],
};

export default function CourseDetailPage({ onEnrollClick }) {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const [openModule, setOpenModule] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <main className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-3">Course not found</h1>
          <Link to="/courses" className="text-brand-600 font-semibold hover:underline">← Back to Courses</Link>
        </div>
      </main>
    );
  }

  const schedule = batchSchedule[course.slug] || batchSchedule.default;
  const tabs = ['overview', 'modules'];

  return (
    <>
      <CourseSEOHead course={course} />
      <main className="pt-20 bg-white min-h-screen">

      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-300 text-sm mb-6 hover:text-white transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>

                <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl mb-4 leading-tight">{course.title}</h1>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed max-w-2xl">{course.overview}</p>

                <div className="flex flex-wrap gap-5 text-sm">
                  <span className="flex items-center gap-2 text-slate-300"><FiClock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-2 text-slate-300"><FiUsers className="w-4 h-4" />{course.enrolled.toLocaleString()}+ enrolled</span>
                  <span className="flex items-center gap-2 text-amber-400 font-semibold">
                    <FiStar className="w-4 h-4 fill-current" />{course.rating} ({course.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-2 text-slate-300"><FiMonitor className="w-4 h-4" />{course.mode}</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Info card */}
            <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl ring-1 ring-slate-200">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-xl p-3 mb-4">
                  <FiCalendar className="w-4.5 h-4.5 text-brand-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-600 font-semibold">Next Batch</p>
                    <p className="font-bold text-slate-900 text-sm">Available Soon</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={onEnrollClick}
                    className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-sm"
                  >
                    Customise Course Package
                  </button>
                  <button
                    onClick={() => openWhatsAppForCourse(course.title)}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                  >
                    <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
                  </button>
                  <button
                    onClick={onEnrollClick}
                    className="w-full border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm"
                  >
                    Request Callback
                  </button>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {['Free career counseling', 'Placement support', 'Flexible schedules', 'Certificate on completion'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-brand-500 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tab navigation ── */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            {/* Skills */}
            <div>
              <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Skills You'll Learn</h2>
              <div className="flex flex-wrap gap-2.5">
                {course.skills.map((skill) => (
                  <span key={skill} className="bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2.5">
                {course.tools.map((tool) => (
                  <span key={tool} className="bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Support */}
            <div>
              <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Career Support Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  '1-on-1 Resume Building Session',
                  'LinkedIn Profile Optimization',
                  '5+ Mock Interview Rounds',
                  'Direct Referrals to 1000+ Companies',
                  'Job Portal Access (6 months)',
                  'Interview Q&A Practice Sheets',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-200 transition-colors">
                    <FiAward className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Modules tab */}
        {activeTab === 'modules' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-8">Course Curriculum & Learning Roadmap</h2>
            
            <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-100 ml-4 sm:ml-6 space-y-8 py-2">
              {course.curriculum.map((mod, i) => {
                const topics = curriculumTopics[course.slug]?.[mod.module] || [];
                return (
                  <div key={i} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-slate-300 text-slate-600 flex items-center justify-center text-xs sm:text-sm font-bold font-['Sora'] group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {mod.module}
                    </div>

                    {/* Content card */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 sm:p-7 hover:bg-white hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden">
                      {/* Subtle tech background highlight */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-300" />
                      
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 font-['Sora'] tracking-wide">
                          MODULE {mod.module}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">
                          {mod.lessons} lessons
                        </span>
                      </div>

                      <h3 className="font-['Sora'] font-bold text-slate-800 text-lg sm:text-xl mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {mod.title}
                      </h3>

                      {topics.length > 0 && (
                        <div>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 font-['Sora']">
                            What We Teach:
                          </p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {topics.map((topic, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <span className="text-slate-600 text-sm leading-relaxed">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}



        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-8 text-center text-white"
        >
          <h3 className="font-['Sora'] font-bold text-2xl mb-2">Interested in {course.title}?</h3>
          <p className="text-brand-50 mb-6 text-sm">
            Next batch: Available Soon. Connect with us to customise your course package.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnrollClick}
              className="bg-white text-brand-700 font-bold px-8 py-3 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Customise Course Package
            </button>
            <button
              onClick={() => openWhatsAppForCourse(course.title)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <FaWhatsapp className="w-4 h-4" /> WhatsApp
            </button>
          </div>
        </motion.div>
      </section>
    </main>
    </>
  );
}
