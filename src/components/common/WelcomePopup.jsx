import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiAward, FiCheckCircle } from 'react-icons/fi';
import { submitToSheet, SHEET_NAMES } from '../../services/sheets';

const SESSION_KEY = 'ep_popup_shown';
const POPUP_DELAY_MS = 2000;
const CLOSE_LOCK_SECS = 5;

const courseOptions = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Python Programming',
  'Full Stack Development',
  'AWS Cloud',
  'DevOps Engineering',
  'Cyber Security',
  'Advanced Java',
  'Digital Marketing',
  'Other',
];

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(CLOSE_LOCK_SECS);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '' });

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, POPUP_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || canClose) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, canClose]);

  const handleClose = () => {
    if (!canClose) return;
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.POPUP, { ...form, source: 'Welcome Popup' });
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => setVisible(false), 3000);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={canClose ? handleClose : undefined}
          />

          {/* Modal Container Overlay with scroll capability */}
          <div className="fixed inset-0 z-[61] overflow-y-auto flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-8 pt-10 pb-8 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/5 rounded-full" />
                <div className="absolute top-4 -right-4 w-20 h-20 bg-white/5 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-brand-900/40 rounded-full" />

                {/* Close button */}
                <div className="absolute top-4 right-4">
                  {canClose ? (
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                      aria-label="Close popup"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">
                      <span className="text-white/80 text-xs font-bold font-mono">{countdown}</span>
                    </div>
                  )}
                </div>

                <div className="relative text-center">
                  <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <FiAward className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-white font-bold text-2xl font-['Sora'] leading-tight mb-1">
                    Start Your Learning Journey
                  </h2>
                  <p className="text-brand-100 text-sm">
                    Free counseling session · No commitment required
                  </p>
                </div>

                {!canClose && (
                  <p className="relative text-center text-brand-200 text-xs mt-3">
                    Close available in {countdown} second{countdown !== 1 ? 's' : ''}…
                  </p>
                )}
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-100">
                      <FiCheckCircle className="w-8 h-8 text-brand-600" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800 font-['Sora']">You're all set!</h3>
                    <p className="text-slate-500 text-sm mt-2">
                      Our advisor will reach out to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={set('name')}
                        required
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={set('phone')}
                        required
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={set('email')}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Interested Course</label>
                      <select
                        value={form.course}
                        onChange={set('course')}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all"
                      >
                        <option value="">Select a course</option>
                        {courseOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-200 disabled:opacity-70 mt-1"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Processing…
                        </span>
                      ) : (
                        <>Request Callback <FiArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-400">
                      Free session &nbsp;·&nbsp; No spam &nbsp;·&nbsp; Response in 30 min
                    </p>
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
