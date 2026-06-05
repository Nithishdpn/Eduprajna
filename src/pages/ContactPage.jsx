import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { submitToSheet, SHEET_NAMES } from '../services/sheets';
import { openWhatsApp } from '../services/whatsapp';

const tabs = ['Student Enquiry', 'Company / Hiring', 'Service Client'];

const contactInfo = [
  { icon: <FiPhone className="w-5 h-5" />, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: <FiMail className="w-5 h-5" />, label: 'Email', value: 'info@eduprajna.com', href: 'mailto:info@eduprajna.com' },
  { icon: <FiMapPin className="w-5 h-5" />, label: 'Address', value: '2nd Floor, Tech Hub, Koramangala, Bangalore – 560034' },
  { icon: <FiClock className="w-5 h-5" />, label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM' },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.CONTACT, { ...form, type: tabs[activeTab] });
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Contact</span>
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900 mb-3">Get In Touch</h1>
            <p className="text-slate-500 text-lg max-w-xl">Whether you're a student, company, or looking for tech services — we're here to help.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-5 mb-8">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-0.5">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-slate-700 font-medium text-sm hover:text-blue-600 transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-slate-700 font-medium text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => openWhatsApp()} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-green-100 mb-4">
                <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
              </button>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="font-semibold text-blue-800 text-sm mb-1">⚡ Quick Response</p>
                <p className="text-blue-600 text-xs leading-relaxed">We respond to all enquiries within 30 minutes during business hours.</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              {/* Tabs */}
              <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
                {tabs.map((tab, i) => (
                  <button key={i} onClick={() => { setActiveTab(i); setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === i ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}>
                    {tab}
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
                    <p className="text-slate-500">We'll get back to you within 30 minutes.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                      className="mt-6 text-blue-600 font-semibold text-sm hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text' },
                        { name: 'phone', label: 'Phone Number', type: 'tel' },
                        { name: 'email', label: 'Email Address', type: 'email' },
                      ].map(f => (
                        <div key={f.name} className={f.name === 'email' ? 'sm:col-span-2' : ''}>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                          <input type={f.type} required value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/40" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {activeTab === 0 ? 'Course Interest / Message' : activeTab === 1 ? 'Hiring Requirement' : 'Project Description'}
                      </label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder={
                          activeTab === 0 ? "Tell us about the course you're interested in or any questions..."
                          : activeTab === 1 ? "Describe the role, skills required, number of positions..."
                          : "Describe your project, technology needs, and timeline..."
                        }
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none bg-slate-50/40" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-blue-100 disabled:opacity-70">
                      {loading ? 'Sending...' : 'Send Message →'}
                    </button>
                    <p className="text-center text-xs text-slate-400">We'll respond within 30 minutes. No spam, ever.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
