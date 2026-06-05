import HeroSection from '../components/home/HeroSection';
import PartnersSection from '../components/home/PartnersSection';
import MetricsSection from '../components/home/MetricsSection';
import AboutPreview from '../components/home/AboutPreview';
import CoursesSection from '../components/home/CoursesSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

export default function HomePage({ onEnrollClick, onCallbackClick }) {
  return (
    <main>
      <HeroSection onEnrollClick={onEnrollClick} />
      <PartnersSection />
      <MetricsSection />
      <AboutPreview />
      <CoursesSection onEnrollClick={onEnrollClick} />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection onEnrollClick={onEnrollClick} onCallbackClick={onCallbackClick} />
    </main>
  );
}
