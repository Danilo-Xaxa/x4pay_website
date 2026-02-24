import React from "react";
import { Helmet } from "react-helmet";

const HelmetReact = ({ title, description = "A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Soluções completas em subadquirência e compliance." }) => {
  return (
    <Helmet>
      <title>
        {title} | X4PAY Assessoria
      </title>
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  );
};

export default HelmetReact;
