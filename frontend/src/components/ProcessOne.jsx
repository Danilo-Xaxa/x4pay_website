import React from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const STEPS = [
  {
    icon: "assets/img/icon/process-icon-1-1.svg",
    alt: "Ícone de contratos com adquirentes",
    number: "01",
    text: "Adiq, Cielo, GetNet, etc",
    title: "Contratos com os adquirentes",
  },
  {
    icon: "assets/img/icon/process-icon-1-2.svg",
    alt: "Ícone de contratos com bandeiras de cartão",
    number: "02",
    text: "Visa, Mastercard, Elo e American Express",
    title: "Contratos com as bandeiras",
  },
  {
    icon: "assets/img/icon/process-icon-1-3.svg",
    alt: "Ícone de contratos com registradoras",
    number: "03",
    text: "B3, CERC e Núclea",
    title: "Contratos com as registradoras",
  },
  {
    icon: "assets/img/icon/process-icon-1-4.svg",
    alt: "Ícone de contratação de softwares de pagamento",
    number: "04",
    text: "Liquidação, captura e processamento",
    title: "Contratação dos softwares",
  },
];

const ProcessOne = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="process-area-1 bg-smoke space"
      style={{ backgroundImage: "url(assets/img/bg/shape_1.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="title-area text-center">
              <span className="sub-title">
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Nosso processo
              </span>
              <h2 className="sec-title style2">
                A modernização dos meios de pagamentos
              </h2>
            </div>
          </div>
        </div>
        <div className="row gy-30" ref={ref}>
          {STEPS.map((step, idx) => (
            <div key={step.number} className="col-lg-6 col-xl-3 process-card-wrap">
              <div className={`process-card fade-in-up delay-${idx + 1}${isVisible ? " visible" : ""}`}>
                <div className="process-card_wrapp">
                  <div className="process-card-icon">
                    <img src={step.icon} alt={step.alt} />
                  </div>
                  <h3 className="process-card_number">{step.number}</h3>
                </div>
                <div className="process-card_content">
                  <span className="process-card-text">{step.text}</span>
                  <h4 className="process-card-title"> {step.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessOne;
