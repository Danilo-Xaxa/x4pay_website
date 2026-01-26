import React from "react";
import TrackVisibility from "react-on-screen";
import CountUp from "react-countup";

const FaqOne = () => {
  return (
    <section className=" ">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6">
            <div className="title-area me-xl-5 mb-20">
              <span className="sub-title">
                <img src="assets/img/icon/title_left.svg" alt="shape" />
                Tirando suas dúvidas
              </span>
              <h2 className="sec-title style2">Perguntas Frequentes (FAQ)</h2>
            </div>
            <div className="accordion-area accordion" id="faqAccordion">
              <div className="accordion-card ">
                <div className="accordion-header" id="collapse-item-1">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-1"
                    aria-expanded="false"
                    aria-controls="collapse-1"
                  >
                    Quais serviços a X4PAY oferece?
                  </button>
                </div>
                <div
                  id="collapse-1"
                  className="accordion-collapse collapse "
                  aria-labelledby="collapse-item-1"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      Dentre várias de nossas tratativas, destacamos algumas: <br />
                      •	Solicitamos e conferimos toda a documentação requerida pelos adquirentes, bandeiras e registradoras; <br />
                      •	Formulamos o Forecast estimando os três primeiros anos da operação; <br />
                      •	Auxiliamos na negociação das condições comerciais que os adquirentes ofertam (entre eles, Adiq, Entrepay, GetNet, MercadoPago, Rede, Cielo, SafraPay, PagBank/PagSeguro, Pinbank, WorldPay, etc); <br />
                      •	Providenciamos o Arranjo de Pagamentos com as bandeiras Visa, MasterCard, American Express (AMEX) e Elo; <br />
                      •	Agilizamos o contrato com as Registradoras (B3, CERC e Núclea); <br />
                      •	Auxiliamos na certificação PCI-DDS; <br />
                      •	Elaboramos todas as políticas de Compliance exigidas pelos adquirentes e bandeiras; <br />
                      •	Definimos todos os fluxos da operação; <br />
                      •	Prestamos assessoria na negociação com os softwares de captura e processamento e liquidação. <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-card ">
                <div className="accordion-header" id="collapse-item-2">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-2"
                    aria-expanded="false"
                    aria-controls="collapse-2"
                  >
                    Quanto tempo leva um projeto de subadquirência?
                  </button>
                </div>
                <div
                  id="collapse-2"
                  className="accordion-collapse collapse "
                  aria-labelledby="collapse-item-2"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      O prazo médio para a construção de uma subadquirente varia de 7 a 9 meses. O tempo pode variar porque também dependemos dos prazos internos dos adquirentes, bandeiras e registradoras. O que depende de nós é sempre cumprido com o máximo de agilidade e praticidade.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-card ">
                <div className="accordion-header" id="collapse-item-3">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-3"
                    aria-expanded="false"
                    aria-controls="collapse-3"
                  >
                    Quanto custa um projeto de subadquirência?
                  </button>
                </div>
                <div
                  id="collapse-3"
                  className="accordion-collapse collapse "
                  aria-labelledby="collapse-item-3"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <p className="faq-text">
                      Nossas propostas são personalizadas, variando de acordo com as necessidades de cada cliente. Mas não se preocupe, o nosso preço é justo e a nossa Proposta Comercial estará no seu e-mail em menos de 1 hora após o término da entrevista preliminar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ms-xl-5">
              <p className="counter-text">
                A X4PAY é especializada na estruturação de ecossistemas de subadquirência. Nós construímos sua subadquirente sem te dar trabalho. Desde a adequação dos CNAEs do seu CNPJ até a entrega da operação pronta para transacionar. <br />
                Entre em contato conosco e se surpreenda com a nossa metodologia!
              </p>
              <div className="counter-box_wrapper">
                <div className="counter-box">
                  <div className="counter-box_icon">
                    <img
                      src="assets/img/icon/counter-icon_1-1.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-box_number">
                      <TrackVisibility once>
                        {({ isVisible }) =>
                          isVisible && (
                            <span className="counter-number">
                              +
                              <CountUp delay={0} start={0} end={15} />
                            </span>
                          )
                        }
                      </TrackVisibility>
                    </h2>
                    <p className="counter-box_text">Projetos de subadquirentes construídos</p>
                  </div>
                </div>
                <div className="counter-box">
                  <div className="counter-box_icon">
                    <img
                      src="assets/img/icon/counter-icon_1-2.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="media-body">
                    <h2 className="counter-box_number">
                      <TrackVisibility once>
                        {({ isVisible }) =>
                          isVisible && (
                            <span className="counter-number">
                              +
                              <CountUp delay={0} start={0} end={500000000} formattingFn={(value) => value.toLocaleString("pt-BR")} />
                            </span>
                          )
                        }
                      </TrackVisibility>
                    </h2>
                    <p className="counter-box_text">Volume mensal transacionado por nossos clientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqOne;
