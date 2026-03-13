import React from "react";
import { Helmet } from "react-helmet";

const SITE_URL = "https://x4payassessoria.com";
const OG_IMAGE = `${SITE_URL}/assets/img/og-image.png`;

const HelmetReact = ({ title, description = "A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Soluções completas em subadquirência e compliance." }) => {
  const fullTitle = `${title} | X4PAY Assessoria`;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "X4PAY Assessoria",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/img/logo.svg`,
    description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-81-98814-3087",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "X4PAY Assessoria LTDA",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/img/logo.svg`,
    image: OG_IMAGE,
    description: "Consultoria especializada em infraestrutura de pagamentos e subadquirência.",
    telephone: "+55-81-98814-3087",
    email: "contato@x4payassessoria.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Recife",
      addressRegion: "PE",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.0476,
      longitude: -34.877,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/x4pay_assessoria/",
      "https://www.linkedin.com/company/x4pay-assessoria/",
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="X4PAY Assessoria" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Schema.org - ProfessionalService */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>

      {/* Schema.org - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(localBusiness)}
      </script>
    </Helmet>
  );
};

export default HelmetReact;
