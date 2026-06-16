import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../utils/seo';

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  url, 
  image, 
  type = "website",
  article = null,
  structuredData = null,
  canonical = null
}) {
  const seoTitle = title || siteConfig.defaultTitle;
  const seoDescription = description || siteConfig.defaultDescription;
  const seoUrl = url || siteConfig.siteUrl;
  const seoImage = image || `${siteConfig.siteUrl}/og-default.jpg`;
  const seoCanonical = canonical || seoUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      <link rel="canonical" href={seoCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@eduprajna" />
      <meta name="twitter:creator" content="@eduprajna" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#7CB342" />
      <meta name="msapplication-TileColor" content="#7CB342" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/outfit-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/syne-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      
      {/* Language and Geographic targeting */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore, Karnataka, India" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />
    </Helmet>
  );
}

// Individual SEO components for specific content types
export function CourseSEOHead({ course }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.overview,
    "provider": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "url": siteConfig.siteUrl
    },
    "courseCode": course.slug,
    "educationalLevel": course.level,
    "timeRequired": course.duration,
    "teaches": course.skills,
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": course.rating,
      "reviewCount": course.reviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${siteConfig.siteUrl}/courses/${course.slug}`
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who is this ${course.title} course designed for?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `This course is designed for both beginners wishing to enter the tech sector and professionals seeking to upgrade their skills. Our curriculum starts with foundational concepts and advances to complex real-world projects.`
        }
      },
      {
        "@type": "Question",
        "name": "What are the batch timings and schedules?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible learning schedules, including weekday morning batches, weekday evening batches for working professionals, and comprehensive weekend batches. You can customize your timeline during enrollment."
        }
      },
      {
        "@type": "Question",
        "name": "Does this program include hands-on project experience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, every module features mandatory practical exercises. You will build actual industry-level projects (listed in the course details) that you can showcase in your professional portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "How does the placement support system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upon completing 80% of the course, you gain access to our placement support: mock interviews, resume review sessions, LinkedIn profile audit, and direct referrals to our network of 1000+ hiring partners."
        }
      },
      {
        "@type": "Question",
        "name": "Can I attend the classes both online and offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we support a hybrid structure. You can attend live online lectures or join our physical classrooms and lab facilities. Recorded sessions are also archived for review."
        }
      }
    ]
  };

  return (
    <SEOHead
      title={`${course.title} Course - Training & Certification | EduPrajna`}
      description={`Master ${course.title} with hands-on training, real projects & expert mentorship. ${course.duration} comprehensive course covering ${course.skills?.slice(0,3).join(', ')}. Get job-ready with placement support.`}
      keywords={`${course.title} course, ${course.title} training, ${course.title} certification, ${course.skills?.join(', ')}, learn ${course.title}, software training`}
      url={`${siteConfig.siteUrl}/courses/${course.slug}`}
      image={course.image}
      structuredData={[structuredData, faqSchema]}
    />
  );
}

export function BlogPostSEOHead({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.siteName,
      "logo": {
        "@type": "ImageObject", 
        "url": `${siteConfig.siteUrl}/logo.png`
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/blog/${post.slug}`
    },
    "keywords": post.tags?.join(', ')
  };

  const article = {
    publishedTime: new Date(post.date).toISOString(),
    modifiedTime: new Date(post.date).toISOString(),
    author: post.author,
    section: post.category,
    tags: post.tags
  };

  return (
    <SEOHead
      title={`${post.title} | EduPrajna Tech Blog`}
      description={post.excerpt}
      keywords={`${post.tags?.join(', ')}, tech blog, programming, career advice`}
      url={`${siteConfig.siteUrl}/blog/${post.slug}`}
      image={post.image}
      type="article"
      article={article}
      structuredData={structuredData}
    />
  );
}