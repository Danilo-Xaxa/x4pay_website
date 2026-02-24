import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import ContactInner from "../components/ContactInner";



const Contact = () => {
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
      <HelmetReact title={"Contato"} description="Entre em contato com a X4PAY Assessoria. Solicite um orçamento para serviços de subadquirência e compliance." />

      {/* HeaderFive */}
      <HeaderOne />

      {/* ContactInner */}
      <ContactInner />

      {/* FooterOne */}
      <FooterOne />

    </>
  );
};

export default Contact;
