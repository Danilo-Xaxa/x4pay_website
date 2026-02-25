import React from "react";
//import Marquee from "react-fast-marquee";

const ProcessOne = () => {
  return (
    <>
      <section
        className="process-area-1 bg-smoke space-bottom"
        style={{ backgroundImage: "url(assets/img/bg/shape_1.png)" }}
      >
        {/* Client Area   */}
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
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
          <div className="row gy-30">
            <div className="col-lg-6 col-xl-3 process-card-wrap">
              <div className="process-card">
                <div className="process-card_wrapp">
                  <div className="process-card-icon">
                    <img src="assets/img/icon/process-icon-1-1.svg" alt="Ícone de contratos com adquirentes" />
                  </div>
                  <h3 className="process-card_number">01</h3>
                </div>
                <div className="process-card_content">
                  <span className="process-card-text">Adiq, Cielo, GetNet, etc</span>
                  <h4 className="process-card-title"> Contratos com os adquirentes</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-3 process-card-wrap">
              <div className="process-card">
                <div className="process-card_wrapp">
                  <div className="process-card-icon">
                    <img src="assets/img/icon/process-icon-1-2.svg" alt="Ícone de contratos com bandeiras de cartão" />
                  </div>
                  <h3 className="process-card_number">02</h3>
                </div>
                <div className="process-card_content">
                  <span className="process-card-text">Visa, Mastercard, Elo e American Express</span>
                  <h4 className="process-card-title"> Contratos com as bandeiras</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-3 process-card-wrap">
              <div className="process-card">
                <div className="process-card_wrapp">
                  <div className="process-card-icon">
                    <img src="assets/img/icon/process-icon-1-3.svg" alt="Ícone de contratos com registradoras" />
                  </div>
                  <h3 className="process-card_number">03</h3>
                </div>
                <div className="process-card_content">
                  <span className="process-card-text">B3, CERC e Núclea</span>
                  <h4 className="process-card-title"> Contratos com as registradoras</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-3 process-card-wrap">
              <div className="process-card">
                <div className="process-card_wrapp">
                  <div className="process-card-icon">
                    <img src="assets/img/icon/process-icon-1-4.svg" alt="Ícone de contratação de softwares de pagamento" />
                  </div>
                  <h3 className="process-card_number">04</h3>
                </div>
                <div className="process-card_content">
                  <span className="process-card-text">Liquidação, captura e processamento</span>
                  <h4 className="process-card-title"> Contratação dos softwares</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessOne;
