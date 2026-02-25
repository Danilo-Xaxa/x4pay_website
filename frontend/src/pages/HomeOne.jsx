import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
import ProcessOne from "../components/ProcessOne";
import TeamOne from "../components/TeamOne";
import FaqOne from "../components/FaqOne";
import EmailCapture from "../components/EmailCapture";
import FooterOne from "../components/FooterOne";

const HomeOne = () => {
  return (
    <>
      {/* Helmet */}
      <HelmetReact title={"Início"} description="A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Consultoria especializada em subadquirência e compliance." />

      {/* HeaderOne */}
      <HeaderOne />

      {/* HeroOne */}
      <HeroOne />

      {/* TeamOne */}
      <TeamOne />

      {/* ProcessOne */}
      <ProcessOne />

      {/* FaqOne */}
      <div className="faq-area-1 bg-smoke space">
        <FaqOne />
      </div>

      {/* EmailCapture */}
      <div className="bg-smoke">
        <EmailCapture />
      </div>

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default HomeOne;
