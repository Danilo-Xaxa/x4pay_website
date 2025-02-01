import React from "react";
import { Helmet } from "react-helmet";
const HelmetReact = ({ title }) => {
  return (
    <Helmet>
      <title>
        {title} | X4Pay Assessoria
      </title>
      <meta
        name="description"
        content="X4Pay Assessoria"
      />
    </Helmet>
  );
};

export default HelmetReact;
