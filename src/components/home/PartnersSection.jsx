import { motion } from 'framer-motion';

const partners = [
  'TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture', 'Cognizant',
  'IBM', 'Capgemini', 'Tech Mahindra', 'Mphasis', 'Mindtree', 'L&T Infotech',
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function PartnersSection() {
  return (
    <section className="py-14 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Our graduates are placed at India's top companies
        </p>
      </div>

      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex items-center gap-10"
          style={{ width: 'max-content' }}
        >
          {allPartners.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-12 px-8 bg-white border border-slate-200 rounded-xl shadow-sm min-w-max"
            >
              <span className="text-slate-600 font-bold text-sm tracking-wide font-['Sora']">
                {name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
