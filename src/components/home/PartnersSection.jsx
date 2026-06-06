import { motion } from 'framer-motion';
import {
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaApple,
} from 'react-icons/fa';
import {
  SiMeta,
  SiNvidia,
  SiIntel,
  SiCisco,
  SiHp,
  SiSamsung,
  SiDell,
  SiAccenture,
  SiSpotify,
  SiSony,
  SiSiemens,
  SiHuawei,
  SiHonda,
  SiToyota,
} from 'react-icons/si';

const mncCompanies = [
  { icon: FaGoogle,      color: 'hover:text-blue-500' },
  { icon: FaAmazon,      color: 'hover:text-orange-500' },
  { icon: FaMicrosoft,   color: 'hover:text-sky-500' },
  { icon: FaApple,       color: 'hover:text-neutral-900' },
  { icon: SiMeta,        color: 'hover:text-blue-600' },
  { icon: SiNvidia,      color: 'hover:text-green-500' },
  { icon: SiIntel,       color: 'hover:text-blue-700' },
  { icon: SiCisco,       color: 'hover:text-sky-600' },
  { icon: SiHp,          color: 'hover:text-blue-600' },
  { icon: SiSamsung,     color: 'hover:text-blue-800' },
  { icon: SiDell,        color: 'hover:text-sky-500' },
  { icon: SiAccenture,   color: 'hover:text-purple-600' },
  { icon: SiSpotify,     color: 'hover:text-emerald-500' },
  { icon: SiSony,        color: 'hover:text-neutral-900' },
  { icon: SiSiemens,     color: 'hover:text-teal-600' },
  { icon: SiHuawei,      color: 'hover:text-red-600' },
  { icon: SiHonda,       color: 'hover:text-red-600' },
  { icon: SiToyota,      color: 'hover:text-red-700' },
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >

          <h2 className="section-title">
            Our Graduates Work At Top Global MNCs
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            Our students are placed in world-class organisations. We guide you from basic modules to advanced MNC clearance.
          </p>
        </motion.div>
      </div>

      {/* Infinite Seamless Scrolling Wavy Marquee */}
      <div className="relative w-full overflow-hidden py-20 my-4 select-none">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 items-center w-max"
          animate={{ x: [0, '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {/* Loop Set A */}
          <div className="flex gap-6 items-center pr-6">
            {mncCompanies.map((comp, i) => {
              const Icon = comp.icon;
              // Generate seamless sine wave yOffset (exactly 2 complete wave cycles)
              const angle = (i / mncCompanies.length) * Math.PI * 2 * 2;
              const yOffset = Math.sin(angle) * 32;

              return (
                <motion.div
                  key={`a-${i}`}
                  style={{ y: yOffset }}
                  animate={{
                    y: [yOffset - 6, yOffset + 6, yOffset - 6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-full shadow-md hover:shadow-xl flex items-center justify-center flex-shrink-0 transition-all cursor-pointer group hover:-translate-y-1"
                >
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:scale-110 transition-all ${comp.color}`} />
                </motion.div>
              );
            })}
          </div>

          {/* Loop Set B (Identical for seamless looping) */}
          <div className="flex gap-6 items-center pr-6">
            {mncCompanies.map((comp, i) => {
              const Icon = comp.icon;
              // Generate seamless sine wave yOffset (exactly 2 complete wave cycles)
              const angle = (i / mncCompanies.length) * Math.PI * 2 * 2;
              const yOffset = Math.sin(angle) * 32;

              return (
                <motion.div
                  key={`b-${i}`}
                  style={{ y: yOffset }}
                  animate={{
                    y: [yOffset - 6, yOffset + 6, yOffset - 6],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-full shadow-md hover:shadow-xl flex items-center justify-center flex-shrink-0 transition-all cursor-pointer group hover:-translate-y-1"
                >
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:scale-110 transition-all ${comp.color}`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="font-['Sora'] font-bold text-xl md:text-2xl text-slate-800 mb-4">
            Connect With Our Academic Advisors
          </h3>
          <button className="btn-primary">
            Speak To Career Advisors
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-slate-100"
        >
          <div className="text-center">
            <p className="font-['Sora'] font-bold text-4xl md:text-5xl text-brand-600 mb-1">5,000+</p>
            <p className="text-slate-600 text-sm font-medium">Students Placed</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-slate-200" />
          <div className="text-center">
            <p className="font-['Sora'] font-bold text-4xl md:text-5xl text-brand-600 mb-1">10,000+</p>
            <p className="text-slate-600 text-sm font-medium">Mock Tests Taken</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-slate-200" />
          <div className="text-center">
            <p className="font-['Sora'] font-bold text-4xl md:text-5xl text-brand-600 mb-1">100%</p>
            <p className="text-slate-600 text-sm font-medium">Custom Program Path</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
