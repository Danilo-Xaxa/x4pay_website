import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import EmailCapture from "../components/EmailCapture";
import PortfolioDetailsArea from "../components/PortfolioDetailsArea";



const ProjectDetails = () => {
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
      <HelmetReact title={"Project Details"} />

      {/* HeaderFive */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title="Project Details" />

      {/* PortfolioDetailsArea */}
      <PortfolioDetailsArea />

      {/* EmailCapture */}
      <EmailCapture />

      {/* FooterOne */}
      <FooterOne />

    </>
  );
};

export default ProjectDetails;
