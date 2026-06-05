import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🎬',
    title: 'Content Creation',
    desc: 'Professional video production, editing, and multimedia content for education and marketing.',
    tags: ['Video', 'Animation', 'Script'],
    color: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
  },
  {
    icon: '💻',
    title: 'Software Development',
    desc: 'Full-stack web and mobile app development tailored to your business requirements.',
    tags: ['React', 'Node.js', 'Mobile'],
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
  },
  {
    icon: '⚙️',
    title: 'Process Automation',
    desc: 'Automate repetitive workflows, data pipelines, and business processes with smart scripts.',
    tags: ['Python', 'RPA', 'APIs'],
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
  },
  {
    icon: '🤖',
    title: 'LLM & AI Integration',
    desc: 'Custom AI solutions, LLM-powered apps, chatbots, and intelligent automation systems.',
    tags: ['GPT', 'LangChain', 'RAG'],
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Services
          </span>
          <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-4">
            Beyond Education — We Build Solutions
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Technology services for startups, enterprises, and individuals looking to leverage modern tech.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              className={`group relative bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/80 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all"
              >
                Enquire Now <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
