import React from "react";
import HelmetReact from "../elements/HelmetReact";
import HeaderOne from "../components/HeaderOne";
import HeroOne from "../components/HeroOne";
import WaveDivider from "../components/WaveDivider";
import TeamOne from "../components/TeamOne";
import ProcessOne from "../components/ProcessOne";
import GoalArea from "../components/GoalArea";
import FaqOne from "../components/FaqOne";
import ContactInner from "../components/ContactInner";
import FooterOne from "../components/FooterOne";

const NAVY = "#0B1D3A";
const NAVY_LIGHT = "#1A3A6B";
const NAVY_DARK = "#061326";
const WHITE = "#FFFFFF";
const SMOKE = "#F0F3F8";

const LandingPage = () => {
  return (
    <>
      <HelmetReact
        title="X4PAY Assessoria"
        description="A X4PAY Assessoria conecta sua empresa ao futuro do mercado de pagamentos. Consultoria especializada em subadquirência e compliance."
      />

      <HeaderOne />

      <section id="inicio" style={{ position: "relative", overflow: "hidden" }}>
        <HeroOne />
      </section>

      <WaveDivider fromColor={NAVY} toColor={WHITE} variant="wave1" height={80} />

      <section id="clientes">
        <TeamOne />
      </section>

      <WaveDivider fromColor={WHITE} toColor={NAVY} variant="wave2" height={80} />

      <section id="servicos">
        <ProcessOne />
        <WaveDivider fromColor={NAVY_LIGHT} toColor={WHITE} variant="wave3" height={70} />
        <GoalArea />
      </section>

      <WaveDivider fromColor={SMOKE} toColor={NAVY} variant="wave1" height={80} />

      <section id="faq">
        <div className="faq-area-1 space">
          <FaqOne />
        </div>
      </section>

      <WaveDivider fromColor={NAVY_LIGHT} toColor={WHITE} variant="wave2" height={80} />

      <section id="contato">
        <ContactInner />
      </section>

      <WaveDivider fromColor={WHITE} toColor={NAVY_DARK} variant="wave3" height={70} />

      <FooterOne />
    </>
  );
};

export default LandingPage;
