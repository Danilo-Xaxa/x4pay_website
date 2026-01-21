import React, { useEffect, useState } from "react";
import Preloader from "../elements/Preloader";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import Breadcrumb from "../components/Breadcrumb";
import FooterOne from "../components/FooterOne";
//import Newsletter from "../components/Newsletter";
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
      <HelmetReact title={"Contato"} />

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
