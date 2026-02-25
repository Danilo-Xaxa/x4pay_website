import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import ContactInner from "../components/ContactInner";

const Contact = () => {
  return (
    <>
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
