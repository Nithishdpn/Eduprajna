import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp } from '../../services/whatsapp';
import { submitToSheet, SHEET_NAMES } from '../../services/sheets';

const courseOptions = [
  'AI / Machine Learning',
  'Data Science',
  'Python',
  'Full Stack',
  'AWS Cloud',
  'DevOps',
  'Cyber Security',
  'Other',
];

export default function FloatingWidgets({ onCallbackClick }) {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.CALLBACK, { ...form, source: 'Floating Widget' });
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setCallbackOpen(false);
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', course: '' });
    }, 2800);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      {/* ── Floating action buttons ── */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.2, type: 'spring', damping: 14 }}
          className="flex items-center gap-2 group"
        >
          <AnimatePresence>
            <motion.span
              className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              Chat on WhatsApp
            </motion.span>
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.93 }}
            onClick={() => openWhatsApp()}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg flex items-center justify-center transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-7 h-7" />
          </motion.button>
        </motion.div>

        {/* Callback */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.4, type: 'spring', damping: 14 }}
          className="flex items-center gap-2 group"
        >
          <motion.span
            className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
          >
            Request Callback
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setCallbackOpen(true)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg flex items-center justify-center transition-colors"
            aria-label="Request Callback"
          >
            <FiPhone className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* ── Callback slide-up panel ── */}
      <AnimatePresence>
        {callbackOpen && (
          <>
            <motion.div
              key="cb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCallbackOpen(false)}
              className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50"
            />
            <motion.div
              key="cb-panel"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="fixed bottom-28 right-5 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-100"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base font-['Sora']">Request Callback</p>
                  <p className="text-blue-200 text-xs mt-0.5">We'll call you within 30 minutes</p>
                </div>
                <button onClick={() => setCallbackOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5">
                {submitted ? (
                  <div className="text-center py-5">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiCheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-semibold text-slate-800 font-['Sora']">Thank you!</p>
                    <p className="text-sm text-slate-500 mt-1">We'll call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                      { name: 'name',  placeholder: 'Your Name',     type: 'text',  required: true },
                      { name: 'phone', placeholder: 'Phone Number',  type: 'tel',   required: true },
                      { name: 'email', placeholder: 'Email Address', type: 'email', required: false },
                    ].map((f) => (
                      <input
                        key={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={set(f.name)}
                        required={f.required}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50 transition-all"
                      />
                    ))}
                    <select
                      value={form.course}
                      onChange={set('course')}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50 transition-all"
                    >
                      <option value="">Interested Course (Optional)</option>
                      {courseOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-70"
                    >
                      {loading ? 'Submitting…' : 'Request Callback'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
