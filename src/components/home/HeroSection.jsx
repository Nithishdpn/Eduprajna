import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// ── animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const step = Math.ceil(numeric / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, numeric);
      setCount(current);
      if (current >= numeric) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  const raw = parseInt(target.replace(/\D/g, ''), 10);
  const plus = target.includes('+');
  return (
    <span ref={ref}>
      {count >= raw ? target : count.toLocaleString() + (plus ? '+' : '')}
    </span>
  );
}

const stats = [
  { value: '5000+', label: 'Students Placed' },
  { value: '98%',   label: 'Placement Rate' },
  { value: '1000+', label: 'Hiring Partners' },
];

const taglines = ['AI & ML', 'Full Stack', 'Cloud & DevOps', 'Cyber Security', 'Data Science'];

export default function HeroSection({ onEnrollClick }) {
  const [tagIdx, setTagIdx] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTagIdx((i) => (i + 1) % taglines.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 120;
    const mouse = { x: null, y: null, radius: 150 };

    const colors = [
      'rgba(59, 130, 246, 0.35)',  // Blue
      'rgba(168, 85, 247, 0.35)',  // Purple
      'rgba(236, 72, 153, 0.35)',  // Pink
      'rgba(16, 185, 129, 0.35)',  // Emerald
      'rgba(124, 179, 66, 0.35)',  // Brand Green
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 1.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = Math.random() * 1.4 - 0.7;
        this.vy = Math.random() * 1.4 - 0.7;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Slow drifting movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce at margins
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Repel from mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            this.x -= directionX * 0.15;
            this.y -= directionY * 0.15;
          }
        }
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="min-h-screen bg-white pt-20 pb-12 flex flex-col items-center justify-center relative overflow-hidden">

      {/* ── Interactive Particle Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full" />

      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(to right, #2563EB 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Gradient orbs ── */}
      <div className="absolute top-10 right-1/3 w-[520px] h-[520px] bg-blue-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[80px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-[70px] opacity-40 pointer-events-none" />

      {/* ── Wave SVG at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center"
        >


          {/* Headline */}
          <h1 className="font-['Sora'] font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.06] text-slate-900 mb-5 text-center">
            Premier{' '}
            <span className="relative inline-block">
              <span className="text-brand-600">Software Training Institute</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 9 C60 3, 140 3, 298 9" stroke="#c8e6be" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            in Bangalore
          </h1>

          {/* Dynamic tagline */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <span className="text-slate-500 text-lg font-medium">Master</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={tagIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent font-bold text-xl"
              >
                {taglines[tagIdx]}
              </motion.span>
            </AnimatePresence>
            <span className="text-slate-500 text-lg font-medium">and build real careers.</span>
          </div>

          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Industry-focused programs, hands-on projects, expert mentorship, and end-to-end career support designed for tomorrow's tech professionals.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onEnrollClick}
              className="btn-primary text-base px-7 py-4"
            >
              Customise Your Package <FiArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/courses"
                className="btn-secondary text-base px-7 py-4"
              >
                Explore Courses
              </Link>
            </motion.div>
          </div>

          {/* Animated mini stats */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className={`${i < stats.length - 1 ? 'pr-6 border-r border-slate-200' : ''}`}>
                <p className="font-bold text-xl text-slate-900 font-['Sora']">
                  <AnimatedCounter target={s.value} />
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center mt-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-slate-400 cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

