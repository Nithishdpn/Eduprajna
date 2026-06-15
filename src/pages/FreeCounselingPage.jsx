import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck, FiArrowRight, FiUser, FiBookOpen } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import { submitToSheet, SHEET_NAMES } from '../services/sheets';
import { openWhatsApp } from '../services/whatsapp';

export default function FreeCounselingPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', courseInterest: '', background: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.CONTACT, { 
      ...form, 
      type: 'Free Counseling Request',
      message: `Course: ${form.courseInterest}\nBackground: ${form.background}`
    });
    setSubmitted(true);
    setLoading(false);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      <SEOHead 
        title="Free Counseling | EduPrajna Career Guidance"
        description="Book a free career counseling session with EduPrajna's tech experts. Get personalized guidance on software courses, bootcamps, and career paths."
        keywords="free counseling, career guidance, tech career, software courses, EduPrajna counseling"
      />
      <main className="pt-20 bg-white min-h-screen">

        {/* ── Header ── */}
        <section className="bg-gradient-to-br from-slate-50 to-brand-50/30 border-b border-slate-100 py-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-block bg-brand-100 text-brand-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-4">
                Expert Guidance
              </div>
              <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900 mb-4">Book Your Free Career Counseling</h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Confused about which tech stack to choose? Speak directly with our industry experts to map out your software career completely free of cost.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── Left: Why Counseling ── */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-7">Why Book a Session?</h2>
                <div className="space-y-6 mb-8">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Personalized Path</h3>
                      <p className="text-slate-600 text-sm">We analyze your educational background and suggest the exact technologies to learn.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FiBookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Industry Insights</h3>
                      <p className="text-slate-600 text-sm">Get real-time data on which skills are getting the highest packages this year.</p>
                    </div>
                  </div>
                  
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                  <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Quick Contact</h3>
                  <p className="text-slate-600 text-sm flex items-center gap-2 mb-2"><FiPhone className="text-brand-600"/> +91 81977 19297</p>
                  <p className="text-slate-600 text-sm flex items-center gap-2"><FiMail className="text-brand-600"/> support@eduprajna.com</p>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-green-100"
                >
                  <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp Now
                </button>

              </motion.div>
            </div>

            {/* ── Right: Counseling Form ── */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>

                <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">
                  <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-6">Schedule Your Callback</h2>
                  
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FiCheck className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-2">Request Received!</h3>
                      <p className="text-slate-500 mb-6">One of our expert counselors will call you shortly to discuss your career.</p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', courseInterest: '', background: '' }); }}
                        className="text-brand-600 font-semibold text-sm hover:underline"
                      >
                        Book another session
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={set('name')}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={set('phone')}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={set('email')}
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Technologies of Interest</label>
                          <select
                            required
                            value={form.courseInterest}
                            onChange={set('courseInterest')}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                          >
                            <option value="">Select an option</option>
                            <option value="Python Full Stack">Python Full Stack</option>
                            <option value="Java Full Stack">Java Full Stack</option>
                            <option value="Data Science & AI">Data Science & AI</option>
                            <option value="Cloud & DevOps">Cloud & DevOps</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Not Sure - Need Guidance">Not Sure - Need Guidance</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Status</label>
                          <select
                            required
                            value={form.background}
                            onChange={set('background')}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                          >
                            <option value="">Select an option</option>
                            <option value="College Student">College Student</option>
                            <option value="Recent Graduate">Recent Graduate</option>
                            <option value="Working Professional (IT)">Working Professional (IT)</option>
                            <option value="Working Professional (Non-IT)">Working Professional (Non-IT)</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-brand-100/50 disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
                      >
                        {loading ? 'Submitting…' : <>Request Free Counseling <FiArrowRight className="w-5 h-5" /></>}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
