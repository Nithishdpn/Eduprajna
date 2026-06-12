import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingWidgets from './components/common/FloatingWidgets';
import EnrollModal from './components/common/EnrollModal';
import WelcomePopup from './components/common/WelcomePopup';
import MetricsSection from './components/home/MetricsSection';
import ScrollToTop from './components/common/ScrollToTop';

import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import HirePage from './pages/HirePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';

function AppRoutes({ onEnrollClick, onCallbackClick }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage onEnrollClick={onEnrollClick} onCallbackClick={onCallbackClick} />} />
      <Route path="/courses" element={<CoursesPage onEnrollClick={onEnrollClick} />} />
      <Route path="/courses/:slug" element={<CourseDetailPage onEnrollClick={onEnrollClick} />} />
      <Route path="/hire" element={<HirePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/about" element={<AboutPage onEnrollClick={onEnrollClick} />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="text-8xl font-black mb-5 font-['Sora'] bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">404</div>
            <h1 className="font-['Sora'] font-bold text-4xl text-slate-900 mb-3">Page Not Found</h1>
            <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
            <a href="/" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">Go Home</a>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default function App() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnrollClick = (courseTitle = '') => {
    setSelectedCourse(courseTitle);
    setEnrollOpen(true);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar onEnrollClick={() => handleEnrollClick()} />
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <AppRoutes
                onEnrollClick={handleEnrollClick}
                onCallbackClick={() => setCallbackOpen(true)}
              />
            </div>
            <MetricsSection />
          </div>
          <Footer />
          <FloatingWidgets onCallbackClick={() => setCallbackOpen(true)} />
          <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} defaultCourse={selectedCourse} />
          <WelcomePopup />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

