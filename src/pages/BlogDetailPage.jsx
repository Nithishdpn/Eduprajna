import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import { BlogPostSEOHead } from '../components/common/SEOHead';
import blogs from '../data/blogs.json';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const related = blogs.filter(b => b.slug !== slug && b.category === blog?.category).slice(0, 3);

  if (!blog) return (
    <main className="pt-28 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FiFileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Article not found</h1>
        <Link to="/blog" className="text-blue-600 font-semibold hover:underline">← Back to Blog</Link>
      </div>
    </main>
  );

  return (
    <>
      <BlogPostSEOHead post={blog} />
      <main className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 text-sm mb-6 hover:underline font-medium">
            <FiArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            <h1 className="font-['Sora'] font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">{blog.title}</h1>
            <p className="text-slate-500 text-lg mb-0">{blog.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 shadow-xl">
          <img src={blog.image} alt={`${blog.title} - In-depth tech career guidance and programming insights from EduPrajna`} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-slate-600 text-lg leading-relaxed mb-6">{blog.excerpt}</p>
          {/* Static content placeholder — replace with blog.content if added to JSON */}
          <p className="text-slate-600 leading-relaxed mb-5">
            The technology landscape is evolving at an unprecedented pace. Professionals who invest in continuous learning
            are consistently ahead of the curve when it comes to career opportunities, salary growth, and job security.
          </p>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mt-8 mb-4">Why This Matters in 2025</h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            With AI automating routine tasks, the demand for high-level technical skills has skyrocketed. Companies are
            aggressively hiring professionals who can bridge the gap between business strategy and modern technology implementation.
          </p>
          <h2 className="font-['Sora'] font-bold text-2xl text-slate-900 mt-8 mb-4">Key Takeaways</h2>
          <ul className="space-y-2 mb-6">
            {(blog.tags || []).map(tag => (
              <li key={tag} className="flex items-center gap-2.5 text-slate-600 text-base">
                <span className="w-1.5 h-1.5 bg-brand-600 rounded-full flex-shrink-0" /> <span>Mastering <strong>{tag}</strong> opens new career pathways</span>
              </li>
            ))}
          </ul>
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 my-8">
            <p className="font-semibold text-brand-800 mb-1 flex items-center gap-1.5">
              <FaLightbulb className="w-4 h-4 text-brand-600" /> Pro Tip from EduPrajna
            </p>
            <p className="text-brand-700 text-sm leading-relaxed">
              Start with hands-on projects rather than purely theory-based learning. Employers value demonstrated
              skills over certificates alone. EduPrajna's programs are designed with this philosophy at their core.
            </p>
          </div>
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-10 pt-6 border-t border-slate-100">
            {blog.tags.map(tag => (
              <span key={tag} className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-['Sora'] font-bold text-2xl text-slate-900 mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-slate-50 border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-slate-800 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
    </>
  );
}
