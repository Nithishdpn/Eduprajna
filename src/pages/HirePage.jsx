import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiUsers, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import { submitToSheet, SHEET_NAMES } from '../services/sheets';
import { openWhatsAppHiring } from '../services/whatsapp';
import { FaWhatsapp } from 'react-icons/fa';

const whyHire = [
  { icon: <FiShield className="w-6 h-6" />, title: 'Pre-Screened Talent', desc: 'Every candidate is tested on technical skills before reaching you. No filtering needed.' },
  { icon: <FiZap className="w-6 h-6" />, title: 'Fast Turnaround', desc: 'Get a curated shortlist within 48-72 hours. Zero recruitment delays.' },
  { icon: <FiUsers className="w-6 h-6" />, title: '5000+ Trained Candidates', desc: 'Access our talent pool across AI, development, cloud, security, and more.' },
  { icon: <FiTrendingUp className="w-6 h-6" />, title: 'Zero Hiring Cost', desc: 'No fees for hiring partners. We believe in building long-term relationships.' },
];

const talentCategories = [
  { icon: '🤖', title: 'AI / ML Engineers', skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'] },
  { icon: '💻', title: 'Full Stack Developers', skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'] },
  { icon: '☁️', title: 'Cloud / DevOps Engineers', skills: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
  { icon: '📊', title: 'Data Analysts', skills: ['SQL', 'Python', 'Power BI', 'Tableau'] },
  { icon: '🔒', title: 'Cyber Security Analysts', skills: ['CEH', 'VAPT', 'SIEM', 'Network Security'] },
  { icon: '📱', title: 'Mobile Developers', skills: ['Android', 'iOS', 'React Native', 'Flutter'] },
];

const hiringSteps = [
  { step: '01', title: 'Submit Requirement', desc: 'Fill in your hiring form with role, skills, and headcount.' },
  { step: '02', title: 'We Shortlist', desc: 'Our placement team curates matching profiles within 48 hours.' },
  { step: '03', title: 'Interview', desc: 'Schedule interviews directly with shortlisted candidates.' },
  { step: '04', title: 'Hire & Onboard', desc: 'Select and onboard — we assist with the entire process.' },
];

export default function HirePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', requirement: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.HIRING, form);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Corporate Hiring
            </span>
            <h1 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl mb-5 leading-tight">
              Hire <span className="text-blue-400">Job-Ready</span> Tech Talent
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Access pre-trained, industry-ready candidates across AI, development, cloud, and cybersecurity. Zero hiring fees.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#hire-form" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-2">
                Submit Hiring Requirement <FiArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => openWhatsAppHiring()} className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-4 rounded-2xl transition-all text-sm">
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm text-blue-200">
              {['Zero Hiring Cost', '48-Hour Turnaround', '1000+ Partner Companies', 'Pre-Screened Candidates'].map(item => (
                <span key={item} className="flex items-center gap-2"><FiCheck className="w-4 h-4 text-blue-400" />{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Hire */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Why Hire From EduPrajna?</h2>
            <p className="text-slate-500 text-lg">We do the heavy lifting so you get the right talent, fast.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyHire.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Available Talent Categories</h2>
            <p className="text-slate-500 text-lg">Trained professionals ready for immediate deployment.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {talentCategories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mb-3">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(s => (
                    <span key={s} className="text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-medium">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Our Hiring Process</h2>
            <p className="text-slate-500">Simple, fast, and transparent.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white font-['Sora'] font-bold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                  {step.step}
                </div>
                <h3 className="font-['Sora'] font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Form */}
      <section id="hire-form" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Submit Your Requirement</h2>
            <p className="text-slate-500">Tell us what you need. We'll get back within 24 hours.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-4xl">🎉</span>
                </div>
                <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500">Our hiring team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Your Name', type: 'text' },
                    { name: 'phone', label: 'Phone Number', type: 'tel' },
                    { name: 'email', label: 'Work Email', type: 'email' },
                    { name: 'company', label: 'Company Name', type: 'text' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                      <input type={f.type} required value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Hiring Requirement</label>
                  <textarea required rows={4} value={form.requirement} onChange={e => setForm({ ...form, requirement: e.target.value })}
                    placeholder="Describe the role, skills required, number of positions, and timeline..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-blue-100 disabled:opacity-70">
                  {loading ? 'Submitting...' : 'Submit Requirement →'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
