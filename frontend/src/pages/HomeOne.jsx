import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
import ProcessOne from "../components/ProcessOne";
import TeamOne from "../components/TeamOne";
import FaqOne from "../components/FaqOne";
import EmailCapture from "../components/EmailCapture";
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
