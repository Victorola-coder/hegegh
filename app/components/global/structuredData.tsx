export const OrganizationStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "University of Wisdom and Understanding",
    alternateName: "UoW",
    description: "An online university providing wisdom, knowledge, and understanding about money, relationships, and life through certification programs.",
    url: "https://uow.victorola.dev",
    logo: "https://uow.victorola.dev/images/logo.png",
    founder: {
      "@type": "Person",
      name: "GehGeh",
      url: "https://twitter.com/heyVickyJay"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressRegion: "Nigeria"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English"
    },
    sameAs: [
      "https://twitter.com/heyVickyJay"
    ],
    offers: {
      "@type": "Offer",
      category: "Educational Program",
      description: "Certificate programs in life skills, financial wisdom, and street intelligence"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const CourseStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "University of Wisdom Certificate Program",
    description: "Comprehensive certification program covering financial wisdom, street intelligence, relationship understanding, and life skills.",
    provider: {
      "@type": "EducationalOrganization",
      name: "University of Wisdom and Understanding",
      url: "https://uow.victorola.dev"
    },
    courseMode: "online",
    educationalLevel: "Beginner to Advanced",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      enrollmentStartDate: "2024-01-01",
      enrollmentEndDate: "2024-12-31"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const WebSiteStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "University of Wisdom and Understanding",
    url: "https://uow.victorola.dev",
    description: "Get certified in life skills, financial wisdom, and street intelligence",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://uow.victorola.dev/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
