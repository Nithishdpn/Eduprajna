import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck, FiArrowRight, FiBookOpen, FiTrendingUp, FiUsers, FiAward, FiTarget, FiStar, FiGlobe } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { generatePageSEO } from '../utils/seo';
import iso9001Logo from '../assets/iso_9001_certified.png';
import iso29990Logo from '../assets/iso_29990_certified.png';
import govtIndiaLogo from '../assets/govt_of_india_logo.png';
import startupIndiaLogo from '../assets/startup_india_logo.png';

// ── Data ────────────────────────────────────────────────────────────────────

const impactNumbers = [
  { value: '5000+', label: 'Students Placed',    icon: <FiBookOpen className="w-6 h-6 text-blue-600" />, color: 'blue' },
  { value: '98%',   label: 'Placement Rate',     icon: <FiTrendingUp className="w-6 h-6 text-emerald-600" />, color: 'emerald' },
  { value: '1000+', label: 'Hiring Partners',    icon: <FiUsers className="w-6 h-6 text-violet-600" />, color: 'violet' },
  { value: '50+',   label: 'Expert Trainers',    icon: <FiAward className="w-6 h-6 text-amber-600" />, color: 'amber' },
];

const colorMap = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   ring: 'ring-blue-100' },
  emerald:{ bg: 'bg-emerald-50',text: 'text-emerald-600',ring: 'ring-emerald-100' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-100' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-600',  ring: 'ring-amber-100' },
};

const values = [
  { title: 'Challenge',  desc: 'We challenge students to go beyond theory and tackle real industry problems from Day 1.', bgImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80', glow: 'hover:border-blue-500/50 hover:shadow-blue-500/10' },
  { title: 'Teamwork',   desc: 'Collaborative learning environments that mirror actual workplace dynamics.',  bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80', glow: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10' },
  { title: 'Excellence', desc: 'We maintain the highest standards in curriculum quality, trainer selection, and placement.', bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80', glow: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10' },
  { title: 'Innovation', desc: 'Constantly evolving with technology so students always learn the most relevant skills.', bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', glow: 'hover:border-violet-500/50 hover:shadow-violet-500/10' },
  { title: 'Impact',     desc: 'Our ultimate metric is career transformation — not enrolment numbers.',     bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', glow: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10' },
  { title: 'Inclusion',  desc: 'Quality tech education accessible to every background, location, and budget.',  bgImage: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&q=80', glow: 'hover:border-rose-500/50 hover:shadow-rose-500/10' },
];

const team = [
  { name: 'Arun Kumar',     role: 'Founder & CEO',         avatar: 'AK', color: 'from-blue-500 to-blue-700',    bio: '15 years in tech education. Ex-Infosys L&D Head.' },
  { name: 'Priya Nair',     role: 'Head of Curriculum',    avatar: 'PN', color: 'from-violet-500 to-violet-700', bio: 'IIT alumna. Former ML Engineer at Google Research.' },
  { name: 'Suresh Reddy',   role: 'Placement Director',    avatar: 'SR', color: 'from-emerald-500 to-emerald-700',bio: '10+ years in corporate recruitment & talent ops.' },
  { name: 'Kavitha Menon',  role: 'Cloud & DevOps Lead',   avatar: 'KM', color: 'from-rose-500 to-rose-700',     bio: 'AWS Certified Architect. 12 years cloud experience.' },
];

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimCounter({ target, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const step = Math.max(1, Math.ceil(numeric / (1600 / 16)));
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + step, numeric);
      setCount(cur);
      if (cur >= numeric) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);

  const num = parseInt(target.replace(/\D/g, ''), 10);
  const suffix = target.replace(/[\d,]/g, '');
  return <span>{count >= num ? target : count.toLocaleString() + suffix}</span>;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AboutPage({ onEnrollClick }) {
  const impactRef = useRef(null);
  const impactInView = useInView(impactRef, { once: true, amount: 0.3 });
  
  const seoData = generatePageSEO('about');

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
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl text-slate-900 leading-tight">
              We Build <span className="text-blue-600">Careers,</span>{' '}
              Not Just Students
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <section ref={impactRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Our Numbers Speak</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {impactNumbers.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={impactInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-slate-100 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <p className={`font-['Sora'] font-extrabold text-4xl ${c.text} mb-1`}>
                    <AnimCounter target={item.value} inView={impactInView} />
                  </p>
                  <p className="text-slate-500 text-sm font-medium">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-indigo-800/40 rounded-full" />
              <div className="relative">
                <FiTarget className="w-12 h-12 text-white mb-5 opacity-90" />
                <h2 className="font-['Sora'] font-bold text-3xl mb-4">Our Mission</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  To bridge the gap between academic education and industry requirements through practical, project-based training — creating a generation of career-ready tech professionals from all backgrounds.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/3 rounded-full" />
              <div className="relative">
                <FiStar className="w-12 h-12 text-white mb-5 opacity-90" />
                <h2 className="font-['Sora'] font-bold text-3xl mb-4">Our Vision</h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To become India's most trusted EdTech platform — where every student gets placed in a role they're proud of, and every company finds exactly the talent they need, fast and reliably.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">The Principles That Guide Us</h2>
            <p className="text-slate-500 text-lg">Everything we do is shaped by these core commitments.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden aspect-[4/3.2] p-6 flex flex-col justify-end hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${v.glow}`}
              >
                {/* Background Image Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.25] group-hover:opacity-[0.45] group-hover:scale-105 transition-all duration-500 pointer-events-none mix-blend-luminosity"
                  style={{ backgroundImage: `url(${v.bgImage})` }}
                />

                {/* Dark gradient mask overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 text-left">
                  <h3 className="font-['Sora'] font-bold text-white text-base sm:text-lg mb-1.5 transition-colors duration-300 group-hover:text-blue-400">
                    {v.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recognized By / Certifications ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-['Sora'] font-bold text-3xl sm:text-4xl text-slate-900 mb-3">
              Recognized by International Bodies & Govt. Of India
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto items-center justify-items-center mb-10">
            {/* 1. ISO 9001:2015 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-32 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={iso9001Logo} 
                  alt="ISO 9001:2015 Certified Seal" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="font-['Sora'] font-bold text-slate-800 text-sm mt-3">ISO 9001:2015</span>
            </div>

            {/* 2. ISO 29990:2010 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-36 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={iso29990Logo} 
                  alt="ISO 29990:2010 Certificate" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="font-['Sora'] font-bold text-slate-800 text-sm mt-3">ISO 29990:2010</span>
            </div>

            {/* 3. Govt. of India */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={govtIndiaLogo} 
                  alt="Ministry of Commerce and Industry - Govt. of India Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="font-['Sora'] font-bold text-slate-800 text-sm mt-3">Govt. of India</span>
            </div>

            {/* 4. Start-Up India */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={startupIndiaLogo} 
                  alt="Start-Up India Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="font-['Sora'] font-bold text-slate-800 text-sm mt-3">Start-Up India</span>
            </div>
          </div>

          <div className="text-center text-slate-500 text-sm italic mt-12">
            — audited for training quality & student outcomes
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Meet the Team</h2>
            <p className="text-slate-500 text-lg">Industry veterans who've been in your shoes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-100 rounded-2xl p-7 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 font-['Sora'] shadow-lg group-hover:scale-105 transition-transform`}>
                  {member.avatar}
                </div>
                <h3 className="font-['Sora'] font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-800/30 rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-['Sora'] font-bold text-4xl text-white mb-4">Join the EduPrajna Family</h2>
            <p className="text-blue-100 text-lg mb-8">Start your tech career journey today. Free counseling included.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onEnrollClick}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-lg"
              >
                Enroll Now
              </button>
              <Link
                to="/contact"
                className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    </>
  );
}
