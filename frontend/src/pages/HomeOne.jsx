import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
//import ServiceOne from "../components/ServiceOne";
//import CTAOne from "../components/CTAOne";
//import AboutOne from "../components/AboutOne";
import ProcessOne from "../components/ProcessOne";
//import PortfolioOne from "../components/PortfolioOne";
//import TestimonialOne from "../components/TestimonialOne";
//import MarqueeOne from "../components/MarqueeOne";
import TeamOne from "../components/TeamOne";
import FaqOne from "../components/FaqOne";
import BlogOne from "../components/BlogOne";
import FooterOne from "../components/FooterOne";

const HomeOne = () => {
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
      <HelmetReact title={"Início"} />

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

      {/* BlogOne */}
      <div className="bg-smoke">
        <BlogOne />
      </div>

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default HomeOne;
