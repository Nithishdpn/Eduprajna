import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiArrowRight, FiTag } from 'react-icons/fi';
import blogs from '../data/blogs.json';

const allCategories = ['All', ...new Set(blogs.map(b => b.category))];
const allTags = [...new Set(blogs.flatMap(b => b.tags || []))].slice(0, 12);

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [tag, setTag] = useState('');

  const filtered = useMemo(() => {
    let list = blogs;
    if (category !== 'All') list = list.filter(b => b.category === category);
    if (tag) list = list.filter(b => b.tags?.includes(tag));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    return list;
  }, [search, category, tag]);

  const featured = blogs.find(b => b.featured);

  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wider">Blog</span>
            <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl text-slate-900 mb-3">Insights & Guides</h1>
            <p className="text-slate-500 text-lg max-w-xl">Career advice, tech tutorials, interview prep, and industry news.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link to={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-4 uppercase tracking-wider w-fit">
                  ⭐ Featured
                </span>
                <h2 className="font-['Sora'] font-bold text-2xl sm:text-3xl text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-64" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map(t => (
                <button key={t} onClick={() => setTag(tag === t ? '' : t)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tag === t ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'}`}>
                  <FiTag className="w-3 h-3" />{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.06, 0.4) }}>
              <Link to={`/blog/${blog.slug}`} className="group block bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{blog.category}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><FiClock className="w-3 h-3" />{blog.readTime}</span>
                  </div>
                  <h3 className="font-['Sora'] font-bold text-slate-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <span>{blog.author}</span>
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
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">📭</span>
            <p className="text-slate-500">No articles found. Try another search.</p>
          </div>
        )}
      </section>
    </main>
  );
}
