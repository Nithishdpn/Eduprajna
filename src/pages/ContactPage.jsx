import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck, FiMessageSquare, FiBriefcase, FiCode, FiZap, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import { generatePageSEO } from '../utils/seo';
import { submitToSheet, SHEET_NAMES } from '../services/sheets';
import { openWhatsApp } from '../services/whatsapp';

const tabs = [
  { label: 'Student Enquiry',    icon: <FiMessageSquare className="w-4 h-4" />, placeholder: "Tell us about the course you're interested in or any questions…" },
  { label: 'Company / Hiring',   icon: <FiBriefcase className="w-4 h-4" />,     placeholder: "Describe the role, skills required, number of positions…" },
  { label: 'Service Client',     icon: <FiCode className="w-4 h-4" />,          placeholder: "Describe your project, technology needs, and timeline…" },
];

const contactInfo = [
  { icon: <FiPhone className="w-5 h-5" />,  label: 'Phone',   value: '+91 81977 19297',                      href: 'tel:+918197719297',           color: 'emerald' },
  { icon: <FiMail className="w-5 h-5" />,   label: 'Email',   value: 'support@eduprajna.com',                   href: 'mailto:support@eduprajna.com',   color: 'emerald' },
  { icon: <FiMapPin className="w-5 h-5" />, label: 'Address', value: '2nd Floor, Eduprajna 1433/A, Nehru Rd, above Ramdev Hi Fashion, Kullappa Circle, Subbayianiah Palyam, Kammanahalli, Bengaluru, Karnataka 560084.', href: null, color: 'emerald' },
  { icon: <FiClock className="w-5 h-5" />,  label: 'Hours',   value: 'Mon–Fri: 8 AM – 5 PM',                href: null,                          color: 'emerald' },
];

const colorMap = {
  blue:   { bg: 'bg-blue-50',    icon: 'text-blue-600' },
  indigo: { bg: 'bg-indigo-50',  icon: 'text-indigo-600' },
  emerald:{ bg: 'bg-brand-50',   icon: 'text-brand-600' },
  amber:  { bg: 'bg-amber-50',   icon: 'text-amber-600' },
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const seoData = generatePageSEO('contact');

  const handleTabChange = (i) => {
    setActiveTab(i);
    setSubmitted(false);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.CONTACT, { ...form, type: tabs[activeTab].label });
    setSubmitted(true);
    setLoading(false);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <main className="pt-20 bg-white min-h-screen">

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-50 to-brand-50/30 border-b border-slate-100 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900">Get In Touch</h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Left: Contact Info ── */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-7">Contact Information</h2>
              <div className="space-y-5 mb-8">
                {contactInfo.map((info, i) => {
                  const c = colorMap[info.color] || colorMap.emerald;
                  return (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className={`w-11 h-11 ${c.bg} ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-slate-700 font-medium text-sm hover:text-brand-600 transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-700 font-medium text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={() => openWhatsApp()}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-green-100 mb-5"
              >
                <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
              </button>


            </motion.div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>

              {/* Tab selector */}
              <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => handleTabChange(i)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === i
                        ? 'bg-white text-slate-900 shadow-sm font-semibold'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <FiCheck className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 mb-6">We'll get back to you within 30 minutes.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                      className="text-brand-600 font-semibold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'name',  label: 'Full Name',     type: 'text' },
                        { name: 'phone', label: 'Phone Number',  type: 'tel' },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                          <input
                            type={f.type}
                            required
                            value={form[f.name]}
                            onChange={set(f.name)}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                          />
                        </div>
                      ))}
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
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {tabs[activeTab].label === 'Student Enquiry'
                          ? 'Course Interest / Message'
                          : tabs[activeTab].label === 'Company / Hiring'
                          ? 'Hiring Requirement'
                          : 'Project Description'}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder={tabs[activeTab].placeholder}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none bg-white transition-all text-slate-800"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-brand-100/50 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Sending…' : <>Send Message <FiArrowRight className="w-5 h-5" /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Map embed ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-5">Find Us</h2>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-80 bg-slate-100 relative">
            {/* Using a placeholder map embed. Replace src with actual Google Maps embed URL */}
            <iframe
              src="https://maps.google.com/maps?q=Eduprajna%201433/A,%20Nehru%20Rd,%20Kammanahalli,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EduPrajna Location — Kammanahalli, Bangalore"
            />
          </div>
        </motion.div>
      </section>
    </main>
    </>
  );
}
