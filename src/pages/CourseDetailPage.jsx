import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiStar, FiCheck, FiCalendar, FiArrowLeft, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import courses from '../data/courses.json';
import { openWhatsAppForCourse } from '../services/whatsapp';

export default function CourseDetailPage({ onEnrollClick }) {
  const { slug } = useParams();
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <main className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">Course not found</h1>
          <Link to="/courses" className="text-blue-600 font-semibold hover:underline">← Back to Courses</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-300 text-sm mb-6 hover:text-white transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{course.icon}</span>
                  {course.badge && (
                    <span className="bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>
                <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl mb-4 leading-tight">{course.title}</h1>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed max-w-2xl">{course.overview}</p>

                <div className="flex flex-wrap gap-5 text-sm">
                  <span className="flex items-center gap-2 text-slate-300"><FiClock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-2 text-slate-300"><FiUsers className="w-4 h-4" />{course.enrolled}+ enrolled</span>
                  <span className="flex items-center gap-2 text-amber-400 font-semibold"><FiStar className="w-4 h-4 fill-current" />{course.rating} ({course.reviews} reviews)</span>
                  <span className="flex items-center gap-2 text-slate-300">📡 {course.mode}</span>
                  <span className="flex items-center gap-2 text-slate-300">📊 {course.level}</span>
                </div>
              </motion.div>
            </div>

            {/* Price card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl">
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-slate-100">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="mb-5">
                  <span className="font-['Sora'] font-extrabold text-3xl text-slate-900">₹{course.price.toLocaleString()}</span>
                  <span className="text-slate-400 text-lg line-through ml-3">₹{course.originalPrice.toLocaleString()}</span>
                  <span className="ml-2 text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-lg">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
                  <FiCalendar className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs text-amber-600 font-medium">Upcoming Batch</p>
                    <p className="font-semibold text-slate-900 text-sm">{course.upcomingBatch}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onEnrollClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 text-base"
                  >
                    Enroll Now
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Skills You'll Learn</h2>
          <div className="flex flex-wrap gap-2.5">
            {course.skills.map(skill => (
              <span key={skill} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-3.5 py-1.5 rounded-xl">
                <FiCheck className="w-3.5 h-3.5" /> {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Curriculum */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Course Curriculum</h2>
          <div className="space-y-3">
            {course.curriculum.map((mod, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 font-['Sora']">
                  {mod.module}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{mod.lessons} lessons</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Tools & Technologies</h2>
          <div className="flex flex-wrap gap-2.5">
            {course.tools.map(tool => (
              <span key={tool} className="bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Real-World Projects</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {course.projects.map((proj, i) => (
              <div key={i} className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <span className="text-2xl">🛠️</span>
                <span className="font-medium text-slate-800 text-sm">{proj}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Support */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Career Support</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              '1-on-1 Resume Building Session',
              'LinkedIn Profile Optimization',
              '5+ Mock Interview Rounds',
              'Direct Referrals to 1000+ Companies',
              'Job Portal Access (6 months)',
              'Interview Q&A Practice Sheets',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center text-white"
        >
          <h3 className="font-['Sora'] font-bold text-2xl mb-3">Ready to Enroll?</h3>
          <p className="text-blue-100 mb-6 text-sm">Next batch starts {course.upcomingBatch}. Limited seats available.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={onEnrollClick} className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Enroll Now
            </button>
            <button onClick={() => openWhatsAppForCourse(course.title)} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              <FaWhatsapp className="w-4 h-4" /> WhatsApp
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
