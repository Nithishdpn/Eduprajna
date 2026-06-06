import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import testimonials from '../../data/testimonials.json';

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoplayTimer = useRef(null);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const startAutoplay = () => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      next();
    }, 5500);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  const handleNextClick = () => {
    next();
    startAutoplay();
  };

  const handlePrevClick = () => {
    prev();
    startAutoplay();
  };

  return (
    <section id="placements" className="py-20 bg-[#ffffff] relative overflow-hidden select-none">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Sora'] font-extrabold text-3xl sm:text-4xl text-slate-900 mb-3">
              Our Placed Students
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-sans font-medium">
              Real success stories from our graduates who landed top roles in the tech industry.
            </p>
          </motion.div>
        </div>

        {/* 3D Stacked Card Deck Viewport */}
        <div className="relative w-full h-[360px] sm:h-[320px] flex items-center justify-center overflow-visible">
          {testimonials.map((t, i) => {
            // Calculate relative index from activeIdx
            let rel = i - activeIdx;
            if (rel < 0) rel += testimonials.length;

            const isFront = rel === 0;

            // Define animation states for 3D stacking
            let zIndex = 0;
            let scale = 1;
            let translateY = 0;
            let translateX = 0;
            let rotate = 0;
            let opacity = 0;
            let pointerEvents = 'none';

            if (rel === 0) {
              zIndex = 30;
              scale = 1;
              translateY = 0;
              opacity = 1;
              pointerEvents = 'auto';
            } else if (rel === 1) {
              zIndex = 20;
              scale = 0.93;
              translateY = -28; // stacked upwards
              opacity = 0.82;
            } else if (rel === 2) {
              zIndex = 10;
              scale = 0.86;
              translateY = -56; // stacked further upwards
              opacity = 0.5;
            } else if (rel === testimonials.length - 1) {
              // The card that was just swiped/exited from the front
              zIndex = 35; // keep above others while flying out
              scale = 0.98;
              translateX = 240; // fly off to the right
              translateY = 15;
              rotate = 12; // tilt slightly
              opacity = 0;
            }

            return (
              <motion.div
                key={t.id}
                style={{
                  zIndex,
                  pointerEvents,
                  originY: 0.5,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                animate={{
                  scale,
                  y: translateY,
                  x: translateX,
                  rotate,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 24,
                }}
                drag={isFront ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  if (info.offset.x > 130) {
                    handleNextClick();
                  } else if (info.offset.x < -130) {
                    handlePrevClick();
                  }
                }}
                className={`absolute w-[310px] sm:w-[460px] h-[300px] sm:h-[250px] bg-white rounded-[32px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-slate-200/50 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing`}
              >
                {/* Decorative subtle grid background inside the card */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-30 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top Header Row: Image & Details */}
                  <div className="flex gap-4 items-start">
                    {/* Uniform Portrait Image (No border, clean rounded edges) */}
                    <div className="relative w-[68px] h-[84px] sm:w-[76px] sm:h-[96px] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-slate-100" style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover object-top pointer-events-none"
                        style={{
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                        }}
                      />
                    </div>

                    {/* Student Info */}
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-['Sora'] font-extrabold text-sm sm:text-base text-slate-900 truncate">
                          {t.name}
                        </h4>
                        <span className="font-sans font-extrabold text-amber-500 text-xs sm:text-sm shrink-0">
                          {t.package}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[10px] sm:text-xs font-semibold truncate">
                        {t.role}
                      </p>
                      <p className="text-slate-400 text-[9px] sm:text-[10px] truncate">
                        {t.course}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="inline-block font-sans font-bold text-[#1b75bb] bg-blue-50 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] tracking-wider uppercase border border-blue-100/80">
                          {t.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Testimony Quote with divider line */}
                  <div className="relative mt-2.5 pt-2 border-t border-slate-100/80 flex-1 flex items-start">
                    <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed italic font-sans font-medium line-clamp-4 flex-1">
                      "{t.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrevClick}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Previous Slide"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xs font-semibold text-slate-400">
            {activeIdx + 1} / {testimonials.length}
          </div>
          <button
            onClick={handleNextClick}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Next Slide"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
