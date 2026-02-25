import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import GoalArea from "../components/GoalArea";
import AboutOne from "../components/AboutOne";
import FooterOne from "../components/FooterOne";

const About = () => {
  return (
    <>
      {/* Helmet */}
      <HelmetReact title={"Sobre Nós"} description="Conheça a X4PAY Assessoria: nossa história, missão e equipe dedicada ao mercado de pagamentos e compliance." />

      {/* HeaderFive */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title="Sobre Nós" />

      {/* GoalArea */}
      <GoalArea />

      {/* AboutOne */}
      <AboutOne />

      {/* FooterOne */}
      <FooterOne />

    </>
  );
};

export default About;
