import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'service';
  schema?: any;
  noindex?: boolean;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  schema,
  noindex = false,
  breadcrumbs 
}: SEOProps) => {
  const fullTitle = title.length <= 60 ? title : title.substring(0, 57) + '...';
  const fullDescription = description.length >= 140 && description.length <= 160 
    ? description 
    : description.length < 140 
      ? description + ' Call 0403 971 720 for free quote today!'
      : description.substring(0, 157) + '...';
  
  const canonicalUrl = canonical || `https://www.freshpluscleaning.com.au${window.location.pathname}`;
  const ogImage = 'https://www.freshpluscleaning.com.au/og-image.png';

  // Generate breadcrumb schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://www.freshpluscleaning.com.au${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Fresh Plus Cleaning" />
      <meta property="og:locale" content="en_AU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

// Utility function to generate service schema
export const generateServiceSchema = (
  serviceName: string,
  description: string,
  serviceType: string = 'CleaningService'
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "serviceType": serviceType,
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://www.freshpluscleaning.com.au/#business"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    }
  ],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "priceRange": "$150-$800",
    "availability": "https://schema.org/InStock"
  }
});

// Utility function to generate FAQ schema
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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

export default SEOHead;
