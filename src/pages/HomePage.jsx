import SEOHead from '../components/common/SEOHead';
import { generatePageSEO, generateOrganizationSchema, generateSiteNavigationSchema } from '../utils/seo';
import HeroSection from '../components/home/HeroSection';
import PartnersSection from '../components/home/PartnersSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutPreview from '../components/home/AboutPreview';
import CoursesSection from '../components/home/CoursesSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function HomePage({ onEnrollClick, onCallbackClick }) {
  const seoData = generatePageSEO('home');
  const organizationSchema = generateOrganizationSchema();
  const siteNavigationSchema = generateSiteNavigationSchema();

  return (
    <>
      <SEOHead 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        structuredData={[organizationSchema, siteNavigationSchema]}
      />
      <main>
        <HeroSection onEnrollClick={onEnrollClick} />
        <PartnersSection />
        <WhyChooseUs />
        <CoursesSection onEnrollClick={onEnrollClick} />
        <AboutPreview />
        <TestimonialsSection />
        <ServicesSection />
        <CTASection onEnrollClick={onEnrollClick} onCallbackClick={onCallbackClick} />
      </main>
    </>
  );
}

