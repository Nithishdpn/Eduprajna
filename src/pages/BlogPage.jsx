import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiStar, FiInbox } from 'react-icons/fi';
import SEOHead from '../components/common/SEOHead';
import { generatePageSEO } from '../utils/seo';
import blogs from '../data/blogs.json';
import FAQSection from '../components/home/FAQSection';

const allCategories = ['All', ...new Set(blogs.map((b) => b.category))];
const allTags = [...new Set(blogs.flatMap((b) => b.tags || []))].slice(0, 12);

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('');
  
  const seoData = generatePageSEO('blog');

  const filtered = useMemo(() => {
    let list = blogs;
    if (category !== 'All') list = list.filter((b) => b.category === category);
    if (tag) list = list.filter((b) => b.tags?.includes(tag));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, category, tag]);

  const featured = blogs.find((b) => b.featured);

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <main className="pt-20 bg-white min-h-screen">

      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-100 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900">
              Insights & Guides
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Featured article ── */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-0 bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={`${featured.title} - Expert tech career advice and programming insights from EduPrajna`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    <FiStar className="w-3.5 h-3.5 text-blue-600" /> Featured
                  </span>
                </div>
                <h2 className="font-['Sora'] font-bold text-2xl sm:text-3xl text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-0 line-clamp-3">{featured.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Filters ── */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-slate-50/50 w-60 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-1">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 text-sm font-bold transition-all duration-200 bg-transparent border-b-2 hover:text-black hover:scale-105 ${
                    category === cat
                      ? 'border-slate-900 text-black font-extrabold'
                      : 'border-transparent text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(tag === t ? '' : t)}
                  className={`py-1 text-xs font-semibold bg-transparent transition-all duration-200 border-b hover:text-black hover:scale-105 ${
                    tag === t
                      ? 'border-slate-900 text-black font-bold'
                      : 'border-transparent text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Blog grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.06, 0.4) }}
            >
              <Link
                to={`/blog/${blog.slug}`}
                className="group block bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 relative">
                  <img
                    src={blog.image}
                    alt={`${blog.title} - Technology career insights and programming tutorials from EduPrajna experts`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-['Sora'] font-bold text-slate-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>
                  <div className="flex items-center justify-end text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      Read <FiArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <FiInbox className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No articles found.</p>
            <p className="text-slate-400 text-sm">Try a different search or category.</p>
          </motion.div>
        )}
      </section>
      <FAQSection />
    </main>
    </>
  );
}
