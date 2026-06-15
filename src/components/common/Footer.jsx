import { Link } from 'react-router-dom';
import { FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';



const companyLinks = [
  { label: 'Courses',        to: '/courses' },
  { label: 'Gallery',        to: '/gallery' },
  { label: 'Hire from Us',   to: '/hire' },
  { label: 'Blog',           to: '/blog' },
  { label: 'About Us',       to: '/about' },
  { label: 'Free Counseling',to: '/free-counseling' },
  { label: 'Contact Us',     to: '/contact' },
];

const footerCourses = [
  { label: 'Full Stack Development', to: '/courses/full-stack' },
  { label: 'Data Science & AI', to: '/courses/data-science' },
  { label: 'Python with AI & Automation', to: '/courses/python' },
  { label: 'DevOps Engineering', to: '/courses/devops' },
  { label: 'AWS Cloud Architecture', to: '/courses/aws' },
  { label: 'Artificial Intelligence', to: '/courses/artificial-intelligence' },
];

const social = [
  { icon: <FiLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <FiTwitter />,  href: '#', label: 'Twitter' },
  { icon: <FiInstagram />,href: '#', label: 'Instagram' },
  { icon: <FiYoutube />,  href: '#', label: 'YouTube' },
  { icon: <FiFacebook />, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">


      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div>
            <Link to="/" className="flex items-center mb-5">
              <img src="/logo-dark.png" alt="EduPrajna" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              India's fastest-growing EdTech platform. We build job-ready tech professionals through practical training, real projects, and dedicated career support.
            </p>
            <div className="flex items-center gap-2.5">
              {social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company col */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-display">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-brand-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses col */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-display">Popular Courses</h4>
            <ul className="space-y-2.5">
              {footerCourses.map((c) => (
                <li key={c.label}>
                  <Link to={c.to} className="text-sm hover:text-brand-500 transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800">
                <Link to="/courses" className="text-sm text-brand-400 hover:text-brand-500 transition-colors font-semibold flex items-center gap-1">
                  View All Courses →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-display">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiPhone className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Phone</p>
                  <a href="tel:+918197719297" className="text-sm hover:text-brand-500 transition-colors text-slate-300">
                    +91 81977 19297
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Mail</p>
                  <a href="mailto:support@eduprajna.com" className="text-sm hover:text-brand-500 transition-colors text-slate-300">
                    support@eduprajna.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white">Office</p>
                  <span className="text-sm text-slate-300">
                    2nd Floor, Eduprajna 1433/A, Nehru Rd, above Ramdev Hi Fashion, Kullappa Circle, Subbayianiah Palyam, Kammanahalli, Bengaluru, Karnataka 560084.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EduPrajna. All rights reserved. Built with passion in Bangalore.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-brand-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
