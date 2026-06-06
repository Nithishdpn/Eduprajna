import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import SEOHead from '../components/common/SEOHead';
import galleryData from '../data/gallery.json';

const domains = [
  { id: 'campus', label: 'Campus Life' },
  { id: 'training', label: 'Training Sessions' },
  { id: 'placements', label: 'Student Placements' },
  { id: 'events', label: 'Campus Events' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'corporate', label: 'Corporate Engagements' }
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('campus');
  const [placementsExpanded, setPlacementsExpanded] = useState(false);

  // Scrollspy logic to highlight active sub-navigation text link
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const dom of domains) {
        const el = document.getElementById(dom.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(dom.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox Navigation (goes through all global items)
  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % galleryData.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      <SEOHead 
        title="EduPrajna Gallery | Campus Life & Success Stories"
        description="Explore EduPrajna campus, training programs, student achievements, events, and placement moments."
        keywords="EduPrajna gallery, campus life, tech training, placement drives, classroom events, computer lab, student achievements"
      />
      
      <main className="bg-[#fafbfc] min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight leading-tight">
                Life at <span className="text-brand-400">EduPrajna</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                A visual journey through our campus training, events, student milestones, and recruiting engagements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sticky Sub-Navigation */}
        <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start md:justify-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-0.5">
              {domains.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => {
                    const el = document.getElementById(dom.id);
                    if (el) {
                      const offsetPosition = el.offsetTop - 130;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`px-2 py-1 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeSection === dom.id
                      ? 'text-brand-500 font-extrabold scale-[1.03]'
                      : 'text-slate-500 hover:text-brand-500'
                  }`}
                >
                  {dom.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Domain Sections Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          {domains.map((dom) => {
            const sectionItems = galleryData.filter(
              (item) => item.category.toLowerCase() === dom.id.toLowerCase()
            );
            const isPlacements = dom.id === 'placements';
            const displayedItems = isPlacements && !placementsExpanded
              ? sectionItems.slice(0, 5)
              : sectionItems;

            return (
              <section
                key={dom.id}
                id={dom.id}
                className="scroll-mt-36"
              >
                {/* Section Header */}
                <div className="border-b border-slate-200/60 pb-4 mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                    {dom.label}
                  </h2>
                  <span className="font-sans font-bold text-xs text-slate-400">
                    {isPlacements && !placementsExpanded ? '5 of ' : ''}{sectionItems.length} {sectionItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Responsive grid for beautiful card presentation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {displayedItems.map((item) => {
                    const globalIdx = galleryData.findIndex((g) => g.id === item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        onClick={() => setLightboxIndex(globalIdx)}
                        className="bg-white rounded-[1.75rem] p-3 border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col h-full"
                      >
                        {/* Image Container with Zoom effect */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-50">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-800 scale-90 group-hover:scale-100 transition-transform duration-300">
                              <FiMaximize2 className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        {/* Text Details */}
                        <div className="pt-3 px-0.5 pb-0.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1 group-hover:text-brand-600 transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-slate-500 text-[0.8rem] sm:text-[0.85rem] font-sans font-medium leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {isPlacements && !placementsExpanded && sectionItems.length > 5 && (
                    <button
                      onClick={() => setPlacementsExpanded(true)}
                      className="bg-brand-50/20 hover:bg-brand-50/40 rounded-[1.75rem] border border-dashed border-brand-300 hover:border-brand-500 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-4 text-center group h-full min-h-[180px] w-full"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <FiChevronRight className="w-5 h-5" />
                      </div>
                      <span className="font-serif font-bold text-brand-700 text-sm sm:text-base group-hover:text-brand-800 transition-colors">
                        View More Placements
                      </span>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-sans">
                        List all placed student success stories
                      </p>
                    </button>
                  )}
                </div>

                {/* Empty State for this section */}
                {sectionItems.length === 0 && (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm">No items inside this category yet.</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Top Controls */}
              <div className="flex items-center justify-between text-white w-full max-w-7xl mx-auto py-2">
                <span className="text-xs font-sans font-bold tracking-wider uppercase bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                  {galleryData[lightboxIndex].category}
                </span>
                <button
                  onClick={handleClose}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <FiX className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Main Content (Image & Navigation) */}
              <div className="flex-1 flex items-center justify-center relative w-full max-w-6xl mx-auto">
                {/* Navigation: Prev */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all border border-white/15 cursor-pointer text-white hover:scale-105"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>

                {/* Active Lightbox Image */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="relative max-h-[72vh] max-w-[85vw] sm:max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900"
                >
                  <img
                    src={galleryData[lightboxIndex].image}
                    alt={galleryData[lightboxIndex].title}
                    className="max-h-[72vh] max-w-full object-contain mx-auto"
                  />
                </motion.div>

                {/* Navigation: Next */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all border border-white/15 cursor-pointer text-white hover:scale-105"
                  aria-label="Next image"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="w-full max-w-4xl mx-auto text-center text-white py-4 sm:py-6">
                <h2 className="font-['Sora'] font-bold text-xl sm:text-2xl drop-shadow-md">
                  {galleryData[lightboxIndex].title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-2 font-sans font-medium max-w-2xl mx-auto drop-shadow-sm">
                  {galleryData[lightboxIndex].description}
                </p>
                <div className="text-slate-400 text-xs mt-3.5 font-sans font-semibold tracking-wider">
                  IMAGE {lightboxIndex + 1} OF {galleryData.length}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
