import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import EmailCapture from "../components/EmailCapture";
import PortfolioAll from "../components/PortfolioAll";



const Project = () => {
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 500);
  }, []);
  return (
    <>
      {/* Preloader */}
      {active === true && <Preloader />}

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
