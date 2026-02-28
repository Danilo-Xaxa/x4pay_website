import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
import TeamOne from "../components/TeamOne";
import ProcessOne from "../components/ProcessOne";
import GoalArea from "../components/GoalArea";
import FaqOne from "../components/FaqOne";
import ContactInner from "../components/ContactInner";
import FooterOne from "../components/FooterOne";

const LandingPage = () => {
  return (
    <>
      <HelmetReact
        title="X4PAY Assessoria"
        description="A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Consultoria especializada em subadquirência e compliance."
      />

      <HeaderOne />

      <section id="inicio">
        <HeroOne />
      </section>

      <section id="clientes">
        <TeamOne />
      </section>

      <section id="servicos">
        <ProcessOne />
        <GoalArea />
      </section>

      <section id="faq">
        <div className="faq-area-1 bg-smoke space">
          <FaqOne />
        </div>
      </section>

      <section id="contato">
        <ContactInner />
      </section>

      <FooterOne />
    </>
  );
};

export default LandingPage;
