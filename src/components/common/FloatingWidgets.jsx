import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiX, FiMessageCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsApp } from '../../services/whatsapp';
import { submitToSheet, SHEET_NAMES } from '../../services/sheets';

export default function FloatingWidgets({ onCallbackClick }) {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.CALLBACK, form);
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      setCallbackOpen(false);
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', course: '' });
    }, 2500);
  };

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWhatsApp()}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg flex items-center justify-center"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />
        </motion.button>

        {/* Callback */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCallbackOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg flex items-center justify-center"
          title="Request Callback"
        >
          <FiPhone className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Callback modal */}
      <AnimatePresence>
        {callbackOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCallbackOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 22 }}
              className="fixed bottom-24 right-5 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-blue-600 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base font-['Sora']">Request Callback</p>
                  <p className="text-blue-200 text-xs mt-0.5">We'll call you within 30 minutes</p>
                </div>
                <button onClick={() => setCallbackOpen(false)} className="text-white/70 hover:text-white">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5">
                {submitted ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✅</span>
                    </div>
                    <p className="font-semibold text-slate-800">Thank you!</p>
                    <p className="text-sm text-slate-500 mt-1">We'll call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {[
                      { name: 'name', placeholder: 'Your Name', type: 'text' },
                      { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                      { name: 'email', placeholder: 'Email Address', type: 'email' },
                    ].map((f) => (
                      <input
                        key={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        required={f.name !== 'email'}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    ))}
                    <select
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Interested Course (Optional)</option>
                      {['AI / Machine Learning', 'Data Science', 'Python', 'Full Stack', 'AWS', 'DevOps', 'Cyber Security', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-70"
                    >
                      {loading ? 'Submitting...' : 'Request Callback'}
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
