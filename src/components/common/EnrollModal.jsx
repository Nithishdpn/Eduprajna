import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { submitToSheet, SHEET_NAMES } from '../../services/sheets';

export default function EnrollModal({ isOpen, onClose, defaultCourse = '' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: defaultCourse });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setForm((prev) => ({ ...prev, course: defaultCourse }));
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultCourse]);

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
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
            >
               {/* Header */}
              <div className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-8 py-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <h2 className="text-white font-bold text-2xl font-['Sora']">Customise Your Package</h2>
                  <p className="text-brand-100 text-sm mt-1">Design your custom syllabus, schedule, and training bundle</p>
                </div>
              </div>

              {/* Form */}
              <div className="px-8 py-7">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800 font-['Sora']">Preference Received!</h3>
                    <p className="text-slate-500 text-sm mt-2">
                      Our academic advisor will contact you to review your custom plan.
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
                          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Selected Course Profile</label>
                      <select
                        value={form.course}
                        onChange={(e) => setForm({ ...form, course: e.target.value })}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                      >
                        <option value="">Select a course to customise</option>
                        {['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'Full Stack Development', 'AWS Cloud', 'DevOps', 'Cyber Security', 'Java', 'Digital Marketing', 'Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-3.5 rounded-xl text-base transition-all disabled:opacity-70 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {loading ? 'Processing...' : <>Get Customised Package <FiArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
