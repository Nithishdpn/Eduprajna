import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { submitToSheet, SHEET_NAMES } from '../../services/sheets';

export default function EnrollModal({ isOpen, onClose, defaultCourse = '' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: defaultCourse });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.POPUP, form);
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', course: '' });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h2 className="text-white font-bold text-2xl font-['Sora']">Enroll Now</h2>
                  <p className="text-blue-100 text-sm mt-1">Free counseling + batch details</p>
                </div>
              </div>

              {/* Form */}
              <div className="px-8 py-7">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="font-bold text-xl text-slate-800 font-['Sora']">You're all set!</h3>
                    <p className="text-slate-500 text-sm mt-2">
                      Our counselor will reach out to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', required: true },
                      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
                      { name: 'email', label: 'Email Address', type: 'email', required: false },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.name]}
                          onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                          required={f.required}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Interested Course</label>
                      <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Select a course</option>
                        {['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'Full Stack Development', 'AWS Cloud', 'DevOps', 'Cyber Security', 'Java', 'Digital Marketing', 'Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-all disabled:opacity-70 shadow-sm hover:shadow-md"
                    >
                      {loading ? 'Processing...' : 'Enroll Now →'}
                    </button>
                    <p className="text-center text-xs text-slate-400">
                      No spam. Free counseling session included.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
