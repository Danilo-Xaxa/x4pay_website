import React from "react";
import { Helmet } from "react-helmet";
const HelmetReact = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title} | X4PAY Assessoria
      </title>
      <meta
        name="description"
        content="X4PAY Assessoria"
      />
    </Helmet>
  );
};

export default HelmetReact;
