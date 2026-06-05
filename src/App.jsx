import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingWidgets from './components/common/FloatingWidgets';
import EnrollModal from './components/common/EnrollModal';

import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import HirePage from './pages/HirePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes({ onEnrollClick, onCallbackClick }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage onEnrollClick={onEnrollClick} onCallbackClick={onCallbackClick} /></PageWrapper>} />
        <Route path="/courses" element={<PageWrapper><CoursesPage onEnrollClick={onEnrollClick} /></PageWrapper>} />
        <Route path="/courses/:slug" element={<PageWrapper><CourseDetailPage onEnrollClick={onEnrollClick} /></PageWrapper>} />
        <Route path="/hire" element={<PageWrapper><HirePage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper><BlogDetailPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage onEnrollClick={onEnrollClick} /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="*" element={
          <PageWrapper>
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center">
                <div className="text-7xl mb-5">🚀</div>
                <h1 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Page Not Found</h1>
                <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">Go Home</a>
              </div>
            </div>
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar onEnrollClick={() => setEnrollOpen(true)} />
        <div className="flex-1">
          <AppRoutes
            onEnrollClick={() => setEnrollOpen(true)}
            onCallbackClick={() => setCallbackOpen(true)}
          />
        </div>
        <Footer />
        <FloatingWidgets onCallbackClick={() => setCallbackOpen(true)} />
        <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
