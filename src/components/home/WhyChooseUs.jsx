import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiBriefcase, FiCode, FiUsers, FiAward, FiClock, FiTrendingUp,
} from 'react-icons/fi';

const reasons = [
  {
    icon: <FiBriefcase className="w-5 h-5" />,
    title: 'Industry-Led Curriculum',
    desc: 'Every course is co-designed with hiring managers. You learn exactly what companies need right now.',
    color: 'blue',
    bgClass: 'from-blue-50 to-indigo-100',
    bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=90',
  },
  {
    icon: <FiCode className="w-5 h-5" />,
    title: 'Project-Based Learning',
    desc: 'Build a portfolio of real-world projects from Day 1. Employers love candidates who can show, not just tell.',
    color: 'indigo',
    bgClass: 'from-slate-900 to-slate-950',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=90',
  },
  {
    icon: <FiUsers className="w-5 h-5" />,
    title: '1000+ Hiring Partners',
    desc: 'Direct referrals to our vast network of companies. Our placement team works until you land the right job.',
    color: 'emerald',
    bgClass: 'from-emerald-50 to-teal-100',
    bgImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=90',
  },
  {
    icon: <FiAward className="w-5 h-5" />,
    title: 'Certified Expert Mentors',
    desc: 'Learn from professionals with 8–15 years of industry experience — not just academic knowledge.',
    color: 'violet',
    bgClass: 'from-[#1a1744] to-[#0f0d2d]',
    bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90',
  },
  {
    icon: <FiClock className="w-5 h-5" />,
    title: 'Flexible Batch Timings',
    desc: 'Morning, evening, and weekend batches for students and working professionals alike.',
    color: 'cyan',
    bgClass: 'from-sky-50 to-cyan-100',
    bgImage: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=1200&q=90',
  },
  {
    icon: <FiTrendingUp className="w-5 h-5" />,
    title: '98% Placement Rate',
    desc: "Our track record speaks for itself. We don't stop supporting you until you are placed.",
    color: 'rose',
    bgClass: 'from-slate-950 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=90',
  },
];

const colorMap = {
  blue: 'text-blue-600 bg-blue-50 border-blue-100/50',
  indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100/50',
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100/50',
  violet: 'text-violet-600 bg-violet-50 border-violet-100/50',
  cyan: 'text-cyan-600 bg-cyan-50 border-cyan-100/50',
  rose: 'text-rose-600 bg-rose-50 border-rose-100/50',
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(340);

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const rotationAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoplayTimer = useRef(null);

  // Dynamic radius based on responsive screen sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(250); // Mobile
      } else if (window.innerWidth < 768) {
        setRadius(300); // Tablet Portrait
      } else {
        setRadius(380); // Desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update react state from the ref value
  const updateRotationState = (angle) => {
    setRotationAngle(angle);
    rotationAngleRef.current = angle;
    
    // Normalize angle to find the currently active center dot index
    const snappedIndex = Math.round(-angle / 60);
    const normalizedIndex = ((snappedIndex % 6) + 6) % 6;
    setActiveIndex(normalizedIndex);
  };

  const goToIndex = (index) => {
    const targetAngle = -index * 60;
    updateRotationState(targetAngle);
  };

  const goToDot = (dotIndex) => {
    const currentSnapped = Math.round(-rotationAngleRef.current / 60);
    const currentNormalized = ((currentSnapped % 6) + 6) % 6;
    let diff = dotIndex - currentNormalized;
    // Shortest path logic
    if (diff > 3) diff -= 6;
    if (diff < -3) diff += 6;
    goToIndex(currentSnapped + diff);
  };

  const startAutoplay = () => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = setInterval(() => {
      if (!isDraggingRef.current) {
        const currentSnapped = Math.round(-rotationAngleRef.current / 60);
        goToIndex(currentSnapped + 1);
      }
    }, 4500);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, []);

  // Drag Gesture Handlers
  const handleDragStart = (e) => {
    // Prevent standard text/image drag defaults on non-inputs
    if (e.type === 'mousedown') {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        e.preventDefault();
      }
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragStartAngle.current = rotationAngleRef.current;
    isDraggingRef.current = true;
    setIsDragging(true);

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;

    // Convert pixel delta to Y rotation degrees
    const sensitivity = 0.22; 
    const newAngle = dragStartAngle.current + deltaX * sensitivity;
    updateRotationState(newAngle);
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    // Snap to the nearest card (60-degree increments)
    const currentAngle = rotationAngleRef.current;
    const snappedIndex = Math.round(-currentAngle / 60);
    goToIndex(snappedIndex);

    startAutoplay();
  };

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden select-none">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-blue-50/50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <h2 className="section-title mb-3 text-3xl sm:text-4xl text-slate-900">
            Why 15,000+ Learners Choose Us
          </h2>
          <p className="section-subtitle mx-auto text-sm sm:text-base max-w-xl text-slate-500">
            We're not just a training institute — we're your career launch partner.
          </p>
        </motion.div>

        {/* 3D Cylindrical Carousel Viewport */}
        <div
          className="relative w-full flex items-center justify-center overflow-visible"
          style={{
            perspective: '1300px',
            perspectiveOrigin: '50% 32%',
            height: '520px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Rotating Ring */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(${rotationAngle}deg)`,
              transition: isDragging ? 'none' : 'transform 0.65s cubic-bezier(0.2, 0.88, 0.3, 1.15)',
            }}
          >
            {reasons.map((r, i) => {
              // Calculate relative Y angle in viewport to apply opacity, brightness, and pointer-events
              let itemAngle = (i * 60 + rotationAngle) % 360;
              if (itemAngle > 180) itemAngle -= 360;
              if (itemAngle < -180) itemAngle += 360;

              const isCenter = Math.abs(itemAngle) < 20;
              const opacity = Math.max(0.02, 1 - Math.abs(itemAngle) / 105);
              const brightness = 1 - Math.abs(itemAngle) / 120 * 0.7;
              const zIndex = Math.round(100 - Math.abs(itemAngle));
              const pointerEvents = Math.abs(itemAngle) < 75 ? 'auto' : 'none';

              return (
                <div
                  key={i}
                  className="absolute w-[280px] sm:w-[325px] h-[360px] sm:h-[390px] rounded-[2rem] p-4 border transition-all duration-300 flex flex-col justify-between"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotateY(${i * 60}deg) translateZ(${radius}px)`,
                    background: isCenter ? 'linear-gradient(to bottom right, #ffffff, #e5f3e0)' : '#ffffff',
                    borderColor: isCenter ? 'rgba(124, 179, 66, 0.65)' : 'rgba(226, 232, 240, 0.8)',
                    opacity: opacity,
                    filter: `brightness(${brightness})`,
                    zIndex: zIndex,
                    pointerEvents: pointerEvents,
                    boxShadow: isCenter
                      ? '0 25px 50px -12px rgba(124, 179, 66, 0.18), 0 0 15px rgba(124, 179, 66, 0.08)'
                      : '0 10px 30px -15px rgba(0,0,0,0.06)',
                    WebkitBoxReflect: 'below 12px linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 60%)',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      goToDot(i);
                    }
                  }}
                >
                  {/* Image Mockup on top */}
                  <div className={`relative bg-gradient-to-br ${r.bgClass} rounded-2xl p-2 border border-slate-100/50 overflow-hidden group flex-shrink-0`}>
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-white shadow-sm">
                      <img
                        src={r.bgImage}
                        alt={r.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Text Description Block */}
                  <div className="space-y-2 px-1 pt-3 flex items-start gap-3 flex-grow">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg border shrink-0 mt-0.5 ${colorMap[r.color] || 'text-brand-600 bg-brand-50 border-brand-100/50'}`}>
                      {r.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-['Sora'] font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed line-clamp-3">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-4">
          {reasons.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDot(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-brand-500'
                  : 'w-2 bg-slate-200 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
