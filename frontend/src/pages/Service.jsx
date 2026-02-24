import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
import EmailCapture from "../components/EmailCapture";
import ServiceView from "../components/ServiceView";
//import AppointmentTwo from "../components/AppointmentTwo";


const Service = () => {
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
      <HelmetReact title={"Nossos Serviços"} description="Serviços especializados em subadquirência, compliance e consultoria regulatória para o mercado de pagamentos." />

      {/* HeaderFive */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb title="Nossos Serviços" />

      {/* ServiceOne */}
      <ServiceView />

      {/* EmailCapture */}
      <EmailCapture />

      {/* FooterOne */}
      <FooterOne />

    </>
  );
};

export default Service;
