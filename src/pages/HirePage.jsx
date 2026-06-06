import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap, FiShield, FiTrendingUp, FiCpu, FiMonitor, FiCloud, FiSettings, FiBarChart2, FiSliders, FiCheckCircle, FiUsers, FiStar } from 'react-icons/fi';
import { SiTcs, SiInfosys, SiWipro, SiHcl, SiAccenture, SiCognizant, SiMahindra } from 'react-icons/si';
import SEOHead from '../components/common/SEOHead';
import { generatePageSEO } from '../utils/seo';
import { submitToSheet, SHEET_NAMES } from '../services/sheets';
import { openWhatsAppHiring } from '../services/whatsapp';
import { FaWhatsapp } from 'react-icons/fa';

// ── Data ────────────────────────────────────────────────────────────────────

const whyHire = [
  {
    icon: <FiShield className="w-6 h-6" />,
    title: 'Pre-Screened Talent',
    desc: 'Every candidate is technically tested before reaching you. Zero filtering noise.',
    color: 'blue',
  },
  {
    icon: <FiZap className="w-6 h-6" />,
    title: 'Fast Turnaround',
    desc: 'Curated shortlist within 48–72 hours. No delays, no wasted time.',
    color: 'amber',
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: '5000+ Trained Candidates',
    desc: 'Deep talent pool across AI, development, cloud, security, and more.',
    color: 'emerald',
  },
  {
    icon: <FiTrendingUp className="w-6 h-6" />,
    title: 'Zero Hiring Cost',
    desc: 'No fees ever. We invest in long-term partnerships with great companies.',
    color: 'violet',
  },
];

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600' },
  emerald:{ bg: 'bg-emerald-50',icon: 'text-emerald-600' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600' },
};

const hiringDomains = [
  { title: 'AI / ML Engineer',        bgImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', details: 'Python • PyTorch • TensorFlow • NLP • Computer Vision' },
  { title: 'Full Stack Developer',    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80', details: 'React • Node.js • Express • MongoDB • AWS' },
  { title: 'Cloud / AWS Engineer',   bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80', details: 'AWS Cloud • Terraform • Docker • Networking' },
  { title: 'DevOps Engineer',        bgImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80', details: 'Kubernetes • Docker • Jenkins • Ansible • CI/CD' },
  { title: 'Data Analyst',            bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', details: 'SQL • Power BI • Python • Excel • Tableau' },
  { title: 'UI/UX Designer',          bgImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80', details: 'Figma • Wireframing • Prototyping • User Research' },
  { title: 'Cyber Security Analyst', bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', details: 'Ethical Hacking • VAPT • Metasploit • Wireshark' },
  { title: 'Data Scientist',          bgImage: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&q=80', details: 'Python • Machine Learning • Statistics • SQL • Pandas' },
];


const hiringProcess = [
  { step: '01', title: 'Submit Requirement', desc: 'Tell us the role, skills, headcount, and timeline through our simple form.' },
  { step: '02', title: 'Talent Screening',   desc: 'We curate matching profiles from our trained pool and pre-screen them technically.' },
  { step: '03', title: 'Schedule Interviews', desc: 'Set interviews directly with shortlisted candidates at your convenience.' },
  { step: '04', title: 'Select & Onboard',   desc: 'Choose the right fit. We assist with offer rollout and onboarding support.' },
];

const partnerLogos = [
  { 
    name: 'TCS', 
    render: () => <SiTcs className="w-16 h-8 text-[#0082C9]" /> 
  },
  { 
    name: 'Infosys', 
    render: () => <SiInfosys className="w-16 h-8 text-[#007CC3]" /> 
  },
  { 
    name: 'Wipro', 
    render: () => <SiWipro className="w-12 h-10 text-[#1B365D]" /> 
  },
  { 
    name: 'HCL', 
    render: () => <SiHcl className="w-14 h-8 text-[#005691]" /> 
  },
  { 
    name: 'Accenture', 
    render: () => <SiAccenture className="w-14 h-8 text-[#A100FF]" /> 
  },
  { 
    name: 'Cognizant', 
    render: () => <SiCognizant className="w-16 h-8 text-[#000048]" /> 
  },
  { 
    name: 'IBM', 
    render: () => (
      <span className="font-sans font-black text-2xl tracking-tighter text-[#0066CC] select-none">IBM</span>
    )
  },
  { 
    name: 'Capgemini', 
    render: () => (
      <div className="flex items-center gap-1.5 select-none">
        <svg viewBox="0 0 30 30" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,17 C5,10 10,2 17,2 C24,2 29,10 24,17 C22,20 17,25 17,25 C17,25 12,20 10,17 Z" fill="#0070AD" />
          <path d="M17,25 C17,25 20,20 22,17 C26,12 23,6 17,6 C11,6 8,12 12,17 C14,20 17,25 17,25 Z" fill="#003764" />
        </svg>
        <span className="font-sans font-bold text-sm text-[#003764] tracking-tight">Capgemini</span>
      </div>
    )
  },
  { 
    name: 'Tech Mahindra', 
    render: () => <SiMahindra className="w-14 h-8 text-[#DD1D21]" /> 
  },
  { 
    name: 'Mphasis', 
    render: () => (
      <div className="flex items-center gap-1.5 select-none">
        <svg viewBox="0 0 20 20" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" stroke="#E31E24" strokeWidth="2" fill="none" />
          <circle cx="10" cy="10" r="4" stroke="#E31E24" strokeWidth="2" fill="none" />
          <circle cx="10" cy="10" r="1" fill="#E31E24" />
        </svg>
        <span className="font-sans font-extrabold text-base text-[#1A1A1A] tracking-tighter">Mphasis</span>
      </div>
    )
  }
];

const hiringTestimonials = [
  {
    name: 'Rahul Desai',
    role: 'HR Manager, TechCorp Bangalore',
    text: 'EduPrajna delivered 5 pre-trained candidates within 72 hours. All 5 cleared our technical round. Outstanding quality.',
    rating: 5,
    avatar: 'RD',
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Meena Krishnamurthy',
    role: 'CTO, CloudStart Hyderabad',
    text: 'We hired 3 cloud engineers from EduPrajna. Zero rehiring needed. Their training is genuinely industry-aligned.',
    rating: 5,
    avatar: 'MK',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    name: 'Sanjay Patel',
    role: 'Engineering Head, FinTech India',
    text: 'The pre-screened AI candidates saved us weeks of recruitment. EduPrajna is now our primary hiring channel.',
    rating: 5,
    avatar: 'SP',
    color: 'from-violet-400 to-violet-600',
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function HirePage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', domain: '', headcount: '', requirement: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const seoData = generatePageSEO('hire');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitToSheet(SHEET_NAMES.HIRING, form);
    setSubmitted(true);
    setLoading(false);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <main className="pt-20 bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl leading-tight mb-8">
              Hire <span className="text-brand-400">Job-Ready</span> Tech Talent
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#hire-form"
                className="flex items-center gap-2 bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-brand-100/30"
              >
                Submit Requirement <FiArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => openWhatsAppHiring()}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-4 rounded-2xl transition-all text-sm"
              >
                <FaWhatsapp className="w-5 h-5" /> WhatsApp Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Hire ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Why Hire From EduPrajna?</h2>
            <p className="text-slate-500 text-lg">We do the heavy lifting so you get the right talent, fast.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyHire.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hiring Domains ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Available Talent Domains</h2>
            <p className="text-slate-500 text-lg">Trained professionals ready for immediate deployment.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hiringDomains.map((domain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden aspect-[4/3.2] p-6 flex flex-col justify-end hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand-400/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Background Image with overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-[0.25] group-hover:opacity-[0.45] group-hover:scale-105 transition-all duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${domain.bgImage})` }}
                />
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 w-full overflow-hidden">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h3 className="font-['Sora'] font-bold text-white text-base group-hover:text-brand-400 transition-colors duration-300 mb-2">
                      {domain.title}
                    </h3>
                    <p className="text-slate-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 leading-relaxed">
                      {domain.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring Process ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Our Hiring Process</h2>
            <p className="text-slate-500">Simple, fast, and completely transparent.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringProcess.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < hiringProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-0.5 bg-brand-100" />
                )}
                <div className="w-14 h-14 bg-brand-600 text-white font-['Sora'] font-bold text-lg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-200 relative z-10">
                  {step.step}
                </div>
                <h3 className="font-['Sora'] font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Partners ── */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900">Companies That Trust EduPrajna Talent</h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            className="flex items-center gap-14"
            style={{ width: 'max-content' }}
          >
            {[...partnerLogos, ...partnerLogos].map((partner, i) => (
              <div key={i} className="flex items-center justify-center h-12 min-w-max select-none">
                {partner.render()}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Hiring Testimonials ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">What Companies Say</h2>
            <p className="text-slate-500 text-lg">Hear from HR managers who hired through us.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {hiringTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar key={j} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm font-['Sora']">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring Form ── */}
      <section id="hire-form" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Submit Your Requirement</h2>
            <p className="text-slate-500">Tell us what you need. We'll get back within 24 hours.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-100 rounded-3xl shadow-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-50 rounded-full border border-green-100 flex items-center justify-center mx-auto mb-5">
                  <FiCheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500">Our hiring team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name',    label: 'Your Name',    type: 'text' },
                    { name: 'phone',   label: 'Phone Number', type: 'tel' },
                    { name: 'email',   label: 'Work Email',   type: 'email' },
                    { name: 'company', label: 'Company Name', type: 'text' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        required
                        value={form[f.name]}
                        onChange={set(f.name)}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Talent Domain</label>
                    <select
                      value={form.domain}
                      onChange={set('domain')}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white text-slate-700 transition-all"
                    >
                      <option value="">Select Domain</option>
                      {hiringDomains.map((d) => (
                        <option key={d.title} value={d.title}>{d.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Number of Positions</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      value={form.headcount}
                      onChange={set('headcount')}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Detailed Requirement</label>
                  <textarea
                    required
                    rows={4}
                    value={form.requirement}
                    onChange={set('requirement')}
                    placeholder="Describe the role, key skills, experience level, and preferred timeline..."
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none bg-white transition-all text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-brand-100/50 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting…' : <>Submit Requirement <FiArrowRight className="w-5 h-5" /></>}
                </button>
                <p className="text-center text-xs text-slate-400">
                  Zero cost · Response within 24 hours · No spam
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
