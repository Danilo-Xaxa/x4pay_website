import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import EmailCapture from "../components/EmailCapture";
import PortfolioAll from "../components/PortfolioAll";

const Project = () => {
  return (
    <>
      {/* Helmet */}
      <HelmetReact title={"Clientes"} description="Conheça os clientes e casos de sucesso da X4PAY Assessoria no mercado de pagamentos." />

      {/* HeaderFive */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title="Clientes" />

      {/* PortfolioAll */}
      <PortfolioAll />

      {/* EmailCapture */}
      <EmailCapture />

      {/* FooterOne */}
      <FooterOne />

    </>
  );
};

export default Project;
