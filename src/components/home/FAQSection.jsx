import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  { q: 'Do I need prior programming experience to enroll?', a: 'No prior experience needed for beginner courses. We start from scratch and guide you step-by-step. For advanced programs, basic knowledge of programming may help but is not mandatory.' },
  { q: 'Are classes available online and offline?', a: 'Yes! We offer both online (live + recorded) and offline (classroom) options. You can choose the mode that suits your schedule and location.' },
  { q: 'Will I get placement support after the course?', a: 'Absolutely. EduPrajna provides dedicated placement assistance including resume building, mock interviews, and direct referrals to our 1000+ hiring partner network.' },
  { q: 'What certifications will I receive?', a: 'You\'ll receive an EduPrajna industry certification upon completion. For cloud/security courses, we also prepare you for official vendor certifications (AWS, Azure, CEH, etc.).' },
  { q: 'What are the batch timings?', a: 'We offer weekday (morning/evening) and weekend batches to accommodate both students and working professionals. Contact us for current batch schedules.' },
  { q: 'Is there an EMI or installment payment option?', a: 'Yes! We offer flexible EMI options through our banking partners. You can pay in 3 to 12 monthly installments with zero-cost EMI on select programs.' },
  { q: 'Can companies hire trained candidates from EduPrajna?', a: 'Yes. Companies can register on our Hire From Us page. We provide pre-screened, technically trained candidates tailored to your job requirements — free of charge for hiring partners.' },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm pr-4">{item.q}</span>
        <span className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
          {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500">Everything you need to know before enrolling.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
