import { Link } from 'react-router-dom';
import { FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Sora']">EP</span>
              </div>
              <span className="font-bold text-xl text-white font-['Sora']">EduPrajna</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Industry-focused tech education platform. We build job-ready professionals through practical training, real projects, and career support.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <FiLinkedin />, href: '#' },
                { icon: <FiTwitter />, href: '#' },
                { icon: <FiInstagram />, href: '#' },
                { icon: <FiYoutube />, href: '#' },
                { icon: <FiFacebook />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Sora']">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Hire From Us', to: '/hire' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Service', to: '/terms' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Sora']">Popular Courses</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Artificial Intelligence', to: '/courses/artificial-intelligence' },
                { label: 'Python Programming', to: '/courses/python' },
                { label: 'Full Stack Development', to: '/courses/full-stack' },
                { label: 'AWS Cloud', to: '/courses/aws' },
                { label: 'DevOps Engineering', to: '/courses/devops' },
                { label: 'Data Science', to: '/courses/data-science' },
                { label: 'Cyber Security', to: '/courses/cyber-security' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-['Sora']">Contact Us</h4>
            <ul className="space-y-3">
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-0.5">Phone</span>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-0.5">Email</span>
                <a href="mailto:info@eduprajna.com" className="hover:text-white transition-colors">info@eduprajna.com</a>
              </li>
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-0.5">Address</span>
                <span>2nd Floor, Tech Hub, Koramangala, Bangalore – 560034</span>
              </li>
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-0.5">Hours</span>
                <span>Mon–Sat: 9 AM – 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EduPrajna. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
