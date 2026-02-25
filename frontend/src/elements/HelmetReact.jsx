import React from "react";
import { Helmet } from "react-helmet";

const SITE_URL = "https://x4payassessoria.com";
const OG_IMAGE = `${SITE_URL}/assets/img/logo.svg`;

const HelmetReact = ({ title, description = "A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Soluções completas em subadquirência e compliance." }) => {
  const fullTitle = `${title} | X4PAY Assessoria`;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "X4PAY Assessoria",
    url: SITE_URL,
    logo: OG_IMAGE,
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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="X4PAY Assessoria" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
};

export default HelmetReact;
