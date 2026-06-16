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
  const [activeFaq, setActiveFaq] = useState(null);

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

  const schedule = batchSchedule[course.id] || batchSchedule.default;
  const tabs = ['overview', 'modules'];

  const relatedCourses = courses
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

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

                <div className="flex flex-wrap gap-5 text-sm mb-8">
                  <span className="flex items-center gap-2 text-slate-300"><FiClock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-2 text-slate-300"><FiUsers className="w-4 h-4" />{course.enrolled.toLocaleString()}+ enrolled</span>
                  <span className="flex items-center gap-2 text-amber-400 font-semibold">
                    <FiStar className="w-4 h-4 fill-current" />{course.rating} ({course.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-2 text-slate-300"><FiMonitor className="w-4 h-4" />{course.mode}</span>
                </div>

                {/* Key Projects and Highlights grid to fill the vertical space */}
                <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-6 max-w-2xl">
                  <div>
                    <h3 className="font-['Sora'] font-bold text-sm text-white mb-2.5 flex items-center gap-2">
                      <FiTerminal className="w-4 h-4 text-brand-400" />
                      Key Projects You'll Build
                    </h3>
                    <ul className="space-y-1.5">
                      {course.projects.map((proj) => (
                        <li key={proj} className="flex items-center gap-2 text-xs text-blue-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-['Sora'] font-bold text-sm text-white mb-2.5 flex items-center gap-2">
                      <FiAward className="w-4 h-4 text-brand-400" />
                      Program Highlights
                    </h3>
                    <ul className="space-y-1.5">
                      {[
                        'Audited ISO 9001 & 29990 Quality Standards',
                        'Real-time lab exercises & projects',
                        'Live mentoring & doubt clearing sessions',
                        'Direct referral channel for placements',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-blue-100">
                          <FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Info Block to Fill Space */}
                <div className="border-t border-white/10 pt-5 mt-5 grid sm:grid-cols-2 gap-6 max-w-2xl">
                  <div>
                    <h3 className="font-['Sora'] font-bold text-sm text-white mb-2 flex items-center gap-2">
                      <FiUsers className="w-4 h-4 text-brand-400" />
                      Who is this course for?
                    </h3>
                    <p className="text-xs text-blue-100/80 leading-relaxed">
                      Designed for college students, fresh graduates, and working professionals looking to transition into top-tier tech roles.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-['Sora'] font-bold text-sm text-white mb-2 flex items-center gap-2">
                      <FiCheck className="w-4 h-4 text-brand-400" />
                      Course Prerequisites
                    </h3>
                    <p className="text-xs text-blue-100/80 leading-relaxed">
                      No prior coding knowledge needed. We cover everything from programming fundamentals to production-ready deployments.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Info card */}
            <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl ring-1 ring-slate-200">
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover object-top" />
                </div>

                <div className="flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-xl p-3 mb-4">
                  <FiCalendar className="w-4.5 h-4.5 text-brand-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-brand-600 font-semibold">Next Batch</p>
                    <p className="font-bold text-slate-900 text-sm">Available Soon</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onEnrollClick}
                    className="btn-primary w-full py-3 text-sm justify-center shadow-lg"
                  >
                    Customise Course Package
                  </button>
                  <button
                    onClick={() => openWhatsAppForCourse(course.title)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3 rounded-xl transition-all hover:from-emerald-600 hover:to-green-700 hover:shadow-lift active:scale-[0.97] text-sm shadow-md"
                  >
                    <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
                  </button>
                  <button
                    onClick={onEnrollClick}
                    className="btn-secondary w-full py-3 text-sm justify-center"
                  >
                    Request Callback
                  </button>
                </div>
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
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content & Additional Sections ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

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
                const topics = curriculumTopics[course.id]?.[mod.module] || [];
                return (
                  <div key={i} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-slate-300 text-slate-600 flex items-center justify-center text-xs sm:text-sm font-bold font-['Sora'] group-hover:bg-brand-600 group-hover:border-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {mod.module}
                    </div>

                    {/* Content card */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 sm:p-7 hover:bg-white hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 relative overflow-hidden">
                      {/* Subtle tech background highlight */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-500/10 transition-colors duration-300" />
                      
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-brand-100 font-['Sora'] tracking-wide">
                          MODULE {mod.module}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold">
                          {mod.lessons} lessons
                        </span>
                      </div>

                      <h3 className="font-['Sora'] font-bold text-slate-800 text-lg sm:text-xl mb-4 group-hover:text-brand-600 transition-colors duration-300">
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
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
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

        {/* Certificate Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1 space-y-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider font-['Sora']">
              Earn Credentials
            </span>
            <h2 className="font-['Sora'] font-bold text-3xl text-slate-900 leading-tight">
              Get Certified Upon Completion
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Showcase your skills with an industry-recognized certificate from EduPrajna. Our training and certification processes are fully audited and ISO 9001:2015 & ISO 29990:2010 certified, ensuring you receive world-class education standards.
            </p>
            <ul className="space-y-2.5">
              {[
                'Verifiable Certificate ID & URL',
                'Shareable directly on LinkedIn and Resume',
                'Recognized by 1000+ Hiring Partners',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <FiCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-80 max-w-sm flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-lg relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="border-2 border-double border-slate-300 rounded-xl p-6 text-center space-y-4 relative">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>CERTIFICATE ID: EP-{course.id.toUpperCase().substring(0,6)}</span>
                <span>ISO 9001:2015</span>
              </div>
              <div className="space-y-1">
                <p className="font-['Syne'] font-extrabold text-lg text-slate-900 tracking-wide">EDUPRAJNA</p>
                <p className="text-[8px] text-slate-400 font-semibold tracking-widest uppercase">Technologies Pvt Ltd</p>
              </div>
              <p className="text-[10px] text-slate-400 italic">This is to certify that</p>
              <div className="border-b border-slate-200 pb-1">
                <p className="font-['Sora'] font-bold text-slate-800 text-base">Your Name Here</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                has successfully completed the professional training program in
                <span className="font-semibold text-slate-800 block mt-0.5">{course.title}</span>
              </p>
              <div className="flex justify-between items-end pt-4 text-[9px] text-slate-400 font-mono">
                <div className="text-left">
                  <p className="border-t border-slate-200 pt-1">HEAD OF ACADEMICS</p>
                </div>
                <div className="text-right">
                  <p className="border-t border-slate-200 pt-1">DIRECTOR</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Programs Section */}
        <div className="space-y-6">
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900">Other Popular Programs</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {relatedCourses.map((rel) => (
              <Link
                key={rel.id}
                to={`/courses/${rel.slug}`}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    {rel.categoryLabel}
                  </span>
                  <h4 className="font-['Sora'] font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] line-clamp-2 mb-3 flex-1">
                    {rel.overview}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50">
                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{rel.duration}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <FiStar className="w-3 h-3 fill-current" /> {rel.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Course-Specific FAQ Section */}
        <div className="space-y-6">
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: `Who is this ${course.title} course designed for?`,
                a: `This course is designed for both beginners wishing to enter the tech sector and professionals seeking to upgrade their skills. Our curriculum starts with foundational concepts and advances to complex real-world projects.`
              },
              {
                q: 'What are the batch timings and schedules?',
                a: 'We offer flexible learning schedules, including weekday morning batches, weekday evening batches for working professionals, and comprehensive weekend batches. You can customize your timeline during enrollment.'
              },
              {
                q: 'Does this program include hands-on project experience?',
                a: 'Yes, every module features mandatory practical exercises. You will build actual industry-level projects (listed in the course details) that you can showcase in your professional portfolio.'
              },
              {
                q: 'How does the placement support system work?',
                a: 'Upon completing 80% of the course, you gain access to our placement support: mock interviews, resume review sessions, LinkedIn profile audit, and direct referrals to our network of 1000+ hiring partners.'
              },
              {
                q: 'Can I attend the classes both online and offline?',
                a: 'Yes, we support a hybrid structure. You can attend live online lectures or join our physical classrooms and lab facilities. Recorded sessions are also archived for review.'
              }
            ].map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4.5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                    <span className="flex-shrink-0 w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 border border-slate-100">
                      {isOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4.5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3.5">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

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
