// SEO utility functions and metadata
export const siteConfig = {
  siteName: "EduPrajna",
  siteUrl: "https://eduprajna.com",
  defaultTitle: "EduPrajna - Premier Software Training Institute & IT Certification Courses",
  defaultDescription: "Learn industry-ready technology skills with EduPrajna's expert-led courses. Master Python, Full Stack Development, AI, Machine Learning, AWS, DevOps, Cyber Security and Data Science with guaranteed placement support.",
  defaultKeywords: "software training institute, IT courses, Python training, Full Stack development course, AI course, Machine Learning training, AWS certification, DevOps course, Cyber Security training, Data Science course, programming courses, placement guarantee, software jobs, tech careers, online training, Bangalore, India",
  companyName: "EduPrajna Technologies Pvt Ltd",
  address: {
    street: "2nd Floor, Eduprajna 1433/A, Nehru Rd, above Ramdev Hi Fashion, Kullappa Circle, Subbayianiah Palyam, Kammanahalli",
    city: "Bangalore",
    state: "Karnataka", 
    postalCode: "560084",
    country: "India"
  },
  contact: {
    phone: "+91 81977 19297",
    email: "support@eduprajna.com",
    whatsapp: "+91 81977 19297"
  },
  social: {
    linkedin: "https://linkedin.com/company/eduprajna",
    twitter: "https://twitter.com/eduprajna",
    instagram: "https://instagram.com/eduprajna", 
    youtube: "https://youtube.com/@eduprajna",
    facebook: "https://facebook.com/eduprajna"
  },
  founded: "2020",
  employees: "50-100"
};

// Generate page-specific SEO metadata
export const generatePageSEO = (pageType, data = {}) => {
  const baseConfig = {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    keywords: siteConfig.defaultKeywords,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/og-default.jpg`,
    type: "website"
  };

  switch (pageType) {
    case 'home':
      return {
        ...baseConfig,
        title: "EduPrajna | Software Training Institute in Bangalore",
        description: "Transform your career with India's leading EdTech platform. Master Python, Full Stack Development, AI, Machine Learning, AWS, DevOps, Cyber Security & Data Science. 5000+ students placed with guaranteed job support.",
        keywords: "best software training institute, IT courses Bangalore, Python course, Full Stack development training, AI Machine Learning course, AWS certification, DevOps training, Cyber Security course, Data Science training, placement guarantee, software jobs India"
      };

    case 'courses':
      return {
        ...baseConfig,
        title: "Courses | Professional IT Training & Certifications | EduPrajna",
        description: "Explore career-focused technology courses including Python Programming, Full Stack Development, Artificial Intelligence, Machine Learning, AWS Cloud, DevOps, Cyber Security and Data Science with expert trainers and placement support.",
        keywords: "IT courses, technology training programs, Python course, Java training, Full Stack developer course, AI course, Machine Learning training, AWS certification, DevOps course, Cyber Security training, Data Science course, programming courses, software courses",
        url: `${siteConfig.siteUrl}/courses`
      };

    case 'course-detail':
      const course = data.course;
      if (!course) return baseConfig;
      
      return {
        ...baseConfig,
        title: `${course.title} Course - Training & Certification | EduPrajna`,
        description: `Master ${course.title} with hands-on training, real projects & expert mentorship. ${course.duration} comprehensive course with ${course.skills?.join(', ')}. Get job-ready with placement support. Enroll now!`,
        keywords: `${course.title} course, ${course.title} training, ${course.title} certification, ${course.skills?.join(', ')}, learn ${course.title}, ${course.title} institute, ${course.title} classes, software training`,
        url: `${siteConfig.siteUrl}/courses/${course.slug}`,
        image: course.image || baseConfig.image,
        type: "article"
      };

    case 'gallery':
      return {
        ...baseConfig,
        title: "Gallery | EduPrajna Life, Events & Campus",
        description: "Explore the vibrant student life, campus events, and tech community at EduPrajna. See our classrooms, hackathons, and placement celebrations.",
        keywords: "EduPrajna gallery, student life, tech campus, classroom photos, Bangalore training center",
        url: `${siteConfig.siteUrl}/gallery`
      };

    case 'blog':
      return {
        ...baseConfig,
        title: "Blog | Tech Career Insights & Programming Tips | EduPrajna", 
        description: "Stay updated with latest technology trends, programming tutorials, career advice, interview preparation tips and industry insights. Expert guidance for software developers and tech professionals.",
        keywords: "tech blog, programming blog, career advice, software development tips, technology trends, coding tutorials, interview preparation, tech careers, software jobs, developer resources",
        url: `${siteConfig.siteUrl}/blog`
      };

    case 'blog-post':
      const post = data.post;
      if (!post) return baseConfig;
      
      return {
        ...baseConfig,
        title: `${post.title} | EduPrajna Tech Blog`,
        description: post.excerpt || post.description,
        keywords: `${post.tags?.join(', ')}, tech blog, programming, career advice, software development`,
        url: `${siteConfig.siteUrl}/blog/${post.slug}`,
        image: post.image || baseConfig.image,
        type: "article"
      };

    case 'hire':
      return {
        ...baseConfig,
        title: "Hire from Us | Skilled Developers & Tech Professionals | EduPrajna",
        description: "Partner with EduPrajna to hire job-ready software developers, AI/ML engineers, Full Stack developers, DevOps engineers and Data Scientists. Corporate training solutions and talent acquisition services.",
        keywords: "hire developers, recruit software engineers, corporate training, talent acquisition, skilled programmers, AI ML engineers, Full Stack developers, DevOps professionals, Data Scientists, tech recruitment",
        url: `${siteConfig.siteUrl}/hire-from-us`
      };

    case 'about':
      return {
        ...baseConfig,
        title: "About Us | EduPrajna Software Training Institute",
        description: "Founded in 2020, EduPrajna has transformed 5000+ careers through industry-focused technology training. Learn about our mission, expert trainers, placement success stories and commitment to quality education.",
        keywords: "about EduPrajna, software training institute, EdTech company, technology education, placement success, expert trainers, company story, educational mission",
        url: `${siteConfig.siteUrl}/about-us`
      };

    case 'contact':
      return {
        ...baseConfig,
        title: "Contact Us | EduPrajna Software Training",
        description: "Get in touch with EduPrajna for course enrollment, free counseling session, corporate training inquiries. Located in Bangalore. Call +91 81977 19297 or visit our center.",
        keywords: "contact EduPrajna, course enrollment, free counseling, software training admission, training institute contact, Bangalore Koramangala, education consultation",
        url: `${siteConfig.siteUrl}/contact`
      };

    default:
      return baseConfig;
  }
};

// Generate structured data schemas
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": siteConfig.companyName,
  "alternateName": siteConfig.siteName,
  "url": siteConfig.siteUrl,
  "logo": `${siteConfig.siteUrl}/logo.png`,
  "image": `${siteConfig.siteUrl}/og-default.jpg`,
  "description": siteConfig.defaultDescription,
  "foundingDate": siteConfig.founded,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address.street,
    "addressLocality": siteConfig.address.city,
    "addressRegion": siteConfig.address.state,
    "postalCode": siteConfig.address.postalCode,
    "addressCountry": siteConfig.address.country
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": Object.values(siteConfig.social),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Technology Training Courses",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Python Programming Course",
        "description": "Complete Python programming training with hands-on projects",
        "provider": {
          "@type": "Organization", 
          "name": siteConfig.siteName
        }
      }
    ]
  }
});

export const generateCourseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.overview,
  "provider": {
    "@type": "Organization",
    "name": siteConfig.siteName,
    "url": siteConfig.siteUrl
  },
  "courseCode": course.id,
  "educationalLevel": course.level,
  "timeRequired": course.duration,
  "coursePrerequisites": "Basic computer knowledge",
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
    "validFrom": new Date().toISOString(),
    "url": `${siteConfig.siteUrl}/courses/${course.slug}`
  }
});

export const generateBlogPostSchema = (post) => ({
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
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `${siteConfig.siteUrl}${crumb.url}`
  }))
});

export const generateSiteNavigationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Courses",
      "url": `${siteConfig.siteUrl}/courses`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Gallery",
      "url": `${siteConfig.siteUrl}/gallery`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Hire from Us",
      "url": `${siteConfig.siteUrl}/hire-from-us`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Blog",
      "url": `${siteConfig.siteUrl}/blog`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "About Us",
      "url": `${siteConfig.siteUrl}/about-us`
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Free Counseling",
      "url": `${siteConfig.siteUrl}/free-counseling`
    }
  ]
});