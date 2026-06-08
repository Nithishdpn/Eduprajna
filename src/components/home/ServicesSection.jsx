import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiVideo, FiMonitor, FiSettings, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <FiVideo className="w-5 h-5 text-brand-600" />,
    title: 'Content Creation',
    desc: 'Professional video production, editing, and multimedia content for education and marketing.',
    tags: ['Video', 'Animation', 'Script'],
    image: '/assets/images/services/service_content.png',
    category: 'Media Production',
  },
  {
    icon: <FiMonitor className="w-5 h-5 text-brand-600" />,
    title: 'Software Development',
    desc: 'Full-stack web and mobile app development tailored to your business requirements.',
    tags: ['React', 'Node.js', 'Mobile'],
    image: '/assets/images/services/service_software.png',
    category: 'Engineering & Apps',
  },
  {
    icon: <FiSettings className="w-5 h-5 text-brand-600" />,
    title: 'Process Automation',
    desc: 'Automate repetitive workflows, data pipelines, and business processes with smart scripts.',
    tags: ['Python', 'RPA', 'APIs'],
    image: '/assets/images/services/service_automation.png',
    category: 'Workflows & Scripting',
  },
  {
    icon: <FiCpu className="w-5 h-5 text-brand-600" />,
    title: 'LLM & AI Integration',
    desc: 'Custom AI solutions, LLM-powered apps, chatbots, and intelligent automation systems.',
    tags: ['GPT', 'LangChain', 'RAG'],
    image: '/assets/images/services/service_ai.png',
    category: 'Cognitive Computing',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const topBorderVariants = {
    initial: { width: '0%', opacity: 0 },
    hover: { 
      width: '100%', 
      opacity: 1, 
      transition: { duration: 0.4, ease: 'easeInOut' } 
    }
  };

  return (
    <section ref={ref} className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle decorative background blur elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Our Expertise</span>
          <h2 className="font-['Syne'] font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-2 mb-4">
            Beyond Education — We Build Solutions
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Technology services for startups, enterprises, and individuals looking to leverage modern tech.
          </p>
        </motion.div>

        {/* Standard 4-Column Responsive Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileHover="hover"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, delay: i * 0.08 }
                },
                hover: {
                  y: -6,
                  boxShadow: '0 12px 24px rgba(124, 179, 66, 0.12)',
                  borderColor: 'rgba(124, 179, 66, 0.4)',
                  transition: { duration: 0.3 }
                }
              }}
              className="group bg-white border border-slate-200/70 rounded-2xl p-5 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden transition-colors duration-300"
            >
              {/* Top Accent Loading Line (Uiverse Style) */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-100/60 rounded-t-2xl overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-400 to-emerald-500"
                  variants={topBorderVariants}
                />
              </div>

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* 3D Illustration Container */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-slate-50 border border-slate-100">
                    <motion.img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      variants={{
                        hover: { scale: 1.05, transition: { duration: 0.4 } }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Icon badge inside the image */}
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.4
                      }}
                      className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-md border border-slate-100/50 flex items-center justify-center"
                    >
                      {s.icon}
                    </motion.div>
                  </div>

                  <div className="text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-1">
                    {s.category}
                  </div>
                  <h3 className="font-['Syne'] font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-700 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-slate-50 border border-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-md font-medium group-hover:bg-brand-50/80 group-hover:border-brand-100 group-hover:text-brand-700 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
                    >
                      Enquire Now 
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




