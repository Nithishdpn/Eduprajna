import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const values = [
  { icon: '🎯', title: 'Career-First Learning', desc: 'Everything we teach is mapped to real job requirements.' },
  { icon: '🤝', title: 'Industry Partnerships', desc: 'Our curriculum is co-designed with hiring managers.' },
  { icon: '💡', title: 'Practical Education', desc: 'Real projects over theory. Portfolio-ready skills from day one.' },
  { icon: '🚀', title: 'Continuous Growth', desc: 'We evolve with technology so you always learn what matters.' },
  { icon: '❤️', title: 'Student Success', desc: 'We measure our success by student placements, not enrollments.' },
  { icon: '🌐', title: 'Inclusive Access', desc: 'Quality tech education accessible to all backgrounds.' },
];

const team = [
  { name: 'Arun Kumar', role: 'Founder & CEO', avatar: 'AK', color: '#2563EB', bio: '15 years in tech education. Ex-Infosys L&D.' },
  { name: 'Priya Nair', role: 'Head of Curriculum', avatar: 'PN', color: '#7C3AED', bio: 'IIT alumna. Former ML engineer at Google.' },
  { name: 'Suresh Reddy', role: 'Placement Director', avatar: 'SR', color: '#059669', bio: '10+ years in corporate recruitment.' },
  { name: 'Kavitha Menon', role: 'Cloud & DevOps Lead', avatar: 'KM', color: '#DC2626', bio: 'AWS certified. 12 years cloud architecture.' },
];

const milestones = [
  { year: '2018', event: 'EduPrajna founded in Bangalore with 3 courses and 50 students.' },
  { year: '2019', event: 'Expanded to Cloud & DevOps programs. 500+ students trained.' },
  { year: '2020', event: 'Launched online learning platform. 2000+ students across India.' },
  { year: '2021', event: 'AI & ML division launched. Crossed 1000+ hiring partner milestone.' },
  { year: '2022', event: 'Opened 2nd center in Hyderabad. 4000+ alumni placed.' },
  { year: '2024', event: 'EduPrajna 2.0 — full EdTech platform with 5000+ trained professionals.' },
];

export default function AboutPage({ onEnrollClick }) {
  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-['Sora'] font-extrabold text-5xl sm:text-6xl text-slate-900 mb-6 leading-tight">
              We Build{' '}<span className="text-blue-600">Careers,</span>{' '}Not Just Students
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
              EduPrajna was born from a simple belief: quality tech education should lead directly to career outcomes — not just certificates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-blue-600 rounded-3xl p-10 text-white">
              <div className="text-5xl mb-5">🎯</div>
              <h2 className="font-['Sora'] font-bold text-3xl mb-4">Our Mission</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                To bridge the gap between academic education and industry requirements through practical, project-based training — and create a generation of career-ready tech professionals from all backgrounds.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-slate-900 rounded-3xl p-10 text-white">
              <div className="text-5xl mb-5">🌟</div>
              <h2 className="font-['Sora'] font-bold text-3xl mb-4">Our Vision</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                To become India's most trusted EdTech platform where every student gets placed in a role they're proud of, and every company finds the exact talent they need — fast and reliably.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Our Values</h2>
            <p className="text-slate-500 text-lg">The principles that guide everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-['Sora'] font-bold text-slate-900 text-lg mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Our Journey</h2>
            <p className="text-slate-500">From a small classroom to a full EdTech platform.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-blue-100" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start pl-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-['Sora'] font-bold text-sm flex-shrink-0 shadow-lg shadow-blue-100 z-10">
                    {m.year}
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex-1">
                    <p className="text-slate-700 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Meet the Team</h2>
            <p className="text-slate-500 text-lg">Industry veterans who've been in your shoes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 font-['Sora']"
                  style={{ backgroundColor: member.color }}>
                  {member.avatar}
                </div>
                <h3 className="font-['Sora'] font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-4">Join the EduPrajna Family</h2>
            <p className="text-slate-500 text-lg mb-8">Start your tech career journey today. Free counseling included.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={onEnrollClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-100">
                Enroll Now
              </button>
              <Link to="/contact" className="border-2 border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
